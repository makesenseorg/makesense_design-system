<template>
  <mks-page
    :menu-links="[
      { label: 'Accueil', to: '/' },
      { label: 'Test layout', to: '/test' },
      { label: 'Library', to: '//makesense-design-system.netlify.app' }
    ]"
    logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg"
    :sidebarOpen="sidebarOpen"
    @openSidebar="toggleSidebar"
    @closeSidebar="toggleSidebar"
  >
    <template v-slot:sidebar-header>Sidebar header</template>
    <template v-slot:sidebar>Sidebar content</template>
    <a slot="top-bar" class="ad" href="#"><mks-icon type="clock"/>Some important content !!!</a>
    <template v-slot:header-left>Left side</template>
    <mks-lang-picker
      slot="header-right"
      :langs="locales"
      :active="locale"
      @select="$MKSsetLocale($event)"
    ></mks-lang-picker>
    <Nuxt></Nuxt>
    <template v-slot:footer>
      <mks-field name="field" type="editor" value="bonjour à tous"/>
    </template>
  </mks-page>
</template>
<script>
// TODO : problème: ne charge pas le css du composant
import {
  MksPage,
  MksLangPicker,
  MksField
} from "@makesenseorg/design-system/dist/components";

export default {
  components: { MksPage, MksLangPicker, MksField },
  data() {
    return {
      sidebarOpen: false
    };
  },
  computed: {
    locale() {
      return this.$MKScurrentLocale;
    },
    locales() {
      return this.$MKSlocales;
    }
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
