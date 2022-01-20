<template>
  <div
    class="bubble"
    :style="`--color-bg: ${colorBg}; --color-content: ${colorContent};`"
  >
    <div class="bubble__inner">
      <div v-if="image" class="bubble__image-wrapper">
        <img
          :src="image"
          class="attachment-full size-full"
          :alt="imageAlt"
          loading="lazy"
          :srcset="srcset"
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </div>
      <div class="bubble__content" :style="image ? 'width:60%;' : 'width:80%'">
        <!-- @slot Shows on the right side of the image and replaces the title, content and link. -->
        <slot>
          <mks-spacer spacing="s" class="formatted-content">
            <mks-heading tag="h4" tag-class="h2" :color="accentColor">{{
              title
            }}</mks-heading>
            <div v-html="content"></div>
            <mks-link v-if="link" class="button-link" :to="link">
              <mks-button
                :type="buttonColor"
                size="small"
                @click="onClickCTA"
                >{{ linkLabel || $MKSlocale["discover"] }}</mks-button
              >
            </mks-link>
          </mks-spacer>
        </slot>
      </div>
    </div>
    <mks-button
      v-if="closeable"
      input-type="button"
      size="round"
      class="bubble__close-btn"
      :type="accentColor"
      @click="onClose"
    >
      <mks-icon type="x" weight="7" size="24" alt="Fermer"></mks-icon>
    </mks-button>
  </div>
</template>
<script>
export default {
  /** @version 1.13.0 Display an ad in the right side of the screen, illustrate a conservation, or use as a tooltip. Here's a versatile bubble. */
  name: "MksBubble",
  props: {
    /** Display a title with h4 tag. Overidden by slot. */
    title: {
      type: String
    },
    /** HTML string displayed below the title. Overidden by slot. */
    content: {
      type: String
    },
    /** Link url for call to action. Overidden by slot. */
    link: {
      type: String
    },
    /** Link label for call to action. Overidden by slot. */
    linkLabel: {
      type: String,
      default: "Découvrir"
    },
    /** Image url */
    image: {
      type: String,
      required: false
    },
    /** Image srcset. Sizes attribute = (max-width: 400px) 100vw, 400px */
    srcset: {
      type: String,
      required: false
    },
    /** Alt text for image. */
    imageAlt: {
      type: String
    },
    /** Use token color or hexa color */
    backgroundColor: {
      type: String,
      default: "calypso"
    },
    /** Use token color or hexa color */
    accentColor: {
      type: String,
      default: "broom"
    },
    /** Use token color or hexa color */
    textColor: {
      type: String,
      default: "neutral-100"
    },
    /** Use token color or hexa color */
    buttonColor: {
      type: String,
      default: "neutral"
    },
    /** Should the bubble have a close icon */
    closeable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    colorBg() {
      const hexa = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
      if (hexa.test(this.backgroundColor)) {
        return this.backgroundColor;
      } else if (this.backgroundColor === "positive") {
        return "var(--color-success)";
      } else if (this.backgroundColor === "negative") {
        return "var(--color-danger)";
      } else return `var(--color-${this.backgroundColor})`;
    },
    colorContent() {
      const hexa = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
      if (hexa.test(this.textColor)) {
        return this.textColor;
      } else if (this.textColor === "light") {
        return "var(--color-light)";
      } else if (this.textColor === "negative") {
        return "var(--color-danger)";
      } else if (this.textColor === "positive") {
        return "var(--color-success)";
      } else if (this.textColor === "negative") {
        return "var(--color-danger)";
      } else return `var(--color-${this.textColor})`;
    }
  },
  methods: {
    onClose() {
      this.$emit("close");
    },
    onClickCTA() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
.bubble {
  // position: fixed;
  // right: 1.25rem;
  // bottom: 3rem;
  width: 620px;
  border-radius: 1.625rem;
  z-index: 30;
  max-width: calc(100% - 5.625rem);
  -webkit-filter: drop-shadow(0 0 0.3125rem rgba(0, 0, 0, 0.15));
  background: var(--color-bg);
  filter: drop-shadow(0 0 0.3125rem rgba(0, 0, 0, 0.15));

  &:before {
    position: absolute;
    bottom: 0;
    content: "";
    border-bottom-right-radius: 0.5rem;
    background-color: var(--color-bg);
    right: 3.125rem;
    width: 2.8125rem;
    height: 2.8125rem;
    transform: translateY(50%) rotate(45deg);
  }
}

.bubble__inner {
  display: flex;
  align-items: center;
  padding: 2.25rem;
  color: #0c3944;
}
.bubble__close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  font-size: 0.8125rem;
  line-height: 1.5625rem;
  width: 1.625rem;
  height: 1.625rem;
  min-width: 32px !important;
}
.bubble__image-wrapper {
  padding-right: 1.5rem;
  width: 40%;
  img {
    height: auto;
    width: 400px;
  }
}
.bubble__content /deep/ {
  @include text-large-semibold;
  color: var(--color-content);
  p + p {
    margin-top: $space-xs;
  }
}
.button-link {
  border-bottom: none !important;
}
</style>
<docs>
## bubble with image and custom colors

```jsx

<mks-bubble 
    background-color="#031733"
    accent-color="silver-tree"
    image="https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2.png"
    srcset="https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2.png         882w,
            https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2-300x290.png 300w,
            https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2-768x743.png 768w"
    title="Candidatures ouvertes"
    content="<p>Rejoins l’incubateur de makesense,<br />12 mois d’accompagnement pour les projets qui changent le monde.</p><p><em>Candidatures jusqu’au 30 janvier minuit.</em></p>"
    link="https://france.makesense.org/entrepreneurs/notre-incubateur/test-learn/"
    linkLabel="Découvrir"
  >
</mks-bubble>

```

## bubble without image 

```jsx
<mks-bubble 
  title="Tu veux faire partie de la solution ? Rejoins-nous!"
  content="<p>Depuis 10 ans, makesense crée des outils et des programmes de mobilisation collective pour permettre à tous et à toutes de passer à l’action et de construire une société inclusive et durable.</p>"
>
</mks-bubble>
```

## bubble without image 

```jsx
<mks-bubble>
  Using my own content inside whooogoo
</mks-bubble>
```

## Not closeable

```jsx

<mks-bubble v-bind:closeable="false">
  Can't close me
</mks-bubble>

```
</docs>
