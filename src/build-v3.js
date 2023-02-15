const path = require("path");
const fsPromise = require("fs").promises;

const glob = require("glob");
const _ = require("lodash");
const ncp = require("ncp");

const themes = glob.sync("./system/tokens/generated/themes/*.js");
const directories = ["components", "tokens/generated/themes"];
const copyDist = [
  'system.css',
  'shared.scss',
];
const copySystem = [
  "assets",
  "index.js",
  "plugins",
  "tokens/index.js",
  "tokens/generated/tokens.raw.json",
  ...themes.map((path) => path.replace('./system/', ''))
];

async function createDirectory(path) {
  await fsPromise.mkdir(`../vue3/${path}`, { recursive: true }).catch(err => {
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

async function build() {
  await directories.reduce(async (promise, directory) => {
    await promise;
    await createDirectory(directory);
  }, Promise.resolve());

  await copySystem.reduce(async (promise, path) => {
    await promise;
    await copyFiles(`./system/${path}`, `../vue3/${path}`);
  }, Promise.resolve());

  await copyDist.reduce(async (promise, path) => {
    await promise;
    await copyFiles(`../dist/${path}`, `../vue3/${path}`);
  }, Promise.resolve());

  const components = glob.sync("./system/components/**/**/*.vue");
  const atoms = [];
  const files = await Promise.all(
    components.map(async file => {
      const filename = path.basename(file);
      if (file.match(/\/atoms\//)) {
        atoms.push(filename);
      }
      let content = await fsPromise.readFile(file, { encoding: "utf8" });
      content = content.replace(/@@\/assets/g, "../assets"); // remplace l'alias dans le path des assets
      content = content.replace(/@@\/plugins/g, "../plugins"); // remplace l'alias dans le path des assets
      content = content.replace(/<docs(\s|>).*<\/docs>/gs, ""); // retire toutes les balises docs

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
              )}";`
          )
          .join("\n");
        const componentsList = `  components: { ${subComponents.join(
          ", "
        )} },`;
        // todo: prendre en compte les composants externes importés via `components:`
        content = content.replace(
          /export default {/,
          `${componentsImports}\nexport default {\n${componentsList}`
        );
      }
      await fsPromise.writeFile(`../vue3/components/${filename}`, content);
      return filename;
    })
  );
  // exporte tous les composants dans le fichier vue3/components/index.js
  await fsPromise.writeFile(
    "../vue3/components/index.js",
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
}

build().catch((e) => console.log(e));
