import plugins from "./plugins";
import atoms from "./components/atoms";
import "@@/styles/main.scss";

export default {
  install(Vue) {
    Vue.use(plugins);
    Vue.use(atoms);
  }
};
