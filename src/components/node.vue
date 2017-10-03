<style lang="scss" scoped="">
  .node {
    position: absolute;
  }
</style>

<template>
  <div class="node">
    <v-node v-if="showChild"
            v-for="child in item.children"
            :item="child"
    ></v-node>
    <h1 :style="{ lineHeight: '100px' }">i am level {{ item.index }}</h1>
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
      showChild () {
        return (
          this.item.children.length &&
          this.item.index < parseInt((this.range.max - this.range.now) / this.$rate, 10) + 1
        )
      },
      range () {
        return this.$store.state.index.range
      }
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
