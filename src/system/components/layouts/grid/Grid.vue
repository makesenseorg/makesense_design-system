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
<style lang="scss">
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

⚠️ **Note**: <mks-text weight="bold">Component `mks-grid-system` is only meant as an example in this documentation and should not be used in apps</mks-text>.

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

## Placing elements on the grid
There are two utility classes that allow a more specific placement and use of white space in the grid.

`mks-col-start-{column-number}` dictates on which column the element will start.

`mks-col-end-{column-number}` dictates on which column the element will end.
```jsx
<mks-grid-system class="mks-grid mks-grid-gap-xs">
    <div class="example-child mks-col-1">1</div><div class="example-child mks-col-1">2</div><div class="example-child mks-col-1">3</div><div class="example-child mks-col-1">4</div><div class="example-child mks-col-1">5</div><div class="example-child mks-col-1">6</div><div class="example-child mks-col-1">7</div><div class="example-child mks-col-1">8</div><div class="example-child mks-col-1">9</div><div class="example-child mks-col-1">10</div><div class="example-child mks-col-1">11</div><div class="example-child mks-col-1">12</div>
    <div class="example-child mks-col-10 mks-col-start-2">mks-col-start-2</div>
    <div class="example-child mks-col-3 mks-col-start-1">mks-col-start-1</div>
    <div class="example-child mks-col-3 mks-col-end-8">mks-col-end-8</div>
    <div class="example-child mks-col-3 mks-col-end-12">mks-col-end-12</div>
    <div class="example-child mks-col-6 mks-col-end-12">mks-col-end-12</div>
    <div class="example-child mks-col-2 mks-col-start">mks-col-start</div>
    <div class="example-child mks-col-2 mks-col-end">mks-col-end</div>
</mks-grid-system>
```

## Automatic grids
The class `mks-grid-auto` can replace the class `mks-grid` to display all children in one row, similarly to flexbox.

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

## Responsive
For a more flexible grid when elements can wrap when they become smaller, we can use the following utility classes :
`mks-grid-auto-{size}`, where each element has a minimum width. With this system, you can create a responsive grid with equal sized items very easily.

⚠️ You should not use `mks-col-${amount}` when using an auto sized grid.

You can play with the size of the window to see it in action.

<code>.mks-grid-auto-xs { --col-min-width: 8rem; }</code>

<code>.mks-grid-auto-sm { --col-min-width: 10rem; }</code>

<code>.mks-grid-auto-md { --col-min-width: 15rem; }</code>

<code>.mks-grid-auto-lg { --col-min-width: 20rem; }</code>

<code>.mks-grid-auto-xl { --col-min-width: 25rem; }</code>

```jsx
<mks-grid-system class="mks-grid-auto-md mks-grid-gap-xs">
    <div class="example-child">1</div>
    <div class="example-child">2</div>
    <div class="example-child">3</div>
    <div class="example-child">4</div>
    <div class="example-child">5</div>
    <div class="example-child">6</div>
    <div class="example-child">7</div>
    <div class="example-child">8</div>
</mks-grid-system>
```

## Responsive modifiers
You can add responsive modifiers, by appending `@{breakpoint}`, to `mks-grid-auto-{size}`, `mks-col-{amount}`, `mks-col-start-{col}` and `mks-col-end-{col}` classes to define a different behavior depending on screen sizes.

`mks-col-6 mks-col-3@md` means that an element would take 6 column on smallest screens, and when the window reaches `md` breakpoint and up, the element would take 3 columns.

```jsx
<mks-grid-system class="mks-grid mks-grid-gap-xs">
    <div class="example-child mks-col-6 mks-col-3@md">1</div>
    <div class="example-child mks-col-6 mks-col-3@md">2</div>
    <div class="example-child mks-col-6 mks-col-3@md">3</div>
    <div class="example-child mks-col-6 mks-col-3@md">4</div>
</mks-grid-system>
```

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

## Mixins
You can use this system with scss mixins instead of utility classes for better readability in the template.

- `.mks-grid` -> `@include grid`
- `.mks-grid-auto-{size}` -> `@include grid-auto($size: 'auto')` where $size is `'auto'`, `'xs'`, `'sm'`, `'md'`, `'lg'` or `'xl'`
- `.mks-grid-gap-{size}` -> `@include set-gap($size: 'none')` where $size can be `'xxxs'`, `'xxs'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'xxl'` or `'xxxl'`.
- `.mks-col-{amount}` -> `@include col($amount: 12)` where $amount is a number between 1 and 12
- `.mks-col-start` and `.mks-col-start-{amount}` -> `@include col-start($amount: 12)` where $amount is a number between 1 and 12
- `.mks-col-end` and `.mks-col-end-{amount}` -> `@include col-end($amount: 12)` where $amount is a number between 1 and 12


## "Real" world example
```jsx
<div class="page mks-grid">
    <mks-site-header class="mks-col-12"></mks-site-header>
    <main class="mks-col-12 mks-col-8@md">
        <mks-heading tag="h1" color="primary" class="mks-col-12">Hello world! </mks-heading>
        <div class="mks-grid-auto-md mks-grid-gap-md">
            <mks-card image="https://via.placeholder.com/500">
                <template v-slot:title>Basic card</template>
                <template v-slot:title-meta><mks-tag label="Type of content"></mks-tag></template>
                <template v-slot:description>Lorem ipsum dolor sit amet, quis nostrud exercitatiure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
            </mks-card>
            <mks-card image="https://via.placeholder.com/500" subtitle="This is a subtitle" subtitle-type="light">
                <template v-slot:title>Basic card</template>
                <template v-slot:title-meta><mks-tag label="Type of content"></mks-tag></template>
                <template v-slot:description>Lorem ipsum dolor sit amet, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
            </mks-card>
            <mks-card image="https://via.placeholder.com/500" subtitle="This is a subtitle" subtitle-type="light">
                <template v-slot:title>Basic card</template>
                <template v-slot:title-meta><mks-tag label="Type of content"></mks-tag></template>
                <template v-slot:description>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
            </mks-card>
            <mks-card image="https://via.placeholder.com/500" subtitle="This is a subtitle" subtitle-type="light">
                <template v-slot:title>Basic card</template>
                <template v-slot:title-meta><mks-tag label="Type of content"></mks-tag></template>
                <template v-slot:description>bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
            </mks-card>
        </div>
    </main>
    <aside class="mks-col-12 mks-col-4@md">
        <mks-heading tag="h2" color="secondary">Sidebar</mks-heading>
        <mks-alert type="positive">This is an alert </mks-alert>
        <div class="mks-grid mks-grid-gap-xs">
            <mks-text class="mks-col-12">Hello !</mks-text>
            <mks-button type="primary" class="mks-col-6">Accept</mks-button>
            <mks-button type="neutral" class="mks-col-6">Refuse </mks-button>
        </div>
    </aside>
    <mks-footer></mks-footer>
</div>

````

</docs>
