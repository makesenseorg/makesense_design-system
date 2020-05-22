<template>
  <div id="app">
    <ds-page ref="page">
      <template slot="brand">
        <router-link to="/">
          <mks-logotype />
        </router-link>
      </template>
      <navigation slot="sidebar" @navigate="$refs.page.closeDrawer()" />
      <navigation slot="drawer" @navigate="$refs.page.closeDrawer()" />
      <router-view />
    </ds-page>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import DsPage from "./components/layout/Page/Page";

export default {
  name: "App",
  components: {
    Navigation,
    DsPage
  }
};
</script>

<style lang="scss"></style>
