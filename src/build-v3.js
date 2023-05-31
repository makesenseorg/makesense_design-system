const path = require("path");
const fsPromise = require("fs").promises;

const vueDocs = require("vue-docgen-api");
const glob = require("glob");
const _ = require("lodash");
const ncp = require("ncp");

const BUILD_DIR = "../vue3";

const themes = glob.sync("./system/tokens/generated/themes/*.js");
const directories = ["components", "tokens/generated/themes"];
const copySystem = [
  "assets",
  "index.js",
  "mixins",
  "modules",
  "plugins",
  "tokens/index.js",
  "tokens/generated/themes/base.js",
  ...themes
    .filter(themePath => path.basename(themePath, ".js") !== "index")
    .map((themePath) => `tokens/generated/themes/${path.basename(themePath, ".js")}.css`),
  "utils"
];

async function createDirectory(path) {
  await fsPromise
    .mkdir(`${BUILD_DIR}/${path}`, { recursive: true })
    .catch(err => {
      if (err.code !== "EEXIST") {
        throw err;
      }
    });
}

async function copyFiles(from, to) {
  return new Promise((resolve, reject) => {
    ncp(from, to, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function readThemeFile(name) {
  const fileContents = await fsPromise.readFile(
    `./system/tokens/generated/themes/${name}.js`,
    "utf8"
  );
  return JSON.parse(
    fileContents.replace("export default ", "").replace(";", "")
  );
}

async function optimizeTokens() {
  const rawTokens = require("./system/tokens/generated/tokens.raw.json");
  delete rawTokens.aliases;
  await fsPromise.writeFile(
    `${BUILD_DIR}/tokens/generated/tokens.raw.json`,
    JSON.stringify(rawTokens, null, 2)
  );
  const baseTheme = await readThemeFile("base");
  const themeNames = ["base"];
  await Promise.all(
    themes.map(async themePath => {
      const themeName = path.basename(themePath, ".js");
      if (themeName === "base" || themeName === "index") {
        return;
      }
      themeNames.push(themeName);
      const strippedTheme = {};
      const theme = await readThemeFile(themeName);

      Object.entries(theme).forEach(([key, value]) => {
        if (baseTheme[key] !== value) {
          strippedTheme[key] = value;
        }
      });
      await fsPromise.writeFile(
        `${BUILD_DIR}/tokens/generated/themes/${themeName}.js`,
        `export default ${JSON.stringify(strippedTheme, null, 2)};`
      );
    })
  );
  await fsPromise.writeFile(
    `${BUILD_DIR}/tokens/generated/themes/index.js`,
    `${themeNames
      .map(name => `import ${name} from "./${name}.js";\n`)
      .join("")}export default { ${themeNames.join(", ")} };`
  );
}

async function buildStyles() {
  const sass = require("sass");
  const mainStyle = sass.compile("./system/styles/main.scss", {
    loadPaths: ["../node_modules"]
  });
  await fsPromise.writeFile(`${BUILD_DIR}/main.css`, mainStyle.css);
  const sharedFileNames = glob.sync("./system/styles/shared/*.scss");
  const tokens = await fsPromise.readFile(
    "./system/tokens/generated/tokens.scss",
    "utf8"
  );
  const sharedFiles = await Promise.all(
    sharedFileNames.map(async file => {
      return await fsPromise.readFile(file, "utf8");
    })
  );
  const shared = [tokens, ...sharedFiles].join("\n");
  await fsPromise.writeFile(`${BUILD_DIR}/shared.scss`, shared);
}

async function buildComponents() {
  const components = glob.sync("./system/components/**/**/*.vue");
  const componentsMap = {};
  const atoms = [];
  const files = await Promise.all(
    components.map(async file => {
      const filename = path.basename(file);
      const folder = file.split("/")[3];
      const componentName = filename.replace(".vue", "");
      const componentInfo = await vueDocs.parse(file, {
        alias: {
          "@@": path.resolve(__dirname, "./system")
        }
      });
      const hidden =
        componentInfo.tags.access &&
        componentInfo.tags.access[0].description.indexOf("private") !== -1;
      let content = await fsPromise.readFile(file, { encoding: "utf8" });
      if (folder === "atoms") {
        atoms.push(componentName);
      }
      if (!hidden) {
        const docs = Array.from(content.matchAll(/<docs(\s|>)(.*?)<\/docs>/gs))
          .map(match => match[2])
          .join("\n");
        if (!componentsMap[folder]) {
          componentsMap[folder] = [];
        }
        componentsMap[folder].push({
          ...componentInfo,
          name: componentName,
          component: componentName,
          docs: docs
        });
      }

      content = content.replace(/@@\/assets/g, "../assets"); // remplace l'alias dans le path des assets
      content = content.replace(/~..\/assets/g, "../assets"); // remplace l'import webpack dans le path des assets css
      content = content.replace(/@@\/plugins/g, "../plugins"); // remplace l'alias dans le path des assets
      content = content.replace(/@@\/modules/g, "../modules"); // remplace l'alias dans le path des modules
      content = content.replace(/<docs(\s|>).*<\/docs>/gs, ""); // retire toutes les balises docs
      content = content.replace(/vue2-datepicker\/locale\/([^'"]+)/g, "vue-datepicker-next/locale/$1.es"); // retire toutes les balises docs
      content = content.replace(/vue2-datepicker/g, "vue-datepicker-next"); // retire toutes les balises docs

      // récupère les sous composants mks utilisés par chaque composant pour les injecter dans le bloc script
      const subComponents = _.uniq(
        (content.match(/<mks-[^\s>]+/g) || []).map(componentName =>
          _.upperFirst(_.camelCase(componentName))
        )
      );
      if (subComponents.length) {
        // génère les lignes d'importation des composants (todo?: une seule ligne `import {composant1, composant2} from...`)
        const componentsImports = subComponents
          .map(
            componentName =>
              `import ${componentName} from "./${componentName.replace(
                "Mks",
                ""
              )}.vue";`
          )
          .join("\n");
        if (content.match(/<script.*export default.*components:/s)) {
          // console.log("match components", filename);
          content = content.replace(
            "export default {",
            `${componentsImports}\nexport default {`
          );
          content = content.replace(
            "components: {",
            `components: { ${subComponents.join(",")},`
          );
        } else {
          const componentsList = `  components: { ${subComponents.join(
            ", "
          )} },`;
          // todo: prendre en compte les composants externes importés via `components:`
          content = content.replace(
            /export default {/,
            `${componentsImports}\nexport default {\n${componentsList}`
          );
        }
      }
      await fsPromise.writeFile(`${BUILD_DIR}/components/${filename}`, content);
      return filename;
    })
  );
  // exporte tous les composants dans le fichier vue3/components/index.js
  await fsPromise.writeFile(
    `${BUILD_DIR}/components/index.js`,
    files
      .map(
        filename =>
          `export {default as Mks${filename.replace(
            ".vue",
            ""
          )}} from "./${filename}";`
      )
      .join("\n")
  );

  await fsPromise.writeFile(
    `${BUILD_DIR}/components/map.js`,
    `const componentMap = ${JSON.stringify(componentsMap, null, 2)};
const componentsByName = {};
Object.values(componentMap).forEach((components) => {
  components.forEach((component) => {
    componentsByName[component.name] = component;
  });
});
componentMap.components = componentsByName;
export default componentMap;
`
  );

  await fsPromise.writeFile(
    `${BUILD_DIR}/components/atoms.js`,
    atoms.map(name => `import Mks${name} from "./${name}.vue";`).join("\n") +
      `

const atoms = {
  ${atoms.map(name => "Mks" + name).join(",\n  ")}
};

export default {
  install(vueApp) {
    Object.entries(atoms).forEach(([name, component]) => {
      vueApp.component(name, component);
    });
  }
}
`
  );
}

async function copySystemFiles() {
  await Promise.all(
    copySystem.map(async path => {
      await copyFiles(`./system/${path}`, `${BUILD_DIR}/${path}`);
    })
  );
}

async function build() {
  await Promise.all(
    directories.map(async directory => {
      await createDirectory(directory);
    })
  );

  await Promise.all([
    copySystemFiles(),
    buildComponents(),
    optimizeTokens(),
    buildStyles()
  ]);

  const indexContents = await fsPromise.readFile(`${BUILD_DIR}/index.js`, "utf8");
  await fsPromise.writeFile(
    `${BUILD_DIR}/index.js`,
    indexContents.replace(
      'import "./styles/main.scss";',
      'import "./main.css";'
    )
  );
}

build().catch(e => console.log(e));
