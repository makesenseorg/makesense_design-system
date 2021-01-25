import Vue from "vue";

import System from "@@";
import SystemComponents from "@@/components";
import Components from "./components/global";
import "@@/styles/main.scss";
import App from "./App.vue";
import router from "./router";
import startCase from "lodash/startCase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(relativeTime);

Vue.config.productionTip = false;

Vue.use(System);
Vue.use(SystemComponents);
Vue.use(Components);

Vue.prototype.$date = dayjs;

Vue.filter("componentName", value => {
  return startCase(value.replace(/^Ds|^Mks/, ""));
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
