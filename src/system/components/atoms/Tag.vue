<template>
  <div
    class="tag"
    :class="`tag--${color} tag--${size} tag--${isCliquable}`"
    @click="onClick"
  >
    {{ getLabel() }}
    <Icon v-if="icon" class="tag__icon" :type="icon" :color="color"></Icon>
  </div>
</template>

<script>
import Icon from "@@/components/atoms/icon";

export default {
  name: "Tag",
  components: { Icon },
  props: {
    color: {
      type: String,
      required: false,
      default: "default",
      validator: function(value) {
        return ["default", "main"].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      required: false,
      default: "medium",
      validator: function(value) {
        return ["medium", "small", "large"].indexOf(value) !== -1;
      }
    },
    label: {
      type: String,
      required: true
    },
    trunc: {
      type: Boolean,
      default: true
    },
    icon: {
      type: [String, Boolean],
      required: false,
      default: false,
      validator: function(value) {
        return ["close", "check"].indexOf(value) !== -1;
      }
    },
    cliquable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isCliquable() {
      return this.cliquable ? "cliquable" : "not-cliquable";
    }
  },
  methods: {
    onClick: function() {
      this.$emit("click");
    },

    getLabel: function() {
      if (!this.label) return "-No label-";
      if (!this.trunc) return this.label;

      if (this.label.length > 30) return this.label.substring(0, 30) + "...";
      else return this.label;
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  @include border-round;
  @include text-small;
  display: inline-flex;
  align-items: center;
  font-weight: $font-weight-extrabold;
  padding: 0.625em;
  background: $color-neutral-80;
  color: $color-text;

  &--main {
    background: $color-secondary;
    color: $color-neutral-100;
  }

  &--small {
    @include text-xsmall;
  }

  &--cliquable {
    cursor: pointer;
  }

  &:hover {
    background: $color-secondary;
    color: $color-neutral-100;
  }
}

.tag__icon {
  margin-left: $space_xxs;
  color: inherit;
}
</style>
