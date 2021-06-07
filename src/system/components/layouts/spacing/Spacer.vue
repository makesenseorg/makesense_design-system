<template>
  <component class="spacer" :is="tag">
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
    }
  }
};
</script>
<style lang="scss" scoped>
.spacer {
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

</docs>
