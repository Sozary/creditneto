<template>
  <div class="c-home">
    <div class="c-home-title">
      <div><span>Besoin d'un </span><span>crédit</span><span> ?</span></div>
      <div>
        <span>Comparez les </span><span>meilleures offres</span><span> !</span>
      </div>
    </div>
    <div class="c-home-categories">
      <div
        class="c-home-categories-category"
        v-for="category in categories"
        :key="category.slug"
        @click="changeSelectedNav(category.slug)"
      >
        <div class="c-home-categories-category-ellipsis"></div>
        <div class="c-home-categories-category-text" v-html="category.label" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    categories() {
      return this.$store.getters['nav/categories']
    },
  },
  methods: {
    changeSelectedNav(slug) {
      this.$router.push(slug)
      this.$store.commit('nav/changeSelectedNav', slug)
    },
  },
}
</script>
