const path = require('path');
const webpack = require('webpack');
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.esm-bundler.js',
        "@@": path.resolve(__dirname, "../../vue3"),
      },
      fallback: {
        "util": require.resolve("util/"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@@/shared.scss";`,
      },
    },
  },
});
