<template>
  <span class="logotype">
    <img
      src="@@/assets/img/brand/makesense-logo.png"
      class="logotype__image"
      alt="Logo makesense"
    />
  </span>
</template>

<script>
/**
 * Logotype of makesense
 * @version 1.0.0
 */
export default {
  name: "MksLogotype"
};
</script>

<style lang="scss" scoped>
.logotype {
  @include flex;
  align-items: center;
  font-size: 1em;
  font-weight: $font-weight-black;
}
.logotype__image {
  max-width: 100%;
  height: 2.5em;
  margin-right: 0.3em;
}
</style>

<docs>
```jsx
  <mks-logotype></mks-logotype>
```
</docs>
