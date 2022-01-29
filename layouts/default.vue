<template>
  <div>
    <Header />
    <Nav />
    <Nuxt />
  </div>
</template>
<script>
import Header from '~/components/header.vue'
import Nav from '~/components/nav.vue'

export default {
  components: { Header, Nav },
}
</script>
<style lang="postcss">
@import '../legacy/style/global';
</style>
