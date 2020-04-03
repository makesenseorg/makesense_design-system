<template>
  <div class="tag" :class="`tag--${color} tag--${size} tag--${isCliquable}`" v-on:click="onClick">
    {{ getLabel() }}
    <Icon v-if="icon" class="tag__icon" :type="icon" :color="color"></Icon>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Icon from "@/atoms/icon"

export default {
  name: "Tag",
  components: { Icon },
  props: {
    color: {
      type: String,
      require: false,
      default: "default",
      validator: function(value) {
        return ["default", "main"].indexOf(value) !== -1
      },
    },
    size: {
      type: String,
      require: false,
      default: "medium",
      validator: function(value) {
        return ["medium", "small", "large"].indexOf(value) !== -1
      },
    },
    label: {
      type: String,
      require: true,
    },
    trunc: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      require: false,
      validator: function(value) {
        return ["close", "check"].indexOf(value) !== -1
      },
    },
    cliquable: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  computed: {
    isCliquable() {
      return this.cliquable ? "cliquable" : "not-cliquable"
    },
  },
  methods: {
    ...mapActions({}),

    onClick: function() {
      this.$emit("click")
    },

    getLabel: function() {
      if (!this.label) return "-No label-"
      if (!this.trunc) return this.label

      if (this.label.length > 30) return this.label.substring(0, 30) + "..."
      else return this.label
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  @include border-round;
  @include text-small;
  display: inline-flex;
  align-items: center;
  font-weight: $font-weight-extrabold;
  padding: 0.625em;
  background: $color-gray;
  color: $color-text;

  &--main {
    background: $color-secondary;
    color: $color-white;
  }

  &--small {
    @include text-xsmall;
  }

  &--cliquable {
    cursor: pointer;
  }

  &:hover {
    background: $color-secondary;
    color: $color-white;
  }
}

.tag__icon {
  margin-left: $space_xxs;
  color: inherit;
}
</style>
