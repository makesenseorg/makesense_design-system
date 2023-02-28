<template>
  <div class="navigation">
    <themer />
    <div class="navigation-search">
      <ds-input
        v-model="searchString"
        placeholder="Filter menu ..."
        icon="search"
      />
    </div>
    <ds-menu
      @navigate="$emit('navigate')"
      :routes="routes"
      :url-parser="urlParser"
      :name-parser="nameParser"
      :is-exact="isExact"
    />
    <i18n />
  </div>
</template>

<script>
import Themer from "./Themer";
import I18n from "./I18n";
import DsInput from "./data-input/Input/Input";
import DsMenu from "./navigation/Menu/Menu";
export default {
  name: "GuideNavigation",
  components: {
    I18n,
    Themer,
    DsInput,
    DsMenu,
  },
  data() {
    return {
      searchString: "",
    };
  },
  computed: {
    routes() {
      const routes = this.$router.options.routes.filter((route) => {
        return route.path !== "*";
      });
      const newRoutes = routes
        .map((route) => {
          const [parent, ...children] = [...route.children];
          parent.path = route.path;
          parent.children = children.filter(this.fitsSearch);
          return parent;
        })
        .filter((route) => {
          return route.children.length || this.fitsSearch(route);
        });
      return newRoutes;
    },
    searchParts() {
      return this.searchString.split(" ");
    },
  },
  methods: {
    fitsSearch(route) {
      if (!this.searchString) {
        return true;
      }
      return this.searchParts.every((search) => {
        if (!search) {
          return true;
        }
        return route.name.toLowerCase().includes(search.toLowerCase());
      });
    },
    nameParser(route) {
      return this.$filters.componentName(route.name);
    },
    urlParser(route, parents) {
      return {
        path: (
          parents.map((parent) => parent.path).join("") +
          "/" +
          route.path
        ).replaceAll("//", "/"),
      };
    },
    isExact(url) {
      return url.name === "Introduction";
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: $space-m $space-xs;
}

.navigation-search {
  padding: 0 $space-s;
  margin-bottom: $space-m;
}
</style>
