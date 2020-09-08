<template>
  <header class="site-header">
    <div v-if="$slots['top-bar']" class="site-header__top-bar">
      <slot name="top-bar"></slot>
    </div>
    <div class="site-header__bar">
      <div class="site-header__left">
        <slot name="left"></slot>
      </div>
      <router-link to="/" class="site-header__main-content">
        <div class="site-header__logo">
          <img :src="logo" alt="Logo" />
        </div>
      </router-link>

      <div class="site-header__right">
        <slot name="right"></slot>
      </div>
    </div>

    <mks-bean-menu class="site-header__menu" :links="menuLinks"></mks-bean-menu>

    <div class="site-header__sidebar-control">Sidebar control</div>
  </header>
</template>
<script>
export default {
  name: "MksSiteHeader",
  props: {
    /* header background color */
    theme: {
      type: String
    },
    /* site logo */
    logo: {
      type: String,
      default: require("@@/assets/img/brand/makesense-logo.png")
    },
    user: {
      type: String
    },
    menuLinks: {
      type: Array
    }
  },
  methods: {
    logout: function() {
      // this.$api.Auth.logout();
      // this.$router.push("home");
    },
    openMenu: function() {
      // this.$store.commit("nav/showSidebar");
    }
  }
};
</script>
<style lang="scss" scoped>
.site-header {
  &__bar {
    position: relative;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;
    box-shadow: $box-shadow-base;
    border-bottom: $border-width-m solid $border-color-base;
    padding: $space-s $space-base $space-s $space-base;
    z-index: $z-index-page-header;
  }

  &__logo {
    max-width: 180px;
  }

  &__main-content {
    display: flex;
    justify-content: center;
    flex: 1;
    -ms-flex: 1 1 auto;
  }

  &__extra,
  &__nav {
    display: none;
  }
}
</style>

<docs>
```jsx

<mks-site-header :menu-links="[{label: 'Agenda', to: 'https://google.com'}, {tag: 'router-link', label: 'Jouer', to: { path: '/jouer' }}]">
  <template v-slot:left>left</template> 
  <template v-slot:right>
  <mks-lang-picker :langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
</template>
</mks-site-header>

```
</docs>
