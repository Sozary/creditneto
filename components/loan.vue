<template>
  <div class="c-loan">
    <span class="c-loan-title"> Annonces: </span>
    <div class="c-loan-items">
      <div class="c-loan-items-item" v-for="item in items" :key="item.id">
        <img :src="'/assets' + item.url_logo" />
        <div class="c-loan-items-item-taeg">
          <span>
            <strong>TAEG </strong> de
            <strong>{{ taeg(item.taeg)[0] }}</strong> à
            <strong>{{ taeg(item.taeg)[0] }}</strong></span
          >
        </div>
        <div class="c-loan-items-item-example">
          <span v-html="item.exemple" />
        </div>
        <div class="c-loan-items-item-options">
          <font-awesome-icon :icon="['fas', 'euro-sign']" />
          <font-awesome-icon :icon="['fas', 'calendar']" />
        </div>
        <div class="c-loan-items-item-data-options">
          <div class="c-loan-items-item-data-options-amount">
            <span>Montant : Min </span
            ><span v-html="formatCurrency(item.montant_min)" />
            <span> - Max </span
            ><span v-html="formatCurrency(item.montant_max)" />
          </div>
          <div class="c-loan-items-item-data-options-duration">
            <span>Durée : Min </span
            ><span v-html="item.duree_min + ' mois'" /><span> - Max </span
            ><span v-html="item.duree_max + ' mois'" />
          </div>
        </div>
        <div class="c-loan-items-item-simulate">
          <span>simuler</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async mounted() {
    const response = await this.$axios.$get('', {
      params: {
        product: this.categories.find((c) => c.slug === this.selectedNav).label,
        filters: {
          active: 1,
        },
      },
    })
    if (response.status === 200) {
      this.items = response.data
    }
  },
  methods: {
    taeg(value) {
      //"0,80 % &agrave; 21,15 %"
      return value.split(' &agrave; ')
    },
    formatCurrency(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '€'
    },
  },
  data() {
    return { items: null }
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
