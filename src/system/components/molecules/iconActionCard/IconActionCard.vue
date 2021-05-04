<template>
  <div
    :is="actionLink ? 'router-link' : 'div'"
    :class="[
      'card',
      sizeSmall ? 'card--size-small' : '',
      fixedBorder ? 'card--fixed-border' : 'card--moving-border',
      actionLink ? 'card--cliquable' : '',
      theme ? `card--theme-${theme}` : ''
    ]"
    :to="actionLink"
    :aria-labelledby="`iac-title-${uniqueId}`"
    :aria-describedby="`iac-description-${uniqueId}`"
  >
    <mks-icon v-if="icon" :type="icon" class="card__icon" />
    <div v-else :class="roundedImage ? 'card__rounded-image' : ''">
      <img
        v-if="image"
        :class="roundedImage ? '' : 'card__image'"
        :src="image"
        :alt="`Logo`"
      />
    </div>
    <div class="card__content">
      <p class="card__name" :id="`iac-title-${uniqueId}`" v-html="name"></p>
      <p class="card__status" v-if="status && showButton">{{ status }}</p>
      <p
        :class="`card__description `"
        :id="`iac-description-${uniqueId}`"
        v-if="description"
      >
        {{ description }}
      </p>
    </div>
    <div
      v-if="showButton"
      :class="hideButtonOnMobile ? 'card__action-responsive' : 'card__action'"
    >
      <mks-button
        @click.native="onClick"
        :type="buttonType"
        size="small"
        :disabled="loadingState === 'PENDING'"
        :loading="loadingState === 'PENDING'"
      >
        {{ buttonLabel }}
        <template v-slot:loading>{{ $MKSlocale["loading"] }}</template>
      </mks-button>
    </div>
    <div v-else-if="status" class="card__action card__status">
      {{ status }}
    </div>
  </div>
</template>

<script>
/**
 * IconActionCard can be used to provide a list of actionable items with title, image or icon, and description
 */
export default {
  name: "MksIconActionCard",
  props: {
    sizeSmall: {
      type: Boolean
    },
    fixedBorder: {
      type: Boolean
    },
    /**
     * theme of the left border
     */
    theme: {
      type: String,
      validator: function(value) {
        return (
          [
            "primary",
            "secondary",
            "tertiary",
            "neutral",
            "positive",
            "warning",
            "negative"
          ].indexOf(value) !== -1
        );
      }
    },
    /**
     * use icon instead of image
     */
    icon: {
      type: String
    },
    /**
     * if no icon provided, use image
     */
    image: {
      type: String
    },
    /**
     * is the image rounded
     */
    roundedImage: {
      type: Boolean
    },
    name: {
      type: String,
      default: "Pas de nom"
    },
    description: {
      type: String
    },
    /**
     * Text under the title or on the right if no button label is specified
     */
    status: {
      type: String
    },
    /**
     * default or positive
     */
    statusType: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "positive"].indexOf(value) !== -1;
      }
    },
    /**
     * vue route object, makes the entire card cliquable
     */
    actionLink: {
      type: Object
    },
    hideButtonOnMobile: {
      type: Boolean
    },
    buttonType: {
      type: String,
      default: "primary",
      validator: function(value) {
        return (
          [
            "primary",
            "secondary",
            "tertiary",
            "neutral",
            "positive",
            "warning",
            "negative"
          ].indexOf(value) !== -1
        );
      }
    },
    buttonLabel: {
      type: String
    }
  },
  data() {
    return {
      loadingState: null,
      uniqueId: Math.random()
        .toString(36)
        .substr(2, 9)
    };
  },
  computed: {
    showButton() {
      return this.buttonLabel;
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
      //this.loadingState = "PENDING";
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -$space-m;
  margin-right: -$space-m;
  margin-bottom: $space-xs;
  padding: $space-xs $space-m;
  transition: all 0.1s ease;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.05);

  @include breakpoint("small") {
    flex-wrap: nowrap;
    padding: $space-m $space-m;
    border-radius: 10px;
    border-bottom: none;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center;
    background: $color-secondary;
    border-radius: $border-radius-full;
    width: 8px;
    transition: all 0.1s ease-out 0.1s;
  }

  &:hover:before {
    opacity: 1;
    transform: scaleY(1);
    transition: all 0.2s ease-out;
  }
}

.card--fixed-border:before {
  opacity: 1;
  transform: scaleY(1);
}

.card--theme-neutral:before {
  background: $color-neutral-80;
}

.card--theme-primary:before {
  background: $color-primary;
}

.card--theme-secondary:before {
  background: $color-secondary;
}

.card--theme-tertiary:before {
  background: $color-tertiary;
}

.card--theme-positive:before {
  background: $color-success;
}

.card--theme-danger:before {
  background: $color-danger;
}

.card--theme-negative:before {
  background: $color-danger;
}

.card--size-small {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: -$space-m;
  margin-right: -$space-m;
  margin-bottom: $space-s;
  padding: $space-s;
  transition: all 0.1s ease;
  color: inherit;
  text-decoration: none;
  background: #ffffff;
  box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.05);

  @include breakpoint("small") {
    flex-wrap: nowrap;
    margin-bottom: $space-m;
    padding: $space-s $space-s;
    border-radius: 10px;
    border-bottom: none;
  }
}

.card__rounded-image {
  flex-shrink: 0;
  background: $color-neutral-50;
  width: $space-xl;
  height: $space-xl;
  margin-right: $space-xl;
  border-radius: $border-radius-full;
  overflow: hidden;

  img {
    max-width: 100%;
  }
}

.card__image {
  width: $space-xl;
  margin-right: $space-s;
  margin-left: $space-s;
}

.card__icon {
  width: $space-l;
  height: $space-l;
  margin-right: $space-m;
  margin-left: $space-m;
  color: $color-text;
}

.card__name {
  @include text-large;
  font-weight: $font-weight-extrabold;

  .highlight,
  span {
    @include highlight;
  }
}
.card__content {
  max-width: 80%;

  @include breakpoint("small") {
    max-width: 60%;
  }
}
.card__description {
  margin-top: $space-xxs;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  line-height: normal;
  max-height: 2.2rem; // magic number : 1rem * 2 lines * 1.2 line-height
}
.card__status {
  color: $color-success;
  line-height: 1.2;
}
.card__action {
  margin: $space-m auto $space-xs;
  width: 100%;
  text-align: center;

  @include breakpoint("small") {
    margin-left: auto;
    margin-right: 0;
    width: auto;
    text-align: initial;
  }
}

.card__action-responsive {
  display: none;

  @include breakpoint("small") {
    display: inline;
    margin-left: auto;
    margin-right: 0;
    width: auto;
    text-align: initial;
  }
}
</style>
<style lang="scss">
.highlight {
  @include highlight;
}
</style>
<docs>
## Basic 
```jsx
<mks-icon-action-card icon="lock" name="A locked item" description="some text about the card" button-label="Unlock"></mks-icon-action-card>
```

## Small
```jsx
<mks-icon-action-card v-bind:size-small="true" icon="lock" name="A small locked item" description="some text about the card" button-label="Unlock"></mks-icon-action-card>
```

## Fixed border
```jsx
<mks-icon-action-card v-bind:fixed-border="true" icon="lock" name="A locked item with fixed border" description="some text about the card" button-label="Unlock"></mks-icon-action-card>
```

## Themed
```jsx
<mks-icon-action-card theme="tertiary" v-bind:fixed-border="true" icon="lock" name="A locked item with a theme" description="some text about the card" button-label="Unlock"></mks-icon-action-card>
```

## Cliquable card
```jsx
<mks-icon-action-card v-bind:action-link="{path: '/'}" icon="lock" name="It's unlocked !" description="some text about the card" status="It is already unlocked" button-type="positive"></mks-icon-action-card>
```

## Status and button
```jsx
<mks-icon-action-card icon="lock" name="It's unlocked !" description="some text about the card" button-label="View" status="It is already unlocked" button-type="positive"></mks-icon-action-card>
```

## Status without button
```jsx
<mks-icon-action-card icon="lock" name="It's unlocked !" description="some text about the card" status="It is already unlocked" button-type="positive"></mks-icon-action-card>
```

## Image instead of icon
```jsx
<mks-icon-action-card image="https://via.placeholder.com/100" name="It's unlocked !" description="some text about the card" status="It is already unlocked" button-type="positive"></mks-icon-action-card>
```

</docs>
