<template>
  <component :is="component">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "MksLink",
  computed: {
    component() {
      // todo : return nuxt link or router link depending on app type
      // todo : detect app type
      // todo : detect starts with https
      return "router-link" || "nuxt-link" || "a";
    }
  }
};
</script>
