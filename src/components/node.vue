<style lang="scss" scoped="">

</style>

<template>
  <div>
    <h1 :style="{ lineHeight: '100px' }">i am level {{ item.index + 1 }}</h1>
    <p v-text="item.value"></p>
  </div>
</template>

<script>
  export default {
    name: 'v-node',
    components: {

    },
    props: ['item'],
    watch: {

    },
    computed: {

    },
    data () {
      return {

      }
    },
    created () {

    },
    methods: {

    },
    mounted () {

    }
  }
</script>
