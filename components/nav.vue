<template>
  <div class="c-nav">
    <transition name="fade" mode="in-out">
      <div class="c-nav-items">
        <NuxtLink
          class="c-nav-items-item"
          :to="category.slug"
          :class="{ '-active': selectedNav === category.slug }"
          v-for="(category, index) in categories"
          :key="index"
          @click.native="updateSelectedNav(category.slug)"
        >
          <span>{{ category.label }}</span>
        </NuxtLink>
      </div></transition
    >
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.updateSelectedNav(this.$route.path.slice(1))
  },
  methods: {
    updateSelectedNav(slug) {
      this.$store.commit('nav/updateSelectedNav', slug)
    },
  },
  computed: {
    categories() {
      return this.$store.getters['nav/categories']
    },
    selectedNav() {
      return this.$store.getters['nav/selectedNav']
    },
  },
}
</script>
