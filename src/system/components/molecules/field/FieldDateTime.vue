<template>
  <DatePicker
    :key="locale"
    v-model="theValue"
    :id="name"
    :ref="reference"
    :name="name"
    :placeholder="placeholder"
    :class="css"
    :lang="locale"
    :disabled="disabled"
    v-bind="options"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
    @text-change="$emit('change')"
  />
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/fr";
import "vue2-datepicker/locale/en";
import "vue2-datepicker/locale/es";
/**
 * The field component can be used for RTE
 * @private
 * @private_no_import
 * @version 1.0.0
 */

export default {
  name: "MksFielDateTime",
  components: { DatePicker },
  props: {
    value: {
      type: Date,
      default: new Date(),
      required: true
    },
    name: "",
    reference: {
      type: String,
      default: "datetime"
    },
    placeholder: "",
    css: "",
    options: Object,
    disabled: Boolean
  },
  data: () => {
    return {
      theValue: null,
      component: null,
      locale: null
    };
  },
  created() {
    this.theValue = this.value;
    // require("vue2-datepicker/locale/fr");
    this.updateLocale();
  },
  methods: {
    updateLocale() {
      this.locale = this.lang || this.$MKScurrentLocale || "es";
    }
  },
  watch: {
    lang() {
      this.updateLocale();
    },
    $MKScurrentLocale() {
      this.updateLocale();
    },
    theValue: function() {
      this.$emit("input", this.theValue);
    },
    value: function() {
      this.theValue = this.value;
    },
    component: function() {
      this.$nextTick(() => {
        if (this.$refs[this.reference] === undefined) return;

        this.applyAccessibilityHacks(this.$refs[this.reference]);
      });
    }
  }
};
</script>

<style lang="scss">
.mx-datepicker {
  width: 100%;
}
.mx-input-wrapper input {
  @include field;
  padding: 1rem;
  border-top-left-radius: var(--border-radius-m);
  border-top-right-radius: var(--border-radius-m);
  border-bottom-left-radius: var(--border-radius-m);
  border-bottom-right-radius: var(--border-radius-m);
  box-shadow: inset 0 0 0 1px var(--border-color-softer);
  background: var(--background-color-input);
  height: auto;
  color: $color-text;
}
.mx-icon-calendar,
.mx-icon-clear {
  @include cursor-pointer;
  color: currentColor;
  // margin-top: 0.1em;
}

.mx-datepicker-popup {
  border-radius: $border-radius-m;
  box-shadow: $box-shadow-base;
}

.mx-calendar-content .cell {
  border-radius: 100px;

  &:hover {
    background-color: $background-color-soft;
  }
}
.mx-calendar-content .cell.active {
  background-color: $color-primary;
  color: $color-primary-inverse;
  font-weight: $font-weight-bold;
}

.mx-time-column .mx-time-item {
  &:hover {
    background-color: $background-color-soft;
  }
}

.mx-time-column .mx-time-item.active {
  color: $color-primary;
}
</style>
