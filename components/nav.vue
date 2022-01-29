<template>
  <div class="c-nav">
    <div class="c-nav-items">
      <NuxtLink
        class="c-nav-items-item"
        :to="category.slug"
        :class="{ '-active': selectedNav === category.slug }"
        v-for="(category, index) in categories"
        :key="index"
        @click.native="changeSelectedNav(category.slug)"
      >
        <span>{{ category.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.changeSelectedNav(this.$route.path.slice(1))
  },
  methods: {
    changeSelectedNav(slug) {
      this.$store.commit('nav/changeSelectedNav', slug)
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
