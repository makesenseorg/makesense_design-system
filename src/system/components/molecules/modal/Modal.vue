<template>
  <transition
    name="modal"
    duration="300"
    aria-modal="true"
    :aria-labelledby="`modal-title-${uniqueId}`"
  >
    <div
      v-if="active && isMounted"
      @keydown.esc="onClose"
      :class="
        `modal__wrapper modal--size-${size} ${
          active && isMounted ? 'modal--opened' : ''
        }`
      "
    >
      <button
        class="modal__overlay"
        @click="onClose"
        :aria-label="$MKSlocale['close']"
      ></button>
      <div class="modal" :ref="`modal-${uniqueId}`" tabindex="0">
        <header class="modal__menu">
          <mks-heading
            tag="h3"
            tabindex="0"
            class="modal__title"
            :id="`modal-title-${uniqueId}`"
            :ref="`modal-title-${uniqueId}`"
            ><slot name="title">{{ title }}</slot></mks-heading
          >
          <div class="modal__tools">
            <!-- @slot In the modal menu, allows to display tools or context. -->
            <slot name="tools"></slot>
          </div>
          <div class="modal__close">
            <mks-button
              tabindex="0"
              :ref="`modal-close-${uniqueId}`"
              tag="button"
              @click="onClose"
              v-if="closeButton"
              >Close</mks-button
            >
            <mks-button
              tabindex="0"
              :ref="`modal-close-${uniqueId}`"
              tag="button"
              @click="onClose"
              size="round"
              variant="bare"
              v-else
              ><mks-icon type="x" size="40" stroke-width="3"></mks-icon
            ></mks-button>
          </div>
        </header>
        <main class="modal__main">
          <!-- @slot Main content of the modal-->
          <slot />
        </main>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * A modal can be used to display tempory content or make the user do an action. It emits a "close" event.
 * @version 1.0.0
 */
export default {
  name: "MksModal",
  props: {
    /**
     * Is the modal visible ? Default false
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * Title of the modal
     */
    title: {
      type: String,
      required: false
    },
    /**
     * "small", "medium", "full" or "page" (page introduced in @version 1.6.0)
     */
    size: {
      type: String,
      required: false,
      default: "full",
      validator: function(value) {
        return ["small", "medium", "full", "page"].indexOf(value) !== -1;
      }
    },
    /**
     * Display a button instead of icon
     */
    closeButton: {
      type: Boolean,
      default: false
    },
    /** Displays an overlay over the page content to draw attention to the modal */
    overlay: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isMounted: false,
      uniqueId: Math.random()
        .toString(36)
        .substr(2, 9)
    };
  },
  mounted() {
    this.isMounted = true;
  },
  watch: {
    active() {
      if (this.active && this.isMounted) {
        this.$nextTick(() => {
          this.$refs[`modal-title-${this.uniqueId}`].$el.focus();
        });
      }
    }
  },
  methods: {
    onClose: function() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.modal__wrapper {
  position: fixed;
  z-index: 10000;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;

  &.modal--opened {
    pointer-events: all;

    .modal__overlay {
      opacity: 0.4;
    }
  }

  &.modal--size-small,
  &.modal--size-medium {
    .modal {
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      border-radius: $border-radius-l;
    }

    &.modal-enter-active,
    &.modal-leave-active {
      .modal {
        transform: translate3d(-50%, -50%, 0);
      }
    }

    &.modal-enter {
      .modal {
        z-index: 10000;
        transform: translate3d(-50%, 300%, 0);
      }
    }

    &.modal-enter-to .modal {
      transform: translate3d(-50%, -50%, 0);
    }

    &.modal-leave-to .modal {
      transform: translate3d(-50%, 300%, 0);
    }
  }

  &.modal--size-medium .modal {
    width: 60%;
    min-width: 300px;
    min-height: 20%;
    max-height: 80%;
  }

  &.modal--size-full .modal {
    border-radius: $border-radius-l;
    top: $space-m;
    bottom: $space-m;
    left: $space-m;
    right: $space-m;
  }

  &.modal--size-page .modal {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .modal__menu {
      background: none;
    }
  }
}
.modal__overlay {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  position: fixed;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.modal {
  @include flex;
  position: fixed;
  box-shadow: $box-shadow-large;
  flex-direction: column;
  //padding-top: 70px;
  overflow-y: scroll;
  background: $background-color-base;
  max-width: 100%;
  z-index: 10000;
}

.modal__title {
  margin-right: $space-m;
}

.modal__menu {
  @include flex;
  align-items: center;
  position: sticky;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 10000;
  background: $background-color-soft;
  @include inner-space("s", "y");
  @include inner-space("m", "x");

  @include breakpoint("medium") {
    @include inner-space("xl", "x");
  }
}

.modal__tools {
  @include flex;
  flex-grow: 2;
  align-items: center;
}

.modal__close {
  @include flex;
  flex-grow: 1;
  justify-content: flex-end;
}

.modal__main {
  flex-grow: 2;
}

.modal-enter-active,
.modal-leave-active {
  .modal {
    transform: translate3d(0, 0, 0);
    transition: transform 0.2s;
    perspective: 1000;
    backface-visibility: hidden;
  }
  .modal__overlay {
    transition: opacity 0.1s;
    opacity: 0.4;
  }
}

.modal-enter-active {
  z-index: 10000;
}

.modal-enter {
  .modal {
    transform: translate3d(0, 100%, 0);
  }
  z-index: 10000;
}

.modal-enter-to {
  .modal {
    transform: translate3d(0%, 0, 0);
  }
  .modal__overlay {
    transition: opacity 0.2s;
    opacity: 0;
  }
}

.modal-leave-to {
  .modal {
    transform: translate3d(0, 100%, 0);
  }
  .modal__overlay {
    transition: opacity 0.2s;
    opacity: 0;
  }
}
</style>
<docs>
```jsx
<template>
    <div>
        <mks-button v-on:click="toggleModal('small')">Open small modal</mks-button>
        <mks-modal v-bind:active="modalActive === 'small'" title="small modal" size="small" v-on:close="toggleModal(null)">
            I take the space of the content
        </mks-modal>

        <mks-button v-on:click="toggleModal('medium')">Open medium modal</mks-button>
        <mks-modal v-bind:active="modalActive === 'medium'" title="medium modal" size="medium" v-on:close="toggleModal(null)">
            I'm a medium modal
        </mks-modal>

        <mks-button v-on:click="toggleModal('full')">Open full modal</mks-button>
        <mks-modal v-bind:active="modalActive === 'full'" title="full modal" size="full" v-on:close="toggleModal(null)">
            I take the whole screen !
        </mks-modal>

        <mks-button v-on:click="toggleModal('page')">Open page modal</mks-button>
        <mks-modal v-bind:active="modalActive === 'page'" size="page" v-on:close="toggleModal(null)">
            I take the whole screen !
        </mks-modal>
    </div>
</template>
<script>
export default {
    name: "ExampleComponent",
    data() {
        return {
            modalActive: false
        }
    },
    methods: {
        toggleModal(name) {
            this.modalActive = name;
        },
    }
}
</script>
```

</docs>
