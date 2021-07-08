<template>
  <component :is="'div'" class="mksemptystate">
    <!-- classes v -->
    <div
      class="mksemptystate__container layout__section layout__section--v-equal"
    >
      <div class="mksemptystate__content">
        <img class="content__cover" :src="image" />
        <mks-heading v-if="heading" tag="h3" class="content__heading">{{
          heading
        }}</mks-heading>
        <div class="content__description">
          <!-- @slot The description that you want to add -->
          <slot name="description"></slot>
        </div>
        <div class="content__cta">
          <!-- @slot The call to action that you want to add -->
          <slot name="cta"></slot>
        </div>
      </div>
    </div>
  </component>
</template>
<script>
/**
 * Tell your users there is nothing here...
 * @version 1.4.0
 */
export default {
  name: "EmptyState",
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
    }
  }
};
</script>
<style lang="scss" scoped>
.mksemptystate {
  text-align: center;
}
.content__cta {
  padding-top: 1em;
}
</style>

<docs>
## Basic Empty State

```jsx
<empty-state heading="Dommage...">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
</empty-state>
```
## Empty State with Call to Action

```jsx
<empty-state heading="Dommage...">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
    <template v-slot:cta><mks-button>Crée ton projet ici !</mks-button></template>
</empty-state>
```
## Empty State with custom image

```jsx
<empty-state heading="Dommage..." image="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/red-heart_2764-fe0f.png">
    <template v-slot:description>Il serait temps de te créer un projet !</template>
    <template v-slot:cta><mks-button>Crée ton projet ici !</mks-button></template>
</empty-state>
```
</docs>
