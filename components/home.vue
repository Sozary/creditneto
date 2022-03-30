<template>
  <div class="mt-10 px-[91px]">
    <div class="text-3xl font-bold font-montserrat mb-11">
      <div>Besoin d'un <span class="text-green">crédit</span> ?</div>
      <div>
        Comparez les <span class="text-green">meilleures offres</span> !
      </div>
    </div>
    <div class="flex flex-wrap">
      <a
        class="w-40 h-28 bg-home-green text-white font-montserrat font-bold text-lg mr-12 mb-11 rounded relative overflow-hidden cursor-pointer transition-all hover:scale-110"
        v-for="category in categories"
        :key="category.slug"
        :href="category.slug"
        @click="updateSelectedNav(category.slug)"
      >
        <div
          class="absolute w-40 h-40 bg-home-green-light left-1/2 bottom-[40%] rounded-[50%]"
        ></div>
        <span class="absolute top-12 px-3 two-lines" v-html="category.label" />
      </a>
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
    updateSelectedNav(slug) {
      this.$router.push(slug)
      this.$store.commit('nav/updateSelectedNav', slug)
    },
  },
}
</script>
