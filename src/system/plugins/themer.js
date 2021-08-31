/* eslint-disable */
import { themeMap } from "../tokens";

let stylesheet = null;

export default {
  install(Vue) {
    const observable = Vue.observable({
      theme: 'base',
    }); 

    Vue.mixin({
      computed: {
        mksGetTheme: () => observable.theme
      }
    });

    Vue.prototype.$loadTheme = name => {
      if (typeof document === "undefined") {
        return;
      }
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
  }
};

const useTheme = theme => {
  if (!stylesheet) {
    stylesheet = document.createElement("style");
    document.querySelector("head").append(stylesheet);
  }
  const variables = Object.keys(theme)
    .map(key => {
      return `${key}: ${theme[key]};`;
    })
    .join("\n");
  stylesheet.innerHTML = `:root {
  ${variables}
}`;
};

// Init base theme
if (typeof document !== "undefined") {
  useTheme(themeMap.base);
}
