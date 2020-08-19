<template>
  <ul class="app-lang">
    <li v-for="lang in langs" :key="lang" class="app-lang__item">
      <mks-button
        :class="{
          'app-lang__button': true,
          'app-lang__button--active': lang === active
        }"
        :type="lang === active ? 'text-active' : 'text'"
        @click="$emit('select', lang)"
        >{{ lang }}</mks-button
      >
    </li>
  </ul>
</template>

<script>
/**
 * Returns the langage selected
 *
 * @event select
 * @property {string} langage selected
 */
export default {
  name: "MksLangPicker",
  props: {
    langs: {
      type: Array,
      required: true
    },
    active: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.app-lang {
  display: flex;
}
.app-lang__item {
  margin-right: $space-small;
}
</style>

<docs>
```jsx

<mks-lang-picker :langs="['fr', 'en', 'es']" active="en"></mks-lang-picker>

```
</docs>
