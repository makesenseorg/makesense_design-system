<template>
  <nav class="bean-menu">
    <mks-horizontal-list tag="ul" class="bean-menu__list">
      <li
        class="bean-menu__item"
        v-for="link in links"
        :key="link.label"
        @click="$emit('click', link)"
      >
        <mks-link :to="link.to" type="menu" class>{{ link.label }}</mks-link>
      </li>
    </mks-horizontal-list>
  </nav>
</template>
<script>
/**
 * Menu used in the site header.
 * @version 0.2.0
 */
import MksHorizontalList from "../../layouts/horizontalList/HorizontalList";
export default {
  name: "MksBeanMenu",
  release: "0.2.0",
  components: { MksHorizontalList },
  props: {
    /**
     ** Array of link objects, containing a "label" and a "to". The "to" can be either a normal http URL or a vue router or nuxt router object, with path or name.
     ** {string} label, {string | object} to
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
  @include text-body-black;
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

This component needs an array of link objects. It automatically detects the current page and applies styling.

The link object takes a <code>label</code> and a <code>to</code> property.

<pre><code>{ label: 'Internal link', to: { name: 'namedRoute'} }
{ label: 'Internal link', to: '/path/of/route' }</code></pre>

For more information on the link object,  <mks-link to="/atoms/mkslink">see Link component</mks-link>

## Example 

```jsx
<mks-bean-menu v-bind:links="[{label: 'Home', to: '/'}, {label: 'Bean Menu', to: '/molecules/mksbeanmenu'}, {label: 'External', to: 'https://google.com'}]"></mks-bean-menu>
```
</docs>
