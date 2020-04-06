<template>
  <span class="logotype">
    <img src="@@/assets/img/brand/makesense-logo.png" class="logotype__image" />
  </span>
</template>

<script>
export default {
  name: "Logotype"
};
</script>

<style lang="scss" scoped>
.logotype {
  @include flex;
  align-items: center;
  font-size: 1em;
  font-weight: $font-weight-black;
}
.logotype__image {
  height: 2.5em;
  margin-right: 0.3em;
}
</style>
