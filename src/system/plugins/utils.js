import copy from "clipboard-copy";
import VueFeather from "vue-feather";

export default {
  install(Vue) {
    // prevent error in nuxt js
    if (typeof document !== "undefined") {
      Vue.use(VueFeather);
    }

    Vue.mixin({
      methods: {
        $copyToClipboard(content) {
          return copy(content);
        }
      }
    });
  }
};
