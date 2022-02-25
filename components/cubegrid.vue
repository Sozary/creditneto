<template>
  <div v-bind:style="styles" class="spinner spinner--square-grid">
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube1"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube2"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube3"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube4"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube5"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube6"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube7"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube8"></div>
    <div v-bind:style="cubeStyles" class="sk-cube sk-cube9"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: '40px',
    },
    background: {
      default: '#41b883',
    },
    duration: {
      default: '1.3s',
    },
  },
  computed: {
    cubeStyles() {
      return {
        backgroundColor: this.background,
        animationDuration: this.duration,
      }
    },
    styles() {
      return {
        width: this.size,
        height: this.size,
      }
    },
  },
}
</script>
