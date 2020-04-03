<template>
  <div class="tab-button" v-on:click="onClick" :class="{ 'tab-button--active': active }">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "TabButtonTitle",
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    onClick: function() {
      this.$emit("click", this.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-button {
  @include no-break;
  @include cursor-pointer;
  @include padding-button-invert;
  border-width: $border-width-l;
  font-weight: $font-weight-extrabold;

  &--active {
    @include border-bottom-shadow($color-main);
    border-width: $border-width-l;
    color: $color-main;
  }

  &:hover {
    color: $color-main;
  }
}
</style>
