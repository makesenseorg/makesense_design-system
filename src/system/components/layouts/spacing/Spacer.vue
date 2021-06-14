<template>
  <component :class="classes" :is="tag">
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
        return value.match(/(start|end|center|equal|baseline)/);
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
    wrap: {
      type: Boolean,
      default: true
    }
    /** Index of element that needs to be pushed to the other side of the container */
    // TODO: maybe un sous-composant à la place ?
    // splitAfter: {
    //   type: Number,
    //   default: 0
    // }
  },
  computed: {
    classes() {
      let classes = "spacer";
      classes += ` spacer--spacing-${this.spacing}`;
      classes += ` spacer--align-${this.align}`;
      classes += ` spacer--distribute-${this.distribute}`;
      if (this.inline) classes += " spacer--inline";
      else classes += " spacer--stack";
      return classes;
    }
  }
};
</script>
<style lang="scss" scoped>
$sizes: ("xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl");
@each $size in $sizes {
  // apply on children to prevent overriding of first element when nesting mks-spacer components
  .spacer--spacing-#{$size} > * {
    --spacer-space: var(--space-#{$size});
  }
}

.spacer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  & > * + * {
    margin-top: var(--spacer-space);
    flex: 0 0 auto;
    min-width: 0;
    max-width: 100%;
  }

  &--inline {
    flex-direction: row;
    align-items: center;

    & > * + * {
      margin-top: 0;
      margin-left: var(--spacer-space);
    }
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
    align-items: baseline;
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
    // justify-content: space-around;
    // justify-content: space-evenly;
    justify-content: space-between;
  }

  &--distribute-baseline {
    justify-content: baseline;
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
  <mks-spacer inline spacing="xxxs">
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

## Alignment 
Align items on the secondary axis

```jsx
<mks-spacer inline align="start">
  <mks-tag>IM BIG<br/>align</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>start</mks-tag>
</mks-spacer>
<mks-spacer inline align="center">
  <mks-tag>IM BIG<br/>align</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>center</mks-tag>
</mks-spacer>
<mks-spacer inline align="end">
  <mks-tag>IM BIG<br/>align</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>end</mks-tag>
</mks-spacer>
<mks-spacer inline align="stretch">
  <mks-tag>IM BIG<br/>align</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>stretch</mks-tag>
</mks-spacer>
<mks-spacer inline align="baseline">
  <mks-tag>IM BIG<br/>align</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>baseline</mks-tag>
</mks-spacer>
```

## Distribution 
Distribute items on the main axis

```jsx
<mks-spacer inline distribute="start">
  <mks-tag>distribute</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>start</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="center">
  <mks-tag>distribute</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>center</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="end">
  <mks-tag>distribute</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>end</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="equal">
  <mks-tag>distribute</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>stretch</mks-tag>
</mks-spacer>
<mks-spacer inline distribute="baseline">
  <mks-tag>distribute</mks-tag>
  <mks-tag>items</mks-tag>
  <mks-tag>baseline</mks-tag>
</mks-spacer>
```

</docs>
