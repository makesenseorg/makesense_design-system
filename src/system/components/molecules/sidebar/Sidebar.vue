<template>
  <aside
    :class="{
      sidebar: true,
      'sidebar--opened': open
    }"
    role="navigation"
    :aria-label="$MKSlocale['secondaryNav']"
    tabindex="0"
    id="site-sidebar"
    @keydown.esc="close"
  >
    <button
      class="sidebar__close-layer"
      @click="close"
      :aria-label="$MKSlocale['close']"
    ></button>
    <div class="sidebar__inner">
      <main class="sidebar__main-content">
        <slot></slot>
      </main>
    </div>
    <mks-button
      tabindex="0"
      tag="button"
      size="small"
      type="secondary"
      class="sidebar__close-btn"
      @click="close"
    >
      <mks-icon
        type="x"
        size="20"
        stroke-width="4"
        :alt="$MKSlocale['close']"
      ></mks-icon>
    </mks-button>
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
      /**
       * When users clicked close button or outer layer
       *
       * @event closed
       */
      this.$emit("closed");
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
      opacity: 0.4;
    }

    .sidebar__close-btn {
      transform: translateX(0);
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
    padding: $space-xxl $space-base $space-l;
    width: calc(100% - 1.25rem);
    max-width: 31.25rem;
    max-height: calc(100% - 3.75rem);
    background-color: $color-primary;
    color: $color-primary-inverse;
    -webkit-overflow-scrolling: touch;
    transform: translateX(100%);
    transition: transform 0.4s ease;
    border-bottom-left-radius: $border-radius-xl;
    box-shadow: $box-shadow-base;

    @include breakpoint("medium") {
      border-bottom-left-radius: $border-radius-xxl;
      padding: $space-xxl $space-xxxl $space-xxl;
      border-bottom-left-radius: $space-l;
      width: 86%;
      max-width: none;
    }
  }

  &__close-layer {
    background-color: $color-neutral-10;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: none;
  }

  &__close-btn {
    position: absolute;
    top: $space-m;
    right: 0;
    z-index: 1;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    // to offset the outline which is visible if set to translateX(100%)
    transform: translateX(105%);
    transition: transform 0.4s ease;

    @include breakpoint("medium") {
      svg {
        width: 27px;
        height: 27px;
      }
    }
  }
}
</style>

<docs>

## View sidebar example

Note: the fade in and slide in animation will not show in the preview if you try to change <code>open</code>. 

Toggle the class <code>.sidebar__opened</code> in the inspector to view the animations.

```jsx
<div style="position:relative;width:100%;height:100%;min-height:500px">
    <!-- position absolute below is only for example to display properly -->
    <mks-sidebar v-bind:open="true" style="position:absolute;">
        <mks-text tag="p">My content blablabla</mks-text>
        <mks-link to="/">Go home</mks-link>
        <mks-separator></mks-separator>
        <mks-lang-picker v-bind:langs="['fr', 'en', 'es']" active="fr"></mks-lang-picker>
    </mks-sidebar>
</div>

```
</docs>
