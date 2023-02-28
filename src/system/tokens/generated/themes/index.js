const themeContext = require.context("./", true, /\.js$/);
const themeMap = {};
themeContext.keys().forEach(key => {
  if (key === "./index.js") {
    return;
  }
  const theme = themeContext(key).default;
  const name = key
    .split(".")
    .splice(-2)[0]
    .replace("/", "");
  themeMap[name] = theme;
});

export default themeMap;
