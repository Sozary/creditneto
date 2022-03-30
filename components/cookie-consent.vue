<template>
  <div v-if="show" class="flex border border-solid border-[#F8FCFA] h-10">
    <span
      class="text-dark-grey font-helvetica md:basis-2/4 basis-1/4 text-base mx-4 my-2 font-bold one-line flex-1"
    >
      Ce site utilise des cookies destinés à vous offrir une meilleure
      expérience utilisateur. En poursuivant votre navigation, vous en acceptez
      leur utilisation.
    </span>
    <div class="flex-1 flex justify-end">
      <span
        @click="hideCookieConsent"
        class="p-1 rounded border h-1/2 self-center mr-2 border-solid font-bold text-black font-montserrat cursor-pointer"
      >
        ok</span
      >
      <a
        target="_blank"
        href="https://www.credit-creditneto.com/contact.php"
        class="no-underline one-line"
        ><div
          class="text-white flex font-helvetica items-center text-[20px] h-full px-7 bg-green font-bold"
        >
          <span> Informations</span>
        </div></a
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
