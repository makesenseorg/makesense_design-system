<template>
  <hr class="separator" />
</template>

<script>
/**
 * Displays a separator with margins
 * @version 1.0.0
 */
export default {
  name: "MksSeparator"
};
</script>

<style lang="scss" scoped>
.separator {
  border: none;
  margin-bottom: $space-m;
  margin-top: $space-m;
  border-bottom: $border;

  &--top-small {
    margin-top: $space_xs;
  }
}
</style>
<docs>
```jsx
<mks-separator />
````
</docs>
