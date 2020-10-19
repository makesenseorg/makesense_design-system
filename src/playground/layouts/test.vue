<template>
  <mks-page
    :menu-links="[
      { label: 'Accueil', to: '/' },
      { label: 'Test layout', to: '/test' },
      { label: 'Library', to: '//makesense-design-system.netlify.app' }
    ]"
    logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg"
    :translucent="true"
    :fixed="true"
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
// TODO : problème: ne charge pas le css du composant
import MksPage from "@makesenseorg/design-system/dist/components/Page/MksPage.umd.min.js";
import MksPageCss from "@makesenseorg/design-system/dist/components/Page/MksPage.css";
import MksLangPicker from "@makesenseorg/design-system/dist/components/LangPicker/MksLangPicker.umd.min.js";
import MksLangPickerCSS from "@makesenseorg/design-system/dist/components/LangPicker/MksLangPicker.css";

export default {
  components: { MksPage, MksLangPicker },
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
