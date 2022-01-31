<template>
  <div class="c-loan">
    <span class="c-loan-title"> Annonces: </span>
    <div class="c-loan-items">
      <div class="c-loan-items-item">
        <img src="/assets/images/cetelem.webp" alt="" />
        <div class="c-loan-items-item-taeg">
          <span>
            <strong>TAEG </strong> de <strong>x%</strong> à
            <strong>x%</strong></span
          >
        </div>
        <div class="c-loan-items-item-example">
          <span
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            corporis, distinctio deleniti amet, asperiores delectus labore
            repellat quis assumenda laborum aliquam optio voluptatibus? Sapiente
            repudiandae dignissimos, ab iste voluptate possimus!</span
          >
        </div>
        <div class="c-loan-items-item-options">
          <font-awesome-icon :icon="['fas', 'euro-sign']" />
          <font-awesome-icon :icon="['fas', 'calendar']" />
        </div>
        <div class="c-loan-items-item-data-options">
          <div class="c-loan-items-item-data-options-amount">
            <span>Montant : Min </span><span>20 000</span> <span> - Max </span
            ><span> 1 000 000</span>
          </div>
          <div class="c-loan-items-item-data-options-duration">
            <span>Durée : Min </span><span>36 mois</span><span> - Max </span
            ><span>420 mois</span>
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
export default {}
</script>
