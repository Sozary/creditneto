<template>
  <div>
    <div class="flex flex-col items-center relative mt-4 md:hidden">
      <img
        src="/assets/icons/menu.svg"
        class="w-7 h-5 absolute right-6 top-1 cursor-pointer"
        @click="showMenu"
      />
      <img
        src="/assets/images/mobile-logo.png"
        class="w-32 h-9 mb-2 cursor-pointer"
        @click="home"
      />
      <span
        class="text-dark-grey text-[8px] font-helvetica text-center font-bold"
      >
        Un crédit vous engage et doit être remboursé. <br />Vérifiez vos
        capacités de remboursement avant de vous engager.
      </span>
    </div>
    <div class="hidden md:flex mt-5 px-7 justify-between">
      <img
        src="/assets/images/desktop-logo.webp"
        class="w-44 h-14 cursor-pointer"
        @click="home"
      />
      <div class="flex flex-col text-right justify-center">
        <div class="text-lg font-bold font-montserrat">
          Besoin d’un <span class="text-green">crédit</span> ? Comparez les
          <span class="text-green">meilleures offres</span> !
        </div>
        <span class="text-dark-grey text-xs font-montserrat"
          >Un crédit vous engage et doit être remboursé. Vérifiez vos capacités
          de remboursement avant de vous engager.</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    home() {
      this.$router.push('/')
      this.$store.commit('nav/updateSelectedNav', '')
    },
    showMenu() {
      this.$store.commit('nav/updateShowMenu', true)
    },
    menuAction() {
      if (this.showCalculate) {
        this.$store.commit('nav/updateShowCalculate', !this.showCalculate)
      } else {
        this.$store.commit('nav/updateShowMenu', !this.showMenu)
      }
    },
  },
  computed: {
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
  },
}
</script>
