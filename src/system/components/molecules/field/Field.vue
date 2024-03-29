<template>
  <!-- todo #77 : Refactoriser le champs field-->
  <div
    :class="{
      field__container: true,
      'field--folding': fold,
      'field--folding-open': foldingOpen,
      'field--folding-close': !foldingOpen
    }"
    :role="type === 'search' ? 'search' : undefined"
  >
    <div class="field__header" v-if="label">
      <mks-field-label
        v-if="label && label !== undefined"
        class="field__label"
        :id="`label-${name}`"
        :css-class="getCss"
        :target-name="type !== 'checkbox' ? name : ''"
        :icon="getIconLabel"
        @click="onClickLabel()"
      >
        {{ label }}
        <span class="field__sublabel" v-if="subLabel">{{ subLabel }}</span>
      </mks-field-label>

      <div class="field__action">
        <!-- @slot appears in the field header -->
        <slot name="action"></slot>
      </div>
    </div>
    <div
      v-if="type === 'select'"
      class="field__input"
      style="position: relative;"
    >
      <select
        v-model="theValue"
        class="field--select"
        :disabled="disable"
        :ref="reference"
        :class="getCss"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @change="$emit('change')"
      >
        <option
          v-if="placeholder"
          value=""
          hidden
          class="select__placeholder"
          >{{ placeholder }}</option
        >
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
      <mks-icon type="chevron-down" class="input__select-icon" />
    </div>
    <FieldRadio
      v-else-if="type === 'radio'"
      v-model="theValue"
      :id="name"
      :ref="reference"
      :name="name"
      :items="options"
      :disabled="disable"
      @blur="onBlur"
      @change="$emit('input', $event)"
      @input="$emit('input', $event)"
    />

    <component
      v-else-if="type === 'editor'"
      :is="component"
      v-model="theValue"
      class="field__input field--rich-text-editor rte-render"
      :id="name"
      :ref="reference"
      :editor-toolbar="editorToolbar"
      :editor-custom-image-handler="editorCustomImageHandler"
      @image-added="editorHandleImageAdded"
      :name="name"
      :placeholder="placeholder"
      :on-mention="onMention"
      :class="getCss"
      :disabled="disable"
      @focus="$emit('focus')"
      @blur="onBlur"
      @change="$emit('change')"
    />
    <component
      v-else-if="type === 'datetime' || type === 'datetimelocal'"
      :is="component"
      v-model="theValue"
      class="field__input rte-render"
      :id="name"
      :ref="reference"
      :name="name"
      :placeholder="placeholder"
      :class="getCss"
      :options="options"
      :disabled="disable"
      @focus="$emit('focus')"
      @blur="onBlur"
      @change="$emit('change')"
    />

    <template v-else-if="type === 'password'">
      <input
        class="field field__input"
        :id="name"
        :name="name"
        :ref="reference"
        :type="showPassword ? 'text' : 'password'"
        :disabled="disable"
        :placeholder="placeholder"
        :class="getCss"
        v-model="theValue"
        :aria-describedby="ariaDescribedBy"
        :aria-required="isRequired"
        :required="isRequired"
        @input="onInput"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @change="$emit('change')"
      />
      <span @click="toggleShow" class="input__password-icon">
        <mks-icon :type="!showPassword ? 'eye-off' : 'eye'" />
      </span>
    </template>

    <textarea
      v-else-if="type === 'textarea'"
      class="field field__input field--textarea"
      :id="name"
      :name="name"
      :type="type"
      :ref="reference"
      :disabled="disable"
      :placeholder="placeholder"
      :class="getCss"
      v-model="theValue"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="$emit('change')"
      @input="onInput"
    ></textarea>

    <label
      v-else-if="type === 'checkbox'"
      class="checkbox__label"
      :class="getCss"
      :aria-labelledby="`label-${name}`"
    >
      <input
        type="checkbox"
        :id="name"
        :name="name"
        :ref="reference"
        :disabled="disable"
        v-model="theValue"
        class="checkbox__input"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        @input="$emit('input', theValue)"
      />
      <span class="checkbox__mention" v-html="checkboxLabel"></span>
    </label>

    <div v-else-if="type === 'location'">
      <gmap-autocomplete
        type="text"
        class="field field__input -style-default -light-default"
        :class="getCss"
        :value="getFormattedAddress"
        :placeholder="placeholder"
        :disabled="disable"
        @keydown.enter.prevent
        @place_changed="setPlace"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        @input="$emit('input', theValue)"
      ></gmap-autocomplete>
    </div>
    <div v-else-if="type === 'tags'">
      <div class="tags">
        <div v-for="(tag, index) in theValue" :key="index" class="tag">
          <span class="tag__label">{{ tag }}</span>
          <span class="tag__remove" @click="removeTag(tag)">
            <mks-icon type="close" class="tag__icon" />
          </span>
        </div>
      </div>
      <input
        class="field field__input tags__add"
        type="text"
        ref="tagField"
        :placeholder="placeholder"
        :class="getCss"
        :disabled="disable"
        :aria-required="isRequired"
        :required="isRequired"
        @keydown.enter.prevent="addTag"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @change="$emit('change')"
      />
    </div>
    <input
      v-else
      class="field field__input"
      :id="name"
      :name="name"
      :ref="reference"
      :type="type"
      :disabled="disable"
      :placeholder="placeholder"
      :class="getCss"
      :min="min"
      :max="max"
      :aria-required="isRequired"
      :required="isRequired"
      v-model="theValue"
      @input="onInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @change="$emit('change')"
    />

    <mks-icon
      v-if="type === 'search'"
      aria-hidden="true"
      type="search"
      class="input__search-icon"
    />
    <mks-visually-hidden v-if="type === 'search'">{{
      $MKSlocale["search"]
    }}</mks-visually-hidden>
    <div
      class="field__description"
      v-if="description"
      :class="getCss"
      v-html="description"
    ></div>
  </div>
</template>

<script>
import FieldRadio from "./FieldRadio.vue";
/**
 * The field component can be used in forms. It emits 'blur', 'change' and 'input' events, as a native input would.
 * @version 1.0.0
 */
export default {
  name: "MksField",
  components: { FieldRadio },
  props: {
    /**
     * Name of the field for formData
     */
    name: {
      type: String,
      required: true
    },
    /**
     * HTML reference
     */
    reference: {
      type: String,
      required: false
    },
    /**
     * Disables the field
     */
    disable: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Shows the field is successfully filled
     */
    success: {
      type: Boolean,
      required: false
    },
    /**
     * Shows the field is not properly filled
     */
    error: {
      type: Boolean,
      required: false
    },
    /**
     * Displays a description under the field
     */
    description: {
      type: String,
      required: false
    },
    /**
     * If type of field is checkbox, displays this text on its right
     */
    checkboxLabel: {
      type: String,
      required: false
    },
    /**
     * Value of the field
     */
    value: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
      required: true
    },
    fold: {
      type: Boolean,
      required: false,
      default: false
    },
    foldDefault: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Options of the select type
     */
    options: {
      type: [Object, Array]
    },
    /**
     * Type of input : "text",
            "email",
            "location",
            "password",
            "number",
            "select",
            "editor",
            "textarea",
            "tags",
            "checkbox",
            "search",
            "tel",
            "url"
     */
    type: {
      type: String,
      default: "text",
      validator: function(value) {
        return (
          [
            "text",
            "email",
            "location",
            "password",
            "number",
            "select",
            "editor",
            "textarea",
            "tags",
            "checkbox",
            "search",
            "tel",
            "url",
            "datetime",
            "radio"
          ].indexOf(value) !== -1
        );
      }
    },
    placeholder: {
      type: String,
      default: "text"
    },
    label: {
      type: String
    },
    subLabel: {
      type: String
    },
    valueTest: {
      type: String,
      default: null
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    /**
     * For vue2-editor
     */
    editorToolbar: {
      type: Array,
      required: false,
      default: function() {
        return [["bold", "italic", "underline", "image"]];
      }
    },
    editorCustomImageHandler: {
      type: Boolean,
      required: false,
      default: true
    },
    version: {
      type: String,
      default: "default",
      validator: function(value) {
        return (
          ["default", "border-bottom", "no-border", "disable"].indexOf(
            value
          ) !== -1
        );
      }
    },
    light: {
      type: String,
      default: "default",
      validator: function(value) {
        return ["default", "onBlack"].indexOf(value) !== -1;
      }
    },
    /**
     * Callback function for suggesting a list of users when mentioning.
     * Only for `editor` field.
     * Must return a list of objects with each an `id` and `value` at the minimum.
     */
    onMention: {
      type: Function,
      default: null
    },
    /**
     * @version 1.14.0
     * Autoresize field to make it bigger if the text exceeds the specified size.
     * Only for textarea inputs.
     */
    autoresize: {
      type: Boolean,
      default: false
    },
    /**
     * Marks the field as required.
     */
    isRequired: {
      type: Boolean,
      default: false
    },
    /**
     * When a custom "description" section is provided below
     * the input, use this attribute to make the field
     * accessible towards related descriptions and errors.
     */
    ariaDescribedBy: {
      type: String
    }
  },
  watch: {
    theValue: function() {
      this.$emit("input", this.theValue);
    },
    value: function() {
      this.theValue = this.value;
    }
  },
  data: function() {
    return {
      theValue: null,
      foldingOpen: false,
      component: null,
      showPassword: false
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    onInput($event) {
      this.resize($event);
      this.$emit("input", this.theValue);
    },
    onClickLabel: function() {
      if (this.foldingOpen) this.foldingOpen = false;
      else this.foldingOpen = true;
    },
    removeTag: function(value) {
      if (
        this.theValue &&
        this.theValue.length > 0 &&
        this.theValue.indexOf(value) !== -1
      )
        this.theValue.splice(this.theValue.indexOf(value), 1);
    },
    addTag: function() {
      var value = this.$refs.tagField.value;

      if (this.valueTest && this.valueTest === "isDomain") {
        var re = new RegExp(
          /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
        );

        if (!value.match(re)) return false;
      }

      if (!this.theValue) this.theValue = [];

      if (this.theValue.indexOf(value) === -1) this.theValue.push(value);

      this.$refs.tagField.value = "";
    },

    onBlur: function() {
      this.$emit("blur");
    },

    setPlace: function(address) {
      var data = {
        formattedAddress: address.formatted_address,
        city: "",
        country: "",
        countryCode: "",
        placeId: address.place_id,
        region: "",
        zipCode: "",
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      };

      if (address.address_components.length > 0) {
        for (var i = 0; i < address.address_components.length; i++) {
          // CITY
          if (address.address_components[i].types.indexOf("locality") >= 0)
            data.city = address.address_components[i].long_name;

          // REGION
          if (
            address.address_components[i].types.indexOf(
              "administrative_area_level_1"
            ) >= 0
          )
            data.region = address.address_components[i].long_name;

          // COUNTRY
          if (address.address_components[i].types.indexOf("country") >= 0) {
            data.country = address.address_components[i].long_name;
            data.countryCode = address.address_components[i].short_name;
          }

          // POSTAL CODE
          if (address.address_components[i].types.indexOf("postal_code") >= 0)
            data.zipCode = address.address_components[i].long_name;
        }
      }

      this.theValue = data;
    },
    editorHandleImageAdded: function(
      file,
      Editor,
      cursorLocation,
      resetUploader
    ) {
      this.$emit(
        "editor-image-added",
        file,
        Editor,
        cursorLocation,
        resetUploader
      );
    },
    resize($event) {
      if (this.autoresize && (window || (process && process.client))) {
        const el = $event.target;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }
  },
  computed: {
    getCss: function() {
      // todo : refactor this
      var styles = ["-style-" + this.version, "-light-" + this.light];
      if (this.error) styles.push("-in-error");
      if (this.success) styles.push("-in-success");
      if (this.type === "select" && this.theValue === "")
        styles.push("select--placeholder");

      return styles;
    },
    getIconLabel: function() {
      if (!this.fold) return null;

      if (this.foldingOpen) return "arrowDown";
      else return "arrowRight";
    },

    getFormattedAddress: function() {
      if (!!this.theValue && this.theValue.formattedAddress !== undefined)
        return this.theValue.formattedAddress;
      else if (
        typeof this.theValue === "object" &&
        Object.keys(this.theValue).length === 0
      )
        return "";

      return this.theValue;
    }
  },
  created() {
    this.theValue = this.value;

    if (this.foldDefault) this.foldingOpen = true;
  },
  mounted() {
    if (this.type === "editor") this.component = () => import(`./FieldEditor`);
    if (this.type === "datetime" || this.type === "datetime-local")
      this.component = () => import(`./FieldDateTime`);
  }
};
</script>
<style lang="scss">
// on utilise une autre balise style sans l'attribut scoped
// car ce n'est pas ce component qui render le rich text editor
.field--rich-text-editor {
  @include rte-render;
}
.quillWrapper {
  &.-light-onBlack {
    .ql-toolbar,
    .ql-container {
      background: $color-neutral-100;
    }
  }

  .ql-editor.ql-blank::before {
    color: $color-text-light;
    font-style: initial;
  }
}

@include placeholder;
</style>
<style lang="scss" scoped>
.field__container {
  position: relative;
}

input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="datetime-local"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"],
select,
textarea,
.FakeField,
.field {
  @include field;
}

.field__description {
  @include text-small;
  margin-top: $space_xxs;
  opacity: 0.5;

  &.-light-onBlack {
    color: $color-neutral-80;
  }
}

.field__container {
  &--folding {
    .field__input,
    .description,
    .labelCheckbox {
      display: none;
    }

    .field-label,
    .labelCheckbox {
      cursor: pointer;
    }
  }
  &--folding-open {
    .field__input,
    .description,
    .labelCheckbox {
      display: block;
    }
  }

  &--folding-close {
    .field-label {
      margin-bottom: 0px;
    }
  }
}

.field__header {
  @include flex;
}

.field__label {
  flex-grow: 2;
}

.field__sublabel {
  font-weight: $font-weight-light;
  margin-left: 0.3em;
}

.field__action {
  flex-grow: 1;
  text-align: right;
}

.checkbox__label {
  @include flex;

  &.-light-onBlack {
    color: $color-neutral-80;
  }
}

.checkbox {
  &__input {
    @include cursor-pointer;
    font-size: 5rem;
    margin: 0px;
    margin-right: 0.1em;
    margin-top: 0.04em;
  }

  &__mention {
    @include cursor-pointer;
  }
}

.tags {
  margin-bottom: $space_xs;
}

.tag {
  @include flex;
  display: inline-block;
  align-items: center;
  padding: $space_xs;
  margin-right: $space_xs;
  border-radius: $border-radius-m;
}

.tag__label {
  font-weight: $font-weight-black;
  margin-right: $space-m/4;
}

.tag__icon {
  @include cursor-pointer;
  color: $color-text;
  margin-top: 0.1em;
}

select {
  @include cursor-pointer;
  position: relative;
  padding-right: 2em !important;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23E3E3E3%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  //color: $color-text-light;

  &.select--placeholder {
    color: $color-text-light;
  }
}

.select__placeholder {
  color: $color-text-light;
}

.input__search-icon,
.input__select-icon {
  max-width: $space-m;
  position: absolute;
  right: $space-m;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.1s ease;
  pointer-events: none;

  input:hover + &,
  input:focus + & {
    opacity: 0;
  }
}

.input__password-icon {
  position: absolute;
  right: $space-m;
  top: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>

<docs>

## Type of fields
For accessibility purposes, indicate required fields by using <code>mks-visually-hidden</code> component, if using a * for regular devices.

  ```jsx
    <br>
    <mks-field name="text" type="text" label="Text" placeholder="Placeholder" value=""></mks-field>
    <mks-field name="password" type="password" label="password" placeholder="Placeholder" value=""></mks-field>
    <mks-field name="number" type="number" label="Number" v-bind:min="1" v-bind:max="10" placeholder="Min and max props can be set" value=""></mks-field>
    <mks-field name="select" type="select" label="Select" placeholder="An array of objects with value and label key sets the options. Or just an array of values." v-bind:options="[{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]" value=""></mks-field>
    <mks-field name="editor" type="editor" label="Editor" placeholder="Placeholder" value=""></mks-field>
    <mks-field name="textarea" type="textarea" label="Textarea" autoresize placeholder="Textarea can autoresize to the height of the content by using the prop 'autoresize'" value=""></mks-field>
    <mks-field name="checkbox" type="checkbox" label="Checkbox" checkbox-label="Checkbox label" value=""></mks-field>
    <mks-field name="search" type="search" placeholder="Search..." value=""></mks-field>
    <mks-field name="datetime" label="Datetime" type="datetime" v-bind:value="new Date()" v-bind:options="{type: 'datetime', format: 'DD/MM/YY HH:mm', 'minute-step': 15}"></mks-field>
    <mks-field name="radio" type="radio" label="Radio" v-bind:options="[{value: '1', label: 'Option 1', description: 'une explication du champ'}, {value: '2', label: 'Option 2', tooltip: 'je m\'affiche au survol'}]" value=""></mks-field>

  ```

## Editor with mention

In order to enable mention functionality in the editor, you need to provide a callback function through the prop `on-mention`.

The function has the search term as argument, and awaits an array of objects, which each have an `id` and `value`.

<pre><code> // example of return value for the callback function
(searchTerm) => [
    { id: 1, value: 'name 1' }, 
    { id: 2, value: 'name 2' }
]
</code></pre>
```jsx
<mks-field name="editor" v-bind:on-mention="() => [{ id: 1, value: 'name 1' }, { id: 2, value: 'name 2' }]" type="editor" label="Editor" placeholder="Placeholder" value="" ></mks-field>
```

## Additional texts

```jsx
    <mks-field name="text" type="text" label="Sublabel" sub-label="with sublabel" value=""></mks-field>
    <mks-field name="text" type="text" label="Description" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. " value=""></mks-field>
    <mks-field name="text" type="text" label="Action slot" value="">
      <template v-slot:action>
  Remove
  <mks-icon type="close" />
</template>
    </mks-field>
  ```

## States
```jsx
    <mks-field name="text" type="text" label="Default" value=""></mks-field>
    <mks-field name="text" type="text" label="Disabled" v-bind:disable="true" value=""></mks-field>
    <mks-field name="text" type="text" label="Success" v-bind:success="true" value="Foo success"></mks-field>
    <mks-field name="text" type="text" label="Error" v-bind:error="true" value="Bar error"></mks-field>
  ```


</docs>
