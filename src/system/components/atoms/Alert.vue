<template>
  <div :class="type ? `alert alert--${type}` : 'alert'">
    <!-- @slot Content of the slot-->
    <slot />
  </div>
</template>

<script>
/**
 * Displays an alert
 * @version 1.0.0
 */
export default {
  name: "MksAlert",
  props: {
    /**
     * "positive", "warning", or "negative"
     */
    type: {
      type: String,
      default: "warning",
      validator: function(value) {
        return ["positive", "warning", "negative"].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  @include elevated;
  border-radius: $border-radius-base;
  padding: $space-s;
  text-align: center;

  &--positive {
    background: $color-success;
    color: $color-success-inverse;
  }

  &--negative {
    background: $color-danger;
    color: $color-danger-inverse;
  }

  &--warning {
    background: $color-warning;
    color: $color-warning-inverse;
  }
}
</style>
<docs>
```jsx
<mks-alert type="positive">A positive alert</mks-alert>
<mks-alert type="warning">A warning alert</mks-alert>
<mks-alert type="negative">A negative alert</mks-alert>
```
</docs>
