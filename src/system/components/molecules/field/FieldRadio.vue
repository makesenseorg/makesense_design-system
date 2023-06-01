<template>
  <div class="mks-field-radio" role="radiogroup" :aria-labelledby="name">
    <RadioButton
      v-for="item in items"
      :key="item.value"
      :name="name"
      :option="item"
      :selected="selectedValue === item.value"
      :disabled="disabled"
      @click.native="onSelect(item.value)"
    >
    </RadioButton>
  </div>
</template>
<script>
import RadioButton from "./RadioButton.vue";
import vmodelMixin from '@@/modules/vmodel';
export default {
  name: "FieldRadio",
  mixins: [
    vmodelMixin({
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
      default: "",
      required: false
    })
  ],
  components: { RadioButton },
  props: {
    /**
     * Array of objects. Must contain a `value` and `label`. Optionally a `description` and `tooltip`
     */
    items: {
      type: Array,
      default: () => []
    },
    id: String,
    name: String,
    disabled: {
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
    this.selectedValue = this.vModelValue;
  },
  methods: {
    onSelect: function(e) {
      if (this.disabled) return;
      this.selectedValue = e;
      this.$emit("input", e);
    }
  },
  watch: {
    selectedValue: function() {
      this.setVModelValue(this.selectedValue);
    },
    vModelValue: function() {
      this.selectedValue = this.vModelValue;
    }
  }
};
</script>
