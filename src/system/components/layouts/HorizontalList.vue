<template>
  <component :is="tag" class="horizontal-list">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "MksHorizontalList",
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
