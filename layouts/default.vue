<template>
  <div
    class="c-app"
    :class="{ '-show-menu': showMenu, '-show-calculate': showCalculate }"
  >
    <CookieConsent />
    <Header />
    <Nav />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/header.vue'
import Footer from '~/components/footer.vue'
import CookieConsent from '~/components/cookie-consent.vue'
import Nav from '~/components/nav.vue'

export default {
  components: { Header, Nav, Footer, CookieConsent },
  computed: {
    showMenu() {
      return this.$store.getters['nav/showMenu']
    },
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
  },
}
</script>
<style lang="postcss">
@import '../legacy/style/global';
</style>
