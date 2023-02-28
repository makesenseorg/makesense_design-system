<template>
  <div class="spacing-system"></div>
</template>
<script>
/** Guidelines and rules of the spacing system.
 * @version 1.3.0
 */
export default {
  name: "SpacingSystem"
};
</script>
<style lang="scss">
.spacer {
}
</style>
<docs>
## Introduction

Spacing is important because it gives rythm to the page.
It gives meaning by grouping elements visually, or by separating them.
<br><br>

We define in this guide 3 types of spacing :
- <mks-text weight="bold">[container spacing](#container)</mks-text>, which provides fixed layouts margins
- <mks-text weight="bold">[flow spacing](#flow)</mks-text>, to space elements between them
- and finally&nbsp;<mks-text weight="bold">[inner spacing](#inner)</mks-text>, which is used inside of an element

<img src="/assets/spacing.jpg" />

## Spacing scale <a name="scale"></a>
There are 9 different spacing values available across the system.

They are all accessible through SCSS and CSS variables. Respectively `$space-{value}` and `var(--space-{value})`.

Example : `$space-xxs`

<mks-spacer spacing="s">
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxxs); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxxs - 2px</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxs); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxs - 5px </mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xs); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xs - 10px </mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-s); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">s - 15px</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-m); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light" weight="bold">m - 20px (base value)</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-l); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">l - 30px</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xl); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xl - 40px</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxl); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxl - 60px </mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxxl); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxxl - 100px</mks-text>
  </mks-spacer>
</mks-spacer>

## 1. Container spacing <a name="container"></a>

<img src="/assets/spacing-container.jpg" /><br>


Use the mixin `container-spacing`
- is <mks-text weight="bold">centered</mks-text>,
- has a <mks-text weight="bold">fixed width</mks-text> (`$container-size` (1100px) on mobile and `$container-size-l` (1740px) on bigger screens)
- has responsive paddings (you can override it with <mks-text weight="bold">[inner spacing](#inner)</mks-text> mixin).

Use this mixin for pages where you want to draw attention to the content. For example, a blog post,

##### Use as a mixin (prefered method)

The mixin `@include container-spacing` takes one arguments :

- `$dense: false`, keeps the same container size `$container-size` (1100px) regardless of viewport width.


##### Use as a class

<mks-text weight="bold">Note: Only use one class maximum per element.</mks-text> If you have more than two utility classes, use the mixins in the `style` section instead.

- `mks-cs`
- `mks-cs-dense`

## 2. Flow spacing <a name="flow"></a>

<img src="/assets/spacing-flow.jpg" /><br>


See <mks-link class="link" to="mksspacer">Spacer component</mks-link> to stack and inline elements with varying spacing sizes.

<mks-link to="mksspacer"><mks-button size="small" type="neutral">Read Spacer documentation</mks-button></mks-link>

## 3. Inner spacing <a name="inner"></a>

<img src="/assets/spacing-inner.jpg" /><br>

The inner spacing mixins and class take two arguments : `value` (spacing scale) and `direction` (t, b, l, r, x, y).
<br><br>

##### There are 4 types of inner spacing :

- Square spacing : Equal on all four sides
- Horizontal spacing : Equal on `x` axis, left and right directions
- Vertical spacing : Equal on `y` axis, top and bottom directions
- Directional spacing : Applied only on one direction `t` for top, `b` for bottom, `l` for left and `r` for right

##### Using the mixins (prefered)

###### Square spacing
<pre>
  <code>
    @include inner-space;
  </code>
</pre>

###### Setting the value
You can specify the value by passing it as a first paramater. See <mks-text weight="bold">[spacing scale](#scale)</mks-text>.
<pre>
  <code>
    @include inner-space('s');
  </code>
</pre>

###### Setting the direction
`x` for the horizontal axis. `y` for the vertical axis.
`t` for top, `b` for bottom, `l` for left, `r` for right
<pre>
  <code>
    @include inner-space('s', 'x');
    // or
    @include inner-space($dir: 'x');
  </code>
</pre>


##### Using the classes

The logic of the class is as follow : `.mks-space-{direction*}-{value*}@{breakpoint*}` where direction is optional.

<mks-text weight="bold">Note 1: </mks-text> The classes might not work on certain components that have a padding already set in their scoped CSS because of specifity. In this case, use mixins.
<br><mks-text weight="bold">Note 2: </mks-text> Only use two utility class maximum per element. If you have more, use the mixins above in the `style` section instead.


```jsx
<span class="mks-space" style="display:inline-block;background:var(--color-neutral-80);display:inline-block;">
  .mks-space
</span>
<span class="mks-space-xs" style="display:inline-block;background:var(--color-neutral-80);">
  .mks-space-xxs
</span>
<span class="mks-space-y-xxxs mks-space-x-xl" style="display:inline-block;background:var(--color-neutral-80);">
  .mks-space-x-xs .mks-space-y-xl
</span>
<span class="mks-space-xxxs mks-space-xxxl@md" style="display:inline-block;background:var(--color-neutral-80);">
  .mks-space-xxxs mks-space-xxxl@md
</span>
````



</docs>
