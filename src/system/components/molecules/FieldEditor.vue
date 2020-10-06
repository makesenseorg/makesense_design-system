<template>
  <component
    title="lol"
    v-if="component"
    :is="component"
    v-model="theValue"
    :id="name"
    :ref="reference"
    :editor-toolbar="editorToolbar"
    :name="name"
    :placeholder="placeholder"
    :use-custom-image-handler="editorCustomImageHandler"
    :class="css"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
    @text-change="$emit('change')"
    @image-added="handleImageAdded"
  />
</template>
<script>
/**
 * The field component can be used for RTE
 * @private
 * @private_no_import
 * @version 1.0.0
 */

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
    editorCustomImageHandler: false,
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
      process === undefined ||
      process.server === undefined ||
      !process.server
    )
      this.component = require("vue2-editor").VueEditor;
  },
  computed: {},
  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      this.$emit("image-added", file, Editor, cursorLocation, resetUploader);
    }
  },
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
