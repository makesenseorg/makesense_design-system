<template>
  <nav :class="`navigation navigation--theme-${theme}`">
    <mks-horizontal-list tag="ul" class="navigation__list">
      <li
        class="navigation__item"
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
export default {
  name: "MksNavigation",
  release: "0.2.0",
  props: {
    /**
     ** Array of link objects, containing a "label" and a "to". The "to" can be either a normal http URL or a vue router or nuxt router object, with path or name.
     ** {string} label, {string | object} to
     */
    links: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: "primary",
      validator: value => {
        return value.match(/(primary|secondary|tertiary|neutral)/);
      }
    },
    type: {
      type: String,
      default: "main",
      validator: value => {
        return value.match(/(main|secondary)/);
      }
    }
  },
  emits: ["click"]
};
/**
 * Returns the link object that was clicked
 * @event click
 */
</script>

<style lang="scss" scoped>
.navigation {
  @include text-small-black;
}

$themes: (
  "neutral": $color-neutral-70,
  "primary": $color-primary,
  "secondary": $color-secondary,
  "tertiary": $color-tertiary
);

@each $name, $variable in $themes {
  .navigation--theme-#{$name} {
    .navigation__item + .navigation__item {
      @include flex-center;
      &:before {
        @include bean($color: $variable);
      }
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
<mks-navigation type="menu" theme="secondary" v-bind:links="[{label: 'Home', to: '/'}, {label: 'Citizens', to: '/molecules/mksnavigation'}, {label: 'Entrepreneurs', to: 'https://makesense.org'}, {label: 'Organizations', to: 'https://france.makesense.org'}]"></mks-navigation>
<div style="color: #484949;background:#f8f9fa;padding:1rem;">
  <mks-navigation type="menu" theme="neutral" v-bind:links="[{label: 'Jobs', to: 'http://jobs.makesense.org'}, {label: 'Agenda', to: 'https://events.makesense.org'}, {label: 'Rejoindre l\'équipe', to: 'https://makesense.org'}, {label: 'Newsletter', to: 'https://makesense.org'}]"></mks-navigation>
</div>
```
</docs>
