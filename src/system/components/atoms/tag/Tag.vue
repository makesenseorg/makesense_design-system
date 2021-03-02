<template>
  <div
    class="tag"
    :class="`tag--color-${color} tag--size-${size} tag--${isCliquable}`"
    :role="isCliquable ? 'button' : undefined"
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
/**
 * Tags are used for small informations or taxonomies.
 * @version 0.1.0
 */
export default {
  name: "MksTag",
  props: {
    /**
     * Any of the theme colors : "primary",
            "secondary",
            "tertiary",
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

  &--color-primary {
    background-color: $color-primary;
    border-color: $color-primary;
    color: $color-primary-inverse;

    &:hover {
      background-color: $color-primary-active;
      border-color: $color-primary-active;
    }
  }

  &--color-secondary {
    background-color: $color-secondary;
    border-color: $color-secondary;
    color: $color-secondary-inverse;

    &:hover {
      background-color: $color-secondary-active;
      border-color: $color-secondary-active;
    }
  }

  &--color-tertiary {
    background-color: $color-tertiary;
    border-color: $color-tertiary;
    color: $color-tertiary-inverse;

    &:hover {
      background-color: $color-tertiary-active;
      border-color: $color-tertiary-active;
    }
  }

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
    <br>
    <mks-tag label="Primary" color="primary"></mks-tag>
    <mks-tag label="Secondary" color="secondary"></mks-tag>
    <mks-tag label="Tertiary" color="tertiary"></mks-tag>
    <br>
    <mks-tag label="Positive" color="positive"></mks-tag>
    <mks-tag label="Warning" color="warning"></mks-tag>
    <mks-tag label="Negative" color="negative"></mks-tag>
  ```

## Sizes
```jsx
    <mks-tag label="Small" size="small"></mks-tag>
    <mks-tag label="Medium (default)" size="medium"></mks-tag>
  ```

## With close or check icons
```jsx
    <mks-tag label="Close icon" icon="close" v-bind:cliquable="true"></mks-tag>
    <mks-tag label="Check icon" icon="check" v-bind:cliquable="true"></mks-tag>
  ```

## Truncated
```jsx
    <mks-tag label="A super long label that needs to be truncated" v-bind:trunc="true"></mks-tag>
  ```
</docs>
