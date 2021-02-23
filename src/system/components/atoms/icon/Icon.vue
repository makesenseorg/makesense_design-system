<template>
  <svg
    :class="`icon icon-${getIcon} icon--color-${color}`"
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
</template>

<script>
import feather from "feather-icons";
/**
 * Nice icons to make it more fun ✨ (based on feather)
 * @version 0.1.0
 */
export default {
  name: "MksIcon",
  props: {
    /**
     * Type of icon
     */
    type: {
      type: String,
      required: true
    },
    /**
     * Color of the icon amongs theme colors, inherits from parent by default.
     */
    color: {
      type: String,
      default: "inherit",
      validator: function(value) {
        return (
          [
            "inherit",
            "primary",
            "secondary",
            "tertiary",
            "neutral",
            "positive",
            "warning",
            "negative"
          ].indexOf(value) !== -1
        );
      }
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
    this.path = feather.icons[this.type];
  },
  computed: {
    getIcon: function() {
      if (this.type === "close") return "x";
      if (this.type === "arrowUp") return "arrow-up";
      if (this.type === "arrowDown") return "arrow-down";
      if (this.type === "arrowLeft") return "arrow-left";
      if (this.type === "arrowRight") return "arrow-right";
      return this.type;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
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
## Icons
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
</docs>
