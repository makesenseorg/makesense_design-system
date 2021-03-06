<template>
  <div
    :class="
      `spacer__item ${push ? `push-${push}` : ''} ${
        grow ? 'spacer__item--grow' : ''
      }`
    "
  >
    <slot></slot>
  </div>
</template>
<script>
/** Use spacer item to push an item to the side in mks-spacer
 * @version 1.5.1
 */
export default {
  name: "MksSpacerItem",
  props: {
    /** Push to `left`, `right`, `top`, or `bottom` */
    push: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(left|right|top|bottom)/);
      }
    },
    /** Make the item use all the available space
     * @version 1.5.2
     */
    grow: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss">
.spacer,
.spacer > .spacer {
  .spacer__item.push-left {
    @include push-left;
  }
  .spacer__item.spacer__item.push-right {
    @include push-right;
  }
  .spacer__item.spacer__item.push-top {
    @include push-top;
  }
  .spacer__item.spacer__item.push-bottom {
    @include push-bottom;
  }
}

.spacer__item--grow {
  flex-grow: 1;
}
</style>
<docs>

The component <code>mks-spacer-item</code> is meant to be used in the component <mks-link to="mksspacer">Spacer</mks-link> to wrap an item when you want to push it to one side.

It is not needed otherwise.

## Split on one side

You can split the flow and push one or multiple items to the side of the container by using the `spacer-item` component and its prop `push` with the direction as value.

```jsx
<mks-spacer inline align="center">
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-spacer-item push="right">
    <mks-button size="small">Call to action</mks-button>
  </mks-spacer-item>
  <mks-text size="small">Text</mks-text>
</mks-spacer>
```

## Make an item grow

```jsx
<mks-spacer inline align="center">
  <mks-tag>Tag 1</mks-tag>
  <mks-tag>Tag 2</mks-tag>
  <mks-spacer-item grow>
    <mks-field name="field" placeholder="i take all the remaining space!" value=""/>
  </mks-spacer-item>
  <mks-tag>Tag 3</mks-tag>
</mks-spacer>
````
</docs>
