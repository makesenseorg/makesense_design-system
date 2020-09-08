<template>
  <nav class="bean-menu">
    <mks-horizontal-list tag="ul" class="bean-menu__list">
      <li
        class="bean-menu__item"
        v-for="link in links"
        :key="link.label"
        @click="$emit('click', link)"
      >
        <!--todo: replace by link component-->
        <mks-link :to="link.to" type="menu" class>{{ link.label }}</mks-link>
      </li>
    </mks-horizontal-list>
  </nav>
</template>
<script>
/**
 * Menu used in the site header. Can be internal or external links
 */
export default {
  name: "MksBeanMenu",
  props: {
    /**
     ** Array of links.
     ** Each link must contain {string} label, {string | object} to
     */
    links: {
      type: Array,
      required: true
    }
  }
};
/**
 * Returns the link object that was clicked
 * @event click
 */
</script>

<style lang="scss" scoped>
.bean-menu {
  //@include text-large;
  display: inline-block;
  color: $color-primary-inverse;
  background-color: $color-primary;
  padding: $space-base $space-x-large;
  border-radius: $border-radius-full;
  z-index: 1;
}

.bean-menu__item {
  @include text-large-black;
}

.bean-menu__link {
  color: inherit;
  font-weight: $font-weight-extrabold;

  &.link-active {
    position: relative;
    color: $color-secondary;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: $border-radius-full;
      background-color: $color-secondary;
      width: $space-large;
      height: 4px;
      transform: translateY(150%);
    }
  }
}
</style>

<docs>

```jsx
<mks-bean-menu v-bind:links="[{label: 'Home', to: '/'}, {label: 'Bean Menu', to: '/molecules/mksbeanmenu'}, {label: 'External', to: 'https://google.com'}]"></mks-bean-menu>
```
</docs>
