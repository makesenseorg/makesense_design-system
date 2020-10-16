<template>
  <div>
    hello
    <mks-heading>world</mks-heading>
    <mks-lang-picker :langs="['fr', 'en', 'es']" active="en"></mks-lang-picker>
    <Nuxt></Nuxt>
  </div>
</template>
<script>
import { MksLangPicker } from "../../../src/system/components";
export default {};
</script>
