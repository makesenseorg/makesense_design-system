<template>
  <hr class="separator" />
</template>

<script>
export default {
  name: "Separator",
}
</script>

<style lang="scss" scoped>
.separator {
  border: none;
  margin-bottom: $space_m;
  margin-top: $space_m;
  border-bottom: $border;

  &--top-small {
    margin-top: $space_xs;
  }
}
</style>
