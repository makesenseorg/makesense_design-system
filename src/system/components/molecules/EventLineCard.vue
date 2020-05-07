<template>
  <div
    :class="['event', { 'event--now': now }, { 'event--past': past }]"
    target="_blank"
    @click="onClick"
  >
    <div class="event__hour">
      <span v-if="!now || past">{{ $date(date).format("HH:mm") }}</span>
      <span v-else>{{ $date(date).from($date()) }}</span>
    </div>
    <img class="event__cover" :src="cover" height="20" width="20" />
    <div class="event__content">
      <div class="content__title">
        <h3>{{ title }}</h3>
        <div class="event__metas" v-if="metas">
          <mks-tag
            v-for="meta in metas"
            :label="meta"
            :key="meta"
            class="event__meta"
          />
        </div>
      </div>
      <div class="content__action" v-if="!past">
        <mks-button size="small" tag="a" target="_blank" :href="link">{{
          callToAction
        }}</mks-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MksEventLineItem",
  props: {
    /**
     * Link to the event
     */
    link: {
      type: String,
      required: true
    },
    /**
     * Date string of the event
     */
    date: {
      type: [String, Object],
      required: true
    },
    /**
     * Duration of the events in minutes
     */
    duration: {
      type: Number,
      required: true
    },
    /**
     * Text isplayed before the time
     */
    beforeTimeText: {
      type: String,
      required: false
    },
    /**
     * Title of the event
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Url to the cover of the event or placeholder if none
     */
    cover: {
      type: String,
      required: true
    },
    /**
     *
     */
    callToAction: {
      type: String,
      required: false,
      default: "Participer"
    },
    /**
     * Array of tag labels
     */
    metas: {
      type: Array,
      required: false
    }
  },
  methods: {
    onClick: function() {
      /** Fires on event click
       * @event click */
      this.$emit("click");
    }
  },
  computed: {
    end() {
      return this.$date(this.date).add(this.duration, "m");
    },
    now() {
      return this.$date().isAfter(this.date) && this.$date().isBefore(this.end);
    },
    since() {
      if (this.now) {
        return;
      }
      return false;
    },
    past() {
      return this.$date().isAfter(this.$date(this.end));
    }
  }
};
</script>

<style lang="scss" scoped>
.event__cover {
  object-fit: cover;
  height: 100%;
  width: 100px;
  margin-right: $space-m;
}

.event {
  @include flex;
  box-sizing: border-box;
  //border: $border-width-m solid $border-color-soft;
  text-decoration: none;
  color: $color-text;
  align-items: center;
  border-radius: $space-xs;
  height: auto;
  margin-bottom: $space-s;
  padding: $space-s;
  max-width: 700px;
  transition: all 0.2s ease-out;

  @include breakpoint("small") {
    height: 80px;
    margin-bottom: $space-m;

    &:hover {
      //border-color: $border-color-base;
      box-shadow: $box-shadow-m;
    }
  }

  &--now {
    background-color: $color-secondary;

    .event__hour {
      @include text-large-black;
    }
  }

  &--past {
    background-color: $background-color-disabled;
  }
}

.event__hour {
  display: none;

  @include breakpoint("small") {
    @include flex-center;
    @include title-small;
    flex: 0 1 0%;
    height: 100%;
    text-align: center;
    position: relative;
    padding-right: $space-s;
    margin-right: $space-m;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    height: 80%;
    width: $space-xxs;
    background: $color-neutral-85;
    border-radius: $border-radius-base;
    right: 0;
    top: 10%;
  }
}

.event__content {
  display: block;

  @include breakpoint("small") {
    @include flex;
    flex-grow: 1;
    align-items: center;
  }

  .content__title {
    @include text-body;
    flex: 1 1;
    align-self: flex-start;
    text-align: left;
    padding-right: $space-m;

    h3 {
      @include text-body-black;
    }

    @include breakpoint("small") {
    }
  }

  .content__action {
    flex: 0 0 100px;
  }
}

.event__metas {
  margin-top: $space-xxs;
}
.event__meta {
  margin-right: $space-xxs;
}
</style>
<docs>
## Basic event line item 
```jsx
<mks-event-line-item link="#" title="An event in the future" v-bind:date="$date().add(1, 'd')" cover="https://via.placeholder.com/300" v-bind:duration="60" :metas="['1 heure', 'France']"></mks-event-line-item>
```

## Event currently happening 
```jsx
<mks-event-line-item link="#" v-bind:date="$date().subtract(12, 'm')" title="A great event about stuff" cover="https://via.placeholder.com/300" v-bind:duration="60"></mks-event-line-item>
```

## Past event
```jsx
<mks-event-line-item link="#" title="An event in the past" v-bind:date="$date().subtract(2, 'h')" cover="https://via.placeholder.com/300" v-bind:duration="60"></mks-event-line-item>
```

</docs>
