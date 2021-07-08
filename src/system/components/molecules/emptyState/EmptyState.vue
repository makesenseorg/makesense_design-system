<template>
  <div class="mksemptystate">
    <!-- classes v -->
    <div class="mksemptystate__container">
      <img
        v-if="imageVisible"
        alt="image non affichée"
        class="content__cover"
        :src="image"
      />
      <!-- @slot The header that you want. By default, it is a mks-heading with tag h3 -->
      <slot name="header mks-space-xxs">
        <mks-heading v-if="heading" tag="h3" class="content__heading">{{
          heading
        }}</mks-heading>
      </slot>
      <div class="content__description">
        <!-- @slot The description that you want to add -->
        <slot v-if="$slots.description" name="description"></slot>
      </div>
      <div v-if="$slots.cta" class="content__cta mks-space-xl">
        <!-- @slot The call to action that you want to add -->
        <slot name="cta"></slot>
      </div>
    </div>
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
    }
  }
};
</script>
<style lang="scss" scoped>
.mksemptystate {
  text-align: center;
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
    <template v-slot:cta><mks-button>Crée ton projet ici !</mks-button></template>
</mks-empty-state>
```
## Empty State with custom image

```jsx
<mks-empty-state heading="Dommage..." image="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/red-heart_2764-fe0f.png">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
    <template v-slot:cta><mks-button>Crée ton projet ici !</mks-button></template>
</mks-empty-state>
```
</docs>
