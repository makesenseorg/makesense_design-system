<template>
  <label class="toggle" :for="name">
    <input
      :name="name"
      :id="`toggle-${name}`"
      type="checkbox"
      class="toggle__input"
      :checked="checked"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <span class="toggle__display">
      <mks-icon
        v-if="iconOn"
        :type="iconOn"
        aria-hidden="true"
        focusable="false"
        class="toggle__icon toggle__icon--on"
        color="currentColor"
      ></mks-icon>
      <mks-icon
        v-if="iconOff"
        :type="iconOff"
        aria-hidden="true"
        focusable="false"
        class="toggle__icon toggle__icon--off"
        color="currentColor"
      ></mks-icon>
    </span>
    {{ value }}
    <div v-if="$slots['default']" :class="{ 'label--disabled': disabled }">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>
<script>
/**
 * For toggling between two possible options, or enabling/desabling something
 *  @version 1.16.0
 */
export default {
  name: "MksToggle",
  props: {
    /**
     * Status of the toggle
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * Name of the input, required
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Displays an icon when toggle is on
     * @version 1.16.1
     */
    iconOn: {
      type: String
    },
    /**
     * Displays an icon when toggle is off
     * @version 1.16.1
     */
    iconOff: {
      type: String
    },
    /**
     * Label on the side of the toggle, you may use the default slot instead interchangeably
     */
    label: {
      type: String
    },
    /**
     * Disables toggle
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked() {
      return this.value === true || this.value === "true"
        ? "checked"
        : undefined;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.toggle {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1em;
  cursor: pointer;
  gap: 1ch;
}

// button.toggle {
//   border: 0;
//   padding: 0;
//   background-color: transparent;
//   font: inherit;
// }

.toggle__input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.toggle__display {
  --offset: 0.25em;
  --diameter: 1.8em;

  --diameter-double: calc(var(--diameter) * 2);
  --offset-double: calc(var(--offset) * 2);

  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: content-box;
  width: calc(var(--diameter-double) + var(--offset-double));
  height: calc(var(--diameter) + var(--offset-double));
  border: 1px solid $color-neutral-80;
  position: relative;
  border-radius: 100vw;
  background-color: $color-neutral-95;
  transition: 250ms;
  pointer-events: none;
}

.toggle__display::before {
  content: "";
  z-index: 2;
  position: absolute;
  top: 50%;
  left: var(--offset);
  box-sizing: border-box;
  width: var(--diameter);
  height: var(--diameter);
  border: 1px solid $color-neutral-80;
  border-radius: 50%;
  background-color: white;
  transform: translate(0, -50%);
  will-change: transform;
  transition: inherit;
}

.toggle:focus .toggle__display,
.toggle__input:focus + .toggle__display {
  outline: 1px dotted #212121;
  outline: 1px auto -webkit-focus-ring-color;
  outline-offset: 2px;
}

.toggle:focus,
.toggle:focus:not(:focus-visible) .toggle__display,
.toggle__input:focus:not(:focus-visible) + .toggle__display {
  outline: 0;
}

.toggle[aria-pressed="true"] .toggle__display,
.toggle__input:checked + .toggle__display {
  background-color: $color-success;
  border-color: $color-success;
}

.toggle[aria-pressed="true"] .toggle__display::before,
.toggle__input:checked + .toggle__display::before {
  transform: translate(100%, -50%);
}

.toggle[disabled] .toggle__display,
.toggle__input:disabled + .toggle__display {
  opacity: 0.6;
  filter: grayscale(40%);
  cursor: not-allowed;
}
.toggle[disabled] .toggle__input,
.toggle__input:disabled {
  cursor: not-allowed;
}

[dir="rtl"] .toggle__display::before {
  left: auto;
  right: var(--offset);
}

[dir="rtl"] .toggle[aria-pressed="true"] + .toggle__display::before,
[dir="rtl"] .toggle__input:checked + .toggle__display::before {
  transform: translate(-100%, -50%);
}

.toggle__icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  overflow: hidden;
}

.toggle__icon--on {
  color: $color-neutral-100;
  // font-size: 85%;
}

.toggle__icon--off {
  color: $color-text-light;
}

.label--disabled {
  color: $color-text-light;

  .toggle__icon {
    color: $color-neutral-80;
  }
}
</style>

<docs>
 ## Colors
```jsx
<mks-toggle name="email" v-bind:value="true" icon-off="bell-off" icon-on="bell" >Notify by email</mks-toggle><br>
<mks-toggle name="sms" v-bind:value="false" icon-off="bell-off" icon-on="bell" >Notify by SMS</mks-toggle><br>
<mks-toggle name="pigeon" disabled>Notify by Pigeon voyageur</mks-toggle><br>
```

</docs>
