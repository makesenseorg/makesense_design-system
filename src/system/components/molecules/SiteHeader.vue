<template>
  <header class="site-header">
    <div v-if="$slots['top-bar']" class="site-header__top-bar">
      <slot name="top-bar"></slot>
    </div>
    <div class="site-header__bar">
      <div class="site-header__left">
        <slot name="left"></slot>
      </div>
      <div class="site-header__logo">{{ logo }}</div>
      <div class="site-header__right">
        <slot name="right"></slot>
      </div>
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

<site-header>
  <template v-slot:left>left</template> 
  <template v-slot:right><mks-app-lang :langs="['fr', 'en', 'es']" active="fr"></mks-app-lang></template>
</site-header>

```
</docs>
