const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.esm-bundler.js',
        "@@": "/home/arno/Dev/makesense/makesense_design-system/vue3",
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
