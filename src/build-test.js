const path = require("path");
const fsPromise = require("fs").promises;

const glob = require("glob");
const _ = require("lodash");
const ncp = require("ncp");

// crée le dossier dist/components s'il n'existe pas
fsPromise
  .mkdir("../dist/components", { recursive: true })
  .catch(err => {
    if (err.code !== "EEXIST") {
      throw err;
    }
  })
  .then(() => {
    // j'avais une erreur sans ça, mais peut être lié au fait que mon package était présent en local et pas dans les node_modules
    return fsPromise.writeFile(
      "../dist/components/postcss.config.js",
      "module.exports = {};"
    );
  })
  .then(() => {
    // copie de tous les assets dans dist pour pouvoir les pointer
    return new Promise((resolve, reject) => {
      ncp("./system/assets", "../dist/assets/", function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  })
  .then(() => {
    const components = glob.sync("./system/components/**/**/*.vue");
    return Promise.all(
      components.map(async file => {
        const filename = path.basename(file);
        let content = await fsPromise.readFile(file, { encoding: "utf8" });
        content = content.replace(/@@\/plugins/g, "../plugins"); // remplace l'alias dans le path des assets
        content = content.replace(/@@\/assets/g, "../assets"); // remplace l'alias dans le path des assets
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
          const componentsList = `  components: { ${subComponents.join(", ")} },`;
          // todo: prendre en compte les composants externes importés via `components:`
          content = content.replace(
            /export default {/,
            `${componentsImports}\nexport default {\n${componentsList}`
          );
        }
        await fsPromise.writeFile(`../dist/components/${filename}`, content);
        return filename;
      })
    );
  })
  .then(files => {
    // exporte tous les composants dans le fichier dist/components/index.js
    return fsPromise.writeFile(
      "../dist/components/index.js",
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
  });
