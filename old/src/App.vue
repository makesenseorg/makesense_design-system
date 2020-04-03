<template>
  <div id="app">
    <router-view class="view" />
  </div>
</template>

<script>
export default {
  name: "app",
}
</script>

<style lang="scss">
$color-text: $color-brick-red;
$color-main: $color-calypso;
$color-secondary: $color-parsley;
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
</style>
