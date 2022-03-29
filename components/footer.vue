<template>
  <div class="bg-footer-bg">
    <img
      src="/assets/images/logo-footer.png"
      class="w-36 h-6 ml-[50%] transform -translate-x-1/2 mt-2.5"
    />
    <div class="px-9">
      <div class="font-bold text-[8px] font-montserrat mt-6">
        Vous avez besoin d’argent rapidement ?<br />
        Demande et simulation de crédit !
      </div>
      <div class="font-montserrat font-light text-[8px] mt-3">
        Creditneto vous proposes des offres de crédits et de prêts bancaires
        sélectionnés auprès de très grands organismes de crédits avec des
        formules variées. Simulation, recherche et demande de crédit en ligne.
        Vous pouvez avoir le crédit qui correspond parfaitement à votre
        recherche de crédit pas cher !
      </div>
    </div>
    <div
      class="flex justify-between font-bold text-[8px] font-montserrat px-7 mt-6"
    >
      <a
        :href="country.link"
        class="no-underline text-black"
        v-for="country of countries"
        :key="country.label"
        v-html="'Creditneto ' + country.label"
      />
    </div>
    <div class="flex font-bold text-[8px] font-montserrat justify-center my-4">
      <a href="#" class="no-underline text-black mx-1">Contact</a> -
      <a href="#" class="no-underline text-black mx-1">Mentions legales</a> -
      <a href="#" class="no-underline text-black mx-1"
        >Adresses de nos partenaires</a
      >
    </div>
    <div class="px-9">
      <div class="flex gap-8 mb-3">
        <div class="flex flex-col items-start">
          <div v-for="(category, index) in categories[0]" :key="index + '0'">
            <img src="/assets/icons/arrow-right.svg" class="w-1 h-1.5 mr-1.5" />
            <NuxtLink
              class="text-[10px] font-montserrat font-light no-underline text-black inline mb-3"
              :to="category.slug"
              @click.native="updateSelectedNav(category.slug)"
              v-html="category.label"
            />
          </div>
        </div>
        <div class="flex flex-col items-start">
          <div v-for="(category, index) in categories[1]" :key="index + '1'">
            <img src="/assets/icons/arrow-right.svg" class="w-1 h-1.5 mr-1.5" />
            <NuxtLink
              class="text-[10px] font-montserrat font-light no-underline text-black inline mb-3"
              :to="category.slug"
              @click.native="updateSelectedNav(category.slug)"
              v-html="category.label"
            />
          </div>
        </div>
      </div>
      <div class="font-light text-[8px] font-montserrat">
        <div>
          Un crédit vous engage et doit être remboursé. Vérifiez vos capacités
          de remboursement avant de vous engager.
        </div>
        <div class="mt-2">
          *Voir les conditions financières sur les sites de nos partenaires.
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-6 mt-3">
      <a href="#">
        <font-awesome-icon
          :icon="['fab', 'facebook']"
          class="text-green w-6 h-6"
      /></a>
      <a href="#">
        <font-awesome-icon
          :icon="['fab', 'twitter']"
          class="text-green w-6 h-6"
      /></a>
    </div>
    <div class="text-center text-[7px] font-montserrat mt-3 pb-3">
      Copyright 2004-{{ year }} - Site édité par la société BLOGGERS VIRTUAL WEB
      SL
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countries: [
        {
          label: 'Belgique',
          link: 'https://www.creditneto.be/',
        },
        {
          label: 'Pays Bas',
        },
        { label: 'France', link: 'https://www.creditneto.net/' },
      ],
    }
  },
  methods: {
    updateSelectedNav(slug) {
      this.$store.commit('nav/updateSelectedNav', slug)
      this.$router.push(slug)
    },
  },
  computed: {
    categories() {
      return this._.chunk(
        this.$store.getters['nav/categories'],
        Math.ceil(this.$store.getters['nav/categories'].length / 2)
      )
    },
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
