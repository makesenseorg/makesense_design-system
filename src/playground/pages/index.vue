<template>
  <div class="container">
    <mks-heading tag="h1">Hello world !!!</mks-heading>
    <mks-icon type="clock"/>
    <hr>
    <div>
      <mks-text>Hover on the loading to see a localized title</mks-text>
      <mks-loading type="simple"></mks-loading>
    </div>
    
  </div>
</template>

<script>
export default {
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
