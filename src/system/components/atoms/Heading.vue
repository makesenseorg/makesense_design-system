<template>
  <component
    :is="tag"
    :class="`heading heading--${color} heading--${tagClass}`"
  >
    <slot />
  </component>
</template>

<script>
/**
 * Titles are used in each major section of a page in the
 * interface.
 * Title element provides an option to change the level of the heading.
 */
export default {
  name: "Heading",
  status: "prototype",
  release: "0.1.0",
  props: {
    /**
     * The tag used for the title, also heading level.
     * @values h1, h2, h3, h4, h5, h6
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
     * @values h1, h2, h3, h4, h5, h6
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
     * `text, main, secondary`
     */
    color: {
      type: String,
      default: "text",
      required: false,
      validator: function(value) {
        return ["main", "secondary", "text"].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  color: $color-text;

  &--main {
    color: $color-primary;
  }
  &--secondary {
    color: $color-secondary;
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
</style>

<docs>
  ```jsx
  <div>
    <Heading tag="h1">The quick brown fox</Heading>
    <Heading tag="h2">The quick brown fox</Heading>
    <Heading tag="h3">The quick brown fox</Heading>
    <Heading tag="h4">The quick brown fox</Heading>
  </div>
  ```
</docs>
