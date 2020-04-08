<template>
  <component
    :is="tag"
    :class="`button button--${type} button--${size}`"
    @click="$emit('click')"
    :type="inputType"
    :disabled="disabled"
  >
    <slot v-if="!loading" />
    <slot v-else name="loading">Processing...</slot>
  </component>
</template>

<script>
export default {
  name: "Button",
  props: {
    tag: {
      type: String,
      default: "div",
      validator: function(value) {
        return ["div", "a", "input", "button", "span"].indexOf(value) !== -1;
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      required: false,
      default: ""
    },
    type: {
      type: String,
      default: "default",
      validator: function(value) {
        return (
          ["default", "positive", "negative", "shy", "black"].indexOf(value) !==
          -1
        );
      }
    },
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
  color: $color-neutral-100;
  border-color: $color-primary;
  font-weight: $font-weight-extrabold; // override text-body
  border-width: $border-width-m;
  border-style: solid;
  text-decoration: none !important;
  transition: background-color 0.2s, border-color 0.2s;

  &--small {
    @include border-round;
    padding: $space-m/2 $space-m;
  }

  &--full {
    width: 100%;
  }

  &:hover {
    background-color: $color-secondary;
    border-color: $color-secondary;
  }

  &--positive {
    background-color: $color-success;
    border-color: $color-success;
  }

  &--shy {
    background-color: $color-neutral-80;
    border-color: $color-neutral-80;
    color: $color-text;

    &:hover {
      background-color: $color-neutral-100;
      border-color: $color-neutral-80;
    }
  }

  &--black {
    background-color: $color-secondary;
    border-color: $color-secondary;
    color: $color-neutral-100;

    &:hover {
      // todo : garder la border peut-être? ou rendre l'effet un peu plus légeer
      background-color: $color-neutral-0;
      border-color: $color-neutral-0;
    }
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
}

button {
  outline: none !important;
}
</style>
