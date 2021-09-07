<template>
  <component
    :is="tag"
    :class="[
      `button button--type-${type} button--size-${size} button--style-${variant}`,
      { 'button--loading': loading }
    ]"
    :role="role"
    tabindex="0"
    :type="inputType"
    :disabled="disabled"
    ref="container"
    :style="{
      minWidth:
        $slots.loading === undefined && variant !== 'text' && variant !== 'bare'
          ? minWidth + 'px'
          : 'auto'
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
     * Buttons can be replaced by any valid tag.
     */
    tag: {
      type: String,
      default: "button"
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
     * Color of the button. 
     *      "primary",
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
     * Style of the button : full(default), ghost, text, underline
     */
    variant: {
      type: String,
      default: "full",
      validator: function(value) {
        return ["full", "ghost", "text"].indexOf(value) !== -1;
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
    // @include text-small;
    background-color: transparent;
    color: inherit;
    padding: 0;
    margin: 0;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    display: inline;
    text-decoration: none;
  }

  &--style-bare {
    @include type-text;
    font-weight: $font-weight-normal;
    &:focus {
      box-shadow: none;
    }
  }

  $themes: (
    "neutral": (
      "color": $background-color-soft,
      "inverse": $color-neutral-20,
      "active": $background-color-softest
    ),
    "primary": (
      "color": $color-primary,
      "inverse": $color-primary-inverse,
      "active": $color-primary-active
    ),
    "secondary": (
      "color": $color-secondary,
      "inverse": $color-secondary-inverse,
      "active": $color-secondary-active
    ),
    "tertiary": (
      "color": $color-tertiary,
      "inverse": $color-tertiary-inverse,
      "active": $color-tertiary-active
    ),
    "positive": (
      "color": $color-success,
      "inverse": $color-success-inverse,
      "active": $color-success-active
    ),
    "warning": (
      "color": $color-warning,
      "inverse": $color-warning-inverse,
      "active": $color-warning-active
    ),
    "negative": (
      "color": $color-danger,
      "inverse": $color-danger-inverse,
      "active": $color-danger-active
    )
  );

  @function map-deep-get($map, $keys...) {
    @each $key in $keys {
      $map: map-get($map, $key);
    }
    @return $map;
  }
  @each $name, $theme in $themes {
    &.button--type-#{$name} {
      &.button--style-full {
        @if $name == "neutral" {
          border-color: map-deep-get($theme, "active");
        } @else {
          border-color: map-deep-get($theme, "color");
        }
        background-color: map-deep-get($theme, "color");
        color: map-deep-get($theme, "inverse");

        &:hover {
          background-color: map-deep-get($theme, "active");
          border-color: map-deep-get($theme, "active");
        }

        &:focus {
          @include focus(map-deep-get($theme, "active"));
        }
      }
      &.button--style-ghost {
        @if $name == "neutral" {
          border-color: map-deep-get($theme, "active");
          color: map-deep-get($theme, "inverse");
        } @else {
          border-color: map-deep-get($theme, "color");
          color: map-deep-get($theme, "color");
        }
        background: transparent;

        &:hover {
          background-color: map-deep-get($theme, "color");
          color: map-deep-get($theme, "inverse");
        }

        &:focus {
          @include focus(map-deep-get($theme, "active"));
        }
      }

      &.button--style-text {
        @include type-text;
        font-weight: $font-weight-black;
        border-bottom: 1px solid map-deep-get($theme, "color");
        box-shadow: inset 0 -3px 0 map-deep-get($theme, "color");
        border-radius: 0;
        &:hover {
          background-color: map-deep-get($theme, "color");
          color: map-deep-get($theme, "inverse");
        }
        &:focus {
          border-radius: $border-radius-m;
          border-bottom: none;
          @include focus(map-deep-get($theme, "active"));
        }
      }
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
## Colors and variants
  ```jsx

    <mks-heading tag="h3">Variant full</mks-heading>
    <mks-button>Button primary</mks-button>
    <mks-button type="secondary">Button secondary</mks-button>
    <mks-button type="tertiary">Button tertiary</mks-button>
    <mks-button type="neutral">Button neutral</mks-button>
    <br>
    <mks-button type="positive">Button positive</mks-button>
    <mks-button type="warning">Button warning</mks-button>
    <mks-button type="negative">Button negative</mks-button>
    <br>
   <mks-heading tag="h3">Variant ghost</mks-heading>
    <mks-button type="primary" variant="ghost">Button primary</mks-button>
    <mks-button type="secondary" variant="ghost">Button secondary</mks-button>
    <mks-button type="tertiary" variant="ghost">Button tertiary</mks-button>
    <mks-button type="neutral" variant="ghost">Button neutral</mks-button>

    <br>
    <mks-button type="positive" variant="ghost">Button positive</mks-button>
    <mks-button type="warning" variant="ghost">Button warning</mks-button>
    <mks-button type="negative" variant="ghost">Button negative</mks-button>
    <br>
    <mks-heading tag="h3">Variant bare and text</mks-heading>
    This is some text, and <mks-button variant="bare">a styleless button</mks-button>,
    and a <mks-button variant="text" type="secondary">text button</mks-button>.
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
