<template>
  <component
    :is="tag"
    :class="`button button--color-${type} button--size-${size}`"
    @click="$emit('click')"
    :type="inputType"
    :disabled="disabled"
  >
    <!-- @slot Content of the button-->
    <slot v-if="!loading" />
    <!-- @slot Content of the button when `loading` prop is true -->
    <slot v-else name="loading">Processing...</slot>
  </component>
</template>

<script>
/**
 * Buttons can be used for any action or inner link.
 * @version 1.0.0
 */
export default {
  name: "MksButton",
  props: {
    /**
     * Buttons can be replaced by any of these tags : "div", "a", "input", "button", "span"
     */
    tag: {
      type: String,
      default: "div",
      validator: function(value) {
        return ["div", "a", "input", "button", "span"].indexOf(value) !== -1;
      }
    },
    /**
     * If loading is set to true, the button will display the loading slot or "Processing..."
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * If disabled is set to true, the button will be disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Can set the input type, in case of button tag (ex: "submit")
     */
    inputType: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * Color of the button. "primary",
            "secondary",
            "tertiary",
            "neutral",
            "positive",
            "warning",
            "negative"
     */
    type: {
      type: String,
      default: "primary",
      validator: function(value) {
        return (
          [
            "primary",
            "secondary",
            "tertiary",
            "neutral",
            "positive",
            "warning",
            "negative"
          ].indexOf(value) !== -1
        );
      }
    },
    /**
     * Color of the button. "default", "small", "full"
     */
    size: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "small", "full"].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  @include cursor-pointer;
  @include border-radius;
  @include button-reset;
  @include padding-button;
  @include text-body;
  display: inline-block;
  background-color: $color-primary;
  color: $color-primary-inverse;
  border-color: $color-primary;
  font-weight: $font-weight-extrabold; // override text-body
  border-width: $border-width-m;
  border-style: solid;
  text-decoration: none !important;
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: $color-primary-active;
    border-color: $color-primary-active;
  }

  &--size-small {
    @include border-round;
    @include padding-button-small;
  }

  &--size-full {
    width: 100%;
    text-align: center;
  }

  &--color-secondary {
    background-color: $color-secondary;
    border-color: $color-secondary;
    color: $color-secondary-inverse;

    &:hover {
      // todo : garder la border peut-être? ou rendre l'effet un peu plus légeer
      background-color: $color-secondary-active;
      border-color: $color-secondary-active;
    }
  }

  &--color-tertiary {
    background-color: $color-tertiary;
    border-color: $color-tertiary;
    color: $color-tertiary-inverse;

    &:hover {
      // todo : garder la border peut-être? ou rendre l'effet un peu plus légeer
      background-color: $color-tertiary-active;
      border-color: $color-tertiary-active;
    }
  }

  &--color-positive {
    background-color: $color-success;
    border-color: $color-success;
    color: $color-success-inverse;

    &:hover {
      background-color: $color-success-active;
      border-color: $color-success-active;
    }
  }

  &--color-warning {
    background-color: $color-warning;
    border-color: $color-warning;
    color: $color-warning-inverse;

    &:hover {
      background-color: $color-warning-active;
      border-color: $color-warning-active;
    }
  }

  &--color-negative {
    background-color: $color-danger;
    border-color: $color-danger;
    color: $color-danger-inverse;

    &:hover {
      background-color: $color-danger-active;
      border-color: $color-danger-active;
    }
  }

  &--color-neutral {
    background-color: $color-neutral-80;
    border-color: $color-neutral-80;
    color: $color-neutral-20;

    &:hover {
      background-color: $color-neutral-100;
      border-color: $color-neutral-80;
    }
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
}

button {
  outline: none !important;
}
</style>
<docs>
## Colors
  ```jsx
    <mks-button>Button default</mks-button>
    <mks-button type="secondary">Button secondary</mks-button>
    <mks-button type="tertiary">Button tertiary</mks-button>
    <mks-button type="neutral">Button neutral</mks-button>
    <br>
    <mks-button type="positive">Button positive</mks-button>
    <mks-button type="warning">Button warning</mks-button>
    <mks-button type="negative">Button negative</mks-button>
  ```

## Sizes
```jsx
    <mks-button size="small">Button small</mks-button>
    <br>
    <mks-button size="default">Button normal</mks-button>
    <mks-button size="full">Button full</mks-button>
  ```

  ## States
```jsx
    <mks-button v-bind:disabled="true">Disabled</mks-button>
    <br>
    <mks-button v-bind:loading="true">
        Load 
        <template v-slot:loading>Loading...</template>
    </mks-button>
  ```
</docs>
