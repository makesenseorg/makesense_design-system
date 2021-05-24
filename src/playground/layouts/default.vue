<template>
  <mks-app>
    <template v-slot:top>
      <mks-site-header
        :menu-links="[{label: 'home', to: '/'}, {label: 'event', to: '/event'}]"
        @openSidebar="toggleSidebar"
      ></mks-site-header>
      <mks-sidebar :open="sidebarOpen" @closed="toggleSidebar">
          <mks-text tag="p">My content blablabla</mks-text>
          <mks-link to="/">Go home</mks-link>
          <mks-separator></mks-separator>
          <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
      </mks-sidebar>
    </template>
    <Nuxt></Nuxt>
    <mks-site-footer slot="bottom">Made by makesense</mks-site-footer>
  </mks-app>
</template>
<script>
import MksApp from '@makesenseorg/design-system/dist/components/App'
import MksLangPicker from '@makesenseorg/design-system/dist/components/LangPicker'
import MksSiteHeader from '@makesenseorg/design-system/dist/components/SiteHeader'
import MksSidebar from '@makesenseorg/design-system/dist/components/Sidebar'
import MksSiteFooter from '@makesenseorg/design-system/dist/components/SiteFooter'

export default {
  components: {MksApp, MksLangPicker, MksSiteHeader, MksSidebar, MksSiteFooter},
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
