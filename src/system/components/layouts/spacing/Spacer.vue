<template>
  <component :class="classes" :style="cssVars" :is="tag">
    <!-- @slot children elements to space -->
    <slot></slot>
  </component>
</template>
<script>
/** Spacer
 * @version 0.0.0
 */
export default {
  name: "MksSpacer",
  props: {
    /** Div, p, ul, ol, li, span */
    tag: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|p|ul|ol|li|span)/);
      }
    },
    /** Elements flow on the vertical axis by default, inline makes them flow horizontally */
    inline: {
      type: Boolean,
      default: false
    },
    /** Apply same spacing to nested elements */
    deep: {
      type: Boolean,
      default: false
    },
    /** Set alignment on main axis */
    align: {
      type: String,
      default: "center"
    },
    /** Set alignment on secondary axis */
    distribute: {
      type: String,
      default: "start"
    },
    /** Set alignment on main axis */
    spacing: {
      type: String,
      default: "m",
      validator: value => {
        return value.match(/(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)/);
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
    cssVars() {
      return { "--spacer-space": `var(--space-${this.spacing}` };
    },
    classes() {
      let classes = "spacer";
      if (this.inline) classes += " spacer--inline";
      else classes += " spacer--stack";
      return classes;
      // if inline
      // if stak
    }
  }
};
</script>
<style lang="scss" scoped>
.spacer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  & > * + * {
    margin-top: var(--spacer-space);
  }

  &--inline {
    flex-direction: row;

    & > * + * {
      margin-top: 0;
      margin-left: var(--spacer-space);
    }
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

```jsx
<mks-spacer>
  <mks-tag>Hello</mks-tag>
  <mks-tag>World</mks-tag>
  <mks-spacer inline>
    <mks-tag>We</mks-tag>
    <mks-tag>are</mks-tag>
    <mks-tag>not stacked</mks-tag>
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


</docs>
