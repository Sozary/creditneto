<template>
  <div class="c-loader">
    <slot name="loading" v-if="loading" />
    <transition-group
      name="fade"
      tag="div"
      :class="customClassContainer"
      ref="items"
    >
      <div
        :class="customClass"
        v-for="item in visibleItems"
        :key="item.id"
        @click="clickOffer(item, type)"
      >
        <slot :item="item" />
      </div>
      <div v-for="item in visibleItems" :key="item.id">
        <slot :item="item" name="link" />
      </div>
    </transition-group>
    <div
      class="c-loader-more"
      v-if="items.length > visibleItems.length"
      ref="more"
    >
      <span>Voir plus d'annonces</span>
      <img src="/assets/icons/load-more.svg" @click="showMore" />
    </div>
    <div class="c-loader-center">
      <slot name="no-data" />
    </div>
    <div class="c-loader-center">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    clickOffer: { type: Function },
    mode: { type: String },
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
    calculateMaxItemsToShow() {
      const element = this.$refs.items.$el
      const itemHeight = 56
      const elementBottom = element.getBoundingClientRect().bottom
      if (elementBottom < window.innerHeight) {
        const elementThatFit = (window.innerHeight - elementBottom) / itemHeight
        return Math.floor(elementThatFit)
      }
      return this.maxItems
    },
    applyRange() {
      this.showItems = false
      this.range = this.calculateMaxItemsToShow()
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
      setTimeout(() => {
        this.range += this.calculateMaxItemsToShow()
      }, 200)
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
