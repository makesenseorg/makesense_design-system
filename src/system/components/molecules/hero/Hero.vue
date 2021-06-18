<template>
  <component
    :is="'div'"
    class="hero"
    :class="['hero--theme-' + theme, beans === 0 ? 'hero--no-bean' : '']"
    :style="{
      backgroundColor: mainColor !== undefined ? mainColor : null,
      color: textColor !== undefined ? textColor : null,
      backgroundImage:
        beans !== 0
          ? `url(${require(`@@/assets/img/brand/beans-${this.beans}.png`)})`
          : null
    }"
  >
    <!-- classes v -->
    <div class="hero__container layout__section layout__section--v-equal">
      <div class="hero__content">
        <div class="content__uptitle" v-if="uptitle">{{ uptitle }}</div>
        <mks-heading
          v-if="title"
          :tag="titleTag"
          :style="{
            color: textColor !== undefined ? textColor : null
          }"
          class="content__title"
        >
          {{ title }}
        </mks-heading>
        <div class="content__text"><slot></slot></div>
      </div>
    </div>
    <mks-separator class="hero__separator"></mks-separator>
  </component>
</template>
<script>
/**
 * Grab your user's attention with a catchy title right in the top of the page.
 */
export default {
  name: "MksHero",
  props: {
    /**
     * A small headline before the title
     */
    uptitle: {
      required: false,
      type: String
    },
    /**
     * Catchy title for your Hero section.
     */
    title: {
      required: false,
      type: String
    },
    /**
     * Semantic tag for the title element.
     */
    titleTag: {
      required: false,
      type: String,
      default: "h1"
    },
    /**
     * Background and text color theme. `primary` or `secondary`
     */
    theme: {
      required: false,
      type: String,
      default: "default"
    },
    /**
     * Override the background color
     */
    mainColor: {
      required: false,
      type: String
    },
    /**
     * Override the title color
     */
    textColor: {
      required: false,
      type: String
    },
    /**
     * Variant of beans to show. Use 0 for no beans, or 1 to 5 for different variants
     */
    beans: {
      type: [Number, String],
      default: function() {
        return this.theme === "secondary" ? 3 : 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.hero {
  overflow: hidden;
  padding-top: $space-m;
  padding-bottom: $space-l;
  position: relative;
  background-size: cover;

  @include breakpoint("small") {
    padding-top: $space-xxl;
    padding-bottom: $space-xxxl;
  }

  &__image {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 0;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    &::after {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      content: " ";
      transition: background-color 0.2s;
    }
  }

  &:hover {
    .hero__image {
      &::after {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  &__container {
    flex-wrap: nowrap;
    @include workspace($equal: true);
  }

  &__content {
    flex: 1 1 0%;
  }

  &__content {
    flex-basis: 62.8%;
    max-width: 900px;
    position: relative;
    z-index: 1;

    .content {
      &__uptitle {
        @include title-xsmall;
        margin-bottom: $space-m;
      }

      &__title {
        @include title-large;
        font-weight: $font-weight-extrablack;
        margin-bottom: $space-l;

        img {
          height: 1em;
          width: auto;
          margin-right: $space-s;
          @include border-radius;
          object-fit: cover;
          background-color: $color-neutral-100;
          display: inline-block;
        }
      }

      &__text {
        @include title-xsmall;
        font-weight: 600;
        line-height: 1.5em;
      }
    }
  }

  &--theme {
    &-primary {
      background-color: $color-primary;

      .content {
        &__uptitle {
          color: $color-primary-inverse;
        }

        &__title {
          color: $color-primary-inverse;
          color: $color-flame-pea;
          line-height: $line-height-s;
        }

        &__text {
          color: $color-primary-inverse;
        }
      }
    }

    &-secondary {
      background-color: $color-secondary;

      @include breakpoint("small", "max") {
        background-image: none;
      }

      @include breakpoint("small") {
        background-image: url("~@@/assets/img/brand/beans-3.png");
        background-position: 50%;
      }

      .content {
        &__uptitle {
          color: $color-primary;
        }

        &__title {
          color: $color-parsley;
          line-height: $line-height-s;
        }

        &__text {
          color: $color-secondary-inverse;
        }
      }
    }
  }
}
</style>

<docs>
## Basic hero

```jsx
<mks-hero 
  uptitle="Le petit uptitle qui est cool"
  title="Innovez dans votre organisation et blablabla..."
  title-tag="h3"
  theme="primary">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</mks-hero>
```

## Custom colors
You can use the CSS variables to apply custom makesense colors easily.

```jsx
<mks-hero 
  title="Innovez dans votre organisation et blablabla..."
  theme="secondary"
  text-color="var(--color-cerise)">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</mks-hero>
```


## Custom beans
Variant of beans to show. Use 0 for no beans, or 1 to 5 for different variants

```jsx
<mks-hero 
  title="Innovez dans votre organisation et blablabla..."
  v-bind:beans="2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</mks-hero>
```

</docs>
