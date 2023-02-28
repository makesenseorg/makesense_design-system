import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import kebabCase from "lodash/kebabCase";

import componentsMap from "@@/components/map";
import config from "../config";
import PageWrapper from "../components/PageWrapper";
import SectionPage from "../components/SectionPage";
import ComponentPage from "../components/ComponentPage";

function createRoute(section) {
  const components = componentsMap[kebabCase(section.name)];

  const filteredComponents = components
    ? components.filter((c) => !c.parent)
    : null;

  const route = {
    path: section.path ? section.path : createUrl(section.name),
    component: createPageWrapper(section, filteredComponents),
    children: [
      {
        path: "",
        name: section.name,
        component: createSectionPage(section, filteredComponents),
      },
    ],
  };
  if (filteredComponents) {
    route.children = route.children.concat(
      filteredComponents.map(createComponentRoute)
    );
  }
  return route;
}

function createPageWrapper(section, components) {
  return {
    render: () =>
      h(PageWrapper, {
        section: section,
        components: components,
      }),
  };
}

function createSectionPage(section, components) {
  return {
    render: () =>
      h(SectionPage, {
        section: section,
        components: components,
      }),
  };
}

function createComponentRoute(component) {
  return {
    path: createUrl(component.displayName, false),
    name: component.displayName,
    component: createComponentPage(component),
    tags: component.tags,
  };
}

function createComponentPage(component) {
  return {
    // Necessary to keep reactivity (hot-reload)
    data() {
      return {
        component,
      };
    },
    render: () =>
      h(ComponentPage, {
        component,
      }),
  };
}

function createUrl(name, root = true) {
  const parts = Array.isArray(name) ? name : [name];
  const url = root ? "/" : "";
  return url + parts.map(sanitize).join("/");
}

function sanitize(name) {
  const sanitized = name.toLowerCase().replace(" ", "-");
  return encodeURIComponent(sanitized);
}

const routes = config.sections.map(createRoute);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Redirect for github pages
router.beforeEach((to, from, next) => {
  if (to.query && to.query.p) {
    next({ path: to.query.p, query: null });
  }
  next();
});

export default router;
