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
<style lang="scss" scoped>
.spacer {
}
</style>
<docs>
## Introduction 

Spacing is important because it gives rythm to the page. 
It gives meaning by grouping elements visually, or by separating them. 

We define in this guide <mks-text weight="bold">[container spacing](#container)</mks-text> which provides fixed layouts margins, <mks-text weight="bold">[flow spacing](#flow)</mks-text> to space elements between them, and finally <mks-text weight="bold">[inner spacing](#inner)</mks-text> which is used inside of an element.

<img src="https://i.imgur.com/GkmqW56.jpg" />

## Spacing scale
There are 9 different spacing values available across the system.

The values are all accessible through SCSS and CSS variables. Respectively `$space-{value}` and `var(--space-{value})`.

<mks-spacer spacing="s">
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxxs); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxxs</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxs); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxs</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xs); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xs</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-s); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">s</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-m); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">m</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-l); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">l</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xl); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xl</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxl); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxl</mks-text>
  </mks-spacer>
  <mks-spacer inline align="center" spacing="xs">
    <span style="display: inline-block; width: var(--space-xxxl); height:1.5rem; background:var(--color-primary)"></span>
    <mks-text size="small" color="light">xxxl</mks-text>
  </mks-spacer>
</mks-spacer>

## 1. Container spacing <a name="container"></a>

Use the mixin `container-spacing` or the class `.mks-cs` to provide by default a layout that is 
- centered, 
- fixed sized (`$container-size` on mobile and `$container-size-l` on bigger screens)
- slightly padded on the `x` axis.
- particularly useful for content-first pages such as articles.

### Use as a mixin

The mixin `@include container-spacing` takes three arguments : 

- `$vertical: false`, adds a big padding to the bottom of the page 
- `$dense: false`, keeps the same container size `$container-size` regardless of viewport width.
- `$equal: false`, has equal top and bottom padding


### Use as a class
The class has these modifiers: 
- `mks-cs`
- `mks-cs-vertical` or `mks-cs-vertical-dense`
- `mks-cs-equal` or `mks-cs-equal-dense`
- `mks-cs-dense` 

## 2. Flow spacing <a name="flow"></a>

See <mks-link class="link" to="mksspacer">Spacer component</mks-link> to stack and inline elements with varying spacing sizes.

<mks-button to="mksspacer" size="small" type="neutral">Read Spacer documentation</mks-button>

## 3. Inner spacing <a name="inner"></a>

This is handled via utility classes and mixins. 

The inner spacing classes and mixins take two arguments : `value` and `direction` (t, b, l, r, x, y).

- Square spacing : Equal on all four sides
- Horizontal spacing : Equal on `x` axis, left and right directions
- Vertical spacing : Equal on `y` axis, top and bottom directions
- Directional spacing : Applied only on one direction `t` for top, `b` for bottom, `l` for left and `r` for right

### Using the mixins

In order to apply inner spacing to an element, you can use `@include inner-spacing` which apply an equal padding of `m` value in all directions.

You can specify the value by passing it as a first paramater `@include inner-spacing("s")`.

You can also specify the direction like so `@include inner-spacing("s", "x")` or `@include inner-spacing($dir: "x")`


### Using the classes 

`.mks-s{direction*}-{value}{breakpoint}` where direction is optional.

Exemples : 
- Square spacing of xs value : `.mks-s-xs`
- Horizontal spacing of m value : `.mks-sx`
- Vertical spacing of xxl value:  `.mks-sy-xxl`
- Directional spacing of m value: `.mks-st`

</docs>
