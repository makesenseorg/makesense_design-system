<template>
  <div
    class="tab-button"
    :class="{ 'tab-button--active': active }"
    role="button"
    tabindex="0"
    :aria-expanded="active"
    :aria-controls="id"
    @click="onClick"
  >
    {{ title }}
  </div>
</template>

<script>
/**
 * Displays a tab button, emits a click event when clicked.
 * @version 1.0.0
 */
export default {
  name: "MksTabButton",
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      default: "TabButtonTitle"
    },
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    onClick: function() {
      this.$emit("click", this.id);
    }
  }
};
</script>

<style lang="scss">
.tab-button {
  @include no-break;
  @include cursor-pointer;
  @include padding-button-invert;
  border-width: $border-width-l;
  font-weight: $font-weight-extrabold;

  &--active {
    @include border-bottom-shadow($color-primary);
    border-width: $border-width-l;
    color: $color-primary;
  }

  &:hover {
    color: $color-primary;
  }
}
</style>
<docs>
## States

```jsx
<mks-tab-button id="active" title="Active" v-bind:active="true"></mks-tab-button>
<mks-tab-button id="inactive" title="Inactive" v-bind:active="false"></mks-tab-button>
```
</docs>
