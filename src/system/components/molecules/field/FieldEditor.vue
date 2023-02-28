<template>
  <VueEditor
    v-model="theValue"
    :id="name"
    :ref="reference"
    :editor-toolbar="editorToolbar"
    :editor-options="editorOptions"
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
import VueEditor from "@@/modules/vue2-editor/components/VueEditor.vue";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
/**
 * The field component can be used for RTE
 * @private
 * @private_no_import
 * @version 1.0.0
 */

export default {
  name: "MksFieldEditor",
  components: {
    VueEditor,
  },
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
      required: true
    },
    name: "",
    reference: {
      type: String,
      default: "editor"
    },
    editorToolbar: null,
    editorCustomImageHandler: false,
    placeholder: "",
    css: "",
    onMention: null
  },
  data: () => {
    return {
      theValue: null,
      component: null,
      editorOptions: null
    };
  },
  created() {
    this.theValue = this.value;
    this.editorOptions = {
      modules: {
        mention: {
          isolateCharacter: true,
          source: async (searchTerm, renderList) => {
            const matchedPeople = await this.onMention(searchTerm);
            renderList(matchedPeople);
          }
        }
      }
    };
  },
  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      this.$emit("image-added", file, Editor, cursorLocation, resetUploader);
    },
    /**
     * Applies accessibility to a quill editor
     * TODO: Deprecate this method once this issue is resolved (https://github.com/quilljs/quill/issues/1173)
     * @param {object}		editor		- A Quill editor instance
     */
    applyAccessibilityHacks(editor) {
      // Get ref to the toolbar, its not available through the quill api ughh
      const query = editor.$el.getElementsByClassName("ql-toolbar");
      if (query.length !== 1) {
        console.log("no toolbar");
        // No toolbars found OR multiple which is not what we expect either
        return;
      }

      const toolBar = query[0];

      // apply aria labels to base buttons
      const buttons = toolBar.getElementsByTagName("button");
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const className = button.getAttribute("class").toLowerCase();

        // TODO i18N !
        if (className.indexOf("bold") >= 0) {
          button.setAttribute("aria-label", this.$MKSlocale["toggleBold"]);
          button.setAttribute("title", this.$MKSlocale["toggleBold"]);
        } else if (className.indexOf("italic") >= 0) {
          button.setAttribute("aria-label", this.$MKSlocale["toggleItalic"]);
          button.setAttribute("title", this.$MKSlocale["toggleItalic"]);
        } else if (className.indexOf("underline") >= 0) {
          button.setAttribute("aria-label", this.$MKSlocale["toggleUnderline"]);
          button.setAttribute("title", this.$MKSlocale["toggleUnderline"]);
        } else if (className.indexOf("blockquote") >= 0) {
          button.setAttribute(
            "aria-label",
            this.$MKSlocale["toggleBlockquote"]
          );
          button.setAttribute("title", this.$MKSlocale["toggleBlockquote"]);
        } else if (
          className.indexOf("list") >= 0 &&
          button.value === "ordered"
        ) {
          button.setAttribute(
            "aria-label",
            this.$MKSlocale["toggleOrderedList"]
          );
          button.setAttribute("title", this.$MKSlocale["toggleOrderedList"]);
        } else if (
          className.indexOf("list") >= 0 &&
          button.value === "bullet"
        ) {
          button.setAttribute(
            "aria-label",
            this.$MKSlocale["toggleBulletedList"]
          );
          button.setAttribute("title", this.$MKSlocale["toggleBulletedList"]);
        } else if (className.indexOf("image") >= 0) {
          button.setAttribute("aria-label", this.$MKSlocale["addImage"]);
          button.setAttribute("title", this.$MKSlocale["addImage"]);
        }
      }

      // Make pickers work with keyboard and apply aria labels
      //FIXME: When you open a submenu with the keyboard and close it with the mouse by click somewhere else, the menu aria-hidden value is incorrectly left to `false`
      const pickers = toolBar.getElementsByClassName("ql-picker");
      for (let i = 0; i < pickers.length; i++) {
        const picker = pickers[i];

        const label = picker.getElementsByClassName("ql-picker-label")[0];
        const optionsContainer = picker.getElementsByClassName(
          "ql-picker-options"
        )[0];
        const options = optionsContainer.getElementsByClassName(
          "ql-picker-item"
        );

        label.setAttribute("role", "button");
        label.setAttribute("aria-haspopup", "true");
        label.setAttribute("tabindex", "0");

        optionsContainer.setAttribute("aria-hidden", "true");
        optionsContainer.setAttribute("aria-label", "submenu");

        for (let x = 0; x < options.length; x++) {
          const item = options[x];
          item.setAttribute("tabindex", "0");
          item.setAttribute("role", "button");

          // Read the css 'content' values and generate aria labels
          const size = window
            .getComputedStyle(item, ":before")
            .content.replace('"', "");
          item.setAttribute("aria-label", size);
          item.addEventListener("keyup", e => {
            if (e.keyCode === 13) {
              item.click();
              optionsContainer.setAttribute("aria-hidden", "true");
            }
          });
        }

        label.addEventListener("keyup", e => {
          if (e.keyCode === 13) {
            label.click();
            optionsContainer.setAttribute("aria-hidden", "false");
          }
        });
      }
    }
  },
  watch: {
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

<style lang="scss" scoped>
.quillWrapper :deep() {
  .ql-mention-list-container {
    max-height: 250px;
    overflow: scroll;
  }

  .ql-mention-list {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
  }

  .ql-mention-list-item {
    @include text-small;
    list-style-type: none;
    padding: $space-xxs $space-xs;
    line-height: inherit;
    margin: 0;

    .user__name {
      @include text-small-extrabold;
    }

    &.selected {
      background-color: $color-neutral-60;
    }
  }
}

.mention {
  @include text-small;
  background-color: $color-neutral-60;
}
</style>
<docs>
## Icon types
</docs>
