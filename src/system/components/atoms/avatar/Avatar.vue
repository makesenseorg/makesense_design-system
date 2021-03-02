<template>
  <div :class="`avatar avatar--size-${size}`">
    <img v-if="image" :src="image" class="avatar__image" alt="avatar" />
    <span v-else class="avatar__placeholder" aria-hidden="true"></span>
  </div>
</template>
<script>
/**
 * A round avatar. It will display a solid color while image loads or if none is provided.
 * TODO: add elevated, solid color shadows,
 * @version 0.2.0
 */
export default {
  name: "MksAvatar",
  release: "0.2.0",
  props: {
    /** Url of the image  */
    image: {
      type: String
    },
    /** Small, medium or large  */
    size: {
      type: String,
      required: false,
      default: "medium",
      validator: function(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  display: inline-block;
  border-radius: $border-radius-full;
  overflow: hidden;
  background: $background-color-softer;

  &--size-small {
    width: 2rem;
    height: 2rem;
  }
  &--size-medium {
    width: 3.5rem;
    height: 3.5rem;
  }
  &--size-large {
    width: 5rem;
    height: 5rem;
  }
}

.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar__placeholder {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>

<docs>
```jsx
  <mks-avatar size="small" ></mks-avatar>
  <mks-avatar image="https://via.placeholder.com/200"></mks-avatar>
  <mks-avatar size="large" image="https://via.placeholder.com/300"></mks-avatar>
  
```
</docs>
