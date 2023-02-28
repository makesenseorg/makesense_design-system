<template>
  <div class="ds-form-item" :class="$parentInput.stateClasses">
    <ds-input-label :label="$parentInput.label" :for="$parentInput.id" />
    <slot />
    <ds-input-error :error="$parentInput.error" />
  </div>
</template>

<script>
import DsInputLabel from "./InputLabel";
import DsInputError from "./InputError";
/**
 * @version 1.0.0
 * @private
 */
export default {
  name: "DsFormItem",
  inject: ["$parentInput"],
  components: { DsInputLabel, DsInputError },
};
</script>

<style lang="scss" src="./style.scss"></style>
