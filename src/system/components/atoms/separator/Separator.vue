<template>
  <div class="separator__wrapper">
    <svg
      class="separator"
      xmlns="http://www.w3.org/2000/svg"
      width="3258"
      height="10"
      viewBox="0 0 3258 10"
    >
      <path
        :style="`fill:${color}`"
        d="M0 10L162.9 0l162.9 10zm651.6 0L488.7 0 325.8 10zm325.8 0L814.5 0 651.6 10zm325.8 0L1140.3 0 977.4 10zm325.8 0L1466.1 0l-162.9 10zm325.8 0L1791.9 0 1629 10zm325.8 0L2117.7 0l-162.9 10zm325.8 0L2443.5 0l-162.9 10zm325.8 0L2769.3 0l-162.9 10zm325.8 0L3095.1 0l-162.9 10z"
      ></path>
    </svg>
  </div>
</template>

<script>
/**
 * Displays a wavy separator. Use to pimp up a section with a colored background or image!
 * @version 1.0.0
 */
export default {
  name: "MksSeparator",
  props: {
    color: {
      type: String,
      default: "var(--color-neutral-100)"
    }
  }
};
</script>

<style lang="scss" scoped>
.separator__wrapper {
  overflow: hidden;
  max-width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: $space-m;
}
.separator {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: auto;

  path {
    fill: $color-neutral-100;
  }
}
</style>
<docs>
The component needs to be used within a parent with `relative` positioning.

```jsx
<div style="position:relative; background:var(--color-primary); height:100px; width:100%;margin:0;">
  <mks-separator color="var(--color-secondary)" />
</div>
<div style="position:relative; background:var(--color-secondary); height:100px; width:100%;">
  <mks-separator/>
</div>
````
</docs>
