<template>
  <label
    class="field-label"
    :class="cssClass"
    :for="targetName"
    @click="onClickLabel()"
  >
    <!-- @slot Label of the field -->
    <slot />
    <mks-icon :type="icon" v-if="icon" class="field-label__icon" />
  </label>
</template>

<script>
/**
 * The field label is used in the Field component
 * @version 1.0.0
 */
export default {
  name: "MksFieldLabel",
  props: {
    /**
     * The name of the targeted field
     */
    targetName: {
      type: String,
      required: false
    },
    /**
     * The css class from the field component
     */
    cssClass: {
      type: [String, Array, Object],
      required: false
    },
    /**
     * The icon to use (any icon available in the icon component)
     */
    icon: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {},
  methods: {
    onClickLabel: function() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
label,
.field-label {
  @include text-small;
  position: relative;
  display: block;
  margin-bottom: 0.4em;
  font-weight: $font-weight-extrabold;

  &.-light-onBlack {
    color: $color-neutral-100;
  }

  .field-label__icon {
    position: absolute;
    right: 0px;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  &:hover {
    .field-label__icon {
      opacity: 1;
    }
  }
}
</style>
<docs>
```jsx 
  <mks-field-label>This is a field label</mks-field-label>
  <mks-field-label icon="x">This is a field label with icon</mks-field-label>
```
</docs>
