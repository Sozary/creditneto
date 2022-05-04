<template>
  <div class="c-loader">
    <slot name="loading" v-if="loading" />
    <div :class="customClassContainer" ref="items">
      <a
        target="_blank"
        :href="'http://www.creditneto.fr' + item.url_redirection"
        :class="customClass"
        v-for="item in items"
        :key="item.id"
      >
        <slot :item="item" />
      </a>
    </div>
    <div
      class="flex flex-col text-center items-center fixed bottom-0 transform -translate-x-1/2 left-1/2 bg-gradiant w-full"
      v-if="showMore"
      ref="more"
    >
      <span class="text-black text-sm font-bold font-montserrat z-20"
        >Voir plus d’offres de crédit</span
      >
      <img src="/assets/icons/load-more.svg" class="w-9" />
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
    loading: { type: Boolean },
  },
  data() {
    return { showMore: true }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollBehavior)
    this.scrollBehavior()
  },
  watch: {
    items() {
      this.$nextTick(() => {
        this.scrollBehavior()
      })
    },
  },
  methods: {
    scrollBehavior() {
      const element = this.$refs['items']
      const elementBottom =
        element.getBoundingClientRect().y +
        element.getBoundingClientRect().height
      this.showMore = elementBottom >= window.innerHeight
    },
  },
}
</script>
