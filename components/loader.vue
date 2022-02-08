<template>
  <div class="c-loader">
    <transition-group name="fade" tag="div" mode="out-in">
      <div :class="customClass" v-for="item in visibleItems" :key="item.id">
        <slot :item="item" />
      </div>
    </transition-group>
    <transition name="fade">
      <div class="c-loader-more" v-if="items.length > visibleItems.length">
        <span>Voir plus d'annonces</span>
        <img src="/assets/icons/load-more.svg" @click="showMore" />
      </div>
    </transition>
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
    customClass: { type: String },
    items: {
      type: Array,
      required: true,
    },
    maxItems: {
      type: Number,
    },
    showRange: { type: Number },
  },
  data() {
    return { range: this.maxItems }
  },
  methods: {
    showMore() {
      this.range += this.showRange
    },
  },
  computed: {
    visibleItems() {
      return this.items.slice(0, this.range)
    },
  },
}
</script>
