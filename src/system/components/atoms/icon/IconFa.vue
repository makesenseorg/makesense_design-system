<template>
  <FontAwesomeIcon
    v-if="faIcon"
    :icon="faIcon"
    :class="`icon icon--color-${color}`"
  />
  <span v-else></span>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * Icon based on font awesome (please prefer feather)
 * @version 0.1.0
 */
export default {
  name: "MksIconFa",
  components: { FontAwesomeIcon },
  props: {
    /**
     * Type of icon
     */
    type: {
      type: String,
      default: ""
    },
    /**
     * Color of the icon amongs theme colors, inherits from parent by default.
     */
    color: {
      type: String,
      default: "inherit"
    }
  },
  data() {
    return {
      defaultSize: 24,
      path: "",
      component: null,
      faIcon: null
    };
  },
  async created() {
    const icons = await import(`@fortawesome/free-solid-svg-icons`);
    this.faIcon = icons[this.faName];
  },
  computed: {
    faName() {
      if (this.type === "close") return "faTimes";
      if (this.type === "company") return "faBuilding";
      if (this.type === "lang") return "faGlobeEurope";
      if (this.type === "mapMarker") return "faMapMarkerAlt";
      if (this.type === "menu") return "faBars";
      if (this.type === "help") return "faLifeRing";

      return `fa${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  color: inherit;
  vertical-align: middle;
  font-size: inherit;
  width: 1em;

  &--color-neutral {
    color: $color-neutral-70;
  }

  &--color-primary {
    color: $color-primary;
  }

  &--color-secondary {
    color: $color-secondary;
  }

  &--color-tertiary {
    color: $color-tertiary;
  }

  &--color-positive {
    color: $color-success;
  }

  &--color-warning {
    color: $color-warning;
  }

  &--color-negative {
    color: $color-danger;
  }
}
</style>
<docs>

## Font Awesome icons 
Font awesome icons are still available. However you have to specify to use the font-awesome library. It bundles all icons in the project.

[List of 1001 available icons](https://fontawesome.com/icons?d=gallery&s=solid&m=free)

The first line of icons has an alias for easier use. If not, you can just specify as type the name of the icon as camelCase.
Exemple, for <code>address-book</code> type will be <code>adressBook</code>

```jsx
<p>
  <mks-icon-fa type="close" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="mapMarker" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="lang" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="company" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="menu" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="help" library="font-awesome"></mks-icon-fa>
  <br />
  <br />
  <mks-icon-fa type="addressBook" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="adjust" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="arrowUp" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="arrowDown" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="arrowLeft" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="arrowRight" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="link" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="tag" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="search" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="check" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="share" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="sort"  library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="clock" library="font-awesome"></mks-icon-fa>
  <mks-icon-fa type="wallet" library="font-awesome"></mks-icon-fa> 
  <mks-icon-fa type="lock" library="font-awesome"></mks-icon-fa> 
 
</p>
```

## Colors 

Inherits from parent by default 

```jsx
<p>
  <mks-text tag="p">Feather</mks-text>
  <mks-icon color="neutral" type="arrow-up"></mks-icon> 
  <mks-icon color="primary" type="arrow-up"></mks-icon> 
  <mks-icon color="secondary" type="arrow-up"></mks-icon> 
  <mks-icon color="tertiary" type="arrow-up"></mks-icon> 
  <mks-icon color="positive" type="arrow-up"></mks-icon> 
  <mks-icon color="warning" type="arrow-up"></mks-icon> 
  <mks-icon color="negative" type="arrow-up"></mks-icon> 
  <br/><br/>
  <mks-text tag="p">Font awesome</mks-text>
  <mks-icon color="neutral" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="primary" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="secondary" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="tertiary" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="positive" type="arrowUp" library="font-awesome"></mks-icon> 
  <mks-icon color="warning" type="arrowUp" library="font-awesome" ></mks-icon> 
  <mks-icon color="negative" type="arrowUp" library="font-awesome" ></mks-icon> 
</p>
```
</docs>
