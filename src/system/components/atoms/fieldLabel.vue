<template>
  <label
    class="FieldLabel"
    :class="cssClass"
    :for="targetName"
    @click="onClickLabel()"
  >
    <slot />
    <Icon :type="icon" v-if="icon" class="FieldLabelIcon" />
  </label>
</template>

<script>
import Icon from "@@/components/atoms/icon";

export default {
  name: "FieldLabel",
  components: { Icon },
  props: {
    targetName: {
      type: String,
      required: false
    },
    cssClass: {
      type: [String, Array, Object],
      required: false
    },
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
.FieldLabel {
  @include text-small;
  position: relative;
  display: block;
  margin-bottom: 0.4em;
  font-weight: $font-weight-extrabold;

  &.-light-onBlack {
    color: $color-neutral-100;
  }

  .FieldLabelIcon {
    position: absolute;
    right: 0px;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  &:hover {
    .FieldLabelIcon {
      opacity: 1;
    }
  }
}
</style>
