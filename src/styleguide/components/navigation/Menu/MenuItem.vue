<template>
  <li
    class="ds-menu-item"
    :class="[
      `ds-menu-item-level-${level}`,
      $parentMenu.inverse && 'ds-menu-item-inverse',
      $parentMenu.navbar && 'ds-menu-item-navbar'
    ]"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @click="handleClick"
    v-click-outside="handleClickOutside"
  >
    <component
      v-if="route"
      class="ds-menu-item-link"
      v-bind="bindings"
      :exact="isExact"
      :is="linkTag"
      ref="link"
    >
      <mks-text
        class="menu-item"
        weight="bold"
        size="small"
        v-if="parents.length === 0"
      >
        <slot> {{ name }}</slot>
      </mks-text>
      <slot v-else>{{ name }} </slot>
      <div
        v-if="hasSubmenu"
        class="ds-menu-item-arrow"
        @click.stop.prevent="toggleSubmenu"
      >
        <mks-icon v-if="showSubmenu === true" type="arrow-up"></mks-icon>
        <mks-icon v-else type="arrow-down"></mks-icon>
      </div>
      <div
        class="menu-item__tag"
        v-if="
          route.tags &&
            route.tags.deprecated &&
            route.tags.deprecated[0].description
        "
      >
        <mks-tag color="warning" size="small">Deprecated</mks-tag>
      </div>
    </component>
    <ul class="ds-menu-item-submenu" v-if="hasSubmenu && showSubmenu">
      <ds-menu-item
        v-for="child in route.children"
        :key="child.name"
        :route="child"
        :parents="[...parents, route]"
      />
    </ul>
  </li>
</template>

<script>
import ClickOutside from "vue-click-outside";
/**
 * Used in combination with the menu item to help the user navigate.
 * @version 1.0.0
 * @see DsMenu
 */
export default {
  name: "DsMenuItem",
  inject: {
    $parentMenu: {
      default: null
    }
  },
  directives: {
    ClickOutside
  },
  props: {
    /**
     * The route to display
     */
    route: {
      type: Object,
      default() {
        return null;
      }
    },
    /**
     * The parents of this route
     */
    parents: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * The component / tag used for the link of this route
     * @options router-link|a
     */
    linkTag: {
      type: String,
      default() {
        return this.$parentMenu.linkTag
          ? this.$parentMenu.linkTag
          : "router-link";
      },
      validator: value => {
        return value.match(/(router-link|a)/);
      }
    }
  },
  data() {
    return {
      showSubmenu: false,
      openMenuTimeout: null,
      closeMenuTimeout: null
    };
  },
  computed: {
    hasSubmenu() {
      return this.route.children && this.route.children.length;
    },
    url() {
      return this.$parentMenu.urlParser(this.route, this.parents);
    },
    name() {
      return this.$parentMenu.nameParser(this.route, this.parents);
    },
    isExact() {
      return this.$parentMenu.isExact(this.url);
    },
    level() {
      return this.parents.length;
    },
    bindings() {
      const bindings = {};
      if (this.linkTag === "router-link") {
        bindings.to = this.url;
      }
      if (this.linkTag === "a") {
        bindings.href = this.url;
      }
      return bindings;
    }
  },
  methods: {
    toggleSubmenu() {
      this.showSubmenu = !this.showSubmenu;
    },
    handleMouseOver() {
      if (this.closeMenuTimeout) {
        clearTimeout(this.closeMenuTimeout);
      }
      this.openMenuTimeout = setTimeout(() => {
        if (this.$parentMenu.navbar && this.hasSubmenu && !this.showSubmenu) {
          this.showSubmenu = true;
        }
      }, 150);
    },
    handleMouseOut() {
      if (this.openMenuTimeout) {
        clearTimeout(this.openMenuTimeout);
      }
      this.closeMenuTimeout = setTimeout(() => {
        if (this.$parentMenu.navbar && this.hasSubmenu && this.showSubmenu) {
          this.showSubmenu = false;
        }
      }, 150);
    },
    handleClick(event) {
      const clickedLink = event.target === this.$refs.link.$el;
      if (this.hasSubmenu && !this.showSubmenu) {
        this.toggleSubmenu();
      }
      if (
        clickedLink &&
        this.$parentMenu.navbar &&
        this.hasSubmenu &&
        !this.showSubmenu
      ) {
        this.showSubmenu = true;
        event.preventDefault();
        event.stopPropagation();
        return;
      } else if (clickedLink && event.target === window.location.href) {
        this.toggleSubmenu();
      } else this.$emit("click", event, this.route);

      /**
       * Handles click on menu item.
       * Receives two arguments:
       * event, route object
       *
       * @event click
       */
      this.$parentMenu.handleNavigate();
    },
    handleClickOutside() {
      this.showSubmenu = false;
    }
  }
};
</script>
<style>
.menu-item {
  margin: 0 !important;
}

.ds-menu-item-link {
  display: flex;
  align-items: center;
}

.menu-item__tag {
  margin-left: auto;
}
</style>
