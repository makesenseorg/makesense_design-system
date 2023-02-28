<template>
  <div id="app">
    <ds-page ref="page">
      <template v-slot:brand>
        <router-link to="/">
          <mks-logotype />
        </router-link>
      </template>
      <template v-slot:sidebar>
        <navigation @navigate="$refs.page.closeDrawer()" />
      </template>
      <template v-slot:drawer>
        <navigation @navigate="$refs.page.closeDrawer()" />
      </template>
      <router-view />
    </ds-page>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import DsPage from "./components/layout/Page/Page";
// import MksField from "@@/components/Field";

export default {
  name: "App",
  components: {
    Navigation,
    DsPage,
    // MksField,
  },
};
</script>
