<template>
  <div class="popin" style="background-color: #031733; color: #031733;">
    <div class="popin__inner">
      <div class="popin__image-wrapper">
        <img
          src="https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2.png"
          class="attachment-full size-full"
          alt=""
          loading="lazy"
          srcset="
            https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2.png         882w,
            https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2-300x290.png 300w,
            https://france.makesense.org/wp-content/uploads/sites/6/2021/12/mesa-de-trabajo-210-2-768x743.png 768w
          "
          sizes="(max-width: 882px) 100vw, 882px"
        />
      </div>
      <div class="popin__content">
        <mks-spacer spacing="s" class="formatted-content">
          <mks-heading tag="h4" color="silver-tree"
            >Candidatures ouvertes</mks-heading
          >
          <mks-text color="white"
            >Rejoins l’incubateur de makesense,<br />
            12 mois d’accompagnement pour les projets qui changent le monde.
          </mks-text>
          <mks-text size="small" color="white">
            <em> >Candidatures jusqu’au 30 janvier minuit.</em>
          </mks-text>
          <mks-link
            to="https://france.makesense.org/entrepreneurs/notre-incubateur/test-learn/"
          >
            <mks-button size="small">Découvrir</mks-button>
          </mks-link>
        </mks-spacer>
      </div>
    </div>
    <mks-button
      alt="Fermer"
      input-type="button"
      size="round"
      icon="x"
      class="popin__close-btn"
    >
      <mks-visually-hidden>Fermer</mks-visually-hidden>
    </mks-button>
  </div>
</template>
<script>
export default {
  name: "MksPopin",
  props: {
    /** Scroll amount in pixel when the popin should be displayed. Value of 0 displays instantly without scroll  */
    displayScrollAmount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      initialized: false
    };
  },
  mounted() {
    this.initialized = true;
  }
};
</script>
<style lang="scss" scoped>
.popin {
  position: fixed;
  width: 620px;
  right: 1.25rem;
  bottom: 3rem;
  border-radius: 1.625rem;
  z-index: 30;
  max-width: calc(100% - 5.625rem);
  -webkit-filter: drop-shadow(0 0 0.3125rem rgba(0, 0, 0, 0.15));
  filter: drop-shadow(0 0 0.3125rem rgba(0, 0, 0, 0.15));
  @include breakpoint("small", "max") {
    display: none;
  }
}
.popin:before {
  position: absolute;
  bottom: 0;
  content: "";
  border-bottom-right-radius: 0.5rem;
  background-color: currentColor;
  right: 3.125rem;
  width: 2.8125rem;
  height: 2.8125rem;
  transform: translateY(50%) rotate(45deg);
}
.popin__inner {
  display: flex;
  align-items: center;
  padding: 2.25rem;
  color: #0c3944;
}
.popin__close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  font-size: 0.8125rem;
  line-height: 1.5625rem;
  width: 1.5625rem;
  height: 1.5625rem;
}
.popin__image-wrapper {
  padding-right: 1.5rem;
  width: 40%;
  img {
    height: auto;
    width: 882px;
  }
}
.popin__content {
  width: 60%;
}
</style>
<docs>
## Popin 


```jsx
<div style="position: relative; height: 60vh">
  <mks-popin style="position: absolute;"></mks-popin>
</div>

```
</docs>
