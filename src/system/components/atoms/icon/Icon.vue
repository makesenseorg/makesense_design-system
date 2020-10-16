<template>
  <font-awesome-icon
    v-if="library === 'font-awesome'"
    :icon="getFaIcon"
    :class="`icon icon--color-${color}`"
  />
  <svg
    v-else
    :class="`feather feather-${getIcon}`"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${defaultSize} ${defaultSize}`"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="path"
  ></svg>
</template>

<script>
// todo : import dynamically (without breaking use in nuxt.js)
import feather from "feather-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faArrowDown,
  faSort,
  faBars,
  faSearch,
  faArrowUp,
  faTimes,
  faTag,
  faArrowRight,
  faArrowLeft,
  faLock,
  faLifeRing,
  faBuilding,
  faCheck,
  faGlobeEurope,
  faClock,
  faLink,
  faWallet,
  faShare,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";

/**
 * Nice icons to make it more fun ✨
 * @version 0.1.0
 */
export default {
  name: "MksIcon",
  components: { FontAwesomeIcon },
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
      path: ""
    };
  },
  async created() {
    if (this.library === "feather") {
      this.path = feather.icons[this.type];
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

    getFaIcon: function() {
      switch (this.type) {
        case "arrowDown":
          return faArrowDown;
        case "arrowUp":
          return faArrowUp;
        case "arrowRight":
          return faArrowRight;
        case "arrowLeft":
          return faArrowLeft;
        case "close":
          return faTimes;
        case "search":
          return faSearch;
        case "share":
          return faShare;
        case "check":
          return faCheck;
        case "sort":
          return faSort;
        case "link":
          return faLink;
        case "company":
          return faBuilding;
        case "lang":
          return faGlobeEurope;
        case "clock":
          return faClock;
        case "mapMarker":
          return faMapMarkerAlt;
        case "tag":
          return faTag;
        case "wallet":
          return faWallet;
        case "lock":
          return faLock;
        case "menu":
          return faBars;
        case "help":
          return faLifeRing;
        default:
          return faSearch;
      }
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
</style>
<docs>
## Feather icons (default)
List of all available icons : https://feathericons.com/

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

Only these ones are available as of now : 

```jsx
<p>
  <mks-icon type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon type="arrowDown" library="font-awesome"></mks-icon> 
  <mks-icon type="arrowLeft" library="font-awesome"></mks-icon>
  <mks-icon type="arrowRight" library="font-awesome"></mks-icon>
  <mks-icon type="close" library="font-awesome"></mks-icon> 
  <mks-icon type="mapMarker" library="font-awesome"></mks-icon> 
  <mks-icon type="lang" library="font-awesome"></mks-icon> 
  <mks-icon type="link" library="font-awesome"></mks-icon> 
  <mks-icon type="tag" library="font-awesome"></mks-icon> 
  <mks-icon type="company" library="font-awesome"></mks-icon> 
  <mks-icon type="search" library="font-awesome"></mks-icon> 
  <mks-icon type="check" library="font-awesome"></mks-icon>
  <mks-icon type="share" library="font-awesome"></mks-icon>
  <mks-icon type="sort"  library="font-awesome"></mks-icon>
  <mks-icon type="clock" library="font-awesome"></mks-icon>
  <mks-icon type="wallet" library="font-awesome"></mks-icon> 
  <mks-icon type="lock" library="font-awesome"></mks-icon> 
  <mks-icon type="menu" library="font-awesome"></mks-icon>
  <mks-icon type="help" library="font-awesome"></mks-icon>
</p>
```

## Colors 

Inherits from parent by default 

```jsx
<p>
  <mks-icon type="arrow-up" color="neutral"></mks-icon> 
  <mks-icon type="arrow-up" color="primary"></mks-icon> 
  <mks-icon type="arrow-up" color="secondary"></mks-icon> 
  <mks-icon type="arrow-up" color="tertiary"></mks-icon> 
  <mks-icon type="arrow-up" color="positive"></mks-icon> 
  <mks-icon type="arrow-up" color="warning"></mks-icon> 
  <mks-icon type="arrow-up" color="negative"></mks-icon> 
</p>
```
</docs>
