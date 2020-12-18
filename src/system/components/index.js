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

  if (meta.comment.indexOf("private_no_import") !== -1) {
    return;
  } else {
    components.push(c);
  }
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

export { componentsMap };

export default {
  install(Vue) {
    components.forEach(c => Vue.component(c.name, c));
  }
};

/** Named export for each components in molecules and layouts */

export { default as MksBeanMenu } from "./molecules/beanMenu/BeanMenu";
export { default as MksCard } from "./molecules/card/Card";
export { default as MksEventLineCard } from "./molecules/eventLineCard/EventLineCard";
export { default as MksField } from "./molecules/field/Field";
export { default as MksFieldEditor } from "./molecules/field/FieldEditor";
export { default as MksFieldUpload } from "./molecules/field/FieldUpload";
export { default as MksIconActionCard } from "./molecules/iconActionCard/IconActionCard";
export { default as MksIconHeader } from "./molecules/iconHeader/IconHeader";
export { default as MksLangPicker } from "./molecules/langPicker/LangPicker";
export { default as MksModal } from "./molecules/modal/Modal";
export { default as MksPagination } from "./molecules/pagination/Pagination";
export { default as MksSidebar } from "./molecules/sidebar/Sidebar";
export { default as MksSiteFooter } from "./molecules/siteFooter/SiteFooter";
export { default as MksSiteHeader } from "./molecules/siteHeader/SiteHeader";

export { default as MksHorizontalList } from "./layouts/horizontalList/HorizontalList";
export { default as MksPage } from "./layouts/page/Page";
