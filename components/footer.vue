<template>
  <footer class="bg-footer-bg">
    <img
      src="/assets/images/logo-footer.png"
      class="w-36 h-6 ml-[50%] transform -translate-x-1/2 mt-2.5 md:mt-6"
    />
    <div class="md:hidden">
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
        class="flex justify-between font-bold text-[8px] font-montserrat px-7 mt-6 md:hidden"
      >
        <a
          :href="country.link"
          class="no-underline text-black"
          v-for="country of countries"
          :key="country.label"
          v-html="'Creditneto ' + country.label"
        />
      </div>
      <div
        class="flex font-bold text-[8px] font-montserrat justify-center my-4 md:hidden"
      >
        <a
          href="https://www.credit-creditneto.com/contact.php?"
          target="_blank"
          class="no-underline text-black"
          >Contact - Mentions legales - Adresses de nos partenaires</a
        >
      </div>
      <div class="px-9">
        <div class="flex gap-8 mb-3 justify-center">
          <div class="flex flex-col items-start">
            <div v-for="(category, index) in categories[0]" :key="index + '0'">
              <img
                src="/assets/icons/arrow-right.svg"
                class="w-1 h-1.5 mr-1.5"
              />
              <a
                class="text-[10px] font-montserrat font-light no-underline text-black inline mb-3"
                :href="'/' + category.slug"
                v-html="category.label"
              />
            </div>
          </div>
          <div class="flex flex-col items-start">
            <div v-for="(category, index) in categories[1]" :key="index + '1'">
              <img
                src="/assets/icons/arrow-right.svg"
                class="w-1 h-1.5 mr-1.5"
              />
              <a
                class="text-[10px] font-montserrat font-light no-underline text-black inline mb-3"
                :href="'/' + category.slug"
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
        <a target="_blank" href="https://www.facebook.com/credit.rapide">
          <font-awesome-icon
            :icon="['fab', 'facebook']"
            class="text-green w-6 h-6"
        /></a>
        <a target="_blank" href="https://twitter.com/creditneto">
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="text-green w-6 h-6"
        /></a>
      </div>
    </div>
    <div class="hidden md:block px-16 mt-14">
      <div class="flex gap-8 justify-center">
        <div
          class="flex flex-col items-start"
          v-for="(category, index) of categories"
          :key="index + '-category'"
        >
          <div v-for="(item, index) in category" :key="index + '-item'">
            <img
              src="/assets/icons/arrow-right.svg"
              class="w-1 h-1.5 mr-1.5 md:w-3 md:h-3.5"
            />
            <a
              class="text-[10px] md:text-lg md:font-normal font-montserrat font-light no-underline text-black inline mb-3 hover:border-solid hover:border-0 hover:border-b-[3px] hover:border-green transition-all"
              :href="'/' + item.slug"
              v-html="item.label"
            />
          </div>
        </div>
      </div>
      <div
        class="flex my-8 font-bold text-[15px] font-montserrat justify-between"
      >
        <a
          :href="country.link"
          target="_blank"
          class="no-underline text-black"
          v-for="country of countries"
          :key="country.label"
          v-html="'Creditneto ' + country.label"
        />
        <div>
          <a
            href="https://www.credit-creditneto.com/contact.php?"
            target="_blank"
            class="no-underline text-black"
            >Contact - Mentions legales - Adresses de nos partenaires</a
          >
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-[15px] font-light font-montserrat flex-1">
          Vous avez besoin d'argent rapidement ?<br />
          Demande et simulation de crédit !<br />
          Creditneto vous proposes des offres de crédits et de prêts bancaires
          sélectionnés auprès de très grands organismes de crédits avec des
          formules variées. Simulation, recherche et demande de crédit en ligne.
          Vous pouvez avoir le crédit qui correspond parfaitement à votre
          recherche de crédit pas cher !
        </div>
        <div class="flex gap-6 flex-1 justify-center">
          <a target="_blank" href="https://www.facebook.com/credit.rapide">
            <font-awesome-icon
              :icon="['fab', 'facebook']"
              class="text-green w-6 h-6 md:w-10 md:h-10"
          /></a>
          <a target="_blank" href="https://twitter.com/creditneto">
            <font-awesome-icon
              :icon="['fab', 'twitter']"
              class="text-green w-6 h-6 md:w-10 md:h-10"
          /></a>
        </div>
        <div class="text-[15px] font-light font-montserrat text-right flex-1">
          Un crédit vous engage et doit être remboursé. Vérifiez vos capacités
          de remboursement avant de vous engager. <br /><br />*Voir les
          conditions financières sur les sites de nos partenaires.
        </div>
      </div>
    </div>
    <div
      class="text-center text-[7px] md:text-[13px] font-montserrat mt-3 md:mt-6 pb-3"
    >
      Copyright 2004-{{ year }} - Site édité par la société BLOGGERS VIRTUAL WEB
      SL
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      isMobile: false,
      countries: [
        {
          label: 'Belgique',
          link: 'https://www.creditneto.be/index.php?p=1&montant=0&duree=0&simulation=1',
        },
        {
          label: 'Pays Bas',
          link: 'https://www.creditneto.nl/index.php?p=1&montant=0&duree=0&simulation=1',
        },
        {
          label: 'France',
          link: 'https://www.credit-creditneto.com/index.php?p=1&montant=0&duree=0&simulation=1',
        },
      ],
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.isMobile = window.innerWidth < 987
    },
  },
  computed: {
    categories() {
      return this._.chunk(
        this.$store.getters['nav/categories'],
        this.isMobile
          ? Math.ceil(this.$store.getters['nav/categories'].length / 2)
          : 2
      )
    },
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
