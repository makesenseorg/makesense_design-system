<template>
  <component
    :is="tag"
    :class="`heading ${tagClass}`"
    :style="`--color: ${colorComputed};`"
  >
    <!-- @slot The text passed to the heading -->
    <slot />
  </component>
</template>

<script>
import Vue from "vue";
/**
 * Headings are used in each major section of a page in the
 * interface.
 * Heading element provides an option to change the level of the heading.
 */
export default {
  name: "MksHeading",
  status: "prototype",
  release: "0.1.0",
  props: {
    /**
     * The tag used for the title, also heading level.
     * values: h1, h2, h3, h4, h5, h6
     */
    tag: {
      type: [Boolean, String],
      required: true,
      validator: function(value) {
        return ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(value) !== -1;
      }
    },
    /**
     * The class name to apply on the title.
     * values: h1, h2, h3, h4, h5, h6
     */
    tagClass: {
      type: String,
      required: false,
      validator: function(value) {
        return ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(value) !== -1;
      }
    },
    /**
     * The color of the title.
     * values : text, primary, secondary, tertiary
     */
    color: {
      type: String,
      default: "text",
      required: false,
      validator: function(value) {
        const hexa = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
        // TODO : vérifier toutes les couleurs acceptéess
        return (
          hexa.test(value) ||
          Vue.prototype.$colorExists(value) ||
          [
            "positive",
            "negative",
            "warning",
            "neutral",
            "text",
            "inherit"
          ].indexOf(value) !== -1
        );
      }
    }
  },
  computed: {
    colorComputed() {
      const hexa = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
      if (hexa.test(this.color)) {
        return this.color;
      } else if (this.color === "inherit") {
        return "inherit";
      } else if (this.color === "light") {
        return "var(--color-text-light)";
      } else if (this.color === "positive") {
        return "var(--color-success)";
      } else if (this.color === "negative") {
        return "var(--color-danger)";
      } else return `var(--color-${this.color})`;
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  box-sizing: border-box;
  color: var(--color);
  font-family: $font-heading;

  // &--inherit {
  //   color: inherit;
  // }
  // &--primary {
  //   color: $color-primary;
  // }
  // &--secondary {
  //   color: $color-secondary;
  // }
  // &--tertiary {
  //   color: $color-tertiary;
  // }
}
.h1,
h1 {
  @include title-large;
}
.h2,
h2 {
  @include title-medium;
}
.h3,
h3 {
  @include title-small;
}
h4,
.h4 {
  @include title-xsmall;
}
h5,
.h5 {
  @include text-large-black;
}
h6,
.h6 {
  @include text-body-black;
}
</style>

<docs>
  ```jsx
    <mks-heading tag="h1">The quick brown fox</mks-heading>
    <mks-heading tag="h2" color="primary">The quick brown fox</mks-heading>
    <mks-heading tag="h3" color="secondary">The quick brown fox</mks-heading>
    <mks-heading tag="h4" color="tertiary">The quick brown fox</mks-heading>
    <mks-heading tag="h5">The quick brown fox</mks-heading>
    <mks-heading tag="h6">The quick brown fox</mks-heading>

  ```

  ## Use custom colors

  The `color` prop accepts hexa colors or existing color tokens.

  ```jsx
    <mks-heading tag="h2" color="primary">The quick brown fox</mks-heading>
    <mks-heading tag="h2" color="#000">The quick brown fox</mks-heading>
    <mks-heading tag="h2" color="#ff00ff">The quick brown fox</mks-heading>
    <mks-heading tag="h2" color="silver-tree">The quick brown fox</mks-heading>
    <mks-heading tag="h2" color="positive">The quick brown fox</mks-heading>
    <mks-heading tag="h2" color="inherit">The quick brown fox</mks-heading>
  ```
</docs>
