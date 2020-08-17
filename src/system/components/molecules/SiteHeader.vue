<template>
  <header class="site-header">
    <div class="site-header__logo">{{ logo }}</div>
    <div class="site-header__i18n">FR EN ES</div>
    <nav class="site-header__menu">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </nav>
    <div class="site-header__sidebar-control">---</div>
  </header>
</template>
<script>
export default {
  props: {
    /* header background color */
    theme: {
      type: String
    },
    /* site logo */
    logo: {
      type: String
    }
  },
  data() {}
};
</script>
<style lang="scss" scoped></style>
