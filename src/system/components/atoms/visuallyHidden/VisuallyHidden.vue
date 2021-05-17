<template>
  <div class="visually-hidden">
    <!-- @slot hides anything present in the slot from regular devices, and shows it to assistive technologies -->
    <slot></slot>
  </div>
</template>

<script>
/** Visually Hidden is used when an element needs to be available to assistive technology, but otherwise hidden.
The visually hidden component hides text visually from screen, but keeps it available to assistive technologies, such as screen readers. The component shouldn’t be used to hide interactive content. */
export default {
  name: "MksVisuallyHidden",
  release: "1.1.3"
};
</script>

<style lang="scss" scoped>
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>

<docs>
## Provide more context

Inspect element to see additionnal text that will be read by screen savers.

```jsx
<mks-link to="/atoms/mkslink">
  Read more
  <mks-visually-hidden>about penguins in antartica</mks-visually-hidden>
</mks-link>
```

## The opposite of aria-hidden

<code>aria-hidden</code> indicates that an element should be ignored by assistive technologies. 
We can use it in combination with <code>mks-visually-hidden</code> to replace with more suited content.

```jsx
<mks-icon type="search" aria-hidden></mks-icon>
<mks-visually-hidden>Search</mks-visually-hidden>
```
</docs>
