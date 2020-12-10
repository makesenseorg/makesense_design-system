import plugins from "./plugins";
//import components from "./components";
import atoms from "./components/atoms";
import "@@/styles/main.scss";

// to remove
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr"; // todo add es and en later and switch

export default {
  install(Vue) {
    Vue.use(plugins);
    Vue.use(atoms);

    dayjs.locale("fr");
    dayjs.extend(relativeTime);
    Vue.prototype.$date = dayjs;
  }
};
