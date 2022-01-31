<template>
  <div class="c-content">
    <Options />
    <transition name="fade" mode="out-in">
      <Home v-if="selectedNav === ''" />
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
  computed: {
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
