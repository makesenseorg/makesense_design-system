<template>
  <footer class="site-footer"></footer>
</template>
<script>
export default {
  name: "MksFooter",
  release: "0.3.0"
};
</script>
<style lang="scss" scoped>
.site-footer {
  @include text-small;
  text-align: center;
  color: $color-secondary;
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
