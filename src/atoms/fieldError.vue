<template>
  <div class="field__error" v-if="getError">{{ getError }}</div>
</template>

<script>
export default {
  name: "FieldError",
  props: {
    error: {
      required: true,
    },
  },
  computed: {
    getError: function() {
      if (typeof this.error === "object") {
        if (this.error.length > 0) return this.error[0]
        else return false
      } else return this.error
    },
  },
}
</script>

<style lang="scss" scoped>
.field__error {
  @include text-small;
  color: $color-negative;
  margin-top: $space_m / 4;
}
</style>
