// Get jsdocs meta from component with
// @url: https://github.com/vue-styleguidist/vue-docgen-api
const path = require("path");
const parseSource = require("vue-docgen-api").parseSource;

module.exports = function(source) {
  const callback = this.async();
  const content = JSON.stringify(source)
    // .replace(/@@\/modules/g, path.resolve(__dirname, "../system/modules"))
    .replace(/\u2028/g, "\u2028")
    .replace(/\u2029/g, "\\u2029")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"');
  parseSource(content, this.resourcePath, {
    alias: {
      "@@": path.resolve(__dirname, "../system")
    }
  }).then(component => {
    callback(null, `module.exports = ${JSON.stringify(component)}`);
  });
};
