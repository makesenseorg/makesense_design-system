<template>
  <div class="number">
    <div class="number__value"><slot name="value"></slot></div>
    <div class="number__label"><slot name="label"></slot></div>
  </div>
</template>

<script>
export default {
  name: "Number"
};
</script>

<style lang="scss" scoped>
.number__value {
  @include title-small;
  color: $color-primary;
}
.number__label {
  margin-bottom: $space_xxs;
}
</style>
