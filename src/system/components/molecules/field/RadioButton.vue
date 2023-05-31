<template>
  <div
    :class="
      `mks-field-radio__choice ${
        selected ? 'mks-field-radio__choice--selected' : ''
      } ${disabled ? 'mks-field-radio__choice--disabled' : ''}`
    "
    :aria-checked="selected"
    :aria-labelledby="option.label"
    role="radio"
    tabindex="0"
    :data-value="option.value"
  >
    <div class="mks-choice__check">
      <mks-icon type="check" v-show="selected"></mks-icon>
    </div>
    <div class="mks-choice__label">
      <span class="mks-label__primary">{{ option.label }}</span>
      <template
        v-if="option.description !== undefined && option.description !== ''"
      >
        <span class="mks-label__description">{{ option.description }}</span>
      </template>
      <template
        v-else-if="option.tooltip !== undefined && option.tooltip !== ''"
      >
        <span class="mks-label__description">{{ option.tooltip }}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "RadioButton",
  props: {
    option: Object,
    selected: Boolean,
    name: String,
    disabled: Boolean
  }
};
</script>
<style lang="scss">
$inactiveColorChoice: #c9c9c9;

.mks-field-radio__choice {
  @include cursor-pointer;

  @include flex;
  align-items: center;
  margin-bottom: $space-xs;

  &:last-child {
    margin-bottom: 0px;
  }

  .mks-choice {
    &__label {
      @include text-body;
      font-weight: $font-weight-semi-bold;
      line-height: 1em;
      position: relative;
      width: 100%;

      .mks-label {
        &__primary {
          display: block;
        }

        &__description {
          display: none;
          border: $border;
          border-color: $border-color-active;
          @include border-radius;
          @include text-small;
          color: $color-text;
          //color: $color-text-light;
          position: absolute;
          top: 100%;
          margin-top: 10px;
          left: 0px;
          pointer-events: none;
          z-index: 1;
          background-color: $color-neutral-100;
          padding: $space-xs;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.02);
          font-weight: $font-weight-semi-bold;

          &:before {
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid $border-color-active;
            border-top: 10px solid transparent;
            left: $space-l;
            top: -20px;
          }

          &:after {
            content: "";
            width: 0px;
            height: 0px;
            position: absolute;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #fff;
            border-top: 10px solid transparent;
            left: $space-l;
            top: -19px;
          }
        }
      }
    }

    &__check {
      width: 30px;
      height: 30px;
      flex: 0 0 30px;
      border-radius: 100px;
      border: 2px solid $inactiveColorChoice;
      margin-right: $space-xs;
      transition: border-color 0.5s;
    }
  }

  &:hover {
    .mks-choice__check {
      border-color: $color-tertiary;
    }

    .mks-label__description {
      display: block;
    }
  }

  &--disabled {
    pointer-events: none;
    cursor: initial;
  }

  &--selected {
    .mks-choice {
      &__label {
        color: $color-tertiary;
        //@include text-body-black;

        .mks-label__secondary {
          color: $color-tertiary;
        }
      }

      &__check {
        border-color: $color-tertiary;
        background: $color-tertiary;
        position: relative;

        .icon {
          color: $color-tertiary-inverse;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
