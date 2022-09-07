<template>
  <div>
    <div class="mt-3.5 md:flex hidden">
      <nuxt-link
        class="py-2.5 px-1 h-12 flex-1 flex items-center text-center justify-center hover:selected-shadow transition-all cursor-pointer text-black no-underline font-bold text-sm font-montserrat"
        v-for="(category, index) in categories"
        :to="category.slug"
        :key="index"
        @click.native="updateSelectedNav"
        v-html="formatTwoLines(category.label)"
        :class="{
          'border-solid border-0 border-b-[3px] border-green hover:shadow-none':
            selectedNav === category.slug,
          'bg-nav-even': (index + 1) % 2 === 0,
          'bg-nav-odd': (index + 1) % 2 !== 0,
        }"
      >
      </nuxt-link>
    </div>
    <transition name="slideRight" class="block md:hidden">
      <div
        v-if="showMenu"
        class="bg-light-grey w-screen h-screen fixed top-0 left-0 z-20"
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
        <div class="flex flex-col items-start mt-32 ml-12">
          <a
            class="before:content-[url('/assets/icons/arrow-right.svg')] before:w-3.5 before:h-2.5 before:mr-3 text-xl font-montserrat font-light no-underline text-black inline mb-3"
            :class="{
              'border-solid border-0 border-b-2 border-green':
                selectedNav === category.slug,
            }"
            :href="'/' + category.slug"
            v-for="(category, index) in categories"
            :key="index"
            v-html="category.label"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.updateSelectedNav(true)
  },
  methods: {
    formatTwoLines(text) {
      const arr = text.split(' ')
      arr.splice(-1, 0, '<br>')
      return arr.join(' ')
    },
    closeMenu() {
      this.$store.commit('nav/updateShowMenu', false)
    },
    updateSelectedNav(created = false) {
      const slug = this.$route.path.slice(1)
      this.$router.push('/' + slug)
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
      return this.$store.getters['nav/categories'].filter((c) => c.visible)
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
