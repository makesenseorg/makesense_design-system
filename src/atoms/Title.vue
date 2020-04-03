<template>
  <component :is="tag" :class="[tagClass]"> <slot /> </component>
</template>

<script>
/**
 * Titles are used in each major section of a page in the
 * interface.
 * Title element provides an option to change the level of the heading.
 */
export default {
  name: "Title",
  status: "prototype",
  release: "0.1.0",
  props: {
    /**
     * The tag used for the title, also heading level.
     * `h1, h2, h3, h4, h5`
     */
    tag: {
      type: String,
      default: "h1",
      required: false,
      validator: function(value) {
        return ["h1", "h2", "h3", "h4", "h5"].indexOf(value) !== -1
      },
    },
    /**
     * The class name to apply on the title.
     * `my-class-name`
     */
    tagClass: {
      type: String,
      required: false,
      validator: function(value) {
        return ["h1", "h2", "h3", "h4", "h5"].indexOf(value) !== -1
      },
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  @include title-large;
}
h2 {
  @include title-medium;
}
h3 {
  @include title-small;
}
h4 {
  @include title-xsmall;
}
h5 {
  @include text-large-black;
}
</style>

<docs>
  ```jsx
  <div>
    <Title tag="h1">The quick brown fox</Title>
    <Title tag="h2">The quick brown fox</Title>
    <Title tag="h3">The quick brown fox</Title>
    <Title tag="h4">The quick brown fox</Title>
  </div>
  ```
</docs>
