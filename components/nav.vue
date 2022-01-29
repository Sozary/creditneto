<template>
  <div class="c-nav">
    <div class="c-nav-items">
      <div
        class="c-nav-items-item"
        v-for="(category, index) in categories"
        :key="index"
      >
        <span>{{ category.label }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    categories() {
      return this.$store.getters['nav/categories']
    },
  },
}
</script>
