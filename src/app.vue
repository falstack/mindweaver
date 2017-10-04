<style lang="scss">
  @import "~assets/css/global.scss";

  #app {
    height: 100%;
    width: 100%;

    #main-view {
      position: relative;
      width: 100%;
      height: 100%;
      perspective-origin: 50% 50%;
    }
  }
</style>

<template>
  <div id="app">
    <v-header></v-header>
    <router-view id="main-view"></router-view>
  </div>
</template>

<script>
  import vHeader from 'component/layouts/header'

  export default {
    name: 'v-index',
    components: {
      vHeader
    },
    props: {

    },
    watch: {

    },
    computed: {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>
