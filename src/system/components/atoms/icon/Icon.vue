<template>
  <svg
    :class="`icon icon-${getIcon} icon--color-${color}`"
    role="img"
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
     * Description of the icon for screen readers
     */
    alt: {
      type: String,
      required: false
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
            "negative",
            "currentColor"
          ].indexOf(value) !== -1
        );
      }
    },
    size: {
      type: [String, Number],
      default: "24"
    },
    strokeWidth: {
      type: String,
      default: "2"
    }
  },
  data() {
    return {
      defaultSize: 24
    };
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
    path() {
      return `<title id="${this.type}">${this.alt || ""}</title>${
        feather.icons[this.type]
      }`;
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
  <mks-icon type="activity" alt="Activités"></mks-icon> 
  <mks-icon type="alert-triangle" alt="Attention, il fait froid!"></mks-icon> 
  <mks-icon type="arrow-left" alt="A gauche"></mks-icon>
  <mks-icon type="arrow-left-circle" alt="Retourner"></mks-icon>
  <mks-icon type="bell" alt="Notifications"></mks-icon> 
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

<p>
  <mks-icon type="star" alt="petite étoile" v-bind:size="12" color="primary"></mks-icon> 
  <mks-icon type="star" alt="étoile couleur secondaire" size="50" color="secondary"></mks-icon> 
</p>
```
</docs>
