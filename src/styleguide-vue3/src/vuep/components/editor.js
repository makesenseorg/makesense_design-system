import { h } from "vue";
import CodeMirror from "codemirror";
import "codemirror/mode/vue/vue";
import assign from "../utils/assign";

const DEFAULT_OPTIONS = {
  lineNumbers: true,
  mode: "vue",
  theme: "material",
  tabSize: 2,
};

export default {
  name: "VueCodeMirror",
  props: ["value", "options"],

  render() {
    return h("div", null, [h("textarea", { ref: "textarea" }, this.value)]);
  },

  mounted() {
    this.currentOptions = assign({}, DEFAULT_OPTIONS, this.options);
    this.editor = CodeMirror.fromTextArea(
      this.$refs.textarea,
      this.currentOptions
    );
    this.editor.on("change", this.handleChange);
  },

  watch: {
    value(val) {
      val !== this.editor.getValue() && this.editor.setValue(val);
    },
  },

  methods: {
    handleChange() {
      /* istanbul ignore next */
      this.$emit("codeChange", this.editor.getValue());
    },
  },
};
