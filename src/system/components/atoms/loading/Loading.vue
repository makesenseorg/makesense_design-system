<template>
  <div :class="['loading', 'loading--' + type, { 'loading--inline': inline }]">
    <svg
      class="loading__svg"
      :width="size"
      :height="size"
      viewBox="-3 -3 44 44"
      xmlns="http://www.w3.org/2000/svg"
      :stroke="color"
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" :stroke-width="size < 25 ? 5 : 3">
          <circle stroke-opacity="0.5" cx="18" cy="18" r="18" :stroke="color" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
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
    svgLoading,
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
      },
    },
    /**
     * Progress of the loading
     */
    progress: {
      type: Number,
      default: -1,
    },
    /**
     * Size of the loading indicator in px
     */
    size: {
      type: Number,
      default: 50,
    },
    /**
     * Is it inline ?
     */
    inline: {
      type: Boolean,
      default: false,
    },
    /**
     * Color
     */
    color: {
      type: String,
      default: "#3c4858",
    },
  },
  methods: {
    getProgress: function() {
      return Math.floor(this.progress);
    },
  },
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
<mks-loading type="component" color="#ff0000" />
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
