<template>
  <li class="ds-list-item">
    <span class="ds-list-item-prefix">
      <span v-if="!$parentList.ordered" class="ds-list-item-icon">
        <mks-icon :type="icon" />
      </span>
    </span>
    <span class="ds-list-item-content">
      <slot />
    </span>
  </li>
</template>

<script>
import MksIcon from "@/system/components/atoms/icon/Icon";
/**
 * @version 1.0.0
 * @see DsList
 */
export default {
  name: "DsListItem",
  components: { MksIcon },
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
        return this.$parentList ? this.$parentList.icon : "chevron-right";
      }
    }
  }
};
</script>
