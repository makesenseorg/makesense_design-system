<template>
  <div class="empty-state">
    <!-- classes v -->
    <mks-spacer spacing="l" class="empty-state__container">
      <img
        v-if="imageVisible"
        :alt="imageAlt"
        class="empty-state__cover"
        :src="image"
      />
      <mks-spacer spacing="xxs">
        <!-- @slot The header that you want. By default, it is a mks-heading with tag h3 -->
        <slot name="header">
          <mks-heading v-if="heading" tag="h3" class="empty-state__heading">{{
            heading
          }}</mks-heading>
        </slot>
        <div v-if="$slots.description" class="empty-state__description">
          <!-- @slot The description that you want to add -->
          <slot name="description"></slot>
        </div>
      </mks-spacer>
      <slot></slot>

      <div v-if="$slots.cta" class="empty-state__cta">
        <!-- @slot The call to action that you want to add -->
        <slot name="cta"></slot>
      </div>
    </mks-spacer>
  </div>
</template>
<script>
/**
 * Tell your users there is nothing here...
 * @version 1.4.0
 */
export default {
  name: "MksEmptyState",
  props: {
    /**
     * A heading for your empty state
     */
    heading: {
      required: false,
      type: String
    },
    /**
     * A custom image that you can add
     */
    image: {
      required: false,
      default:
        "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/loudly-crying-face_1f62d.png",
      type: String
    },
    /**
     * The visibility of your image
     */
    imageVisible: {
      required: false,
      default: true,
      type: Boolean
    },
    /**
     * The alt of your image
     */
    imageAlt: {
      required: false,
      default: "image non affichée",
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.empty-state {
  text-align: center;
}
.empty-state__cover {
  max-width: 20em;
  max-height: 20em;
}
</style>

<docs>
## Basic Empty State

```jsx
<mks-empty-state heading="Dommage...">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
</mks-empty-state>
```
## Basic Empty State without image

```jsx
<mks-empty-state heading="Dommage..." v-bind:image-visible="false">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
</mks-empty-state>
```
## Empty State with Call to Action

```jsx
<mks-empty-state heading="Dommage...">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
    <template v-slot:cta><mks-button>Crée ton projet</mks-button></template>
</mks-empty-state>
```
## Empty State with custom image

```jsx
<mks-empty-state heading="Dommage..." image="https://events-2021.staging.makesense.org/_nuxt/img/hiking.9630438.png">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
    <template v-slot:cta><mks-button>Crée ton projet</mks-button></template>
</mks-empty-state>
```
</docs>
