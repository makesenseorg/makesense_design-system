<template>
  <component
    :is="tag"
    :to="tag !== 'a' ? to : undefined"
    :href="tag === 'a' ? to : undefined"
    :target="tag === 'a' ? '_blank' : undefined"
    :class="{ link: true, 'link--menu': type === 'menu' }"
  >
    <!-- @slot Text of the link-->
    <slot></slot>
  </component>
</template>
<script>
/**
 * The link can link to internal or external pages. It automatically detects an external link if it starts with "http", "//" or "www".
 * If it is an internal link, it automatically detects if the app is Vue or Nuxt and uses either <router-link> or <nuxt-link>.
 * If you add a title attribute, it will be inherited.
 * @version 1.0.0
 */

export default {
  name: "MksLink",
  props: {
    to: {
      type: [String, Object],
      required: true,
      default: "/"
    },
    type: {
      type: String
    }
  },
  computed: {
    tag() {
      if (
        typeof this.to === "string" &&
        (this.to.startsWith("http") ||
          this.to.startsWith("//") ||
          this.to.startsWith("www"))
      ) {
        return "a";
      }
      if (!this.$nuxt) {
        return "router-link";
      }
      return "nuxt-link";
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  @include text-body;
  text-decoration: none;
  color: inherit;
  border-bottom: $border-width-m solid;

  &.exact-active,
  &.router-link-exact-active,
  &.nuxt-link-exact-active {
    @include text-body-black;
    color: $color-primary;
  }

  &--menu {
    font-size: inherit;
    font-weight: inherit;
    border-bottom: none;

    &.exact-active,
    &.router-link-exact-active,
    &.nuxt-link-exact-active {
      font-size: inherit;
      color: $color-secondary;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: $border-radius-full;
        background-color: $color-secondary;
        width: $space-large;
        height: 4px;
        transform: translateY(150%);
      }
    }
  }
}
</style>
<docs>

```jsx

<mks-link to="https://google.com" title="Search for something">An external link</mks-link><br>
<mks-link to="/design-tokens">An internal link with string</mks-link><br>
<mks-link v-bind:to="{ name: 'Usage'}">An internal link with object</mks-link>

```
</docs>
