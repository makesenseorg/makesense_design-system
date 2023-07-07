const theo = require("theo");
const kebabCase = require("lodash/kebabCase");
const { lstatSync, readdirSync, writeFileSync } = require("fs");
const { join, basename, dirname } = require("path");
const mkdirp = require("mkdirp");
// var _eval = require("eval");

const src = "./src/system/tokens/tokens.yml";
const themeSrc = "./src/system/tokens/themes";
const dist = "./src/system/tokens/generated";

// Custom transforms
const unthemable = ["media-query", "media-size"];
theo.registerValueTransform(
  "cssvar",
  (prop) => !unthemable.includes(prop.get("category")),
  (prop) => `var(--${prop.get("name")})`
);
theo.registerTransform("webvars", ["color/rgb", "cssvar"]);

// Custom formats
theo.registerFormat("cssvarjs", (result) => {
  return `export default {${result
    .get("props")
    .map(
      (prop) => `\n  "--${kebabCase(prop.get("name"))}": "${prop.get("value")}"`
    )
    .toJS()}
}`;
});

const configs = [
  {
    src,
    dist: `${dist}/tokens.map.scss`,
    transform: "webvars",
    format: "map.scss",
  },
  { src, dist: `${dist}/tokens.scss`, transform: "webvars", format: "scss" },
  {
    src,
    dist: `${dist}/tokens.raw.json`,
    transform: "webvars",
    format: "raw.json",
  },
  { src, dist: `${dist}/tokens.json`, transform: "webvars", format: "json" },
  {
    src,
    dist: `${dist}/themes/base.js`,
    css: `${dist}/themes/base.css`,
    transform: "web",
    format: "cssvarjs",
  },
];

const isDirectory = (source) => lstatSync(source).isDirectory();
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory);

// Add theme configs
const addTheme = (themeDir) => {
  const theme = basename(themeDir);
  const config = {
    src: `${themeDir}/tokens.yml`,
    dist: `${dist}/themes/${theme}.js`,
    css: `${dist}/themes/${theme}.css`,
    transform: "web",
    format: "cssvarjs",
  };
  configs.push(config);
};

// Get all themes
const themes = getDirectories(themeSrc);
themes.forEach(addTheme);

const write = (dist, css) => ({ content, contentCss }) => {
  const dir = dirname(dist);
  mkdirp.sync(dir);
  writeFileSync(dist, content);

  if (css !== undefined) writeFileSync(css, contentCss);

  console.log("built", dist);
};

const transform = ({ src, dist, transform, format, css }) => {
  theo
    .convert({
      transform: {
        type: transform,
        file: src,
      },
      format: {
        type: format,
      },
    })
    .then(async (content) => {
      var generatedCss = "";

      if (css !== undefined) {
        var theme = JSON.parse(content.replace("export default ", ""));
        var variables = Object.keys(theme)
          .map((key) => {
            return `${key}: ${theme[key]};`;
          })
          .join("\n");
        generatedCss = `:root {
          ${variables}
        }`;
      }

      return { content, contentCss: generatedCss };
    })
    .then(write(dist, css))
    .catch((error) => console.log(`Something went wrong: ${error}, ${css}`));
};

const build = () => {
  configs.forEach(transform);
};

build();
