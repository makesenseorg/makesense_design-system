import "@@/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DesignSystem from "@@";
import * as components from "@@/components";
import componentsMap from "@@/components/map";
import globalComponents from "./components/global";

import LangPicker from "@@/components/LangPicker";
import Spacer from "@@/components/Spacer";

import camelCase from "lodash/camelCase";
import kebabCase from "lodash/kebabCase";
import startCase from "lodash/startCase";

const app = createApp(App)
  .use(DesignSystem, { theme: "base" })
  .use(globalComponents)
  .use(router);
componentsMap.atoms.forEach((component) => {
  const name = "Mks" + component.name;
  app.component(name, components[name]);
});

app.component("MksLangPicker", LangPicker);
app.component("MksSpacer", Spacer);

app.config.globalProperties.$filters = {
  componentName(value) {
    return startCase(value.replace(/^Ds|^Mks/, ""));
  },
  camelCase,
  kebabCase,
  startCase,
};
app.mount("#app");
