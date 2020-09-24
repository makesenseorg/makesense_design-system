import Vue from "vue";
import DesignSystem from "../../../";
import "../../../dist/system.css";

Vue.use(DesignSystem);

if (process.client) {
  Vue.prototype.$loadTheme("events");
}
