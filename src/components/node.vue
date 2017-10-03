<style lang="scss" scoped="">
  .node {
    position: absolute;
  }
</style>

<template>
  <div class="node" :style="placement">
    <v-node v-if="showChild"
            v-for="child in item.children"
            :item="child"
            :key="child.id"
            :siblings="calcSiblings"
    ></v-node>
    <h1 :style="{ lineHeight: '100px' }">i am level {{ item.index }}</h1>
    <p v-text="item.value"></p>
  </div>
</template>

<script>
  const computeSiblings = (data, index) => {
    let count = 0
    if (data.index === index + 1) {
      count++
    } else if (data.index < index + 1) {
      data.children.forEach(item => {
        count += computeSiblings(item, index, count)
      })
    }
    return count
  }
  export default {
    name: 'v-node',
    components: {

    },
    props: {
      item: {
        required: true,
        type: Object
      },
      siblings: {
        type: Number,
        default: 0
      }
    },
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
      },
      placement () {
        if (this.siblings) {
          return {
            transform: `translate(200px, ${(this.item.subIndex - Math.floor(this.siblings / 2)) * 200 + (this.siblings % 2 !== 0 ? 0 : 100)}%)`
          }
        }
        return {}
      },
      calcSiblings () {
        return computeSiblings(this.$store.state.index.data, this.item.index)
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
