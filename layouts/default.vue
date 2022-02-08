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
import Nav from '~/components/nav.vue'

export default {
  components: { Header, Nav, Footer },
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
