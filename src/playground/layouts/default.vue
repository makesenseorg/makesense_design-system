<template>
  <mks-page
    :menu-links="[
      { label: 'Accueil', to: '/layouts/mkslayoutpage' },
      { label: 'Header', to: '/molecules/mkssiteheader' },
      { label: 'Menu', to: '/molecules/mksbeanmenu' },
      { label: 'Sidebar', to: { path: '/molecules/mkssidebar' } },
      { label: 'Footer', to: { path: '/molecules/mkssitefooter' } }
    ]"
    logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg"
    :sidebarOpen="sidebarOpen"
    @sidebarOpen="toggleSidebar"
    @sidebarClose="toggleSidebar"
  >
    <template v-slot:sidebar>Sidebar content</template>
    <template v-slot:top-bar>Top bar</template>
    <template v-slot:header-left>Left side</template>
    <mks-lang-picker
      slot="header-right"
      :langs="['fr', 'en', 'es']"
      active="fr"
    ></mks-lang-picker>
    <mks-button @click="toggleSidebar">toggle sidebar</mks-button>
    <Nuxt></Nuxt>
    <template v-slot:footer>Made by makesense !</template>
  </mks-page>
</template>
<script>
export default {
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      console.log("toggle");
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
};
</script>
