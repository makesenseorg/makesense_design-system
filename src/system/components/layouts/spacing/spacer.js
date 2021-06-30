/* <component :class="classes" :is="tag">
    <!-- @slot children elements to space -->
    // <div stack-item>
    //   <slot item></slot>
    // </div>
    <slot></slot>
  </component> */

export default {
  name: "MksSpacer",
  props: {
    /** Set alignment on secondary axis. (align-items) */
    align: {
      type: String,
      default: "start",
      validator: value => {
        return value.match(/(start|end|center|stretch|baseline)/);
      }
    },
    /** Apply same spacing to nested elements */
    deep: {
      type: Boolean,
      default: false
    },
    /** Set alignment on main axis (justify-content) */
    distribute: {
      type: String,
      default: "start",
      validator: value => {
        return value.match(/(start|end|center|equal|spaced)/);
      }
    },
    /** Elements flow on the vertical axis by default, inline makes them flow horizontally */
    inline: {
      type: Boolean,
      default: false
    },
    /** Set spacing between elements */
    spacing: {
      type: String,
      default: "m",
      validator: value => {
        return value.match(/(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)/);
      }
    },
    /** Div, p, ul, ol, li, span */
    tag: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|p|ul|ol|li|span)/);
      }
    },
    /** Elements should wrap if they extend size of container */
    nowrap: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      let classes = "spacer";
      classes += ` spacer--spacing-${this.spacing}`;
      classes += ` spacer--align-${this.align}`;
      classes += ` spacer--distribute-${this.distribute}`;
      if (this.nowrap) classes += " spacer--no-wrap";
      if (this.inline) {
        classes += " spacer--inline";
      } else {
        classes += " spacer--stack";
      }
      return classes;
    }
  },
  render(createElement) {
    const childs = [];
    this.$slots.default.forEach(item => {
      if (item.tag) {
        // console.log(item.elm.classList);
        childs.push(createElement("div", { class: "spacer__item" }, [item]));
      }
    });

    return createElement(this.tag, { class: this.classes }, childs);
  }
};
