<template>
  <main>
    <div class="header">BIGG</div>
    LOREM IPSUM DOLOR SIT MAET
  </main>
</template>

<script>
export default {
  layout: "single"
};
</script>
<style lang="scss" scoped>
.header {
  background: $color-secondary;
  color: $color-neutral-100;
  @include title-large;
  min-height: 500px;
}
</style>
