<template>
  <aside
    :class="{
      sidebar: true,
      'sidebar--opened': open
    }"
  >
    <button class="sidebar__close-layer" @click="close"></button>
    <div class="sidebar__inner">
      <mks-button
        tag="button"
        size="round"
        type="secondary"
        class="sidebar__close-btn"
        @click="close"
      >
        <mks-icon type="x" size="30"></mks-icon>
      </mks-button>
      <header class="sidebar__header" v-if="$slots.header">
        <slot name="header"></slot>
      </header>
      <main class="sidebar__main-content">
        <slot></slot>
      </main>
    </div>
  </aside>
</template>
<script>
/**
 * Sidebar placed on the right of the screen.
 */
export default {
  name: "MksSidebar",
  release: "0.3.0",
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  position: fixed;
  z-index: $z-index-page-sidebar;
  overflow: hidden;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &--opened {
    pointer-events: all;

    .sidebar__inner {
      transform: translateX(0);
    }

    .sidebar__close-layer {
      opacity: 0.6;
    }
  }

  &__inner {
    position: absolute;
    top: 0;
    right: 0;
    overflow: {
      y: auto;
      x: hidden;
    }
    width: 30rem;
    height: 100%;
    max-width: 100%;
    background-color: $background-color-base;
    -webkit-overflow-scrolling: touch;
    transform: translateX(100%);
    transition: all 0.4s;
  }

  &__header {
    @include title-xsmall;
    position: relative;
    overflow: hidden;
    padding: $space-xl $space-m;
    color: $color-secondary-inverse;
    background-color: $color-secondary;

    // add beans
    &:before,
    &:after {
      content: "";
      border-radius: 5rem;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      height: 5rem;
    }

    &:before {
      background-color: $color-secondary-active;
      transform: rotate(-45deg) translate(-22%, 210%);
    }

    &:after {
      opacity: 0.5;
      background-color: $color-secondary-active;
      transform: rotate(-45deg) translate(-36%, 160%);
    }

    &__inner {
      position: relative;
      z-index: 2;
    }
  }

  &__main-content {
    padding: $space-xl $space-m;
  }

  &__close-layer {
    background-color: black;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.4s;
  }

  &__close-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>

<docs>

## View sidebar example

Note: the fade in and slide in animation will not show in the preview if you try to change <code>open</code>. Toggle the class <code>.sidebar__opened</code> in the inspector to view the animations.

```jsx
<div style="position:relative;width:100%;height:100%;min-height:500px">
    <!-- position absolute below is only for example to display properly -->
    <mks-sidebar v-bind:open="true" style="position:absolute;">
        <header slot="header">My sidebar title</header>
        <mks-text tag="p">The rest of my content</mks-text>
        <mks-link to="/">Go home</mks-link>
        <mks-separator></mks-separator>
        <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
    </mks-sidebar>
</div>

```
</docs>
