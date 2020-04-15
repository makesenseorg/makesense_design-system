<template>
  <font-awesome-icon
    :icon="getIcon"
    class="icon"
    :class="['-color-' + color]"
  />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "default"
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

  &.-neutral {
    color: $color-neutral-70;
  }

  &.-color-success {
    color: $color-success;
  }
}
</style>
