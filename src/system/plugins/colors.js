import { tokenMap } from "../tokens";

const keys = Object.keys(tokenMap["color"]).map(item =>
  convertToKebabCase(item)
);

function convertToKebabCase(string) {
  return string
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z]|([0-9]+))/g, "$1-$2")
    .toLowerCase();
}

function adjust(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, color =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

function getHexa(color) {
  const array = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${color}`)
    .replace("rgb(", "")
    .replace(")", "")
    .split(", ");
  return array
    .map(x => {
      const hex = parseInt(x, 10).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");
}

export default {
  install(Vue) {
    Vue.prototype.$colorTokensKeys = keys;
    Vue.prototype.$colorTokens = tokenMap;

    Vue.prototype.$colorExists = color => {
      return keys.indexOf(`color-${color}`) !== -1;
    };

    Vue.prototype.$getContrastColor = color => {
      if (process.server || typeof window === "undefined") return "neutral-100";
      const hex = getHexa(color);
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 137 ? "text" : "neutral-100";
    };

    Vue.prototype.$getHoverColor = color => {
      if (process.server || typeof window === "undefined") return "neutral-100";
      const hex = getHexa(color);
      const hovercolor = adjust(hex, -10);
      console.log(color, hex, hovercolor);

      return hovercolor;
    };
  }
};
