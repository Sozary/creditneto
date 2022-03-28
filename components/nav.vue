<template>
  <div>
    <div
      v-if="showMenu"
      class="bg-light-grey w-screen h-screen absolute top-0 left-0"
    >
      <img
        src="/assets/images/logo.png"
        alt="logo"
        class="w-32 h-6 transform -translate-x-1/2 ml-[50%] mt-11"
      />
      <img
        src="/assets/icons/close-menu.svg"
        alt="close"
        @click="closeMenu"
        class="w-12 h-12 absolute right-6 top-11 transform -translate-y-1/4 cursor-pointer"
      />
      <div class="inline-grid mt-32 ml-12">
        <NuxtLink
          class="before:content-[url('/assets/icons/arrow-right.svg')] before:w-3.5 before:h-2.5 before:mr-3 text-xl font-montserrat font-light no-underline text-black inline mb-3"
          :to="category.slug"
          :class="{ '-active': selectedNav === category.slug }"
          v-for="(category, index) in categories"
          :key="index"
          @click.native="updateSelectedNav(category.slug)"
          v-html="category.label"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.updateSelectedNav(this.$route.path.slice(1), true)
  },
  methods: {
    closeMenu() {
      this.$store.commit('nav/updateShowMenu', false)
    },
    updateSelectedNav(slug, created = false) {
      this.$store.commit('nav/updateSelectedNav', slug)
      if (!created) {
        this.closeMenu()
      }
    },
  },
  computed: {
    showMenu() {
      return this.$store.getters['nav/showMenu']
    },
    categories() {
      return this.$store.getters['nav/categories']
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
