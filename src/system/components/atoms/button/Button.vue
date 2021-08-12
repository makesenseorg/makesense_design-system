<template>
  <component
    :is="tag"
    :class="[
      `button button--type-${type} button--size-${size}`,
      { 'button--loading': loading }
    ]"
    :role="role"
    tabindex="0"
    :type="inputType"
    :disabled="disabled"
    ref="container"
    :style="{
      minWidth: $slots.loading === undefined ? minWidth + 'px' : 'auto'
    }"
    @click="onClick"
    @keyup.enter="onClick"
  >
    <mks-icon
      v-if="icon && !iconRight"
      :type="icon"
      class="button__icon button__icon--left"
      :size="size === 'round' ? 24 : 20"
    ></mks-icon>
    <!-- @slot Content of the button-->
    <slot v-if="!loading" />
    <!-- @slot Content of the button when `loading` prop is true -->
    <slot v-else name="loading">
      <mks-loading
        type="standalone"
        :inline="true"
        color="#fff"
        :size="20"
      ></mks-loading>
    </slot>
    <mks-icon
      v-if="icon && iconRight"
      :type="icon"
      class="button__icon button__icon--right"
      :size="size === 'round' ? 24 : 20"
    ></mks-icon>
  </component>
</template>
<script>
/**
 * Buttons can be used for any action or inner link.
 * @version 0.3.0
 */
export default {
  name: "MksButton",
  release: "0.3.0",
  props: {
    /**
     * Buttons can be replaced by any of these tags : "div", "a", "input", "button", "span"
     */
    tag: {
      type: String,
      default: "button",
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
            "negative",
            "text",
            "text-active"
          ].indexOf(value) !== -1
        );
      }
    },
    /**
     * Has to be a valid icon type
     */
    icon: {
      type: String
    },
    /**
     * Place the icon on the right side of the text
     */
    iconRight: {
      type: Boolean,
      default: false
    },
    /**
     * Size of the button. "default", "small", "medium" "full", "round"
     */
    size: {
      type: String,
      default: "default",
      validator: function(value) {
        return (
          ["default", "small", "medium", "full", "round", "square"].indexOf(
            value
          ) !== -1
        );
      }
    },
    /**
     * Size of the button. "default", "small", "full", "round"
     */
    role: {
      type: String,
      default: "button"
    }
  },
  data: function() {
    return {
      minWidth: 0,
      observer: null
    };
  },
  mounted() {
    this.updateMinWidth();

    this.observer = new MutationObserver(() => {
      this.updateMinWidth();
    });

    this.observer.observe(this.$refs.container, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  },
  beforeDestroy: function() {
    // Clean up
    this.observer.disconnect();
  },
  methods: {
    onClick() {
      /**
       * Fires after click.
       *
       * @event click
       */
      this.$emit("click");
    },
    updateMinWidth() {
      this.$nextTick(function() {
        var container = this.$refs.container;
        if (container !== undefined) this.minWidth = container.offsetWidth;
      });
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
  font-weight: $font-weight-extrabold; // override text-body
  border-width: $border-width-m;
  border-style: solid;
  text-decoration: none !important;
  transition: background-color 0.2s, border-color 0.2s;
  text-align: center;

  &:focus {
    @include focus($background-color-primary);
  }

  &--size-small {
    @include border-round;
    @include padding-button-small;
  }

  &--size-medium {
    @include border-radius;
    @include padding-button-small;
  }
  &--size-full {
    width: 100%;
    text-align: center;
  }

  &--size-round {
    @include title-small;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    user-select: none;
    border-radius: $border-radius-circle;
    padding-right: 0;
    padding-left: 0;
    width: $space-xxl;
    height: $space-xxl;
    text-align: center;

    .button__icon {
      margin: 0;
    }
  }
  &--size-square {
    @include text-body;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    user-select: none;
    border-radius: $border-radius-m;
    padding-right: 0;
    padding-left: 0;
    width: $space-xl;
    height: $space-xl;
    padding: $space-xxs;
    text-align: center;
  }

  @mixin type-text {
    @include text-small;
    background-color: transparent;
    text-transform: uppercase;
    color: inherit;
    padding: 0;
    margin: 0;
    border: none;
  }

  &--type-text {
    @include type-text;
    font-weight: $font-weight-normal;
  }

  &--type-text-active {
    @include type-text;
    font-weight: $font-weight-black;
  }

  &--type-primary {
    background-color: $color-primary;
    border-color: $color-primary;
    color: $color-primary-inverse;

    &:hover {
      background-color: $color-primary-active;
      border-color: $color-primary-active;
    }
  }

  &--type-secondary {
    background-color: $color-secondary;
    border-color: $color-secondary;
    color: $color-secondary-inverse;

    &:hover {
      // todo : garder la border peut-être? ou rendre l'effet un peu plus légeer
      background-color: $color-secondary-active;
      border-color: $color-secondary-active;
    }

    &:focus {
      @include focus($color-secondary);
    }
  }

  &--type-tertiary {
    background-color: $color-tertiary;
    border-color: $color-tertiary;
    color: $color-tertiary-inverse;

    &:hover {
      // todo : garder la border peut-être? ou rendre l'effet un peu plus légeer
      background-color: $color-tertiary-active;
      border-color: $color-tertiary-active;
    }

    &:focus {
      @include focus($color-tertiary);
    }
  }

  &--type-positive {
    background-color: $color-success;
    border-color: $color-success;
    color: $color-success-inverse;

    &:hover {
      background-color: $color-success-active;
      border-color: $color-success-active;
    }

    &:focus {
      @include focus($color-success);
    }
  }

  &--type-warning {
    background-color: $color-warning;
    border-color: $color-warning;
    color: $color-warning-inverse;

    &:hover {
      background-color: $color-warning-active;
      border-color: $color-warning-active;
    }

    &:focus {
      @include focus($color-warning-active);
    }
  }

  &--type-negative {
    background-color: $color-danger;
    border-color: $color-danger;
    color: $color-danger-inverse;

    &:hover {
      background-color: $color-danger-active;
      border-color: $color-danger-active;
    }

    &:focus {
      @include focus($color-danger-active);
    }
  }

  &--type-neutral {
    color: $color-neutral-20;
    background-color: $background-color-base;
    border-color: $background-color-softest;

    &:hover {
      background-color: $background-color-softest;
    }

    &:focus {
      @include focus($background-color-softest);
    }
  }

  &:disabled,
  &[disabled] {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  &--loading {
    opacity: 0.7;
  }
}

.button__icon {
  &--left {
    margin-right: $space-xs;
  }
  &--right {
    margin-left: $space-xs;
  }
}

button {
  outline: none !important;
}
</style>
<docs>
## Colors
  ```jsx
    <mks-button tag="button">Button default</mks-button>
    <mks-button tag="button" type="secondary">Button secondary</mks-button>
    <mks-button tag="button" type="tertiary">Button tertiary</mks-button>
    <mks-button tag="button" type="neutral">Button neutral</mks-button>
    <br>
    <mks-button type="positive">Button positive</mks-button>
    <mks-button type="warning">Button warning</mks-button>
    <mks-button type="negative">Button negative</mks-button>
  ```

## Sizes
```jsx
    <mks-button size="round" icon="menu"></mks-button>
    <mks-button size="small">Button small</mks-button>
    <mks-button size="medium">Button medium</mks-button>
    <mks-button size="default">Button default</mks-button>
    <mks-button size="full">Button full</mks-button>
  ```

## With icons
```jsx
    <mks-button size="round" icon="bell"></mks-button>
    <br>
    <mks-button icon="menu" size="small">Menu</mks-button>
    <mks-button icon="menu" icon-right size="small">Menu</mks-button>
    <br>
    <mks-button icon="star">Sauvegarder</mks-button>
    <mks-button icon="star" icon-right>Sauvegarder</mks-button>
  ```

  ## States
```jsx
    <mks-button v-bind:disabled="true">Disabled</mks-button>
    <br>
    <mks-button v-bind:loading="true">
        Load 
        <template v-slot:loading>Loading...</template>
    </mks-button>
    <br>
    <mks-button v-bind:loading="true">
        Load 
    </mks-button>
    <br>
    <mks-button v-bind:loading="true" size="small">
        Load 
    </mks-button>
  ```
</docs>
