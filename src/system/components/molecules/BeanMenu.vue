<template>
  <nav class="bean-menu">
    <mks-horizontal-list tag="ul" class="bean-menu__list">
      <li
        class="bean-menu__item"
        v-for="link in links"
        :key="link.label"
        @click="$emit('click', link)"
      >
        <!--todo: remove link active-->
        <router-link
          v-if="link.tag === 'router-link'"
          :to="link.to"
          class="bean-menu__link "
          >{{ link.label }}</router-link
        >
        <nuxt-link
          v-else-if="link.tag === 'nuxt-link'"
          :to="link.to"
          class="bean-menu__link"
          >{{ link.label }}</nuxt-link
        >
        <a
          v-else
          :href="link.to"
          class="bean-menu__link link-active"
          target="_blank"
          >{{ link.label }}</a
        >
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
     ** Each link must contain {string} label, {string | object} to, {string} tag ('a', 'router-link', 'nuxt-link')
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
<mks-bean-menu :links="[{label: 'Agenda', to: 'https://google.com'}, {tag: 'router-link', label: 'Jouer', to: { path: '/jouer' }}]"></mks-bean-menu>
```
</docs>
