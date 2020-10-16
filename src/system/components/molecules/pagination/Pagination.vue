<template>
  <mks-horizontal-list spacing="small" class="pagination">
    <mks-button
      size="square"
      type="neutral"
      :class="{ disabled: current <= 1 ? 'disabled' : null }"
      :disabled="current === 1"
      class="pagination__button pagination__button--prev"
      @click="prevPage"
    >
      <mks-icon type="arrow-left"></mks-icon>
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
        @click="goTo(page)"
      >
        <span>
          {{ page }}
        </span>

        <div class="effect"></div>
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
      <mks-icon type="arrow-right"></mks-icon>
    </mks-button>
  </mks-horizontal-list>
</template>
<script>
import MksHorizontalList from "../../layouts/horizontalList/HorizontalList";

export default {
  name: "MksPagination",
  components: { HorizontalList },
  props: {
    total: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data: () => ({
    pages: [],
    current: 0,
    go: 0,
    prevRange: "",
    nextRange: "",
    max: 7
  }),
  watch: {
    current() {
      this.getPages();
      this.$emit("input", this.current);
      this.$emit("change", this.current);
    },
    total() {
      this.getPages();
    },
    max() {
      this.getPages();
    },
    value(val) {
      const pageNum = val < 1 ? 1 : val <= this.total ? val : this.total;
      this.goTo(pageNum);
    }
  },

  async mounted() {
    this.current = this.go = this.value;
    this.getPages();
  },

  methods: {
    goTo(page) {
      if (page === "...") {
        return;
      }
      if (typeof page.target === "undefined") {
        this.current = page;
      } else {
        const value = parseInt(page.target.value, 10);
        this.go = value < 1 ? 1 : value <= this.total ? value : this.total;
        this.current = this.go;
      }
    },
    getPages() {
      if (this.total <= this.max) {
        let pages = this.setPages(1, this.total);
        this.pages = pages;
      }
      const even = this.max % 2 === 0 ? 1 : 0;
      if (this.total < 6) {
        this.prevRange = Math.floor(this.max / (this.max / 2));
      } else {
        this.prevRange = Math.floor(this.max / 2);
      }
      this.nextRange = this.total - this.prevRange + 1 + even;

      if (this.current >= this.prevRange && this.current <= this.nextRange) {
        const start = this.current - this.prevRange + 2;
        const end = this.current + this.prevRange - 2 - even;

        if (this.current == this.prevRange) {
          this.pages = [...this.setPages(1, end), "...", this.total];
        } else if (this.current == this.nextRange) {
          this.pages = [1, "...", ...this.setPages(start, this.total)];
        } else {
          this.pages = [
            1,
            "...",
            ...this.setPages(start, end),
            "...",
            this.total
          ];
        }
      } else if (this.total < this.max) {
        this.pages = [...this.setPages(1, this.total)];
      } else {
        this.pages = [
          ...this.setPages(1, this.prevRange),
          "...",
          ...this.setPages(this.nextRange, this.total)
        ];
      }
    },
    setPages(start, end) {
      const setPages = [];
      for (start > 0 ? start : 1; start <= end; start++) {
        setPages.push(start);
      }
      return setPages;
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
