<template>
  <component
    :is="type === 'ordered' ? 'ol' : 'ul'"
    :class="`list list--theme-${theme}`"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "MksList",
  props: {
    type: {
      type: String,
      default: "bean",
      validator: value => {
        return value.match(/(bean|ordered|bullet)/);
      }
    },
    theme: {
      type: String,
      default: "primary"
    }
  }
};
</script>

<style lang="scss" scoped>
$themes: (
  "neutral": $color-neutral-70,
  "primary": $color-primary,
  "secondary": $color-secondary,
  "tertiary": $color-tertiary
);

@each $name, $variable in $themes {
  .list--theme-#{$name} {
    & > * {
      list-style-type: none;
      @include flex;
      align-items: center;
      &:before {
        @include bean($color: $variable, $margin-right: $space-xxs);
      }
    }
  }
}
</style>
<docs>

```jsx
<mks-list>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
</mks-list>
````
</docs>
