<template>
  <div :class="['loading', 'loading--' + type, { 'loading--inline': inline }]">
    <img
      class="loading__svg"
      src="@@/assets/img/ui/loading.svg"
      :width="size"
    />
    <div class="loading__progress" v-if="progress !== -1">
      {{ getProgress() }}%
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    type: {
      type: String,
      default: "full",
      validator: function(value) {
        return (
          ["full", "component", "standalone", "simple"].indexOf(value) !== -1
        );
      }
    },
    progress: {
      type: Number,
      default: -1
    },
    size: {
      type: Number,
      default: 50
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getProgress: function() {
      return Math.floor(this.progress);
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: relative;

  &--full {
    height: 100vh;
    width: 100%;
    background: $color-white;
  }

  &--component {
    height: 60vh;
  }

  &--standalone {
    height: auto;
  }

  &--inline {
    display: inline-block;
  }

  &:not(.loading--simple) {
    @include flex;
    align-items: center;
    justify-content: center;
  }
}

.loading__progress {
  position: absolute;
  @include text-small;
}
</style>
