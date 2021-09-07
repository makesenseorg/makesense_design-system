<template>
  <ul class="app-lang" :aria-label="$MKSlocale['langpicker']" role="listbox">
    <li v-for="lang in langs" :key="lang" class="app-lang__item">
      <mks-button
        tag="button"
        :class="{
          'app-lang__button': true,
          'app-lang__button--active': lang === active
        }"
        variant="bare"
        :aria-selected="lang === active ? true : false"
        role="option"
        @click="$emit('select', lang)"
      >
        {{ lang }}
      </mks-button>
    </li>
  </ul>
</template>

<script>
/**
 * Displays list of available language and shows current one.
 * @version 0.2.0
 */
export default {
  name: "MksLangPicker",
  release: "0.2.0",
  props: {
    /** Array of languages */
    langs: {
      type: Array,
      required: true
    },
    /** Active item */
    active: {
      type: String,
      required: true
    }
  }
};
/**
 * Returns the selected language
 *
 * @event select
 * @property {string} language selected
 */
</script>

<style lang="scss" scoped>
.app-lang {
  display: flex;
}
.app-lang__item {
  margin-right: $space-s;
}
.app-lang__button {
  text-transform: uppercase !important;
  color: inherit !important;

  &--active {
    font-weight: $font-weight-black;
  }
}
</style>

<docs>
```jsx

<mks-lang-picker :langs="['fr', 'en', 'es']" active="en"></mks-lang-picker>

```
</docs>
