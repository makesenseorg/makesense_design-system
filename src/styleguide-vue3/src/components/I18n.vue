<template>
  <div class="i18n">
    <mks-text size="small" color="light">Lang of accessibility texts</mks-text>
    <MksLangPicker
      v-if="locales.length > 0"
      :active="locale"
      :langs="locales"
      @select="$MKSsetLocale($event)"
    ></MksLangPicker>
  </div>
</template>

<script>
import MksLangPicker from "@@/components/LangPicker";
export default {
  name: "GuideI18n",
  inject: ["$MKSsetLocale"],
  components: {
    MksLangPicker,
  },
  computed: {
    locale() {
      return this.$MKScurrentLocale;
    },
    locales() {
      return this.$MKSlocales;
    },
  },
};
</script>

<style lang="scss" scoped>
.i18n {
  padding: 0 $space-s;
  margin-top: $space-m;
}
</style>
