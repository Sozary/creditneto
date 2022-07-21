<template>
  <div
    v-if="show"
    class="flex border border-solid border-[#F8FCFA] z-50 fixed bottom-0 w-full bg-white"
  >
    <span
      class="text-dark-grey font-helvetica md:basis-2/4 basis-1/4 text-[8px] mx-4 my-2 font-bold flex-1"
    >
      Ce site utilise des cookies destinés à vous offrir une meilleure
      expérience utilisateur. En poursuivant votre navigation, vous en acceptez
      leur utilisation.
      <a
        target="_blank"
        href="https://www.credit-creditneto.com/contact.php"
        class="text-black"
        >En savoir plus</a
      >
    </span>
    <div class="flex-1 flex justify-end">
      <span
        @click="hideCookieConsent"
        class="p-1 rounded border self-center mr-2 border-solid font-bold text-black font-montserrat cursor-pointer"
      >
        ok</span
      >
    </div>
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
