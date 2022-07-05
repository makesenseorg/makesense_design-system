<template>
  <div
    class="tag"
    :class="
      `tag--color-${color} tag--size-${size} tag--${isCliquable} tag--style-${variant}`
    "
    :role="isCliquable ? 'button' : undefined"
    :style="
      `--color: var(--color-${color}); 
      --color-hover: ${hoverColor}; 
      --color-inverse: var(--color-${contrastColor})`
    "
    @click="onClick"
  >
    <mks-icon
      v-if="icon && iconLeft"
      class="tag__icon tag__icon--left"
      :type="icon"
      :alt="iconAlt"
      :size="10"
    ></mks-icon>
    <slot>{{ formattedLabel }}</slot>
    <mks-icon
      v-if="icon && !iconLeft"
      class="tag__icon tag__icon--right"
      :type="icon"
      :alt="iconAlt"
      :size="10"
    ></mks-icon>
  </div>
</template>

<script>
import Vue from "vue";
/**
 * Tags are used for small informations or taxonomies.
 * @version 0.1.0
 */
export default {
  name: "MksTag",
  props: {
    /**
     * Any of the design tokens colors and these : 
            "neutral",
            "positive",
            "warning",
            "negative"
     */
    color: {
      type: String,
      required: false,
      default: "neutral",
      validator: function(value) {
        return (
          Vue.prototype.$colorExists(value) ||
          ["positive", "negative", "warning", "neutral"].indexOf(value) !== -1
        );
      }
    },
    /**
     * Size of the tag : "small" or "medium"
     */
    size: {
      type: String,
      required: false,
      default: "medium",
      validator: function(value) {
        return ["medium", "small"].indexOf(value) !== -1;
      }
    },
    /**
     * Style of the tag : full(default), ghost, bare
     */
    variant: {
      type: String,
      default: "full",
      validator: function(value) {
        return ["full", "ghost", "bare"].indexOf(value) !== -1;
      }
    },
    /**
     * Text of the tag
     */
    label: {
      type: String,
      required: false
    },
    /**
     * Should the text be truncated if too long
     */
    trunc: {
      type: Boolean,
      default: true
    },
    /**
     * Icon displayed on the right of the tag : "close" or "check"
     */
    icon: {
      type: String,
      required: false
    },
    /**
     * Icon description
     */
    iconAlt: {
      type: String,
      required: false
    },
    /**
     * Display icon on the left side of the Tag
     */
    iconLeft: {
      type: Boolean,
      required: false
    },
    /**
     * Should the tag be cliquable
     */
    cliquable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isCliquable() {
      return this.cliquable ? "cliquable" : "not-cliquable";
    },
    formattedLabel() {
      if (!this.label) return "-No label-";
      if (!this.trunc) return this.label;

      if (this.label.length > 30) return this.label.substring(0, 30) + "...";
      else return this.label;
    },
    contrastColor() {
      return this.$getContrastColor(this.color);
    },
    hoverColor() {
      return this.$getHoverColor(this.color);
    }
  },
  methods: {
    onClick: function() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  @include border-round;
  @include text-small;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  font-weight: $font-weight-extrabold;
  padding: 0.35em 0.625em;
  background-color: var(--color);
  border-color: var(--color);
  color: var(--color-inverse);
  border: 2px solid var(--color);
  transition: all 0.2s ease;

  &--cliquable {
    cursor: pointer;
    &:hover {
      background-color: var(--color-hover);
      border-color: var(--color-hover);
    }
  }

  &--color-neutral {
    --color: var(--color-neutral-80) !important;
    --color-inverse: var(--color-neutral-20) !important;
    --color-hover: var(--color-neutral-70) !important;

    &.tag--style-ghost {
      background-color: transparent;
      border-color: var(--color-neutral-80);
      color: var(--color-inverse);
      &:hover {
        background-color: var(--color);
      }
    }
  }

  &--style-full {
    background-color: var(--color);
    border-color: var(--color);
    color: var(--color-inverse);
  }
  &--style-ghost {
    background-color: transparent;
    border-color: var(--color);
    color: var(--color);
  }
  &--style-bare {
    background-color: transparent;
    border-color: transparent;
    color: var(--color-inverse);
    padding: 0.35em 0.15em;
    &:hover {
      background: transparent;
      border-color: transparent;
      text-decoration: underline;
    }
  }

  &--color-positive {
    --color: var(--color-success) !important;
    --color-inverse: var(--color-success-inverse) !important;
    --color-hover: var(--color-success-active) !important;
  }

  &--color-warning {
    --color: var(--color-warning) !important;
    --color-inverse: var(--color-warning-inverse) !important;
    --color-hover: var(--color-warning-active) !important;
  }

  &--color-negative {
    --color: var(--color-danger) !important;
    --color-inverse: var(--color-danger-inverse) !important;
    --color-hover: var(--color-danger-active) !important;
  }

  &--size-small {
    @include text-xsmall;
    line-height: 1;
  }

  &--not-cliquable {
    pointer-events: none;
  }
}

.tag__icon {
  color: inherit;
  transform: scale(1.5);
  &--left {
    margin-right: $space_xxs;
  }
  &--right {
    margin-left: $space_xxs;
  }
}
</style>
<docs>
## Variants
```jsx
  <mks-tag label="Full" variant="full" v-bind:cliquable="true"></mks-tag>
  <mks-tag label="Ghost" variant="ghost" color="neutral" v-bind:cliquable="true"></mks-tag>
  <mks-tag label="Bare" variant="bare" v-bind:cliquable="true"></mks-tag>
```

## Colors
  ```jsx
    <mks-tag label="Neutral (default)"></mks-tag>

    <mks-text tag="p">Theme colors</mks-text>
    <mks-tag label="Primary" color="primary" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Secondary" color="secondary" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Tertiary" color="tertiary" v-bind:cliquable="true"></mks-tag><br><br>

    <mks-text tag="p">Feedback colors</mks-text>
    <mks-tag label="Positive" color="positive" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Warning" color="warning" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Negative" color="negative" v-bind:cliquable="true"></mks-tag><br><br>

    <mks-text tag="p">Other brand colors<br>
      <mks-text tag="span" size="small" color="light">All the colors in design tokens are available.</mks-text>
    </mks-text>
    
    <mks-tag label="Neutral 20" color="neutral-20" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Brick red" color="brick-red" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Atlantis" color="atlantis" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Sahara sand" color="sahara-sand" v-bind:cliquable="true"></mks-tag><br><br>
    
  ```

## Sizes
```jsx
    <mks-tag label="Small" size="small"></mks-tag>
    <mks-tag label="Medium (default)" size="medium"></mks-tag>
  ```

## With icons
```jsx
    <mks-tag label="No icon" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Close icon" icon="x" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Check icon" icon="check" v-bind:cliquable="true"></mks-tag>
    <br>
    <mks-tag label="No icon" icon-left v-bind:cliquable="true" size="small"></mks-tag>
    <mks-tag label="Filter icon" icon-left icon="filter" v-bind:cliquable="true" size="small"></mks-tag>
    <mks-tag label="Search icon" icon-left icon="search" v-bind:cliquable="true" size="small"></mks-tag>
  ```

## Truncated
```jsx
    <mks-tag label="A super long label that needs to be truncated" v-bind:trunc="true"></mks-tag>
  ```
</docs>
