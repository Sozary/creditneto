<template>
  <div
    class="c-app"
    :class="{ '-show-menu': showMenu, '-show-calculate': showCalculate }"
  >
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
  data() {
    return { isMobile: false }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
    if (this.isMobile) {
      this.redirectToFirstCategory()
    }
  },
  methods: {
    resize() {
      this.isMobile = window.innerWidth < 970
    },
    redirectToFirstCategory() {
      if (this.selectedNav === '') {
        window.history.pushState('', '', '/' + this.categories[0].slug)
        this.$store.commit('nav/updateSelectedNav', this.categories[0].slug)
      }
    },
  },
  watch: {
    selectedNav() {
      if (this.isMobile) {
        this.redirectToFirstCategory()
      }
    },
  },
  computed: {
    categories() {
      return this.$store.getters['nav/categories']
    },
    showMenu() {
      return this.$store.getters['nav/showMenu']
    },
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
<style lang="postcss">
body {
  margin: 0;
}
</style>
