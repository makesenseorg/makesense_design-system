<template>
  <div :class="`spacer__item ${push ? `push-${push}` : ''}`">
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
</style>
<docs>

The component <code>mks-spacer-item</code> is meant to be used in the component <mks-link to="mksspacer">Spacer</mks-link> to wrap an item when you want to push it to one side.

It is not needed otherwise.

## Example

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
````
</docs>
