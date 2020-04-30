import plugins from "./plugins";
import components from "./components";
import "@@/styles/main.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr"; // todo add es and en later and switch

export default {
  install(Vue) {
    Vue.use(plugins);
    Vue.use(components);

    dayjs.locale("fr");
    dayjs.extend(relativeTime);
    Vue.prototype.$date = dayjs;
  }
};
