<template>
  <div class="flex flex-col items-center relative mt-4">
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
      Un crédit vous engage et doit être remboursé. <br />Vérifiez vos capacités
      de remboursement avant de vous engager.
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return { isMobile: false }
  },
  methods: {
    resize() {
      this.isMobile = window.innerWidth < 970
    },
    home() {
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
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  computed: {
    menuIco() {
      return `/assets/icons/${
        this.showCalculate ? 'validate' : this.showMenu ? 'close-menu' : 'menu'
      }.svg`
    },
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
  },
}
</script>
