<template>
  <component
    :is="tag"
    class="ds-card"
    :class="[
      $slots.image && 'ds-card-has-image',
      primary && `ds-card-primary`,
      secondary && `ds-card-secondary`,
      centered && `ds-card-centered`,
      hover && `ds-card-hover`
    ]"
  >
    <div class="ds-card-image" v-if="image || $slots.image">
      <!-- @slot Content of the card's image -->
      <slot name="image">
        <img :src="image" />
      </slot>
    </div>
    <div class="ds-card-icon" v-if="icon">
      <mks-icon :type="icon" />
    </div>
    <header class="ds-card-header" v-if="header || $slots.header">
      <!-- @slot Content of the card's header -->
      <slot name="header">
        <mks-heading :tag="headerTag" size="h3">{{ header }}</mks-heading>
      </slot>
    </header>
    <div class="ds-card-content">
      <slot />
    </div>
    <footer class="ds-card-footer" v-if="$slots.footer">
      <!-- @slot Content of the card's footer -->
      <slot name="footer" />
    </footer>
  </component>
</template>

<script>
import MksIcon from "@/system/components/atoms/icon/Icon";
import DsHeading from "../../typography/Heading/Heading";
/**
 * A card is used to group content in an appealing way.
 * @version 1.0.0
 */
export default {
  name: "DsCard",
  components: { MksIcon, DsHeading },
  props: {
    /**
     * The outtermost html tag test
     */
    tag: {
      type: String,
      default: "article"
    },
    /**
     * The card's header
     */
    header: {
      type: String,
      default: null
    },
    /**
     * The card's header tag
     * @options h1|h2|h3|h4|h5|h6
     */
    headerTag: {
      type: String,
      default: "h3",
      validator: value => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/);
      }
    },
    /**
     * The card's image
     */
    image: {
      type: String,
      default: null
    },
    /**
     * The card's icon
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * Highlight with primary color
     */
    primary: {
      type: Boolean,
      default: false
    },
    /**
     * Highlight with secondary color
     */
    secondary: {
      type: Boolean,
      default: false
    },
    /**
     * Centers the content
     */
    centered: {
      type: Boolean,
      default: false
    },
    /**
     * Makes the card hoverable
     */
    hover: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
