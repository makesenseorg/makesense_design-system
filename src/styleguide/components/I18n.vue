<template>
  <div class="i18n">
    <MksLangPicker
      :active="locale"
      :langs="locales"
      @select="$MKSsetLocale($event)"
    ></MksLangPicker>
  </div>
</template>

<script>
import LangPicker from "@/system/components/molecules/langPicker/LangPicker";

export default {
  name: "I18n",
  components: { LangPicker },
  computed: {
    locale() {
      return this.$MKScurrentLocale;
    },
    locales() {
      return this.$MKSlocales;
    }
  }
};
</script>

<style lang="scss" scoped>
.i18n {
  padding: 0 $space-s;
  margin-bottom: $space-m;
}
</style>
