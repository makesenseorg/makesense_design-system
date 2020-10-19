const { execSync } = require("child_process");

const glob = require("glob");
// console font color
const chalk = require("chalk");
// loading
const ora = require("ora");

const components = glob.sync("./src/system/components/**/**/*.vue");
// const buildFile = path.join(__dirname, 'build.js')
// const webpack = require('vuec')
const spinner = ora("Packaging the components...\n").start();
setTimeout(() => {
  spinner.stop();
}, 2000);

for (const component of components) {
  const name = component.substring(component.lastIndexOf("/") + 1).slice(0, -4);
  const spinnerComp = ora(`Packaging ${name}...\n`).start();

  // const file = path.join(__dirname, module);

  const cmd = `vue-cli-service build --target lib --name Mks${name} --dest dist/components/${name} ${component}
  `;
  execSync(cmd);
  spinnerComp.stop();
  console.log(chalk.blue(`Component ${name} is packaged.`));
}
// ne s'affiche pas?
console.log(
  `[${new Date()}]` +
    chalk.green(`Completed build for ${components.length} components !`)
);
