<style lang="scss" scoped="">
  .node {
    position: absolute;
    width: 200px;
    height: 200px;

    .node-item {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      padding: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(32,160,255,.2);
      background-color: rgba(32,160,255,.1);
      cursor: pointer;
      user-select: none;

      &:hover {
        border: 1px solid rgba(32,160,255,.3);
        background-color: rgba(32,160,255,.2);
      }
    }
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
    <div class="node-item" @click="shuttle">
      <p v-text="item.value"></p>
    </div>
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
      shuttle () {
        if (this.range.now % 1 !== 0) {
          // moving
          return
        }
        if (this.$store.state.index.depth - this.range.now === this.item.index) {
          // showing
          return
        }
        const beforeRange = this.range.now
        const tick = 1 / this.$rate
        const timer = setInterval(() => {
          if (this.range.now <= beforeRange - 1) {
            clearInterval(timer)
          }
          this.$store.commit('now_range', -tick)
        }, tick * this.$duration)
      }
    },
    mounted () {

    }
  }
</script>
