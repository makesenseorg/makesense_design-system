<template>
  <component
    :is="cliquable ? 'mks-link' : 'div'"
    :class="['event', { 'event--now': now }, { 'event--past': past }]"
    :to="cliquable ? link : undefined"
    :type="cliquable ? 'menu' : undefined"
    target="_blank"
    @click="onClick"
    :aria-labelledby="`event-${uniqueId}`"
  >
    <div class="event__hour">
      <div align="center" distribute="center" v-if="showDate">
        <mks-date-number class="event__day">{{ day }}</mks-date-number>
        <mks-text tag="p" align="center" size="small" weight="bold">{{
          month
        }}</mks-text>
      </div>
      <template v-else>
        <time v-if="!now || past" :datetime="formattedDate">{{
          formattedDate
        }}</time>
        <span v-else
          >{{ beforeTimeText }} {{ elapsedTime
          }}<span class="event__hour-space"></span>min(s)</span
        >
      </template>
    </div>
    <div v-if="showCover" class="event__cover">
      <img class="event__cover-image" :src="cover" />
    </div>

    <div class="event__content">
      <div class="content__title">
        <h3 :id="`event-${uniqueId}`">
          <mks-visually-hidden v-if="past">{{
            $MKSlocale["past-event"]
          }}</mks-visually-hidden>
          {{ title }}
        </h3>
        <div class="event__metas" v-if="metas">
          <mks-tag
            v-for="meta in metas"
            :label="meta"
            :key="meta"
            class="event__meta"
          />
        </div>
      </div>
      <div class="content__action" v-if="!past && showCallToAction">
        <mks-button
          size="small"
          tag="a"
          :target="external ? '_blank' : '_self'"
          :href="link"
        >
          <mks-visually-hidden
            >{{ $MKSlocale["event"] }}: {{ title }}</mks-visually-hidden
          >
          {{ callToAction }}
        </mks-button>
      </div>
    </div>
  </component>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";

export default {
  // todo : fix cover width
  // todo : fix no cover
  // todo : hours fixed width
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
    },
    /**
     * @version 1.16.3
     * show the day and month instead of the hour. use if Card is standalone
     */
    showDate: {
      type: Boolean,
      default: false
    },
    /**
     * @version 1.16.3
     * show or hide the call to action
     */
    showCallToAction: {
      type: Boolean,
      default: true
    },
    /**
     * @version 1.16.3
     * show or hide the cover
     */
    showCover: {
      type: Boolean,
      default: true
    },
    /**
     * @version 1.16.3
     * make whole card cliquable. Set to true if call to action is hidden.
     */
    cliquable: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  data() {
    return {
      // used for accessibility labels
      uniqueId: Math.random()
        .toString(36)
        .substr(2, 9)
    };
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
      return dayjs(this.date).add(this.duration, "m");
    },
    now() {
      return dayjs().isAfter(this.date) && dayjs().isBefore(this.end);
    },
    past() {
      return this.duration > 0 && dayjs().isAfter(this.end);
    },
    elapsedTime() {
      return Math.round((dayjs() - dayjs(this.date)) / 60000);
    },
    formattedDate() {
      return dayjs(this.date).format("HH:mm");
    },
    day() {
      return dayjs(this.date).format("D");
    },
    month() {
      return dayjs(this.date).format("MMMM");
    },
    external() {
      return (
        typeof this.link === "string" &&
        (this.link.startsWith("http") ||
          this.link.startsWith("//") ||
          this.link.startsWith("www"))
      );
    }
  },
  created() {
    dayjs.locale("fr");
    dayjs.extend(relativeTime);
  }
};
</script>

<style lang="scss" scoped>
.event {
  @include flex;
  box-sizing: border-box;
  text-decoration: none;
  color: $color-text;
  align-items: center;
  border-radius: $space-xs;
  height: auto;
  margin-bottom: $space-s;
  padding: $space-s;
  transition: all 0.2s ease-out;
  box-shadow: $box-shadow-m;

  @include breakpoint("small") {
    min-height: 80px;
    margin-bottom: $space-m;
    box-shadow: none;

    &:hover {
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
    opacity: 0.7;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
}

.event__day {
  margin-bottom: $space-xxs;
}

.event__hour {
  //display: none;
  @include flex-center;
  @include title-xsmall;
  min-height: $space-xxl;
  text-align: center;
  position: relative;
  padding-right: $space-s;
  margin-right: $space-m;

  @include breakpoint("small") {
    flex: 0 0 100px;
  }

  .event__hour-space {
    margin-right: $space-xxs;
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

.event__cover {
  display: none;

  @include breakpoint("small") {
    @include image-ratio(16, 9, "img");
    display: block;
    flex: 0 0 auto;
    padding-top: 0; // to overwrite image-ratio
    height: 58px;
    width: 100px;
    margin-right: $space-m;
  }
}

.event__content {
  display: block;
  @include flex;
  flex-grow: 1;
  align-items: center;
  flex-wrap: wrap;

  @include breakpoint("small") {
    flex-wrap: nowrap;
  }

  .content__title {
    @include text-body;
    flex: 1 1 70%;
    align-self: center;
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
    margin: $space-xs 0;
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
<mks-event-line-item link="#" title="An event in the future" v-bind:date="$date().add(1, 'd')" cover="https://via.placeholder.com/300" v-bind:duration="60" v-bind:metas="['1 heure', 'France']"></mks-event-line-item>
<mks-event-line-item cliquable show-date v-bind:show-call-to-action="false" v-bind:show-cover="false" link="#" title="An event in the future" v-bind:date="$date().add(1, 'd')" cover="https://via.placeholder.com/300" v-bind:duration="60" v-bind:metas="['1 heure', 'France']"></mks-event-line-item>
```

## Event currently happening
```jsx
<mks-event-line-item link="#" v-bind:date="$date().subtract(12, 'm')" before-time-text="depuis" title="A great event about stuff" cover="https://via.placeholder.com/300" v-bind:duration="60"></mks-event-line-item>
```

## Past event
```jsx
<mks-event-line-item link="#" title="An event in the past" v-bind:date="$date().subtract(2, 'h')" cover="https://via.placeholder.com/300" v-bind:duration="60"></mks-event-line-item>
```

## A very long title
```jsx
<mks-event-line-item link="#" title="[agir] Comment engager à l'échelle locale autour de la transition écologique grâce à la collaboration entre la collectivité, les citoyen.nes et autres acteurs locaux ? - Témoignage de la Ville de Paris" v-bind:date="$date().add(1, 'd')" cover="https://via.placeholder.com/300" v-bind:duration="60" :metas="['1 heure', 'France']"></mks-event-line-item>
```

</docs>
