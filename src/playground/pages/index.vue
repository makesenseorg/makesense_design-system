<template>
  <div class="container">
    <mks-hero 
      title="Innovez dans votre organisation et blablabla..."
      title-tag="h3"
      theme="primary"
      text-color="var(--color-cerise)"
      beans="0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </mks-hero>
    <mks-heading tag="h1">Hello world !!!</mks-heading>
    logo : <mks-logotype />
    <mks-icon type="clock"/>
    <hr>
    <div>
      <mks-text>Hover on the loading to see a localized title</mks-text>
      <mks-loading type="simple"></mks-loading>
    </div>
    <div class="mks-grid-auto-lg mks-grid-gap-sm">
      <mks-card v-for="i in 12" :key="i" image="https://via.placeholder.com/500" image-format="square">
        <template v-slot:title>Content</template>
      </mks-card>
    </div>
    
  </div>
</template>

<script>
import MksCard from '@makesenseorg/design-system/dist/components/Card'
import MksHero from '@makesenseorg/design-system/dist/components/Hero'
export default {
  components: {MksCard, MksHero},
  created() {
    this.$MKSaddLocale('it', {
      loading: 'Caricamento...',
      // etc.
    });

    // Now you can use it 
    this.$MKSsetLocale('it');
    this.$MKSlocale['loading']; 
  }
};
</script>
