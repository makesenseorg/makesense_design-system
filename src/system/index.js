import plugins from "./plugins";
import atoms from "./components/atoms";
import Grid from "./components/layouts/grid/Grid.vue";
import Spacer from "./components/layouts/spacing/Spacer.vue";
import "./styles/main.scss";

export default {
  install(Vue) {
    Vue.use(plugins);
    Vue.use(atoms);
    Vue.component("MksSpacer", Spacer);
    Vue.component("MksGrid", Grid);
  }
};
