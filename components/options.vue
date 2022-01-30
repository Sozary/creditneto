<template>
  <div class="c-options">
    <Select :items="categories" clearable v-model="selectedCategory" />
  </div>
</template>
<script>
import Select from '~/components/select'
export default {
  components: { Select },
  data() {
    return {
      selectedCategory: this.$route.path.slice(1),
    }
  },
  watch: {
    selectedCategory(value) {
      history.pushState({}, null, value || '/')
      this.$store.commit('nav/changeSelectedNav', value)
    },
  },
  computed: {
    categories() {
      return this.$store.getters['nav/categories'].map((e) => {
        return {
          label: e.label,
          id: e.slug,
        }
      })
    },
  },
}
</script>
