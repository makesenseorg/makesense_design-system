<template>
  <div class="field-radio">
    <div
      class="field-radio__choice"
      v-for="item in items"
      :key="item.value"
      @click="onSelect(item.value)"
      :class="{ 'field-radio__choice--selected': selectedValue === item.value }"
    >
      <div class="choice__check">
        <mks-icon type="check" v-show="selectedValue === item.value"></mks-icon>
      </div>
      <div class="choice__label">
        <span class="label__primary">{{
          labelMustBeTranslated ? $t(item.label) : item.label
        }}</span>
        <template
          v-if="item.description !== undefined && item.description !== ''"
        >
          <span class="label__description">{{
            labelMustBeTranslated ? $t(item.description) : item.description
          }}</span>
        </template>
        <template v-else-if="item.tooltip !== undefined && item.tooltip !== ''">
          <span class="label__description">{{
            tooltipMustBeTranslated ? $t(item.tooltip) : item.tooltip
          }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FieldRadio",
  props: {
    /**
     * Array of objects. Must contain a `value` and `label`. Optionally a `description` and `tooltip`
     */
    items: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: String,
      default: ""
    },
    labelMustBeTranslated: {
      type: Boolean,
      default: false
    },
    tooltipMustBeTranslated: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: ""
    };
  },
  created() {
    this.selectedValue = this.defaultValue;
  },
  methods: {
    onSelect: function(id) {
      this.selectedValue = id;
      this.$emit("change", this.selectedValue);
    }
  }
};
</script>
<style lang="scss" scoped>
$inactiveColorChoice: #c9c9c9;

.field-radio {
  &__choice {
    @include cursor-pointer;

    @include flex;
    align-items: center;
    margin-bottom: $space-xs;

    &:last-child {
      margin-bottom: 0px;
    }

    .choice {
      &__label {
        @include text-body;
        font-weight: $font-weight-semi-bold;
        line-height: 1em;
        position: relative;
        width: 100%;

        .label {
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
      .choice__check {
        border-color: $color-tertiary;
      }

      .label__description {
        display: block;
      }
    }

    &--selected {
      .choice {
        &__label {
          color: $color-tertiary;
          //@include text-body-black;

          .label__secondary {
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
}
</style>
