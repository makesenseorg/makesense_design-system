// Get components
const context = require.context(".", true, /\.vue$/);
// Get components meta info
const contextMeta = require.context(
  "!../../loader/jsdoc-loader?modules!.",
  true,
  /\.vue$/
);

const components = [];
const componentsMap = {};
const componentsByName = {};
context.keys().forEach(key => {
  const c = context(key).default;
  const meta = contextMeta(key);
  const folder = key.split("/")[1];

  if (!componentsMap[folder]) {
    componentsMap[folder] = [];
  }

  const hidden =
    meta.tags.access &&
    meta.tags.access[0].description.indexOf("private") !== -1;

  if (!hidden) {
    const parent = meta.tags.see ? meta.tags.see[0].description : null;
    const componentData = {
      ...meta,
      parent,
      folder,
      name: c.name,
      component: c
    };

    componentsByName[c.name] = componentData;
    componentsMap[folder].push(componentsByName[c.name]);
  }

  if (meta.comment.indexOf("private_no_import") !== -1) return;
  else components.push(c);
});

// Add child components data to parent
Object.keys(componentsByName).forEach(name => {
  const component = componentsByName[name];
  if (!component.parent || !componentsByName[component.parent]) {
    return;
  }
  if (!componentsByName[component.parent].children) {
    componentsByName[component.parent].children = [];
  }
  componentsByName[component.parent].children.push(component);
});

console.log(componentsMap);
debugger; // todo: here
export { componentsMap };

export default {
  install(Vue) {
    components.forEach(c => Vue.component(c.name, c));
  }
};
