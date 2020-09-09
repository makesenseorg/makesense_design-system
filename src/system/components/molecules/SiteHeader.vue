<template>
  <header
    :class="{
      'site-header': true,
      'site-header--translucent': translucent,
      'site-header--fixed': fixed
    }"
  >
    <div v-if="$slots['top-bar']" class="site-header__top-bar">
      <slot name="top-bar"></slot>
    </div>
    <div class="site-header__bar">
      <div class="site-header__extra site-header__extra--left">
        <slot name="left"></slot>
      </div>
      <router-link to="/" class="site-header__main-content">
        <div class="site-header__logo">
          <img :src="logo" alt="Logo" />
        </div>
      </router-link>

      <div class="site-header__extra site-header__extra--right">
        <slot name="right"></slot>
      </div>
    </div>

    <mks-bean-menu class="site-header__nav" :links="menuLinks"></mks-bean-menu>

    <div v-if="sidebar" class="site-header__sidebar-control">
      <mks-button size="round" @click="$emit('openSidebar')"
        ><mks-icon type="menu"></mks-icon
      ></mks-button>
    </div>
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
    },
    sidebar: {
      type: Boolean,
      default: true
    },
    translucent: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
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
  position: relative;
  background-color: $background-color-base;
  box-shadow: $box-shadow-base;
  border-bottom: $border-width-m solid $border-color-base;
  z-index: $z-index-page-header;
  transition: background-color 0.25s;

  &--translucent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: transparent;
    box-shadow: none;
    border-bottom: none;
  }

  &__bar {
    position: relative;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;

    padding: $space-s $space-base $space-s $space-base;

    @include breakpoint("small") {
      padding-top: $space-s;
      padding-bottom: $space-xl;
    }
  }

  &__logo {
    max-width: 180px;
  }

  &__main-content {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  &__extra {
    display: none;

    @include breakpoint("small") {
      display: flex;
      width: 35%;

      &--left {
        justify-content: flex-start;
        padding-right: $space-m;
      }

      &--right {
        justify-content: flex-end;
        padding-left: $space-m;
      }
    }
  }

  &__nav {
    display: none;

    @include breakpoint("small") {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, 50%);
    }
  }

  &__sidebar-control {
    position: absolute;
    bottom: 0;
    right: $space-m;
    transform: translateY(50%);
  }
}
</style>

<docs>
## Basic site header

```jsx

<mks-site-header v-bind:menu-links="[{label: 'Accueil', to: '/molecules/mkssiteheader'},{label: 'Agenda', to: 'https://google.com'}, {label: 'Jouer', to: { path: '/jouer' }}]" >
  <mks-lang-picker slot="right" :langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
</mks-site-header>

```

## Site header with top bar and custom logo

```jsx
<mks-button v-on:click="$loadTheme('events')" size="small">Match theme to logo</mks-button><br>
<mks-site-header v-bind:menu-links="[{label: 'Accueil', to: '/molecules/mkssiteheader'},{label: 'Agenda', to: 'https://google.com'}, {label: 'Jouer', to: { path: '/jouer' }}]" logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg">
  <mks-alert slot="top-bar" type="positive">An ad or important message can be placed here, the component juste needs a background.</mks-alert>
  <mks-lang-picker slot="right" :langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
</mks-site-header>

```


## Translucent header

```jsx
<div style="position: relative;padding:8rem 0;background:var(--color-secondary);">
  <mks-site-header v-bind:translucent="true" v-bind:menu-links="[{label: 'Accueil', to: '/molecules/mkssiteheader'},{label: 'Agenda', to: 'https://google.com'}, {label: 'Jouer', to: { path: '/jouer' }}]" >
    <mks-lang-picker slot="right" :langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
  </mks-site-header>
</div>

```
</docs>
