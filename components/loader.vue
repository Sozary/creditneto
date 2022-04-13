<template>
  <div class="c-loader">
    <slot name="loading" v-if="loading" />
    <div :class="customClassContainer" ref="items">
      <a
        target="_blank"
        :href="'http://www.creditneto.fr' + item.url_redirection"
        :class="customClass"
        v-for="item in visibleItems"
        :key="item.id"
      >
        <slot :item="item" />
      </a>
    </div>
    <div
      class="flex flex-col text-center items-center"
      v-if="items.length > visibleItems.length"
      ref="more"
    >
      <span class="text-black text-sm font-bold font-montserrat"
        >Voir plus d’offres de crédit</span
      >
      <img
        src="/assets/icons/load-more.svg"
        @click="showMore"
        class="w-9 cursor-pointer"
      />
    </div>
    <div class="text-center">
      <slot name="no-data" />
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    customClass: { type: String },
    customClassContainer: { type: String },
    items: {
      type: Array,
      required: true,
    },
    type: { type: String },
    loading: { type: Boolean },
    maxItems: {
      type: Number,
      default: 3,
    },
    showRange: { type: Number, default: 3 },
  },
  data() {
    return { range: this.maxItems, showItems: false }
  },
  methods: {
    calculateMaxItemsToShow(initial = false) {
      const element = this.$refs['items']
      const itemHeight = 56
      const elementBottom = element.getBoundingClientRect().bottom
      if (elementBottom < window.innerHeight) {
        const elementThatFit = initial
          ? (window.innerHeight - elementBottom) / itemHeight
          : window.innerHeight / itemHeight
        return Math.floor(elementThatFit)
      }
      return this.maxItems
    },
    applyRange() {
      this.showItems = false
      this.range = this.calculateMaxItemsToShow(true)
      this.showItems = true
    },
    showMore() {
      const element = this.$refs['more']
      const elementTop = element.getBoundingClientRect().top
      window.scroll({
        top: document.documentElement.scrollTop + elementTop,
        left: 0,
        behavior: 'smooth',
      })
      this.range += this.calculateMaxItemsToShow()
    },
  },
  watch: {
    loading() {
      if (this.loading) {
        this.applyRange()
      }
    },
    items() {
      this.applyRange()
    },
  },
  computed: {
    visibleItems() {
      return !this.showItems && this.loading
        ? []
        : this.items.slice(0, this.range)
    },
  },
}
</script>
