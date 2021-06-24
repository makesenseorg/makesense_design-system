<template>
  <component
    :is="tag"
    :class="`horizontal-list horizontal-list--spacing-${spacing}`"
  >
    <slot></slot>
  </component>
</template>
<script>
/**
 * Deprecated: Use Spacer instead - Displays items in a horizontal line
 * @version 0.2.0
 * @deprecated
 */
export default {
  name: "MksHorizontalList",
  status: "deprecated",
  release: "0.2.0",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    spacing: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "none", "small", "large"].indexOf(value) !== -1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.horizontal-list {
  @include flex;
  align-items: center;

  &--spacing-small > * {
    margin-right: $space-xs;
  }
  &--spacing-default > * {
    margin-right: $space-m;
  }
  &--spacing-large > * {
    margin-right: $space-l;
  }

  & > * {
    list-style-type: none;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<docs>

Deprecated: Use <mks-link to="/layouts/mksspacer">Spacer</mks-link> instead

```jsx
<mks-horizontal-list spacing="none">
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-tag>Tag 3</mks-tag>
</mks-horizontal-list>

<mks-horizontal-list spacing="small">
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-tag>Tag 3</mks-tag>
</mks-horizontal-list>

<mks-horizontal-list>
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-tag>Tag 3</mks-tag>
</mks-horizontal-list>

<mks-horizontal-list spacing="large">
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-tag>Tag 3</mks-tag>
</mks-horizontal-list>

```


</docs>
