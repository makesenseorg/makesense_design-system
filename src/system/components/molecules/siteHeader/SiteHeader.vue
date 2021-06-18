<template>
  <header
    :class="{
      'site-header': true,
      'site-header--fixed': fixed
    }"
  >
    <div v-if="$slots['top-bar']" class="site-header__top-bar">
      <!-- @slot Displays content above the header -->
      <slot name="top-bar"></slot>
    </div>
    <div class="site-header__main-bar-container" v-if="$slots['main-bar']">
      <!-- @slot Displays content above the header -->
      <div class="site-header__main-bar">
        <slot name="main-bar"></slot>
      </div>
    </div>
    <div class="site-header__bar-container">
      <div class="site-header__bar">
        <mks-link
          to="/"
          type="menu"
          class="site-header__logo"
          :aria-label="$MKSlocale['home']"
        >
          <img :src="logo" alt="Logo" aria-hidden="true" />
        </mks-link>

        <mks-navigation
          class="site-header__nav"
          theme="primary"
          :links="menuLinks"
        ></mks-navigation>

        <div v-if="sidebar" class="site-header__sidebar-control">
          <mks-button
            type="text"
            @click="$emit('openSidebar')"
            :aria-label="$MKSlocale['openSidebar']"
          >
            <mks-icon type="menu"></mks-icon>
          </mks-button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
/**
 * Site header with menu, sidebar control and top bar slot.
 * When users clicked the sidebar control
 *
 * @event openSidebar
 */
export default {
  name: "MksSiteHeader",
  release: "0.2.0",
  props: {
    /** Site logo */
    logo: {
      type: String,
      default: require("@@/assets/img/brand/makesense-logo.png")
    },
    /** Array of links object */
    menuLinks: {
      type: Array
    },
    /** Display sidebar control */
    sidebar: {
      type: Boolean,
      default: true
    },
    /** Fixes on top of the viewport */
    fixed: {
      type: Boolean,
      default: false
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

  &--fixed {
    position: fixed;
    z-index: $z-index-page-header;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $background-color-base;
    box-shadow: $box-shadow-base;
    animation-duration: 0.4s;
    animation-name: app-header-slide-in;
  }

  &__main-bar-container {
    @include text-small-black;
    position: relative;
    background: $background-color-softer;
    color: $color-text-light;
    padding: $space-s $space-m $space-s $space-m;

    @include breakpoint("small") {
      padding-top: $space-xs;
      padding-bottom: $space-xs;
    }
  }

  &__main-bar {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
  }

  &__bar-container {
    padding: $space-s $space-m $space-s $space-m;

    @include breakpoint("small") {
      padding-top: $space-l;
      padding-bottom: $space-l;
    }
  }

  &__bar {
    position: relative;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
  }

  &__logo {
    width: 8.75rem;
    max-height: $space-m;
    //width: auto;
    img {
      max-height: 100%;
    }
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
      display: block;
      @include push-right;
    }
  }

  &__sidebar-control {
    justify-content: flex-end;
    padding-left: $space-m;
  }

  &__container {
    max-width: 1100px;
  }
}

@keyframes app-header-slide-in {
  0% {
    transform: translateY(calc(-100% + 5.5rem * 0.5));
  }
  to {
    transform: translateY(0);
  }
}
</style>

<docs>

## Basic site header

The header takes a <code>menu-links</code> prop with an array of links items (<mks-link to="/atoms/mkslink">see link component</mks-link>)

It has three slots : left, right and top-bar.

```jsx

<mks-site-header 
  v-bind:menu-links="[{label: 'Citoyens', to: '/molecules/mkssiteheader'},{label: 'Entrepreneurs', to: 'https://makesense.org'}, {label: 'Organisations', to: 'https://makesense.org'}]">
  <template slot="main-bar">
    <mks-list theme="primary">
      <mks-link type="menu" to="https://makesense.org">Retourner au site makesense</mks-link>
    </mks-list>
    <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
  </template>
  
</mks-site-header>

```

## Top bar

```jsx
<mks-site-header 
  v-bind:menu-links="[{label: 'Citoyens', to: '/molecules/mkssiteheader'},{label: 'Entrepreneurs', to: 'https://makesense.org'}, {label: 'Organisations', to: 'https://makesense.org'}]">
  <mks-alert slot="top-bar" type="positive">An ad or important message can be placed here, the component just needs a background.</mks-alert>
  <template slot="main-bar">
    <mks-list theme="primary">
      <mks-link type="menu" to="https://makesense.org">Retourner au site makesense</mks-link>
    </mks-list>
    <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
  </template>
  
</mks-site-header>

```

## Custom logo

The logo is makesense logo by default but can be customized with an URL.

```jsx
<mks-button v-on:click="$loadTheme('events')" size="small">Try with events theme</mks-button><br>
<mks-site-header v-bind:menu-links="[{label: 'Accueil', to: '/molecules/mkssiteheader'},{label: 'Agenda', to: 'https://google.com'}, {label: 'Jouer', to: { path: '/jouer' }}]" logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg">
  <template slot="main-bar">
    <mks-list theme="primary">
      <mks-link type="menu" to="https://makesense.org">Retourner au site makesense</mks-link>
    </mks-list>
    <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
  </template>
</mks-site-header>

```

## Fixed header

The header can be fixed to the top of the viewport (for example on scroll), by setting the <code>fixed</code> attribute to <code>true</code>

<mks-alert type="positive">
<mks-text weight="bold" align="center">Update the `fixed` attribute to `true` in the template below ⬇</mks-text>
</mks-alert>

```jsx


<div style="position: relative;height:8rem;">
  <mks-site-header v-bind:fixed="false" v-bind:translucent="true" v-bind:menu-links="[{label: 'Accueil', to: '/molecules/mkssiteheader'},{label: 'Agenda', to: 'https://google.com'}, {label: 'Jouer', to: { path: '/jouer' }}]" >
    <template slot="main-bar">
      <mks-list theme="primary">
        <mks-link type="menu" to="https://makesense.org">Retourner au site makesense</mks-link>
      </mks-list>
      <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
    </template>
  </mks-site-header>
</div>
```

</docs>
