<template>
  <component
    v-if="component"
    :is="component"
    v-model="theValue"
    :id="name"
    :ref="reference"
    :editor-toolbar="editorToolbar"
    :name="name"
    :placeholder="placeholder"
    :class="css"
    @blur="$emit('blur')"
    @text-change="$emit('change')"
  />
</template>
<script>
/**
 * The field component can be used for RTE
 * @private
 * @private_no_import
 * @version 1.0.0
 */
//import { VueEditor } from "vue2-editor";

export default {
  name: "MksFieldEditor",
  components: {},
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
      required: true
    },
    name: "",
    reference: "",
    editorToolbar: null,
    placeholder: "",
    css: ""
  },
  data: () => {
    return {
      theValue: null,
      component: null
    };
  },
  created() {
    this.theValue = this.value;
  },
  mounted: function() {
    if (
      undefined !== process &&
      (process.server === undefined || !process.server)
    )
      this.component = require("vue2-editor").VueEditor;
  },
  computed: {},
  methods: {},
  watch: {
    theValue: function() {
      this.$emit("input", this.theValue);
    },
    value: function() {
      this.theValue = this.value;
    }
  }
};
</script>

<style scoped lang="scss"></style>
<docs>
## Icon types
</docs>
