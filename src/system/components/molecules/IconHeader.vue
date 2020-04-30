<template>
  <header class="icon-header">
    <img class="icon-header__illustration" :src="image" :alt="alt" />
    <mks-heading
      :tag="titleTag"
      class="icon-header__title"
      v-html="title"
    ></mks-heading>
    <p
      v-if="description"
      :class="
        `icon-header__description icon-header__description--${descriptionType}`
      "
      v-html="description"
    ></p>
    <!-- @slot displays content after the description -->
    <slot></slot>
  </header>
</template>
<script>
/**
 * Icon Header is used in the beginning of section to display an image, a title and a description
 * @version 1.0.0
 */
export default {
  name: "MksIconHeader",
  props: {
    /**
     * url of the image or illustration to display
     */
    image: {
      type: String,
      required: true
    },
    /**
     * alt of the image or illustration to display
     */
    alt: {
      type: String,
      required: false
    },
    /**
     * Content of the component heading
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Tag of the heading
     */
    titleTag: {
      type: String,
      required: false,
      default: "h2",
      validator: el => ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(el) !== -1
    },
    /**
     * Content of the component (html)
     */
    description: {
      type: String,
      required: false
    },
    /**
     * "default" or "light"
     */
    descriptionType: {
      type: String,
      required: false,
      validator: el => ["default", "light"].indexOf(el) !== -1
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-header {
  text-align: center;
  margin-bottom: $space-xl;
  max-width: 525px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.icon-header__illustration {
  width: 150px;
  height: auto;
  max-height: 150px;
  object-fit: contain;
}

.icon-header__title {
  @include title-large;
  margin-top: $space-m;
  margin-bottom: $space-xs;
}
.icon-header__description {
  @include text-body;
  margin-bottom: $space-m;

  &--light {
    color: $color-text-light;
  }
}
</style>
<docs>

## Basic icon header

```jsx
<mks-icon-header image="http://via.placeholder.com/150" title="An Icon Header" description="Some description which supports <em>html</em> tags.">
</mks-icon-header>
```

## Icon header with slot

```jsx
<mks-icon-header image="http://via.placeholder.com/150" title="With call to action" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.">
    <mks-button>Call to action</mks-button>
</mks-icon-header>
```

</docs>
