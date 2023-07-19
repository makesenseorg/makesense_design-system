const path = require('path');
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.esm-bundler.js',
        "@@": path.resolve(__dirname, "../../vue3"),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@@/shared.scss";`,
      },
    },
  },
});
