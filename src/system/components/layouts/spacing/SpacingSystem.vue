<template>
  <div class="spacing-system">
    <slot></slot>
  </div>
</template>
<script>
/** Guidelines and rules of the spacing system.
 * @version 1.3.0
 */
export default {
  name: "SpacingSystem",
  props: {
    tag: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|p|ul|ol|li|span)/);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.spacer {
}
</style>
<docs>
## Introduction to our spacing system

Spacing is important because it gives rythm to the page. 
It gives meaning by grouping elements visually, or by separating them. 



### Types of spacing

#### App container space

Use mixin `workspace`

#### <mks-text weight="bold">Space</mks-text>, between elements
    - Stack space, where elements follow eachother vertically
    - Inline space, where elements follow eachother horizontally

This is handled by the <mks-link to="mksspacer">Spacer component</mks-link> and utility classes.


#### <mks-text weight="bold">Inset</mks-text>, inside an element
    - Square, where the padding is the same on all sides
    - Asymetrical, where the padding is the same on each axis

This is handled via utility classes.


</docs>
