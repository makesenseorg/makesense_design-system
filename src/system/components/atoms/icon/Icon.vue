<template>
  <component
    :is="component"
    v-if="library === 'font-awesome' && component"
    :icon="faIcon"
    :class="`icon icon--color-${color}`"
  />
  <svg
    v-else-if="library === 'feather'"
    :class="`feather feather-${getIcon} feather--color-${color}`"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${defaultSize} ${defaultSize}`"
    fill="none"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="path"
  ></svg>
  <span v-else></span>
</template>

<script>
/**
 * Nice icons to make it more fun ✨
 * @version 0.1.0
 */
export default {
  name: "MksIcon",
  props: {
    /**
     * Type of icon depending on the library used. Prefer feather when possible
     */
    type: {
      type: String,
      default: ""
    },
    /**
     * Color of the icon amongs theme colors, inherits from parent by default.
     */
    color: {
      type: String,
      default: "inherit"
    },
    /**
     * Which library to use : "font-awesome", "feather"
     */
    library: {
      type: String,
      default: "feather"
    },
    size: {
      type: String,
      default: "24"
    },
    strokeWidth: {
      type: String,
      default: "2"
    }
  },
  data() {
    return {
      defaultSize: 24,
      path: "",
      component: null,
      faIcon: null
    };
  },
  async created() {
    if (this.library === "feather") {
      import("feather-icons").then(feather => {
        this.path = feather.icons[this.type];
      });
    } else if (this.library === "font-awesome") {
      const vueFa = await import(
        /* webpackChunkName: "fa" */ `@fortawesome/vue-fontawesome`
      );
      const iconDef = await import(
        /* webpackChunkName: "fa" */ `@fortawesome/free-solid-svg-icons/${this.faName}.js`
      );
      this.component = vueFa.FontAwesomeIcon;
      this.faIcon = iconDef[this.faName];
    }
  },
  computed: {
    getIcon: function() {
      if (this.type === "close") return "x";
      if (this.type === "arrowUp") return "arrow-up";
      if (this.type === "arrowDown") return "arrow-down";
      if (this.type === "arrowLeft") return "arrow-left";
      if (this.type === "arrowRight") return "arrow-right";
      return this.type;
    },
    faName() {
      if (this.type === "close") return "faTimes";
      if (this.type === "company") return "faBuilding";
      if (this.type === "lang") return "faGlobeEurope";
      if (this.type === "mapMarker") return "faMapMarkerAlt";
      if (this.type === "menu") return "faBars";
      if (this.type === "help") return "faLifeRing";

      return `fa${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  color: inherit;
  vertical-align: middle;
  font-size: inherit;
  width: 1em;

  &--color-neutral {
    color: $color-neutral-70;
  }

  &--color-primary {
    color: $color-primary;
  }

  &--color-secondary {
    color: $color-secondary;
  }

  &--color-tertiary {
    color: $color-tertiary;
  }

  &--color-positive {
    color: $color-success;
  }

  &--color-warning {
    color: $color-warning;
  }

  &--color-negative {
    color: $color-danger;
  }
}

.feather {
  stroke: currentColor;
  vertical-align: middle;

  &--color-neutral {
    stroke: $color-neutral-70;
  }

  &--color-primary {
    stroke: $color-primary;
  }

  &--color-secondary {
    stroke: $color-secondary;
  }

  &--color-tertiary {
    stroke: $color-tertiary;
  }

  &--color-positive {
    stroke: $color-success;
  }

  &--color-warning {
    stroke: $color-warning;
  }

  &--color-negative {
    stroke: $color-danger;
  }
}
</style>
<docs>
## Feather icons (default)
[List of 286 available icons](https://feathericons.com/)

Some examples :

```jsx
<p>
  <mks-icon type="activity"></mks-icon> 
  <mks-icon type="alert-triangle"></mks-icon> 
  <mks-icon type="arrow-left"></mks-icon>
  <mks-icon type="arrow-left-circle"></mks-icon>
  <mks-icon type="bell"></mks-icon> 
  <mks-icon type="check"></mks-icon> 
  <mks-icon type="clock"></mks-icon> 
  <mks-icon type="eye-off"></mks-icon> 
  <mks-icon type="filter"></mks-icon> 
  <mks-icon type="heart"></mks-icon> 
  <mks-icon type="list"></mks-icon> 
  <mks-icon type="lock"></mks-icon>
  <mks-icon type="map-pin"></mks-icon>
  <mks-icon type="menu"></mks-icon>
  <mks-icon type="save"></mks-icon>
  <mks-icon type="star"></mks-icon> 
  <mks-icon type="thumbs-up"></mks-icon> 
  <mks-icon type="user"></mks-icon>
  <mks-icon type="zoom-in"></mks-icon>
</p>
```

## Font Awesome icons 
Font awesome icons are still available. However you have to specify to use the font-awesome library. 

[List of 1001 available icons](https://fontawesome.com/icons?d=gallery&s=solid&m=free)

The first line of icons has an alias for easier use. If not, you can just specify as type the name of the icon as camelCase.
Exemple, for <code>address-book</code> type will be <code>adressBook</code>

```jsx
<p>
  <mks-icon type="close" library="font-awesome"></mks-icon> 
  <mks-icon type="mapMarker" library="font-awesome"></mks-icon> 
  <mks-icon type="lang" library="font-awesome"></mks-icon> 
  <mks-icon type="company" library="font-awesome"></mks-icon> 
  <mks-icon type="menu" library="font-awesome"></mks-icon>
  <mks-icon type="help" library="font-awesome"></mks-icon>
  <br />
  <br />
  <mks-icon type="addressBook" library="font-awesome"></mks-icon>
  <mks-icon type="adjust" library="font-awesome"></mks-icon>
  <mks-icon type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon type="arrowDown" library="font-awesome"></mks-icon> 
  <mks-icon type="arrowLeft" library="font-awesome"></mks-icon>
  <mks-icon type="arrowRight" library="font-awesome"></mks-icon>
  <mks-icon type="link" library="font-awesome"></mks-icon> 
  <mks-icon type="tag" library="font-awesome"></mks-icon>
  <mks-icon type="search" library="font-awesome"></mks-icon> 
  <mks-icon type="check" library="font-awesome"></mks-icon>
  <mks-icon type="share" library="font-awesome"></mks-icon>
  <mks-icon type="sort"  library="font-awesome"></mks-icon>
  <mks-icon type="clock" library="font-awesome"></mks-icon>
  <mks-icon type="wallet" library="font-awesome"></mks-icon> 
  <mks-icon type="lock" library="font-awesome"></mks-icon> 
 
</p>
```

## Colors 

Inherits from parent by default 

```jsx
<p>
  <mks-text tag="p">Feather</mks-text>
  <mks-icon color="neutral" type="arrow-up"></mks-icon> 
  <mks-icon color="primary" type="arrow-up"></mks-icon> 
  <mks-icon color="secondary" type="arrow-up"></mks-icon> 
  <mks-icon color="tertiary" type="arrow-up"></mks-icon> 
  <mks-icon color="positive" type="arrow-up"></mks-icon> 
  <mks-icon color="warning" type="arrow-up"></mks-icon> 
  <mks-icon color="negative" type="arrow-up"></mks-icon> 
  <br/><br/>
  <mks-text tag="p">Font awesome</mks-text>
  <mks-icon color="neutral" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="primary" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="secondary" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="tertiary" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="positive" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="warning" type="arrowUp" library="font-awesome" ></mks-icon> 
  <mks-icon color="negative" type="arrowUp" library="font-awesome" ></mks-icon> 
</p>
```
</docs>
