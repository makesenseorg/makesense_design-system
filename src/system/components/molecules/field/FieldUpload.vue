<template>
  <div class="file-upload" :class="{ loading: getStatus == 'PENDING' }">
    <mks-field-label
      v-if="label && label !== undefined"
      :css-class="getCss"
      :target-name="id || 'selecter'"
    >
      {{ label }}
      <span class="field__sublabel" v-if="subLabel">{{ subLabel }}</span>
    </mks-field-label>
    <div class="file-upload__description" v-if="description" :class="getCss">
      {{ description }}
    </div>
    <div v-show="getStatus !== 'PENDING'">
      <input
        type="file"
        :id="id || 'selecter'"
        :ref="id || 'selecter'"
        :name="id || 'selecter'"
        @change="handleFileUpload()"
        @blur="$emit('blur')"
      />
      <div class="file-upload__selected-file" v-if="file_image">
        <img :src="file_image" :alt="file.name" />
      </div>
      <div class="file-upload__selected-file" v-else-if="file">
        <strong>{{ file.name }}</strong>
      </div>
      <div class="file-upload__actions">
        <mks-button
          v-show="!file && !file_image"
          tag="button"
          type="neutral"
          @click="() => {console.log('click1'); addFile()}"
          >{{ uploadLabelTranslated }}</mks-button
        >
        <mks-button
          v-show="file || file_image"
          tag="button"
          type="primary"
          @click="addFile()"
          >{{ editLabelTranslated }}</mks-button
        >
        <mks-button
          v-show="file || file_image"
          tag="button"
          type="negative"
          @click="removeFile()"
          >{{ removeLabelTranslated }}</mks-button
        >
      </div>
    </div>
    <mks-loading
      v-show="getStatus === 'PENDING'"
      type="standalone"
      :progress="getProgress"
    />
  </div>
</template>

<script>
/**
 * Field upload is used to upload a file
 * @version 1.0.0
 */
export default {
  name: "MksFieldUpload",
  props: {
    /**
     * Object containing a url property with the existing file url
     */
    existing: {
      type: Object
    },
    /**
     * Status of the upload, generally "OK" or "PENDING"
     */
    status: {
      type: [Object, String]
    },
    /**
     * Progress of the upload
     */
    progress: {},
    /**
     * Id of the field
     */
    id: {
      type: String
    },
    /**
     * Label of the field
     */
    label: {
      type: String
    },
    /**
     * Sublabel of the field
     */
    subLabel: {
      type: String
    },
    /**
     * Description of the field
     */
    description: {
      type: String
    },
    /**
     * Text of the upload button
     */
    uploadLabel: {
      type: String
    },
    /**
     * Text of the edit button
     */
    editLabel: {
      type: String
    },
    /**
     * Text of the remove button
     */
    removeLabel: {
      type: String
    },
    error: {
      type: Boolean,
      required: false
    },
    /**
     * Is the theme light (default true)
     */
    light: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "onBlack"].indexOf(value) !== -1;
      }
    }
  },
  data: () => {
    return {
      file: null,
      file_image: null
    };
  },
  created: function() {
    if (this.existing && this.existing.url !== undefined)
      this.file_image = this.existing.url;
    else if (typeof this.existing === "string") this.file_image = this.existing;
  },
  computed: {
    editLabelTranslated() {
      return this.editLabel ? this.editLabel : this.$MKSlocale["edit"];
    },
    removeLabelTranslated() {
      return this.removeLabel ? this.removeLabel : this.$MKSlocale["remove"];
    },
    uploadLabelTranslated() {
      return this.uploadLabel ? this.uploadLabel : this.$MKSlocale["choose"];
    },
    getCss: function() {
      var styles = ["-light-" + this.light];
      if (this.error) styles.push("-in-error");

      return styles;
    },
    getStatus: function() {
      if (typeof this.status === "object") {
        if (!this.id || this.status[this.id] === undefined) {
          return "OK";
        } else {
          return this.status[this.id];
        }
      }
      return this.status;
    },
    getProgress: function() {
      if (typeof this.progress === "object") {
        if (!this.id || this.progress[this.id] === undefined) {
          return 0;
        } else {
          return this.progress[this.id];
        }
      }
      return this.progress;
    }
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.selecter.files[0];

      if (this.file.type.indexOf("image") === -1) {
        this.$toasted.show("This is not an image file (PNG, JPG, GIF)", {
          position: "bottom-right",
          duration: 2000,
          type: "error"
        });

        return;
      }

      if (
        typeof this.file.type != "undefined" &&
        this.file.type.indexOf("image") >= 0
      ) {
        var reader = new FileReader();

        reader.onload = e => {
          this.file_image = e.target.result;
        };

        reader.readAsDataURL(this.file);
      }

      this.$emit("upload", this.file);
      this.$emit("change");
      //this.$emit("input", this.file);
    },

    addFile: function() {
      console.log("addfile");
      console.trace("addfile");
      this.$refs.selecter.click();
    },

    removeFile: function() {
      this.file = null;
      this.file_image = null;
      this.$emit("remove");
    }
  }
};
</script>

<style lang="scss">
.field__sublabel {
  font-weight: $font-weight-light;
  margin-left: 0.3em;
}

.file-upload {
  input[type="file"] {
    display: none;
  }
}

.file-upload__selected-file {
  margin-bottom: $space_xs;
  img {
    max-width: 100%;
    height: 100px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.15);
    background-image: url("~@@/assets/img/ui/transparent.png");
  }
}

.file-upload__actions {
  .mks-button {
    margin-right: 0.5em;
  }
}

.file-upload__description {
  @include text-small;
  margin-top: $space_xxs;
  margin-bottom: 1em;
  opacity: 0.5;

  &.-light-onBlack {
    color: $color-neutral-80;
  }
}
</style>
<docs>
```jsx
  <mks-field-upload label="Upload field" sub-label="for any type of file" description="description for more indication on file type and sizes allowed"></mks-field-upload>
```

</docs>
