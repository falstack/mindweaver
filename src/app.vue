<style lang="scss">
  @import "~assets/css/global.scss";

  #app {
    height: 100%;
    width: 100%;
  }
</style>

<template>
  <div id="app">
    <v-header></v-header>
    <router-view id="__view"></router-view>
  </div>
</template>

<script>
  import vHeader from 'layout/header'

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
