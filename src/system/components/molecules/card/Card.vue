<template>
  <component
    :is="tag"
    :to="to ? to : ''"
    :href="href ? href : ''"
    :target="target"
    :class="`card${isElevated ? ' card--elevated' : ' card--flat'}`"
    @click="onClick"
    @click.native="onClick"
  >
    <div :class="`card__image card__image--cover-${imageFormat}`">
      <img class="card__cover" :src="image" />
      <img class="card__logotype" v-if="logo" :src="logo" />
      <div class="card__viewed" v-if="viewed"></div>
    </div>
    <div class="card__content">
      <div class="card__meta">
        <div class="card__title-wrapper">
          <div class="card__title">
            <!-- @slot The title of the card -->
            <slot name="title"></slot>
          </div>
          <!-- @slot Some meta to display on the right of the title -->
          <slot name="title-meta"></slot>
        </div>
        <div
          :class="`card__subtitle card__subtitle--${subtitleType}`"
          v-html="subtitle"
        ></div>
      </div>
      <div class="card__description">
        <!-- @slot Textual content -->
        <slot name="description"></slot>
      </div>
    </div>
    <div class="card__cta" v-if="callToAction">
      <mks-button type="primary" size="small">{{ callToAction }}</mks-button>
    </div>
  </component>
</template>
<script>
/**
 * A card can be used to display content with image and text. It is sometimes a link.
 */
export default {
  name: "MksCard",
  props: {
    /**
     * Tag to use for the card container : "router-link", "a", or "div"
     */
    tag: {
      type: String,
      required: false,
      default: "div",
      validator: function(value) {
        return ["router-link", "a", "div"].indexOf(value) !== -1;
      }
    },
    /**
     * If tag is "router-link" to is the route object to push on click
     */
    to: {
      type: [Object, String],
      required: false
    },
    /**
     * If tag is "a", href is the url
     */
    href: {
      type: String,
      required: false
    },
    /**
     * target prop, if tag is "a"
     */
    target: {
      type: String,
      required: false
    },
    /**
     * Url of the image to display
     */
    image: {
      type: String,
      required: true
    },
    /**
     * Displays a logotype in the cover. Url of the logotype
     */
    logo: {
      type: String,
      required: false
    },
    /**
     * Subtitle of the card
     */
    subtitle: {
      type: String,
      required: false
    },
    /**
     * Color of subtitle "default" or "light"
     */
    subtitleType: {
      type: String,
      required: false,
      validator: function(value) {
        return ["default", "light"].indexOf(value) !== -1;
      }
    },
    /**
     * If the card has a call to action, this is the label. Careful: the whole card is clickable, the link is on the container element. So to or href attribute need to be set with the correct tag.
     */
    callToAction: {
      type: String,
      required: false
    },
    /**
     * Color of the card: "default" or "inverted"
     */
    // color: {
    //   type: String,
    //   required: false,
    //   default: "default",
    //   validator: function(value) {
    //     return ["default", "inverted"].indexOf(value) !== -1;
    //   }
    // },
    /**
     * is the card elevated ?
     */
    isElevated: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * display a "viewed" tag in the cover
     */
    viewed: {
      type: Boolean,
      required: false
    },
    /**
     * Format of the image cover, default is 16:9, possible value "square"
     */
    imageFormat: {
      type: String,
      default: "default",
      required: false,
      validator: function(value) {
        return ["default", "square"].indexOf(value) !== -1;
      }
      // todo check if possible
      // validator regEx "chiffre : chiffre"
    }
  },
  methods: {
    onClick() {
      /**
       * Fires on card click.
       * @event click
       */
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  @include flex;
  @include link-reset;
  flex-direction: column;

  overflow: hidden;

  &--elevated {
    @include elevated-xxl;
    border-radius: $border-radius-base;

    .card__content,
    .card__cta {
      padding: $space-xxs $space-m $space-m $space-m;
    }
  }
}

.card__image {
  @include image-ratio(16, 9, ".card__cover");

  &--cover-square {
    @include image-ratio(1, 1, ".card__cover");
  }

  .card--flat & {
    @include elevated-xxl;
    border-radius: $border-radius-base;
  }
}

.card__cover,
.card__logotype {
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   background-position: 50%;
  //object-fit: cover;
}

.card__logotype {
  position: absolute;
  left: $space-m;
  bottom: $space-m;
  height: 3rem;
  width: 3rem;
  border-radius: $border-radius-full;
  overflow: hidden;
}
.card__viewed {
  // todo
}
.card__content {
  flex-grow: 1;
}
.card__meta {
  padding-top: $space-s;
  padding-bottom: $space-s;
}

.card__title-wrapper {
  @include flex;
  align-items: center;
  justify-content: space-between;
}

.card__title {
  @include text-large-black;
}

.card__subtitle,
.card__description {
  @include text-small;
  margin-top: $space-xxs;

  &--light {
    color: $color-text-light;
  }
}

.card__cta {
  margin-top: auto;
  text-align: center;
}
</style>
<docs>
## Flat card without link

```jsx
<mks-card image="https://via.placeholder.com/500" subtitle="This is a subtitle" subtitle-type="light">
    <template v-slot:title>Basic card</template>
    <template v-slot:title-meta><mks-tag label="Type of content"></mks-tag></template>
    <template v-slot:description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
</mks-card>

```

## Elevated card with link

```jsx
<mks-card image="https://via.placeholder.com/500" tag="router-link" to="/path" v-bind:is-elevated="true" subtitle="This is a subtitle" subtitle-type="light" call-to-action="Read">
    <template v-slot:title>Elevated card with router-link</template>
    <template v-slot:description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
</mks-card>

```

## Square image

```jsx
<mks-card image="https://via.placeholder.com/500" image-format="square">
    <template v-slot:title>Square image</template>
    <template v-slot:description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</template>
</mks-card>

```

</docs>
