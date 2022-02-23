<template>
  <div class="c-header">
    <div class="c-header-logo">
      <img src="/assets/images/logo.webp" @click="home" />
      <img :src="menuIco" @click="menuAction" />
    </div>
    <transition name="fade">
      <div class="c-header-info">
        <div class="c-header-info-first-line">
          <span>Besoin d'un </span><span>crédit</span
          ><span> ? Comparez les </span><span>meilleures offres</span
          ><span> !</span>
        </div>
        <div class="c-header-info-second-line">
          <span
            >Un crédit vous engage et doit être remboursé. <br />
            Vérifiez vos capactiés de remboursement avant de vous engager.</span
          >
        </div>
      </div></transition
    >
  </div>
</template>
<script>
export default {
  methods: {
    home() {
      this.$router.push('/')
      this.$store.commit('nav/updateSelectedNav', '')
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
    menuIco() {
      return `/assets/icons/${
        this.showCalculate ? 'validate' : this.showMenu ? 'close-menu' : 'menu'
      }.svg`
    },
    showMenu() {
      return this.$store.getters['nav/showMenu']
    },
    showCalculate() {
      return this.$store.getters['nav/showCalculate']
    },
  },
}
</script>
