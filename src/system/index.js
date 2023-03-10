import themer from "./plugins/themer";
import i18n from "./plugins/i18n";
import colors from "./plugins/colors";
import "./styles/main.scss";

export default {
  install(Vue, params) {
    Vue.use(themer, params && params.theme ? params.theme : "base");
    Vue.use(i18n);
    Vue.use(colors);
  }
};
