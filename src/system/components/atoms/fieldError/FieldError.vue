<template>
  <div class="field__error" v-if="getError">{{ getError }}</div>
</template>

<script>
export default {
  /**
   * Made to display an error under a field.
   * @version 1.0.0
   */
  name: "MksFieldError",
  props: {
    error: {
      type: [Boolean, String, Object],
      required: true
    }
  },
  computed: {
    getError: function() {
      if (typeof this.error === "object") {
        if (this.error.length > 0) return this.error[0];
        else return false;
      } else return this.error;
    }
  }
};
</script>

<style lang="scss">
.field__error {
  @include text-small;
  color: $color-danger;
  margin-top: $space-m / 4;
}
</style>
<docs>
  ```jsx
    <mks-field-error error="There is an error with this field."></mks-field-error>
    ```
</docs>
