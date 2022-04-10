<template>
  <div class="relative pb-32">
    <div class="mt-10 px-[91px]">
      <div class="text-3xl font-bold font-montserrat mb-11 z-10">
        <div>Besoin d'un <span class="text-green">crédit</span> ?</div>
        <div>
          Comparez les <span class="text-green">meilleures offres</span> !
        </div>
      </div>
      <img
        src="/assets/images/home-left.webp"
        class="absolute top-0 left-0 h-full"
      />
      <img
        src="/assets/images/home-right.svg"
        class="absolute bottom-[-50px] right-0"
      />
      <div class="flex flex-wrap z-10">
        <NuxtLink
          class="w-40 h-28 bg-home-green text-white font-montserrat font-bold text-lg mr-12 mb-11 rounded relative overflow-hidden cursor-pointer transition-all hover:scale-110"
          v-for="category in categories"
          :key="category.slug"
          :to="category.slug"
          @click.native="updateSelectedNav(category.slug)"
        >
          <div
            class="absolute w-40 h-40 bg-home-green-light left-1/2 bottom-[40%] rounded-[50%]"
          ></div>
          <span
            class="absolute top-12 px-3 two-lines"
            v-html="category.label"
          />
        </NuxtLink>
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
    updateSelectedNav(slug) {
      this.$store.commit('nav/updateSelectedNav', slug)
    },
  },
}
</script>
