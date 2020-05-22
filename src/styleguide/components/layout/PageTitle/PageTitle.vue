<template>
  <component
    :is="tag"
    class="ds-page-title"
    :class="[highlight && `ds-page-title-highlight`]"
  >
    <ds-container>
      <mks-heading color="inherit" tag="h1">
        {{ heading }}
      </mks-heading>
      <slot />
    </ds-container>
  </component>
</template>

<script>
import DsContainer from "../Container/Container";
import DsHeading from "../../typography/Heading/Heading";
/**
 * This component is used as the title of a page.
 * @version 1.0.0
 */
export default {
  name: "DsPageTitle",
  components: { DsContainer, DsHeading },
  props: {
    /**
     * The heading of the page.
     */
    heading: {
      type: String,
      default: "",
      required: true
    },
    /**
     * Whether this title should be highlighted
     */
    highlight: {
      type: Boolean,
      default: false
    },
    /**
     * The html element name used for the title.
     */
    tag: {
      type: String,
      default: "header"
    }
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
