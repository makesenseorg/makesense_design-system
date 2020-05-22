<template>
  <li class="ds-list-item">
    <span class="ds-list-item-prefix">
      <span v-if="!$parentList.ordered" class="ds-list-item-icon">
        <ds-icon :type="icon" />
      </span>
    </span>
    <span class="ds-list-item-content">
      <slot />
    </span>
  </li>
</template>

<script>
import DsIcon from "../../typography/Icon/Icon";
/**
 * @version 1.0.0
 * @see DsList
 */
export default {
  name: "DsListItem",
  components: { DsIcon },
  inject: {
    $parentList: {
      default: null
    }
  },
  props: {
    /**
     * The name of the list icon.
     */
    icon: {
      type: String,
      default() {
        return this.$parentList ? this.$parentList.icon : "angle-right";
      }
    }
  }
};
</script>
