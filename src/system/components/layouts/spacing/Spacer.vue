<template>
  <component :class="classes" :is="tag">
    <!-- @slot children elements to space -->
    <slot></slot>
  </component>
</template>
<script>
/** Wrapper component for your app. Easily create a layout that spans the whole height of the page with a sticky header and footer.
 * @version 1.3.0
 */
export default {
  name: "MksSpacer",
  props: {
    tag: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|p|ul|ol|li|span)/);
      }
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
  &--stack {
    flex-direction: column;

    & > * + * {
      margin-top: $space-m;
    }
  }

  &--inline {
    flex-direction: row;

    & > * + * {
      margin-left: $space-m;
    }
  }
}
</style>
<docs>
The component <code>mks-spacer</code> allows you to stack or inline elements by handling the spacing between them.

It is essentially a wrapper for flexbox and works on both axis, vertically and horizontally.

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

</docs>
