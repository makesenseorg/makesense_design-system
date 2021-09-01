<template>
  <component
    :is="tag"
    :to="!external ? to : undefined"
    :href="external ? to : undefined"
    :target="external ? '_blank' : undefined"
    :class="{ link: true, 'link--menu': type === 'menu' }"
    :title="
      `${title || ''}${external ? ` (${$MKSlocale['externalLink']})` : ''}`
    "
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
      required: true
    },
    /** For usage in the Navigation, adds styling when active link. */
    type: {
      type: String
    },
    /** For accessibility purposes */
    title: {
      type: String
    }
  },
  computed: {
    external() {
      return (
        (typeof this.to === "string" &&
          (this.to.startsWith("http") ||
            this.to.startsWith("//") ||
            this.to.startsWith("www"))) ||
        this.to.startsWith("mailto:")
      );
    },
    tag() {
      if (this.external) {
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
  font-size: inherit;
  font-weight: inherit;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  border-bottom: $border-width-m solid;
  border-radius: $border-radius-full;

  &.exact-active,
  &.router-link-exact-active,
  &.nuxt-link-exact-active {
    color: $color-primary;
    border-color: $color-primary;
  }

  &:focus {
    @include focus($color-primary);
  }

  &--menu {
    font-size: inherit;
    font-weight: inherit;
    border-bottom: none;

    &:hover {
      opacity: $opacity-hover;
    }

    // &.exact-active,
    // &.router-link-exact-active,
    // &.nuxt-link-exact-active {
    //   font-size: inherit;
    //   color: $color-secondary;
    //   position: relative;

    //   &:focus {
    //     @include focus($color-secondary);
    //   }
    // }
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
