<template>
  <component
    :is="'div'"
    class="hero"
    :class="[`hero--theme-${theme}`, `hero--size-${size}`]"
    :style="{
      backgroundColor: mainColor !== undefined ? mainColor : null,
      color: textColor !== undefined ? textColor : null,
      backgroundImage: beansImage
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
    <mks-separator class="hero__separator" v-if="separator"></mks-separator>
  </component>
</template>
<script>
import beans1 from "@@/assets/img/brand/beans-1.png";
import beans2 from "@@/assets/img/brand/beans-2.png";
import beans3 from "@@/assets/img/brand/beans-3.png";
import beans4 from "@@/assets/img/brand/beans-4.png";
import beans5 from "@@/assets/img/brand/beans-5.png";

const beansImageList = [null, beans1, beans2, beans3, beans4, beans5];
/**
 * Grab your user's attention with a catchy title right in the top of the page.
 * @version 1.4.0
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
      type: [Number, String]
    },
    /**
     * Show a separator at the bottom
     */
    separator: {
      type: Boolean,
      default: true
    },
    /**
     * Size variant of the header.
     * Introduced version 1.10.0
     */
    size: {
      type: String,
      default: "large"
    }
  },
  computed: {
    realBeans() {
      return this.beans || (this.theme === "secondary" ? 3 : 1);
    },
    beansImage() {
      const beanImageIndex = parseInt(this.realBeans) || 0;
      if (beansImageList[beanImageIndex]) {
        return `url(${beansImageList[beanImageIndex]})`;
      } else {
        return null;
      }
    }
  }
};
</script>
<style lang="scss">
.hero {
  @include inner-space($dir: "t");
  @include inner-space("l", "b");
  overflow: hidden;
  position: relative;
  background-size: cover;
  &--size-small {
    @include inner-space("s", "t");
    @include inner-space("m", "b");
  }

  @include breakpoint("small") {
    // padding-top: $space-xxl;
    // padding-bottom: $space-xxl;
    &--size-large {
      @include inner-space("xxl", "t");
      @include inner-space("xxl", "b");
    }

    background-position: right center;
  }

  &__container {
    flex-wrap: nowrap;
    .hero--size-large & {
      @include container-spacing;
    }
    .hero--size-small & {
      @include container-spacing(true);
      @include inner-space("m", "x");
    }
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
      &__title {
        @include title-large;
        font-weight: $font-weight-extrablack;
        margin-bottom: $space-l;

        .hero--size-small & {
          @include title-small;
          margin-bottom: $space-s;
        }

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

      &__uptitle {
        @include title-xsmall;
        margin-bottom: $space-m;
        .hero--size-small & {
          @include text-body-black;
          margin-bottom: $space-s;
        }
      }

      &__text {
        @include title-xsmall;
        font-weight: 600;
        line-height: 1.5em;
        .hero--size-small & {
          @include text-body-semibold;
        }
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

## Without separator

```jsx
<mks-hero
  title="Innovez dans votre organisation et blablabla..."
  theme="secondary"
  v-bind:separator="false">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</mks-hero>
```

## Size variant small

```jsx
<div style="max-width: 460px;margin:0 auto;">
<mks-hero
  title="Ne passez pas à côté de votre futur job !"
  theme="primary"
  beans="0"
  size="small">
    Recevez chaque jour les nouvelles annonces qui correspondent exactement à votre recherche.
</mks-hero>
</div>
```

</docs>
