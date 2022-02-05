<template>
  <div class="c-header">
    <div class="c-header-logo">
      <img src="/assets/images/logo.webp" />
      <img src="/assets/icons/menu.svg" @click="toggleMenu" />
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
    toggleMenu() {
      this.$store.commit('nav/updateShowMenu', !this.showMenu)
    },
  },
  computed: {
    showMenu() {
      return this.$store.getters['nav/showMenu']
    },
  },
}
</script>
