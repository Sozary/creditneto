<template>
  <div>
    <Options />
    <transition name="fade">
      <Loan v-if="selectedNav !== ''" class="min-viewport" />
      <Home v-if="isDesktop && selectedNav === ''" class="min-viewport" />
    </transition>
    <CookieConsent />
  </div>
</template>
<script>
import Options from '~/components/options'
import Loan from '~/components/loan'
import Home from '~/components/home'
import CookieConsent from '~/components/cookie-consent'

export default {
  layout: 'default',
  components: { Options, Loan, Home, CookieConsent },
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
