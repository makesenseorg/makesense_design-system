<template>
  <span class="logotype">
    <svg-logo class="logotype__image" title="Logo makesense" />
  </span>
</template>

<script>
import svgLogo from "@@/assets/img/brand/makesense_logo.svg";
/**
 * Logotype of makesense
 * @version 1.0.0
 */
export default {
  name: "MksLogotype",
  components: {
    svgLogo
  }
};
</script>

<style lang="scss" scoped>
.logotype {
  @include flex;
  align-items: center;
  font-size: 1em;
  font-weight: $font-weight-black;
}
.logotype__image {
  max-width: 100%;
  max-height: 2.5em;
  margin-right: 0.3em;
}
</style>
