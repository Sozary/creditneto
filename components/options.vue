<template>
  <div class="c-options">
    <Select
      :items="categories"
      clearable
      v-model="selectedCategory"
      default="Sélectionnez un type de crédit"
    />
    <Select :items="filters" v-model="selectedFilter" default="Partenaire" />
  </div>
</template>
<script>
import Select from '~/components/select'
export default {
  components: { Select },
  data() {
    return {
      selectedCategory: this.$route.path.slice(1),
      selectedFilter: '',
      filters: [
        { label: 'Montant max', id: 'max-amount' },
        { label: 'Montant min', id: 'min-amount' },
        { label: 'Durée max', id: 'max-duration' },
        { label: 'Durée min', id: 'min-duration' },
        { label: 'Rang', id: 'rank' },
      ],
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
