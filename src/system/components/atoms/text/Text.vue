<template>
  <component
    :is="tag"
    :class="
      `text text--size-${size} text--weight-${weight} text--align-${align}`
    "
    :style="`--color: ${colorComputed};`"
  >
    <!-- @slot The text passed to the text -->
    <slot />
  </component>
</template>

<script>
import Vue from "vue";
/**
 * For displaying small, normal or large texts.
 *  @version 0.2.0
 */
export default {
  name: "MksText",
  status: "prototype",
  release: "0.2.0",
  props: {
    /**
     * The tag used for the text
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
    /** The weight of the font. Either "normal" or "bold", "semibold" added @version 1.5.3 */
    weight: {
      type: String,
      default: "normal",
      validator: function(value) {
        return ["normal", "semibold", "bold"].indexOf(value) !== -1;
      }
    },
    /** left / right / center / justify */
    align: {
      type: String,
      default: "left",
      validator: function(value) {
        return ["left", "right", "center", "justify"].indexOf(value) !== -1;
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
      default: "inherit",
      required: false,
      validator: function(value) {
        const hexa = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
        // TODO : vérifier toutes les couleurs acceptéess
        return (
          hexa.test(value) ||
          Vue.prototype.$colorExists(value) ||
          [
            "positive",
            "negative",
            "warning",
            "neutral",
            "text",
            "light",
            "inherit"
          ].indexOf(value) !== -1
        );
      }
    }
  },
  computed: {
    colorComputed() {
      const hexa = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
      if (hexa.test(this.color)) {
        return this.color;
      } else if (this.color === "inherit") {
        return "inherit";
      } else if (this.color === "light") {
        return "var(--color-text-light)";
      } else if (this.color === "positive") {
        return "var(--color-success)";
      } else if (this.color === "negative") {
        return "var(--color-danger)";
      } else return `var(--color-${this.color})`;
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  box-sizing: border-box;
  color: var(--color);

  &--size-small {
    @include text-small;
  }
  &--size-normal {
    @include text-body;
  }
  &--size-large {
    @include text-large;
  }

  $aligns: left, right, center, justify;
  @each $align in $aligns {
    &--align-#{$align} {
      text-align: $align;
    }
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
.text--size-small.text--weight-semibold {
  @include text-small-semibold;
}
.text--size-normal.text--weight-semibold {
  @include text-body-semibold;
}
.text--size-large.text--weight-semibold {
  @include text-large-semibold;
}
</style>

<docs>
 ## Colors
```jsx
<mks-text>The quick brown fox</mks-text><br>
<mks-text color="light">The quick brown fox</mks-text><br>
<br>
<mks-text color="primary">The quick brown fox</mks-text><br>
<mks-text color="secondary">The quick brown fox</mks-text><br>
<mks-text color="tertiary">The quick brown fox</mks-text><br>
<br>
<mks-text color="positive">The quick brown fox</mks-text><br>
<mks-text color="warning">The quick brown fox</mks-text><br>
<mks-text color="negative">The quick brown fox</mks-text><br>
<br>
<mks-text color="#000">The quick brown fox</mks-text><br>
<mks-text color="inherit">The quick brown fox</mks-text><br>
<mks-text color="calypso">The quick brown fox</mks-text>
```

## Sizes and weights
```jsx
<mks-text size="small">The quick brown fox</mks-text><br>
<mks-text size="small" weight="semibold">The quick brown fox</mks-text><br>
<mks-text size="small" weight="bold">The quick brown fox</mks-text>
<br><br>
<mks-text>The quick brown fox</mks-text><br>
<mks-text weight="semibold">The quick brown fox</mks-text><br>
<mks-text weight="bold">The quick brown fox</mks-text>
<br><br>
<mks-text size="large">The quick brown fox</mks-text><br>
<mks-text size="large" weight="semibold">The quick brown fox</mks-text><br>
<mks-text size="large" weight="bold">The quick brown fox</mks-text>
```

## Alignment
```jsx
<mks-text tag="p">Left - The quick brown fox</mks-text>
<mks-text tag="p" align="center">Center - The quick brown fox</mks-text>
<mks-text tag="p" align="right">Right - The quick brown fox</mks-text>
<mks-text tag="p" align="justify">Justify - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</mks-text>
```


</docs>
