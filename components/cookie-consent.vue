<template>
  <transition name="fade">
    <div class="c-cookie" v-if="show">
      <span class="c-cookie-info"
        >Ce site utilise des cookies destinés à vous offrir une meilleure
        expérience utilisateur. En poursuivant votre navigation, vous en
        acceptez leur utilisation.</span
      >
      <div class="c-cookie-ok"><span @click="hideCookieConsent"> ok</span></div>
      <div class="c-cookie-accept"><span> En savoir plus </span></div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return { show: true }
  },
  mounted() {
    if (process.client) {
      this.show = !localStorage.getItem('hide-cookie-consent')
    }
  },
  methods: {
    hideCookieConsent() {
      this.show = false
      if (process.client) {
        localStorage.setItem('hide-cookie-consent', true)
      }
    },
  },
}
</script>
