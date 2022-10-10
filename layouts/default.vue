<template>
  <div
    class="c-app"
    :class="{ '-show-menu': showMenu, '-show-calculate': showCalculate }"
  >
    <Header />
    <Nav />
    <Nuxt v-if="showLoan" />
    <Footer />
    <div
      v-if="loading"
      class="w-screen h-screen z-50 fixed bg-white top-0"
    ></div>
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
    return { isMobile: false, showLoan: false, loading: true }
  },
  async mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
    if (this.isMobile) {
      this.redirectToFirstCategory()
    }
    this.handleClickref()
    await this.getLoans()
  },
  methods: {
    async getLoans() {
      if (!this.$route.path.substring(1)) {
        window.location = '/pret-personnel'
        return
      }
      this.loading = true
      const loans = await this.$axios.$post(
        // 'https://cisede.eu/demo/aim/credit-creditneto/api/credit'
        'https://gt3cmmv417.execute-api.eu-west-3.amazonaws.com/test/',
        {
          product:
            this.categories.find(
              (c) => c.slug === this.$route.path.substring(1)
            )?.database || this.categories[0].database,
        }
      )

      loans.body = loans.body.map((l) => {
        return { ...l, url_redirection: l.url_redirection.split('ul=')[1] }
      })
      this.$store.dispatch('loans/updateLoans', loans.body)
      this.loading = false
    },
    handleClickref() {
      const query = this.$route.query
      const clickrefs = JSON.parse(localStorage.getItem('clickrefs') || '{}')

      for (let i = 2; i < 8; i++) {
        if (query['clickref' + i]) {
          clickrefs[i] = query['clickref' + i]
        }
      }

      localStorage.setItem('clickrefs', JSON.stringify(clickrefs))
      this.showLoan = true
    },
    resize() {
      this.isMobile = window.innerWidth < 987
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
