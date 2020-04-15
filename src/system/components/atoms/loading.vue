<template>
  <div :class="['loading', 'loading--' + type, { 'loading--inline': inline }]">
    <svg-loading class="loading__svg" :width="size" />
    <div class="loading__progress" v-if="progress !== -1">
      {{ getProgress() }}%
    </div>
  </div>
</template>

<script>
import svgLoading from "@@/assets/img/ui/loading.svg";
/**
 * Displays a loading indicator
 * @version 1.0.0
 */
export default {
  name: "MksLoading",
  components: {
    svgLoading
  },
  props: {
    /**
     * height of the zone covered by the loading indicator. Full by default
     *  "full": whole page, "component": 60vh, "standalone": auto, "simple": just the size of loading as a block element
     */
    type: {
      type: String,
      default: "full",
      validator: function(value) {
        return (
          ["full", "component", "standalone", "simple"].indexOf(value) !== -1
        );
      }
    },
    /**
     * Progress of the loading
     */
    progress: {
      type: Number,
      default: -1
    },
    /**
     * Size of the loading indicator in px
     */
    size: {
      type: Number,
      default: 50
    },
    /**
     * Is it inline ?
     */
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
    background: $color-neutral-100;
  }

  &--component {
    height: 60vh;
  }

  &--standalone {
    height: auto;
  }

  &:not(.loading--simple) {
    @include flex;
    align-items: center;
    justify-content: center;
  }

  &--inline {
    display: inline-block;
    vertical-align: middle;
  }
}

.loading__progress {
  position: absolute;
  @include text-small;
}
</style>
<docs>
## Default loading - (full)

```jsx
<mks-loading/>
```

## Component loading

```jsx
<mks-loading type="component" />
```

## Standalone loading

```jsx
<mks-loading type="standalone" />
```

## Inline loading

```jsx
<p>Sending... <mks-loading v-bind:inline="true" type="simple" v-bind:size="30"/></p>
```
</docs>
