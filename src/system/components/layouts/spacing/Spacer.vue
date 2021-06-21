<template>
  <component :class="classes" :is="tag" :style="style">
    <!-- @slot children elements to space -->
    <slot></slot>
  </component>
</template>
<script>
/** Use to add spacing between a collection of items with flexbox. Props allow to change spacing size, axis, and distribution.
 * @version 0.0.0
 */
export default {
  name: "MksSpacer",
  props: {
    /** Set alignment on secondary axis. (align-items) */
    align: {
      type: String,
      default: "start",
      validator: value => {
        return value.match(/(start|end|center|stretch|baseline)/);
      }
    },
    /** Apply same spacing to nested elements */
    deep: {
      type: Boolean,
      default: false
    },
    /** Set alignment on main axis (justify-content) */
    distribute: {
      type: String,
      default: "start",
      validator: value => {
        return value.match(/(start|end|center|equal|spaced)/);
      }
    },
    /** Elements flow on the vertical axis by default, inline makes them flow horizontally */
    inline: {
      type: Boolean,
      default: false
    },
    /** Set spacing between elements */
    spacing: {
      type: String,
      default: "m",
      validator: value => {
        return value.match(/(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)/);
      }
    },
    /** Div, p, ul, ol, li, span */
    tag: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|p|ul|ol|li|span)/);
      }
    },
    /** Elements should wrap if they extend size of container */
    nowrap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      let classes = "spacer";
      classes += ` spacer--spacing-${this.spacing}`;
      classes += ` spacer--align-${this.align}`;
      classes += ` spacer--distribute-${this.distribute}`;
      if (this.inline) classes += " spacer--inline";
      if (this.nowrap) classes += " spacer--no-wrap";
      else classes += " spacer--stack";
      return classes;
    }
  }
};
</script>
<style lang="scss" scoped>
$sizes: ("xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl");
@each $size in $sizes {
  .spacer--spacing-#{$size} {
    --spacer-container-space: var(--space-#{$size});
    margin-top: calc(-1 * var(--space-#{$size}));
    margin-left: calc(-1 * var(--space-#{$size}));

    & > * {
      // apply on children to prevent overriding of first element when nesting mks-spacer components
      --spacer-space: var(--space-#{$size});
    }
  }
}

.spacer {
  .push-left {
    margin-right: auto;
  }
  .push-right {
    margin-left: auto;
  }
  .push-top {
    margin-bottom: auto;
  }
  .push-bottom {
    margin-top: auto;
  }
}

.spacer > .spacer {
  margin-top: calc(var(--spacer-space) - var(--spacer-container-space));
  margin-left: calc(var(--spacer-space) - var(--spacer-container-space));
}

.spacer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: calc(-1 * var(--spacer-container-space));
  margin-left: calc(-1 * var(--spacer-container-space));

  & > * {
    margin-top: var(--spacer-space);
    margin-left: var(--spacer-space);
    flex: 0 0 auto;
    min-width: 0;
    max-width: 100%;
  }

  &--inline {
    flex-direction: row;
    align-items: center;
  }

  &--no-wrap {
    flex-wrap: nowrap;
  }

  // ALIGN
  &--align-start {
    align-items: flex-start;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-center {
    align-items: center;
  }

  &--align-stretch {
    align-items: stretch;
  }

  &--align-baseline {
    align-items: baseline;
  }

  // DISTRIBUTE
  &--distribute-start {
    justify-content: flex-start;
  }

  &--distribute-end {
    justify-content: flex-end;
  }

  &--distribute-center {
    justify-content: center;
  }

  &--distribute-equal {
    justify-content: space-between;
  }

  &--distribute-spaced {
    justify-content: space-around;
  }
}
</style>
<docs>
The component <code>mks-spacer</code> allows you to stack or inline elements by handling the spacing between them.

It is essentially a wrapper for flexbox and works on both axis, vertically and horizontally.

The spacer component is only made for simple flows of item and not complex layout structures, for those have a look at <mks-link to="mksgridsystem">the grid system</mks-link>

```jsx
<mks-spacer>
  <mks-tag>Hello</mks-tag>
  <mks-tag>World</mks-tag>
  <mks-tag>We</mks-tag>
  <mks-tag>Are</mks-tag>
  <mks-tag>Spaced</mks-tag>
</mks-spacer>
```

## Inline axis
Add `inline` prop to display items horizontally

```jsx
<mks-spacer>
  <mks-tag>Hello</mks-tag>
  <mks-tag>World</mks-tag>
  <mks-spacer inline spacing="xxxl">
    <mks-tag>We</mks-tag>
    <mks-tag>are</mks-tag>
    <mks-tag>inlined</mks-tag>
  </mks-spacer>
</mks-spacer>
```

## Spacing scale

```jsx
<mks-spacer inline spacing="xxxs">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing xxxs - 2px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="xxs">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing xxs - 5px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="xs">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing xs - 10px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="s">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing s - 15px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="m">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing m (base) - 20px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="l">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing l - 30px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="xl">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing xl - 40px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="xxl">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing xxl - 60px</mks-text>
</mks-spacer>
<mks-spacer inline spacing="xxxl">
  <mks-tag>lorem ipsum</mks-tag>
  <mks-tag>lorem ipsum</mks-tag>
  <mks-text>spacing xxxl - 80px</mks-text>
</mks-spacer>
```

## Distribution 
Distribute items on the main axis

```jsx
<mks-spacer inline distribute="start">
  <mks-tag>start</mks-tag>
  <mks-tag>start</mks-tag>
  <mks-tag>start</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="center">
  <mks-tag>center</mks-tag>
  <mks-tag>center</mks-tag>
  <mks-tag>center</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="end">
  <mks-tag>end</mks-tag>
  <mks-tag>end</mks-tag>
  <mks-tag>end</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="equal">
  <mks-tag>equal</mks-tag>
  <mks-tag>equal</mks-tag>
  <mks-tag>equal</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="spaced">
  <mks-tag>spaced</mks-tag>
  <mks-tag>spaced</mks-tag>
  <mks-tag>spaced</mks-tag>
</mks-spacer>
```

## Alignment 
Align items on the secondary axis

TODO: improve doc with select box and reactive prop

### Alignment of inline items

```jsx
<mks-spacer inline align="start">
  <mks-tag>start</mks-tag>
  <mks-tag>start</mks-tag>
  <mks-button>Start aligned</mks-button>
</mks-spacer>
<mks-spacer inline align="center">
  <mks-tag>center</mks-tag>
  <mks-tag>center</mks-tag>
  <mks-button>Center aligned</mks-button>
</mks-spacer>
<mks-spacer inline align="end">
  <mks-tag>end</mks-tag>
  <mks-tag>end</mks-tag>
  <mks-button>End aligned</mks-button>
</mks-spacer>
<mks-spacer inline align="stretch">
  <mks-tag>stretch</mks-tag>
  <mks-tag>stretch</mks-tag>
  <mks-button>Stretch aligned</mks-button>
</mks-spacer>
<mks-spacer inline align="baseline">
  <mks-tag>baseline</mks-tag>
  <mks-tag>baseline</mks-tag>
  <mks-button>Baseline aligned</mks-button>
</mks-spacer>
```

### Alignment of stacked items

```jsx
<mks-spacer align="start">
  <mks-tag>start</mks-tag>
  <mks-tag>start</mks-tag>
  <mks-button>Big button</mks-button>
</mks-spacer>
<mks-spacer align="center">
  <mks-tag>center</mks-tag>
  <mks-tag>center</mks-tag>
  <mks-button>Big button</mks-button>
</mks-spacer>
<mks-spacer align="end">
  <mks-tag>end</mks-tag>
  <mks-tag>end</mks-tag>
  <mks-button>Big button</mks-button>
</mks-spacer>
<mks-spacer align="stretch">
  <mks-tag>stretch</mks-tag>
  <mks-tag>stretch</mks-tag>
  <mks-button>Big button</mks-button>
</mks-spacer>
<mks-spacer align="baseline">
  <mks-tag>baseline</mks-tag>
  <mks-tag>baseline</mks-tag>
  <mks-button>Big button</mks-button>
</mks-spacer>
```

## Split the layout

You can split the layout and push one or multiple items to the side of the container by using the helper classes `push-left`, `push-right`, `push-top` and `push-bottom`

```jsx
<mks-spacer inline align="center">
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-button class="push-right" size="small">Call to action</mks-button>
  <mks-text size="small">Text</mks-text>
</mks-spacer>
````

## Prevent wrapping

You can split the layout and push one or multiple items to the side of the container by using the helper classes `push-left`, `push-right`, `push-top` and `push-bottom`

```jsx
<mks-spacer inline nowrap>
  <mks-tag>Citizens</mks-tag>
  <mks-tag>Entrepreneurs</mks-tag>
  <mks-tag>Citizens</mks-tag>
  <mks-tag>Entrepreneurs</mks-tag>
  <mks-tag>Organizations</mks-tag>
  <mks-tag>Citizens</mks-tag>
  <mks-tag>Entrepreneurs</mks-tag>
  <mks-tag>Organizations</mks-tag>
  <mks-tag>Citizens</mks-tag>
  <mks-tag>Entrepreneurs</mks-tag>
  <mks-tag>Organizations</mks-tag>
</mks-spacer>
````

</docs>
