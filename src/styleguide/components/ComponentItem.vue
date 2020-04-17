<template>
  <tr class="component-link" @click="goToComponent">
    <ds-table-col class="component-name">{{ name }}</ds-table-col>
    <ds-table-col class="component-description">{{
      component.description
    }}</ds-table-col>
    <ds-table-col
      ><ds-button :path="{ name: component.name }" primary>
        View
      </ds-button></ds-table-col
    >
  </tr>
</template>

<script>
export default {
  name: "ComponentItem",
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  computed: {
    name() {
      return this.$options.filters.componentName(this.component.name);
    }
  },
  methods: {
    goToComponent() {
      this.$router.push({ name: this.component.name });
    }
  }
};
</script>
<style lang="scss" scoped>
.component-link:hover {
  cursor: pointer;
  background: $color-neutral-95;
  transition: all 0.2s ease-out;
}
.component-description {
  color: $color-text-light;
}
</style>
