<template>
  <div :class="`number number--color-${color}`">
    <div class="number__value">
      <slot name="value"></slot>
    </div>
    <div class="number__label">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<script>
/**
 * Displays a themed number and label
 * @version 1.0.0
 */
export default {
  name: "MksNumber",
  props: {
    /**
     * Primary, Secondary, Tertiary or Inverse (for inverted backgrounds)
     *
     */
    color: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.number__value {
  @include title-small;
}
.number__label {
  margin-bottom: $space_xxs;
  color: inherit;
}
.number {
  &--color-primary {
    .number__value {
      color: $color-primary;
    }
  }
  &--color-secondary {
    .number__value {
      color: $color-secondary;
    }
  }
  &--color-tertiary {
    .number__value {
      color: $color-tertiary;
    }
  }
  &--color-inverse {
    color: $color-neutral-100;
  }
}
</style>
<docs>
## Themed numbers

```jsx
<mks-number>
  <template v-slot:value>100 000</template>
  <template v-slot:label>Primary (default)</template>
</mks-number>
<mks-number color="secondary">
  <template v-slot:value>120</template>
  <template v-slot:label>Secondary</template>
</mks-number>
<mks-number color="tertiary">
  <template v-slot:value>2</template>
  <template v-slot:label>Tertiary</template>
</mks-number>

```

## Inverted background

```jsx
<div class="mks-number-inverted-bg">
  <mks-number color="inverse">
    <template v-slot:value>320</template>
    <template v-slot:label>Inverse</template>
  </mks-number>
</div>

```
</docs>
<style lang="scss">
.mks-number-inverted-bg {
  background: $color-neutral-20;
}
</style>
