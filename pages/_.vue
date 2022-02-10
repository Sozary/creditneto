<template>
  <div class="c-content" :class="{ '-home': selectedNav === '' && isDesktop }">
    <Options />
    <transition name="fade" mode="out-in">
      <Home v-if="selectedNav === '' && isDesktop" />
      <Loan v-else />
    </transition>
  </div>
</template>
<script>
import Options from '~/components/options'
import Loan from '~/components/loan'
import Home from '~/components/home'

export default {
  layout: 'default',
  components: { Options, Loan, Home },
  data() {
    return { isDesktop: false }
  },
  methods: {
    resize() {
      this.isDesktop = window.innerWidth >= 970
    },
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  computed: {
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
