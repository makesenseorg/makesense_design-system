<template>
  <div>
    <div
      class="
        mks-cs-dense mks-space-x-xxl@md mks-space-t-xl@md mks-space-b-xxxl@md
      "
    >
      <mks-spacer>
        <mks-field
          type="radio"
          name="visio"
          id="visio"
          label="Localisation"
          v-model="test"
          :options="[
            { label: 'Évenement en ligne', value: 'online' },
            { label: 'Évenement physique', value: 'physical' }
          ]"
        ></mks-field>
        test: {{ test }}
        <mks-toggle name="email" v-model="email">Notify by email</mks-toggle>
        <mks-toggle name="sms" v-model="sms">Notify by SMS</mks-toggle>
        <mks-toggle name="pigeon" v-model="pigeon" disabled>Notify by Pigeon voyageur</mks-toggle>
        <mks-icon type="clock" />
      </mks-spacer>
    </div>
  </div>
</template>

<script>
import MksCard from "@makesenseorg/design-system/dist/components/Card";
import MksField from "@makesenseorg/design-system/dist/components/Field";
import MksHero from "@makesenseorg/design-system/dist/components/Hero";
export default {
  components: { MksCard, MksField, MksHero },
  data() {
    return {
      email: false,
      sms: true,
      pigeon: false,
      test: 'online'
    };
  },
  created() {
    this.$MKSaddLocale("it", {
      loading: "Caricamento...",
      // etc.
    });

    // Now you can use it
    this.$MKSsetLocale("it");
    this.$MKSlocale["loading"];
  },
};
</script>
