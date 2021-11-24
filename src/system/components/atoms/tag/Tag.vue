<template>
  <div
    class="tag"
    :class="`tag--color-${color} tag--size-${size} tag--${isCliquable}`"
    :role="isCliquable ? 'button' : undefined"
    :style="
      `--color: var(--color-${color}); 
      --color-inverse: var(--color-${contrastColor})`
    "
    @click="onClick"
  >
    <slot>{{ formattedLabel }}</slot>
    <mks-icon
      v-if="icon"
      class="tag__icon"
      :type="icon"
      :alt="iconAlt"
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
      required: false,
      validator: function(value) {
        return ["x", "check"].indexOf(value) !== -1;
      }
    },
    /**
     * Icon description
     */
    iconAlt: {
      type: String,
      required: false,
      validator: function(value) {
        return ["x", "check"].indexOf(value) !== -1;
      }
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
  data() {
    return {
      contrastColor: null
    };
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
    }
  },
  methods: {
    onClick: function() {
      this.$emit("click");
    }
  },
  mounted() {
    if (typeof window !== undefined || !process.server)
      this.contrastColor = this.$getContrastColor(this.color);
  }
};
</script>

<style lang="scss" scoped>
.tag {
  @include border-round;
  @include text-small;
  display: inline-flex;
  align-items: center;
  font-weight: $font-weight-extrabold;
  padding: 0.35em 0.625em;
  background-color: var(--color);
  border-color: var(--color);
  color: var(--color-inverse);

  &--color-positive {
    background-color: $color-success;
    border-color: $color-success;
    color: $color-success-inverse;

    &:hover {
      background-color: $color-success-active;
      border-color: $color-success-active;
    }
  }

  &--color-warning {
    background-color: $color-warning;
    border-color: $color-warning;
    color: $color-warning-inverse;

    &:hover {
      background-color: $color-warning-active;
      border-color: $color-warning-active;
    }
  }

  &--color-negative {
    background-color: $color-danger;
    border-color: $color-danger;
    color: $color-danger-inverse;

    &:hover {
      background-color: $color-danger-active;
      border-color: $color-danger-active;
    }
  }

  &--color-neutral {
    background-color: $color-neutral-80;
    border-color: $color-neutral-80;
    color: $color-neutral-20;

    &:hover {
      background-color: $color-neutral-85;
      border-color: $color-neutral-85;
    }
  }

  &--size-small {
    @include text-xsmall;
  }

  &--cliquable {
    cursor: pointer;
  }
  &--not-cliquable {
    pointer-events: none;
  }
}

.tag__icon {
  margin-left: $space_xxs;
  color: inherit;
}
</style>
<docs>
## Colors
  ```jsx
    <mks-tag label="Neutral (default)"></mks-tag>

    <mks-text tag="p">Theme colors</mks-text>
    <mks-tag label="Primary" color="primary"></mks-tag>
    <mks-tag label="Secondary" color="secondary"></mks-tag>
    <mks-tag label="Tertiary" color="tertiary"></mks-tag><br><br>

    <mks-text tag="p">Feedback colors</mks-text>
    <mks-tag label="Positive" color="positive"></mks-tag>
    <mks-tag label="Warning" color="warning"></mks-tag>
    <mks-tag label="Negative" color="negative"></mks-tag><br><br>

    <mks-text tag="p">Other brand colors<br>
      <mks-text tag="span" size="small" color="light">All the colors in design tokens are available.</mks-text>
    </mks-text>
    
    <mks-tag label="Neutral 20" color="neutral-20"></mks-tag>
    <mks-tag label="Brick red" color="brick-red"></mks-tag>
    <mks-tag label="Atlantis" color="atlantis"></mks-tag>
    <mks-tag label="Sahara sand" color="sahara-sand"></mks-tag><br><br>
    
  ```

## Sizes
```jsx
    <mks-tag label="Small" size="small"></mks-tag>
    <mks-tag label="Medium (default)" size="medium"></mks-tag>
  ```

## With close or check icons
```jsx
    <mks-tag label="Close icon" icon="x" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Check icon" icon="check" v-bind:cliquable="true"></mks-tag>
  ```

## Truncated
```jsx
    <mks-tag label="A super long label that needs to be truncated" v-bind:trunc="true"></mks-tag>
  ```
</docs>
