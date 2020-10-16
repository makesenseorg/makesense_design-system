<template>
  <div class="app">
    <mks-sidebar :open="sidebarOpen" @close="$emit('closeSidebar')">
      <slot
        v-if="$slots['sidebar-header']"
        name="sidebar-header"
        slot="header"
      ></slot>
      <slot name="sidebar"></slot
    ></mks-sidebar>
    <div class="page">
      <mks-site-header v-bind="$attrs" v-on="$listeners">
        <slot v-if="$slots['top-bar']" name="top-bar" slot="top-bar"></slot>
        <slot
          v-if="$slots['header-left']"
          name="header-left"
          slot="left"
        ></slot>
        <slot
          v-if="$slots['header-right']"
          name="header-right"
          slot="right"
        ></slot>
      </mks-site-header>
      <main><slot></slot></main>
      <mks-site-footer class="page__footer"
        ><slot name="footer"></slot
      ></mks-site-footer>
    </div>
  </div>
</template>
<script>
// todo: import doesnt work in app because of docs, has to be loaded from dist
import MksSidebar from "../../molecules/sidebar/Sidebar";
import MksSiteHeader from "../../molecules/siteHeader/SiteHeader";
import MksSideFooter from "../../molecules/siteFooter/SiteFooter";

export default {
  name: "MksPage",
  inheritAttrs: false,
  components: { MksSidebar, MksSiteHeader, MksSideFooter },
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page__footer {
  margin-top: auto;
}
</style>
<docs>

```jsx
<mks-page :menu-links="[
  { label: 'Accueil', to: '/layouts/mkslayoutpage' },
  { label: 'Header', to: '/molecules/mkssiteheader' },
  { label: 'Menu', to: '/molecules/mksbeanmenu' },
  { label: 'Sidebar', to: { path: '/molecules/mkssidebar' } },
  { label: 'Footer', to: { path: '/molecules/mkssitefooter' } },
]" logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg">
  <template v-slot:sidebar-headeer>Sidebar header</template>
  <template v-slot:sidebar>Sidebar content</template>
  <template v-slot:top-bar>Top bar</template>
  <template v-slot:header-left>Left side</template>
  <mks-lang-picker slot="header-right" :langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  <template v-slot:footer>Made by makesense !</template>
</mks-page>
```

</docs>
