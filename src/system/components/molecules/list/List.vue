<template>
  <component
    :is="type === 'ordered' ? 'ol' : 'ul'"
    :class="classes"
    :style="style"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "MksList",
  props: {
    /**
     * To change the marker : bean (default) or none, to change the tag : ordered (unordered by default)
     */
    type: {
      type: String,
      default: "bean",
      validator: value => {
        return value.match(/(bean|ordered|none)/);
      }
    },
    /**
     * Theme of the bean (primary, secondary, tertiary, neutral)
     */
    theme: {
      type: String,
      default: "primary"
    },
    /**
     * Spacing between elements (xxxs, xxs, xs (default), s, m, l, xl, xxl, xxxl)
     */
    spacing: {
      type: String,
      default: "xs"
    }
  },
  computed: {
    style() {
      return `--spacing: var(--space-${this.spacing})`;
    },
    classes() {
      let classes = "list";
      if (this.type === "bean") {
        classes += ` list--bean-${this.theme}`;
      }
      if (this.type === "none") {
        classes += ` list--none`;
      }
      return classes;
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  & > * + * {
    margin-top: var(--spacing);
  }
}
.list--none {
  list-style-type: none;
}
$themes: (
  "neutral": $color-neutral-70,
  "primary": $color-primary,
  "secondary": $color-secondary,
  "tertiary": $color-tertiary
);

@each $name, $variable in $themes {
  .list--bean-#{$name} {
    & > * {
      list-style-type: none;
      align-items: center;
      &:before {
        @include bean($color: $variable, $margin-right: $space-xxs);
      }
    }
  }
}
</style>
<docs>

### Default list
Has an `ul` tag and bean as marker

```jsx
<mks-list>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
</mks-list>
```

### Without marker

```jsx
<mks-list type="none">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
</mks-list>
```

### With custom spacing

```jsx
<mks-list spacing="xl">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
</mks-list>
```
</docs>
