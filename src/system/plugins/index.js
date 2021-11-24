import filters from "./filters";
import utils from "./utils";
import themer from "./themer";
import i18n from "./i18n";
import colors from "./colors";

export default {
  install(Vue) {
    Vue.use(filters);
    Vue.use(utils);
    Vue.use(themer);
    Vue.use(i18n);
    Vue.use(colors);
  }
};
