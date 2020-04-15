<template>
  <component
    :is="tag"
    :class="`heading heading--${color} heading--${tagClass}`"
  >
    <!-- @slot The text passed to the heading -->
    <slot />
  </component>
</template>

<script>
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
      required: false,
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
        return (
          ["primary", "secondary", "text", "tertiary"].indexOf(value) !== -1
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  @include reset;
  color: $color-text;

  &--primary {
    color: $color-primary;
  }
  &--secondary {
    color: $color-secondary;
  }
  &--tertiary {
    color: $color-tertiary;
  }
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
</docs>
