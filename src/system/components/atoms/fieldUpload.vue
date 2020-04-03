<template>
  <div class="file-upload" :class="{ loading: getStatus == 'PENDING' }">
    <FieldLabel v-if="label && label !== undefined" :cssClass="getCss">
      {{ label }} <span class="field__sublabel" v-if="subLabel"> {{ subLabel }} </span>
    </FieldLabel>
    <div class="file-upload__description" v-if="description" :class="getCss">{{ description }}</div>
    <div v-show="getStatus !== 'PENDING'">
      <input
        type="file"
        id="selecter"
        ref="selecter"
        name="selecter"
        v-on:change="handleFileUpload()"
        @blur="$emit('blur')"
      />
      <div class="file-upload__selected-file" v-if="file_image"><img :src="file_image" /></div>
      <div class="file-upload__selected-file" v-else-if="file">
        <strong>{{ file.name }}</strong>
      </div>
      <div class="file-upload__actions">
        <Button v-show="!file && !file_image" type="shy" @click="addFile()">Upload image</Button>
        <Button v-show="file || file_image" type="black" @click="addFile()">Edit</Button>
        <Button v-show="file || file_image" type="negative" @click="removeFile()">Remove</Button>
      </div>
    </div>
    <Loading v-show="getStatus === 'PENDING'" type="standalone" :progress="getProgress" />
  </div>
</template>

<script>
import Button from "@@/components/atoms/button"
import FieldLabel from "@@/components/atoms/fieldLabel"
import Loading from "@@/components/atoms/loading"

export default {
  name: "FieldUpload",
  components: {
    Loading,
    FieldLabel,
    Button,
  },
  props: {
    existing: {},
    status: {},
    progress: {},
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    subLabel: {
      type: String,
    },
    description: {
      type: String,
    },
    error: {
      type: Boolean,
      required: false,
    },
    light: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "onBlack"].indexOf(value) !== -1
      },
    },
  },
  data: () => {
    return {
      file: null,
      file_image: null,
    }
  },
  created: function() {
    if (this.existing && this.existing.url !== undefined) this.file_image = this.existing.url
    else if (typeof this.existing === "string") this.file_image = this.existing
  },
  computed: {
    getCss: function() {
      var styles = ["-light-" + this.light]
      if (this.error) styles.push("-in-error")

      return styles
    },
    getStatus: function() {
      if (typeof this.status === "object") {
        if (!this.id || this.status[this.id] === undefined) {
          return "OK"
        } else {
          return this.status[this.id]
        }
      }
      return this.status
    },
    getProgress: function() {
      if (typeof this.progress === "object") {
        if (!this.id || this.progress[this.id] === undefined) {
          return 0
        } else {
          return this.progress[this.id]
        }
      }
      return this.progress
    },
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.selecter.files[0]

      if (this.file.type.indexOf("image") === -1) {
        this.$toasted.show("This is not an image file (PNG, JPG, GIF)", {
          position: "bottom-right",
          duration: 2000,
          type: "error",
        })

        return
      }

      if (typeof this.file.type != "undefined" && this.file.type.indexOf("image") >= 0) {
        var reader = new FileReader()

        reader.onload = e => {
          this.file_image = e.target.result
        }

        reader.readAsDataURL(this.file)
      }

      this.$emit("upload", this.file)
      this.$emit("change")
      //this.$emit("input", this.file);
    },

    addFile: function() {
      this.$refs.selecter.click()
    },

    removeFile: function() {
      this.file = null
      this.file_image = null
      this.$emit("remove")
    },
  },
}
</script>

<style scoped lang="scss">
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
  .button {
    margin-right: 0.5em;
  }
}

.file-upload__description {
  @include text-small;
  margin-top: $space_xxs;
  margin-bottom: 1em;
  opacity: 0.5;

  &.-light-onBlack {
    color: $color-gray;
  }
}
</style>
