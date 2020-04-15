<template>
  <font-awesome-icon :icon="getIcon" :class="`icon icon--color-${color}`" />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * Based on fontAwesomeIcon component
 * @version 1.0.0
 */
import {
  faArrowDown,
  faSort,
  faBars,
  faSearch,
  faArrowUp,
  faTimes,
  faArrowRight,
  faArrowLeft,
  faLock,
  faLifeRing,
  faCheck,
  faClock,
  faWallet,
  faShare
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "MksIcon",
  components: { FontAwesomeIcon },
  props: {
    /**
     * Type of icon : "arrowDown", "arrowUp", "arrowRight", "arrowLeft", "close", "search", "share", "check", "sort", "clock", "wallet", "lock", "menu","help":
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
    }
  },
  computed: {
    getIcon: function() {
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
        case "clock":
          return faClock;
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
