<style lang="scss" scoped="">
  .space {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<template>
  <section class="space" :style="spaceScale" v-if="show">
    <v-space v-if="item.children.length"
             v-for="child in item.children"
             :key="child.id"
             :item="child"
    ></v-space>
    <v-node v-if="node" :item="item"></v-node>
  </section>
</template>

<script>
  export default {
    name: 'v-space',
    props: {
      item: {
        required: true,
        type: Object
      }
    },
    data () {
      return {
        show: false,
        scale: 1,
        zone: 0,
        node: true
      }
    },
    watch: {
      range: {
        handler () {
          this.checkShow()
        },
        deep: true
      }
    },
    computed: {
      spaceScale () {
        return this.node
          ? { transform: `translateZ(${this.zone}px) scale3d(${this.scale}, ${this.scale}, 1)` }
          : {}
      },
      range () {
        return this.$store.state.index.range
      }
    },
    created () {
      this.checkShow()
    },
    methods: {
      checkShow () {
        const index = (this.range.max - this.range.now) / this.$rate - this.item.index
        this.show = index >= 0
        if (index >= 1) {
          this.scale = 1
          this.zone = 0
          this.node = false
        } else {
          this.scale = 1 / (this.range.max / this.$rate - this.item.index)
          this.zone = this.range.max - (this.item.index + 1) * this.$rate
          this.node = true
        }
      }
    }
  }
</script>
