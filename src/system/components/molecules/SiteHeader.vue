<template>
  <header class="site-header">
    <div v-if="$slots['top-bar']" class="site-header__top-bar">
      <slot name="top-bar"></slot>
    </div>
    <div class="site-header__bar">
      <div class="site-header__user">
        <mks-avatar></mks-avatar>
        <AthText
          :utils="[
            'margin-left-default font-weight-bold font-size-small',
            {
              'color-default-reverse':
                $route.meta.headerTranslucent && !$store.state.app.headerFixed
            }
          ]"
          >{{ user }}</AthText
        >
        <div>
          <AthText
            tag="span"
            :utils="[
              'margin-left-default font-weight-light font-size-xsmall',
              {
                'color-default-reverse':
                  $route.meta.headerTranslucent && !$store.state.app.headerFixed
              }
            ]"
            >{{ __("Pas vous ?") }}</AthText
          >
          <mks-button
            @click="$emit($logout)"
            variation="link"
            :utils="[
              'font-weight-light font-size-xsmall',
              {
                'color-default-reverse':
                  $route.meta.headerTranslucent && !$store.state.app.headerFixed
              }
            ]"
            >{{ __("Déconnexion") }}</mks-button
          >
        </div>
      </div>
      <div class="site-header__logo">{{ logo }}</div>
      <div class="site-header__i18n">FR EN ES</div>
    </div>

    <nav class="site-header__menu">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </nav>
    <div class="site-header__sidebar-control">---</div>
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
      type: String
    },
    user: {
      type: String
    }
  },
  data() {},
  methods: {
    logout: function() {
      this.$api.Auth.logout();
      this.$router.push("home");
    },
    openMenu: function() {
      this.$store.commit("nav/showSidebar");
    }
  }
};
</script>
<style lang="scss" scoped></style>

<docs>
```jsx

<site-header></site-header>

```
</docs>
