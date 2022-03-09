<template>
  <div class="c-cookie" v-if="show">
    <span class="c-cookie-info"
      >Ce site utilise des cookies destinés à vous offrir une meilleure
      expérience utilisateur. En poursuivant votre navigation, vous en acceptez
      leur utilisation.</span
    >
    <div class="c-cookie-ok"><span @click="hideCookieConsent"> ok</span></div>
    <a
      class="c-cookie-accept"
      target="_blank"
      href="https://www.credit-creditneto.com/contact.php"
      ><span> En savoir plus </span></a
    >
  </div>
</template>
<script>
export default {
  data() {
    return { show: false }
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
