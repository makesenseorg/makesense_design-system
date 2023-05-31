import * as Vue from "vue";

function vModelMixin(valueSettings) {
  let mixin = {
    props: {},
    computed: {},
    methods: {}
  };

  if (Vue && Vue.version && parseInt(Vue.version) >= 3) {
    mixin.props.modelValue = valueSettings;
    mixin.computed.vModelValue = function() {
      return this.modelValue;
    };
    mixin.methods.setVModelValue = function(value) {
      this.$emit("update:modelValue", value);
    };
  } else {
    mixin.props.value = valueSettings;
    mixin.computed.vModelValue = function() {
      return this.value;
    };
    mixin.methods.setVModelValue = function(value) {
      this.$emit("input", value);
    };
  }
  return mixin;
}

export default vModelMixin;
