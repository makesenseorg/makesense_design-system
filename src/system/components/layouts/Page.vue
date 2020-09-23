<template>
  <div class="layout-page">
    <mks-sidebar></mks-sidebar>
    <div class="app">
      <mks-site-header
        :menu-links="[
          { label: 'Accueil', to: '/molecules/mkssiteheader' },
          { label: 'Agenda', to: 'https://google.com' },
          { label: 'Jouer', to: { path: '/jouer' } }
        ]"
      >
        <mks-lang-picker
          slot="right"
          :langs="['fr', 'en', 'es']"
          active="fr"
        ></mks-lang-picker>
      </mks-site-header>
      <slot></slot>
      <mks-site-footer>Made by makesense</mks-site-footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "MksLayoutPage"
};
</script>
<docs>

```jsx
<mks-layout-page>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</mks-layout-page>
```

</docs>
