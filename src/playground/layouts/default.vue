<template>
  <div></div>
</template>
<script>

export default {
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
