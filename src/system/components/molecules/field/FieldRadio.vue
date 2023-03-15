<template>
  <div class="mks-field-radio" role="radiogroup" :aria-labelledby="name">
    <RadioButton
      v-for="item in items"
      :key="item.value"
      :name="name"
      :option="item"
      :selected="selectedValue === item.value"
      @click.native="onSelect(item.value)"
    >
    </RadioButton>
  </div>
</template>
<script>
import RadioButton from "./RadioButton.vue";
export default {
  name: "FieldRadio",
  components: { RadioButton },
  props: {
    /**
     * Array of objects. Must contain a `value` and `label`. Optionally a `description` and `tooltip`
     */
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
      default: "",
      required: false
    },
    id: String,
    name: String
  },
  data() {
    return {
      selectedValue: ""
    };
  },
  created() {
    this.selectedValue = this.value;
  },
  methods: {
    onSelect: function(e) {
      this.selectedValue = e;
      this.$emit("input", e);
    }
  }
};
</script>
