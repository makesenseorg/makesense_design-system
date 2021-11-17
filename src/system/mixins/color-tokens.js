import { tokenMap } from "../tokens";

const keys = Object.keys(tokenMap["color"]).map(item =>
  convertToKebabCase(item)
);

function convertToKebabCase(string) {
  return string
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z]|([0-9]+))/g, "$1-$2")
    .toLowerCase();
}

/**
 * @mixin
 */
export default {
  data() {
    return {
      colorTokensKeys: keys,
      colorTokens: tokenMap
    };
  },
  methods: {
    exists(color) {
      return keys.indexOf(`color-${color}`) !== -1;
    },
    getContrastColor(color) {
      if (!window) return "neutral-100";
      const hex = this.getHexa(color);
      var r = parseInt(hex.substr(0, 2), 16);
      var g = parseInt(hex.substr(2, 2), 16);
      var b = parseInt(hex.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "text" : "neutral-100";
    },
    getHexa(color) {
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
  }
};
