<style lang="scss" scoped="">
  .space {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective-origin: 50% 50%;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: red;
  }
</style>

<template>
  <div>
    <div class="space" :style="spaceStyle">
      <div class="box">{{ range }}</div>
    </div>
    <v-range v-model="range"></v-range>
  </div>
</template>

<script>
  export default {
    name: 'v-page-index',
    components: {

    },
    props: {

    },
    watch: {

    },
    computed: {
      spaceStyle () {
        return { perspective: `${this.range}px` }
      }
    },
    data () {
      return {
        range: 10
      }
    },
    created () {

    },
    mounted () {

    }
  }
</script>
