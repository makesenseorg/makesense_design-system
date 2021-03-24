<template>
  <transition
    name="modal"
    duration="300"
    aria-modal="true"
    :aria-labelledby="`modal-title-${uniqueId}`"
  >
    <div
      :class="`modal modal--size-${size}`"
      :ref="`modal-${uniqueId}`"
      v-if="active && isMounted"
      tabindex="0"
      @keydown.esc="onClose"
    >
      <header class="modal__menu">
        <mks-heading
          tag="h3"
          tabindex="0"
          class="modal__title"
          :id="`modal-title-${uniqueId}`"
          :ref="`modal-title-${uniqueId}`"
          >{{ title }}</mks-heading
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
            >Close</mks-button
          >
        </div>
      </header>
      <main class="modal__main">
        <!-- @slot Main content of the modal-->
        <slot />
      </main>
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
     * Unused
     */
    size: {
      type: String,
      required: false,
      default: "full",
      validator: function(value) {
        return ["small", "medium", "full"].indexOf(value) !== -1;
      }
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

<style lang="scss" scoped>
.modal {
  @include flex;
  @include elevated-xxl;
  flex-direction: column;
  position: fixed;

  z-index: 10000;
  //padding-top: 70px;
  overflow-y: scroll;
  background: $background-color-base;
  max-width: 100%;

  &--size-medium {
    width: 60%;
    min-width: 300px;
    min-height: 20%;
    max-height: 80%;
  }

  &--size-full {
    top: $space-m;
    bottom: $space-m;
    left: $space-m;
    right: $space-m;
  }
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
  padding: $space-s;
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
  transform: translate3d(0, 0, 0);
  transition: transform 0.2s;
  perspective: 1000;
  backface-visibility: hidden;
}

.modal-enter-active {
  z-index: 10;
}

.modal-enter {
  z-index: 10;
  transform: translate3d(0, 100%, 0);
}

.modal-enter-to {
  transform: translate3d(0%, 0, 0);
}

.modal-leave-to {
  transform: translate3d(0, 100%, 0);
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
