import * as Vue from "vue";

function vModelMixin(valueSettings) {
  console.log(Vue);
  let mixin = {
    props: {},
    computed: {},
    methods: {}
  };

  if (Vue && Vue.observable && typeof Vue.observable === "function") {
    mixin.props.value = valueSettings;
    mixin.computed.vModelValue = function() {
      return this.value;
    };
    mixin.methods.setVModelValue = function(value) {
      this.$emit("input", value);
    };
  } else {
    mixin.props.modelValue = valueSettings;
    mixin.computed.vModelValue = function() {
      return this.modelValue;
    };
    mixin.methods.setVModelValue = function(value) {
      this.$emit("update:modelValue", value);
    };
  }
  return mixin;
}

export default vModelMixin;
