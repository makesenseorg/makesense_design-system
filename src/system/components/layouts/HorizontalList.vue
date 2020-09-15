<template>
  <component :is="tag" class="horizontal-list">
    <slot></slot>
  </component>
</template>
<script>
/**
 * Displays items in a horizontal line
 * @version 0.2.0
 */
export default {
  name: "MksHorizontalList",
  release: "0.2.0",
  props: {
    tag: {
      type: String,
      default: "div"
    }
  }
};
</script>
<style lang="scss" scoped>
.horizontal-list {
  @include flex;
  align-items: center;

  & > * {
    list-style-type: none;
    margin-right: $space-base;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<docs>

```jsx
<mks-horizontal-list>
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-tag>Tag 3</mks-tag>
</mks-horizontal-list>

```


</docs>
