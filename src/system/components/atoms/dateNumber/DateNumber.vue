<template>
  <div :class="`date date--color-${color}`" :aria-label="$MKSlocale['date']">
    <div class="date__number">
      <!-- @slot you can replace the number by another component-->
      <slot>
        {{ number }}
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * Shows a stylized date number with a small calendar background
 */
export default {
  name: "MksDateNumber",
  props: {
    number: {
      require: true,
      type: Number,
      default: 1
    },
    /**
     * Either 'primary', 'secondary', or 'tertiary'
     */
    color: {
      require: false,
      default: "primary",
      type: String,
      validator: value => {
        return value.match(/(primary|secondary|tertiary)/);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.date {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  padding-top: 9px;
  position: relative;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border: solid 1px $border-color-base;
  background-color: $color-neutral-100;
  line-height: 110%;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  color: $color-text;
  transform: rotate(-7deg);

  .date__number {
    height: 25px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -2px;
  }

  &:before {
    top: 0px;
    position: absolute;
    content: "";
    display: block;
    height: 10px;
    width: 100%;
  }
  &--color-primary:before {
    background-color: $color-primary;
  }
  &--color-secondary:before {
    background-color: $color-secondary;
  }
  &--color-tertiary:before {
    background-color: $color-tertiary;
  }
}
</style>
<docs>
```jsx
<mks-date-number>12</mks-date-number>
<mks-date-number color="secondary" :number="23"></mks-date-number>
<mks-date-number color="tertiary">31</mks-date-number>

```
</docs>
