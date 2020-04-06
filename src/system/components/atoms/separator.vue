<template>
  <hr class="separator" />
</template>

<script>
export default {
  name: "Separator"
};
</script>

<style lang="scss" scoped>
.separator {
  border: none;
  margin-bottom: $space-m;
  margin-top: $space-m;
  border-bottom: $border;

  &--top-small {
    margin-top: $space_xs;
  }
}
</style>
