<template>
  <div :class="`${iframe ? 'vuep-iframe' : ''}`">
    <vuep :value="template" :options="{ theme: 'vueds' }" :iframe="iframe" />
  </div>
</template>

<script>
import Vuep from "vuep";
import "vuep/dist/vuep.css";

export default {
  name: "CodeExample",
  data() {
    return {
      iframe: false
    };
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  components: {
    Vuep
  },
  computed: {
    template() {
      return this.getCode();
    }
  },
  methods: {
    getCode() {
      const codeLines = this.code.split("\n");
      const codeTypeMatch = codeLines[0].trim().match(/^[A-Za-z]+$/g);
      if (codeTypeMatch) {
        codeLines.shift();
        const codeType = codeTypeMatch[0];
        if (codeType === "iframe") {
          this.iframe = true;
        }
      }
      while (codeLines[0].trim() === "") {
        codeLines.shift();
      }
      while (codeLines[codeLines.length - 1].trim() === "") {
        codeLines.pop();
      }
      if (codeLines[0].trim() === "<template>") {
        return codeLines.join("\n");
      }
      const code = codeLines.map(line => "    " + line).join("\n");
      /* eslint-disable */
      return `<template>
  <div class="my-component">
${code}
  </div>
</template>
<script><\/script>`;
    },
  },
};
</script>

<style lang="scss">
.vuep {
  display: flex;
  height: auto;
  font-family: inherit;
  flex-direction: column-reverse;
}

.vuep-editor {
  width: auto;
  height: auto;
  margin-right: 0;
}

.vuep-preview {
  width: auto;
  height: auto;
  border-radius: 0;
  border: $border-width-m solid $border-color-softer;
  padding: $space-m;
  margin-bottom: $space-s;
  overflow: visible;

  .vuep-iframe & {
    padding: 0;
    min-height: 600px;
  }

  .my-component > * {
    margin-bottom: $space-base;
  }
}

// Codemirror Theme
$codemirror-background: $background-color-soft;
$codemirror-primary: $color-primary;

.cm-s-vueds {
  font-size: $font-size-s;
  line-height: 1.5em;
  font-family: $font-code;
  letter-spacing: 0.3px;
  word-spacing: 1px;
  background: $codemirror-background;
  color: $color-text-light;
  border: $border-width-m solid $border-color-softer;

  .CodeMirror-lines {
    padding: 8px 0;
  }

  .CodeMirror-gutters {
    background-color: $codemirror-background;
    border: none;
    border-right: $border-width-m solid $border-color-softer;
    padding-right: $space-xs;
    z-index: 3;
  }

  div.CodeMirror-cursor {
    border-left: 2px solid $color-text;
  }

  .CodeMirror-activeline-background {
    background: rgba($codemirror-primary, 0.1);
  }
  .CodeMirror-selected {
    background: rgba($codemirror-primary, 0.1);
  }
  .cm-comment {
    font-style: italic;
    color: $color-text-lighter;
  }
  .cm-tag {
    color: $color-text;
  }
  .cm-attribute {
    color: $text-color-warning;
  }
  .cm-keyword {
    color: $text-color-danger;
  }
  .cm-string {
    color: $text-color-success;
  }
  .cm-property {
    color: $text-color-warning;
  }
  .cm-variable-2 {
    color: $text-color-danger;
  }
  .cm-atom {
    color: $text-color-success;
  }
  .cm-number {
    color: $text-color-danger;
  }
  .cm-operator {
    color: $codemirror-primary;
  }
  .CodeMirror-linenumber {
    color: $color-text-lighter;
  }
}
</style>
