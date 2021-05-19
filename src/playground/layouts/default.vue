<template>
  <mks-app>
    <mks-site-header 
      slot="top" 
      :menu-links="[{label: 'home', to: '/'}, {label: 'event', to: '/event'}]"
      @openSidebar="toggleSidebar"
    ></mks-site-header>
    <Nuxt></Nuxt>
    <mks-sidebar :open="sidebarOpen" @close="toggleSidebar">test</mks-sidebar>
    <mks-site-footer slot="bottom">Made by makesense</mks-site-footer>
  </mks-app>
</template>
<script>
import MksApp from '@makesenseorg/design-system/dist/components/App'
import MksSiteHeader from '@makesenseorg/design-system/dist/components/SiteHeader'
import MksSidebar from '@makesenseorg/design-system/dist/components/Sidebar'
import MksSiteFooter from '@makesenseorg/design-system/dist/components/SiteFooter'

export default {
  components: {MksApp, MksSiteHeader, MksSidebar, MksSiteFooter},
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
