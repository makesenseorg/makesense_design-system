<template>
  <mks-horizontal-list
    tag="nav"
    spacing="small"
    class="pagination"
    role="navigation"
    aria-label="Pagination"
  >
    <mks-button
      size="square"
      type="neutral"
      :class="{ disabled: current <= 1 ? 'disabled' : null }"
      :disabled="current === 1"
      class="pagination__button pagination__button--prev"
      @click="prevPage"
    >
      <mks-icon type="arrow-left" aria-hidden></mks-icon>
      <mks-visually-hidden>{{
        $MKSlocale["previousPage"]
      }}</mks-visually-hidden>
    </mks-button>
    <mks-horizontal-list tag="ul" spacing="small" class="pagination__list">
      <mks-button
        size="square"
        :type="page == current ? 'secondary' : 'neutral'"
        v-for="(page, index) in pages"
        :key="index"
        :class="{
          pagination__item: true,
          'pagination__item--current': page == current,
          'pagination__item--ellipsis': page == '...'
        }"
        :disabled="page == '...'"
        :aria-current="page == current"
        @click="goTo(page)"
      >
        <mks-visually-hidden v-if="page == current">{{
          $MKSlocale["currentPage"]
        }}</mks-visually-hidden>
        <mks-visually-hidden v-else>{{
          $MKSlocale["goToPage"]
        }}</mks-visually-hidden>
        <span>
          {{ page }}
        </span>

        <div class="effect" aria-hidden></div>
      </mks-button>
    </mks-horizontal-list>
    <mks-button
      type="neutral"
      size="square"
      :class="{ disabled: current === total ? 'disabled' : null }"
      :disabled="current === total"
      class="pagination__button pagination__button--next"
      @click="nextPage"
    >
      <mks-icon type="arrow-right" aria-hidden></mks-icon>
      <mks-visually-hidden>{{ $MKSlocale["nextPage"] }}</mks-visually-hidden>
    </mks-button>
  </mks-horizontal-list>
</template>
<script>
export default {
  name: "MksPagination",
  props: {
    total: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true,
      default: 1
    },
    pad: {
      type: Number,
      default: 1
    },
    padEnd: {
      type: Number,
      default: 0
    },
    padAround: {
      type: Number
    }
  },
  data() {
    return {
      current: this.value
    };
  },
  computed: {
    pages() {
      const list = [];
      for (let i = 1; i <= this.total; i++) {
        if (this.showItem(i)) {
          list.push(i);
        } else if (this.showItem(i - 1) && this.showItem(i + 1)) {
          list.push(i);
        } else if (list[list.length - 1] !== "...") {
          list.push("...");
        }
      }
      return list;
    },
    padEndValue() {
      return this.padEnd === undefined ? this.pad : this.padEnd;
    },
    padAroundValue() {
      return this.padAround === undefined ? this.pad : this.padAround;
    }
  },
  watch: {
    current() {
      this.$emit("input", this.current);
      this.$emit("change", this.current);
    },
    value(val) {
      const pageNum = val < 1 ? 1 : val <= this.total ? val : this.total;
      this.goTo(pageNum);
    }
  },
  methods: {
    goTo(page) {
      if (page !== "...") {
        this.current = page;
      }
    },
    showItem(i) {
      return (
        i === 1 ||
        i <= 1 + this.padEndValue ||
        i === this.total ||
        i >= this.total - this.padEndValue ||
        Math.abs(i - this.current) <= this.padAroundValue
      );
    },
    nextPage() {
      if (this.current < this.total) {
        this.current++;
      }
    },
    prevPage() {
      if (this.current > 1) {
        this.current--;
      }
    }
  }
};
</script>
<docs>

## Usage

This component as a an input with a <code>v-model</code> attribute or with both<code>value</code> prop and a <code>@input</code> or <code>@change</code> listener.

```jsx
<!-- Example without action or binding to value -->
<mks-pagination v-bind:total="8" v-bind:value="2"></mks-pagination>

<!-- Proper uses in an app below : -->
<!-- <mks-pagination total="100" v-model="current"></mks-pagination> -->
<!-- <mks-pagination v-bind:total="10" v-bind:value="2" @change="updateCurrentPage"></mks-pagination> -->

```



</docs>
