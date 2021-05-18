<template>
  <div :class="{ app: true, 'app--has-aside': $slots['aside'] }">
    <!-- @slot Whole column on the left side of the window -->
    <slot name="aside"></slot>
    <div class="app app--inner">
      <div class="app__top" v-if="$slots['top']">
        <!-- @slot Sticks to the top of the page when scrolling -->
        <slot name="top"></slot>
      </div>
      <!-- @slot Content of the page that is scrollable when overflows the window. -->
      <slot></slot>
      <div class="app__bottom" v-if="$slots['bottom']">
        <!-- @slot Sticks to the bottom of the page, even if the content is smaller than the height of the page. -->
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>
<script>
/** Wrapper component for your app. Easily create a layout that spans the whole height of the page with a sticky header and footer. */
export default {
  name: "MksApp",
  inheritAttrs: false
};
</script>
<style lang="scss">
.__layout,
.__nuxt {
  /* For app layout to take 100% height on nuxt apps */
  height: 100%;
}
</style>
<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 1 1 auto;
  backface-visibility: hidden;
  flex-direction: column;
  max-width: 100%;
  position: relative;
  overflow: auto;

  &--has-aside {
    flex-direction: row;
  }

  &--inner > * {
    flex-grow: 1;
  }
}
.app__aside {
  flex-grow: 0;
}
.app__content {
  flex: 1 1 auto;
}
.app__top {
  position: sticky;
  top: 0;
  flex-grow: 0;
  z-index: $z-index-page-header;
}
.app__bottom {
  margin-top: auto;
  flex-grow: 0;
}
</style>
<docs>
By default, the <code>mks-app</code> component takes 100% of the height of the window, in a flex layout.

You can place your content in 4 different slots : 
- Aside, on the left of the window. For example for app sidebars.
- Top, to make any content sticky while scrolling.
- Default, for the page content.
- Bottom, for the footer.

```jsx
<mks-app>
  <div slot="aside" style="background: coral;padding:10px;">Aside</div>
  <div slot="top" style="background: sandybrown;padding:10px;">Top</div>
  <div style="background: antiquewhite;padding:10px;">Default</div>
  <div slot="bottom" style="background: sandybrown;padding:10px;">Bottom</div>
</mks-app>
```

```jsx
<mks-app>
  <div slot="aside" style="background: coral;padding:10px;">Aside</div>
  <div slot="top" style="background: sandybrown;padding:10px;">Sticky top</div>
  <div style="background: antiquewhite;padding:10px;">
    Some very long content that overflows. The top slots is sticky when scrolling and aside does not move with the content.
    <div class="mks-grid-auto-lg mks-grid-gap-sm">
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
      <mks-card image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
    </div>
  </div>
  <div slot="bottom" style="background: sandybrown;padding:10px;">Sticky bottom</div>
</mks-app>
```

```jsx
<mks-app>
  <mks-site-header slot="top" v-bind:menu-links="[{label: 'Accueil', to: '/'},{label: 'Agenda', to: '/agenda'}, {label: 'Jouer', to: { path: '/jouer' }}]" logo="https://events.makesense.org/static/img/logo.6e3c1fd.svg">
  </mks-site-header>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  <mks-site-footer slot="bottom">Made by makesense ! I'm sticking to the bottom woohoo ! </mks-site-footer>
</mks-app>
```

</docs>
