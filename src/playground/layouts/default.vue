<template>
  <mks-page
    :menu-links="[
      { label: 'Accueil', to: '/' },
      { label: 'Library', to: '//makesense-design-system.netlify.app' },
      { label: 'Menu', to: '/molecules/mksbeanmenu' },
      { label: 'Sidebar', to: { path: '/molecules/mkssidebar' } },
      { label: 'Footer', to: { path: '/molecules/mkssitefooter' } }
    ]"
    logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg"
    :sidebarOpen="sidebarOpen"
    @openSidebar="toggleSidebar"
    @closeSidebar="toggleSidebar"
  >
    <template v-slot:sidebar-header>Sidebar header</template>
    <template v-slot:sidebar>Sidebar content</template>
    <a slot="top-bar" class="ad" href="#">Some important content</a>
    <template v-slot:header-left>Left side</template>
    <mks-lang-picker
      slot="header-right"
      :langs="['fr', 'en', 'es']"
      active="fr"
    ></mks-lang-picker>
    <Nuxt></Nuxt>
    <template v-slot:footer>Made by makesense !</template>
  </mks-page>
</template>
<script>
import Page from "../../../src/system/components/layouts/page/Page";

export default {
  components: { MksPage },
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
};
</script>
<style lang="scss" scoped>
.ad {
  background: $color-tertiary;
  color: $color-tertiary-inverse;
  display: block;
  text-align: center;
  padding: $space-s;
}
</style>
