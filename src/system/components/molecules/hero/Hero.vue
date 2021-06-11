<template>
  <component
    :is="'div'"
    class="hero"
    :class="['hero--theme-' + theme]"
    :style="{
      backgroundColor: mainColor !== undefined ? mainColor : null,
      color: textColor !== undefined ? textColor : null
    }"
  >
    <div class="hero__container layout__section layout__section--v-equal">
      <div class="hero__image" v-if="image"><img :src="image" /></div>
      <div class="hero__content">
        <div class="content__uptitle" v-if="uptitle">{{ uptitle }}</div>
        <component
          :is="titleTag"
          class="content__title"
          v-if="title"
          :style="{
            color: textColor !== undefined ? textColor : null
          }"
          ><img :src="titleImage" v-if="titleImage" />{{ title }}</component
        >
        <div class="content__text"><slot></slot></div>
      </div>
    </div>
    <svg
      class="hero__separator"
      xmlns="http://www.w3.org/2000/svg"
      width="3258"
      height="10"
      viewBox="0 0 3258 10"
    >
      <path
        d="M0 10L162.9 0l162.9 10zm651.6 0L488.7 0 325.8 10zm325.8 0L814.5 0 651.6 10zm325.8 0L1140.3 0 977.4 10zm325.8 0L1466.1 0l-162.9 10zm325.8 0L1791.9 0 1629 10zm325.8 0L2117.7 0l-162.9 10zm325.8 0L2443.5 0l-162.9 10zm325.8 0L2769.3 0l-162.9 10zm325.8 0L3095.1 0l-162.9 10z"
      ></path>
    </svg>
  </component>
</template>
<script>
export default {
  name: "MksHero",
  props: {
    uptitle: {
      required: false,
      type: String
    },
    title: {
      required: false,
      type: String
    },
    titleTag: {
      required: false,
      type: String,
      default: "h1"
    },
    tracking: {
      required: false,
      type: Object
    },
    theme: {
      required: false,
      type: String,
      default: "default"
    },
    to: {
      required: false,
      type: String
    },
    image: {
      required: false,
      type: String
    },
    titleImage: {
      required: false,
      type: String
    },
    button: {
      required: false,
      type: String
    },
    mainColor: {
      required: false,
      type: String
    },
    textColor: {
      required: false,
      type: String
    }
  },
  created() {},
  methods: {}
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
    background-image: url("~@@/assets/img/brand/background_9.png");
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

  &__separator {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;

    path {
      fill: $color-neutral-100;
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

      @include breakpoint("small") {
        background-image: url("~@@/assets/img/brand/background_8.png");
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
<mks-hero title="Innovez dans votre organisation et blablabla...">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</mks-hero>

```

</docs>
