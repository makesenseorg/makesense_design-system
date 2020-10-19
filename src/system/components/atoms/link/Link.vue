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
 * Link to internal pages or external pages
 * @version 0.2.0
 */

export default {
  name: "MksLink",
  props: {
    to: {
      type: [String, Object],
      required: true,
      default: "/"
    },
    /** For usage in the BeanMenu, adds styling when active link. */
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
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border-bottom: $border-width-m solid;

  &.exact-active,
  &.router-link-exact-active,
  &.nuxt-link-exact-active {
    @include text-body-black;
    color: $color-primary;
    border-color: $color-primary;
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

## External links 

The component automatically detects an external link if it starts with <code>http</code>, <code>//</code> or <code>www</code>.

If you add a <code>title</code> attribute, it will be inherited.

```jsx

<mks-link to="https://google.com" title="Search for something">An external link</mks-link>

```


## Internal links

If it is an internal link, it automatically detects if the app is Vue or Nuxt and uses either <code>&lt;router-link&gt; </code> or <code>&lt;nuxt-link&gt;</code>.

```jsx
<mks-link to="/design-tokens">An internal link with string</mks-link>
<br><br>
<mks-link v-bind:to="{ name: 'Usage'}">An internal link with object</mks-link>
```

## Active page

If the link is internal and refers to the current page, styling is applied.

```jsx
<mks-link to="/atoms/mkslink">An active link</mks-link>
<mks-link to="/atoms/mkslink" type="menu">An active menu link</mks-link>
```
</docs>