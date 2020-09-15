<template>
  <component
    :is="tag"
    :class="
      `text text--color-${color} text--size-${size} text--weight-${weight}`
    "
  >
    <!-- @slot The text passed to the text -->
    <slot />
  </component>
</template>

<script>
/**
 * Text are used everywhere in the interface.
 * Text element provides an option to change the type of tag.
 */
export default {
  name: "MksText",
  status: "prototype",
  release: "0.1.0",
  props: {
    /**
     * The tag used for the title, also heading level.
     * values:"p",
            "span",
            "div",
            "li",
            "ul",
            "ol",
            "label",
            "a",
            "pre",
            "dl",
            "dd",
            "dt"
     */
    tag: {
      type: [Boolean, String],
      required: false,
      default: "span",
      validator: function(value) {
        return (
          [
            "p",
            "span",
            "div",
            "li",
            "ul",
            "ol",
            "label",
            "a",
            "pre",
            "dl",
            "dd",
            "dt"
          ].indexOf(value) !== -1
        );
      }
    },
    /** normal / bold */
    weight: {
      type: String,
      default: "normal",
      validator: function(value) {
        return ["normal", "bold"].indexOf(value) !== -1;
      }
    },
    /** small / normal / large */
    size: {
      type: String,
      default: "normal",
      validator: function(value) {
        return ["small", "normal", "large"].indexOf(value) !== -1;
      }
    },
    /**
     * The color of the title.
     * values : "text",
            "light",
            "primary",
            "secondary",
            "tertiary",
            "inherit",
            "positive",
            "warning",
            "negative"
     */
    color: {
      type: String,
      default: "text",
      required: false,
      validator: function(value) {
        return (
          [
            "text",
            "light",
            "primary",
            "secondary",
            "tertiary",
            "inherit",
            "positive",
            "warning",
            "negative"
          ].indexOf(value) !== -1
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  @include reset;
  @include text-body;
  color: $color-text;

  &--color-inherit {
    color: inherit;
  }

  &--color-light {
    color: $color-text-light;
  }

  &--color-primary {
    color: $color-primary;
  }

  &--color-secondary {
    color: $color-secondary;
  }

  &--color-tertiary {
    color: $color-tertiary;
  }

  &--color-positive {
    color: $color-success;
  }

  &--color-warning {
    color: $color-warning;
  }

  &--color-negative {
    color: $color-danger;
  }

  &--size-small {
    @include text-small;
  }
  &--size-large {
    @include text-large;
  }
}
.text--size-small.text--weight-bold {
  @include text-small-extrabold;
}
.text--size-normal.text--weight-bold {
  @include text-body-black;
}
.text--size-large.text--weight-bold {
  @include text-large-black;
}
</style>

<docs>
 ## Colors
```jsx
<mks-text>The quick brown fox</mks-text><br>
<mks-text color="light">The quick brown fox</mks-text><br><br>
<mks-text color="primary">The quick brown fox</mks-text><br>
<mks-text color="secondary">The quick brown fox</mks-text><br>
<mks-text color="tertiary">The quick brown fox</mks-text><br><br>
<mks-text color="positive">The quick brown fox</mks-text><br>
<mks-text color="warning">The quick brown fox</mks-text><br>
<mks-text color="negative">The quick brown fox</mks-text>
```

## Sizes and weights
```jsx
<mks-text size="small">The quick brown fox</mks-text><br>
<mks-text size="small" weight="bold">The quick brown fox</mks-text>
<br><br>
<mks-text>The quick brown fox</mks-text><br>
<mks-text weight="bold">The quick brown fox</mks-text>
<br><br>
<mks-text size="large">The quick brown fox</mks-text><br>
<mks-text size="large" weight="bold">The quick brown fox</mks-text>
```


</docs>
