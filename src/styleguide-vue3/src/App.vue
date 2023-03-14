<template>
  <div id="app">
    <mks-field v-if="true" type="datetime" v-model="test"></mks-field>
    <ds-page ref="page" v-else>
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
import MksField from "@@/components/Field";

export default {
  name: "App",
  components: {
    Navigation,
    DsPage,
    MksField,
  },
  data() {
    return {
      test: null,
    };
  },
};
</script>
