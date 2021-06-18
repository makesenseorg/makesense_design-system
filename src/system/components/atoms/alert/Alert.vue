<template>
  <div :class="classes" :role="role">
    <!-- @slot Content of the slot-->
    <slot />
    <mks-separator v-if="separator" :color="separatorColor"></mks-separator>
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
    },
    /**
     * Accessibility role for the alert. Use the ARIA role="alert" to inform assistive technologies of a time-sensitive and important message that is not interactive. If the message is interactive, use the role="alertdialog" instead
     */
    role: {
      type: String,
      default: "region",
      validator: function(value) {
        return (
          ["region", "alert", "alertdialog", "status"].indexOf(value) !== -1
        );
      }
    },
    separator: {
      type: Boolean,
      default: false
    },
    separatorColor: {
      type: String,
      default: "var(--color-neutral-100)"
    }
  },
  computed: {
    classes() {
      // `alert alert--${type} alert--`
      let classes = `alert alert--${this.type}`;
      if (this.separator) classes += " alert--separator";
      else classes += " alert--no-separator";
      return classes;
    }
  }
};
</script>

<style lang="scss" scoped>
.alert {
  border-radius: $border-radius-base;
  padding: $space-s;
  text-align: center;
  position: relative;

  &--no-separator {
    @include elevated;
  }

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
## Alert themes
```jsx
<mks-alert type="positive">A positive alert</mks-alert>
<mks-alert type="warning">A warning alert</mks-alert>
<mks-alert type="negative">A negative alert</mks-alert>
```

## With separator
```jsx
<mks-alert type="positive" separator>A positive alert</mks-alert>
```
</docs>
