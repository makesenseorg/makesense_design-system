<template>
  <div class="container">
    <mks-heading tag="h1">Hello world !!!</mks-heading>
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
export default {
  components: {MksCard},
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
