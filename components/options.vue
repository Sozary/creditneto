<template>
  <div class="c-options">
    <Select
      :items="categories"
      clearable
      v-model="selectedCategory"
      default="Sélectionnez un type de crédit"
    />
    <Slider
      v-model="selectedAmount"
      :min="0"
      :max="200000"
      title="Montant"
      :format="formatCurrency"
      type="€"
    />
    <Slider
      v-model="selectedMonths"
      :min="6"
      :step="1"
      :max="120"
      title="Durée"
      type=" mois"
    />
    <Select :items="sorts" v-model="selectedSort" default="Partenaire" />
  </div>
</template>
<script>
import Select from '~/components/select'
import Slider from '~/components/slider'
export default {
  components: { Select, Slider },
  data() {
    return {
      selectedCategory: this.$route.path.slice(1),
      selectedSort: '',
      selectedMonths: 0,
      selectedAmount: 0,
      sorts: [
        {
          label: 'Partenaire',
          id: 'partner',
          sort: (items) => this.sortFn(items, 'partenaire'),
        },
        {
          label: 'Montant max',
          id: 'max-amount',
          sort: (items) => this.sortFn(items, 'montant_max'),
        },
        {
          label: 'Montant min',
          id: 'min-amount',
          sort: (items) => this.sortFn(items, 'montant_min'),
        },
        {
          label: 'Durée max',
          id: 'max-duration',
          sort: (items) => this.sortFn(items, 'duree_max'),
        },
        {
          label: 'Durée min',
          id: 'min-duration',
          sort: (items) => this.sortFn(items, 'duree_min'),
        },
        {
          label: 'Rang',
          id: 'rank',
          sort: (items) => this.sortFn(items, 'classement'),
        },
      ],
    }
  },
  methods: {
    sortFn(items, key) {
      return items.sort((a, b) => a[key].toLowerCase() < b[key].toLowerCase())
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
  },
  mounted() {
    this.selectedMonths = 36
    this.selectedAmount = 100000
    this.selectedSort = this.sorts[0].id
  },
  watch: {
    selectedSort(val) {
      this.$store.commit('options/updateSort', {
        val,
        sortFn: this.sorts.find((s) => s.id === val).sort,
      })
    },
    selectedMonths(val) {
      this.$store.commit('options/updateDuration', val)
    },
    selectedAmount(val) {
      this.$store.commit('options/updateAmount', val)
    },
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
