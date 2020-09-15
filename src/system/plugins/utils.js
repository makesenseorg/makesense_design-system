import copy from "clipboard-copy";
import VueFeather from "vue-feather";

export default {
  install(Vue) {
    Vue.use(VueFeather);
    Vue.mixin({
      methods: {
        $copyToClipboard(content) {
          return copy(content);
        }
      }
    });
  }
};
