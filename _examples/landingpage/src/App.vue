<template>
  <div>
    Landing page
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        { name: "Introduction" },
        {
          name: "Layout",
          children: [
            { name: "Container" },
            { name: "Page" },
            { name: "Page Title" },
          ],
        },
        { name: "Typography" },
        { name: "Navigation" },
      ],
    };
  },
};
</script>
