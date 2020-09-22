<template>
  <footer :class="`site-footer site-footer--theme-${theme}`">
    <slot></slot>
  </footer>
</template>
<script>
export default {
  name: "MksFooter",
  release: "0.3.0",
  props: {
    theme: {
      type: String,
      default: "dark",
      validator: value => {
        return value.match(/(light|dark)/);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.site-footer {
  @include text-small;
  text-align: center;
  background: $color-default;
  color: $color-default-inverse;
  border-top: $border-width-m solid $border-color-base;
  padding: {
    top: $space-xxl;
    right: $space-m;
    bottom: $space-xxl;
    left: $space-m;
  }
  width: 100%;

  &__inner {
    margin: {
      right: auto;
      left: auto;
    }
    width: 65rem;
    max-width: 100%;
  }
}
</style>
<docs>

```jsx
<mks-footer>Made by makesense</mks-footer>
```


</docs>
