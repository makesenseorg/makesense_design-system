<template>
  <div class="themer">
    <ds-select
      label="Choose app theme"
      v-model="theme"
      :options="themes"
      size="small"
    ></ds-select>
  </div>
</template>

<script>
import { themes } from "@@/tokens";
import DsSelect from "./data-input/Select/Select";

export default {
  name: "Themer",
  components: { DsSelect },
  data() {
    return {
      theme: "base",
      themes
    };
  },
  watch: {
    theme(theme) {
      this.$loadTheme(theme);
    }
  }
};
</script>

<style lang="scss" scoped>
.themer {
  padding: 0 $space-s;
  margin-bottom: $space-m;
}
</style>
