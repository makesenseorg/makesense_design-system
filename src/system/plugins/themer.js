import { reactive } from "vue";
import { themeMap } from "../tokens";

let stylesheet = null;

const themer = {
  install(Vue, theme) {
    const observable = reactive({
      theme: "base",
    });

    const loadTheme = (name) => {
      if (typeof document === "undefined") {
        return;
      }
      // eslint-disable-next-line
      if (!themeMap.hasOwnProperty(name)) {
        // eslint-disable-next-line
        console.warn(`Theme '${name}' not found.`);
        return;
      }
      observable.theme = name;
      // Vue.prototype.$theme = Vue.observable({name});
      const theme = { ...themeMap.base, ...themeMap[name] };
      useTheme(theme);
    };

    Vue.mixin({
      computed: {
        mksGetTheme: () => observable.theme,
      },
    });

    Vue.provide("$loadTheme", loadTheme);

    // Init base theme
    if (typeof document !== "undefined") {
      if (theme) {
        loadTheme(theme)
      }
      else {
        useTheme(themeMap.base);
      }
    }
  },
};

const useTheme = (theme) => {
  if (!stylesheet) {
    stylesheet = document.createElement("style");
    document.querySelector("head").append(stylesheet);
  }
  const variables = Object.keys(theme)
    .map((key) => {
      return `${key}: ${theme[key]};`;
    })
    .join("\n");
  stylesheet.innerHTML = `:root {
  ${variables}
}`;
};


export { themer as default, useTheme };
