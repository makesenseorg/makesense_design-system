<template>
  <div class="example">
    <slot></slot>
  </div>
</template>
<script>
/**
 * Grid system based on utility classes and mixins
 * @version 1.2.0
 */
export default {
  name: "MksGridSystem",
  release: "1.2.0"
};
</script>
<style lang="scss" scoped>
.example {
  background: $background-color-base;
}
.example-child {
  @include flex-center;
  @include text-body-black;
  color: $color-neutral-100;
  background: $color-neutral-60;
  border: 1px solid $color-neutral-50;
  min-height: 4rem;
  padding: $space-xxs;
}
</style>
<docs>

⚠️ **Note**: Component `mks-grid-system` is not meant to be used in apps, it's only meant as an example in this documentation.

## The stack
The grid system is composed of a container element with the class `mks-grid` and children elements. 

By default, children span 12 columns.

```jsx
<mks-grid-system class="mks-grid mks-grid-gap-xs">
    <div class="example-child">1</div>
    <div class="example-child">2</div>
    <div class="example-child">3</div>
</mks-grid-system>
```

## Defining columns
You can tell an item to span a certain amount of columns by using the class `mks-col-{amount}`, where amount is any number between `1` and `12`. 

The items will not wrap as the screen gets smaller. See section #responsive for this.

```jsx
<mks-grid-system class="mks-grid mks-grid-gap-xs">
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-2">2</div>
    <div class="example-child mks-col-3">3</div>
    <div class="example-child mks-col-4">4</div>
    <div class="example-child mks-col-2">2</div>
    <div class="example-child mks-col-5">5</div>
    <div class="example-child mks-col-7">7</div>
    <div class="example-child mks-col-6">6</div>
    <div class="example-child mks-col-6">6</div>
    <div class="example-child mks-col-8">8</div>
    <div class="example-child mks-col-4">4</div>
    <div class="example-child mks-col-9">9</div>
    <div class="example-child mks-col-3">3</div>
    <div class="example-child mks-col-10">10</div>
    <div class="example-child mks-col-2">2</div>
    <div class="example-child mks-col-11">11</div>
    <div class="example-child mks-col-1">1</div>
    <div class="example-child mks-col-12">12</div>
</mks-grid-system>
```

## Automatic grids
The class `mks-grid-auto-cols` can replace the class `mks-grid` to display all children in one row, similarly to flexbox.

All columns will have the same size (that of the biggest child) and fill the entire container width. 

They will not wrap.

```jsx
<mks-text tag="p" weight="bold">One-row grid with 12 children</mks-text>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xs ">
    <div class="example-child">1</div>
    <div class="example-child">2</div>
    <div class="example-child">3</div>
    <div class="example-child">4</div>
    <div class="example-child">5 has more content than the other, what does that do ?</div>
    <div class="example-child">6</div>
    <div class="example-child">7</div>
    <div class="example-child">8</div>
    <div class="example-child">9</div>
    <div class="example-child">10</div>
    <div class="example-child">11</div>
    <div class="example-child">12</div>
</mks-grid-system>
<mks-text tag="p" weight="bold">One-row grid with 6 children</mks-text>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xs ">
    <div class="example-child">1</div>
    <div class="example-child">2</div>
    <div class="example-child">3</div>
    <div class="example-child">4</div>
    <div class="example-child">5 has more content than the other, what does that doooooooooo ?</div>
    <div class="example-child">6</div>
</mks-grid-system>
```
## Col-start and col-end
// todo

## Responsive
// todo

## Grid gaps

You can a utility class `mks-grid-gap-{size}` on the container element to get smaller, bigger or no gaps between children.


```jsx
<mks-grid-system class="mks-grid-auto">
    <div class="example-child"></div>
    <div class="example-child">no class, no gap</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xxxs">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-xxxs</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xxs">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-xxs</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xs">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-xs</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-sm">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-sm</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-md">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-md</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-lg">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-lg</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xl">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-xl</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xxl">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-xxl</div>
    <div class="example-child"></div>
</mks-grid-system>
<mks-grid-system class="mks-grid-auto mks-grid-gap-xxxl">
    <div class="example-child"></div>
    <div class="example-child">mks-grid-gap-xxxl</div>
    <div class="example-child"></div>
</mks-grid-system>
```

</docs>
