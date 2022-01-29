<template>
  <div>
    <GlobalHeader />
    <Nuxt />
  </div>
</template>
<script>
import GlobalHeader from '~/components/globalHeader.vue'

export default {
  components: { GlobalHeader },
}
</script>
<style lang="postcss">
@import '../legacy/style/global';
</style>
