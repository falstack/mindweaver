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
  <section class="space" :style="spaceScale">
    <h1 :style="{ lineHeight: '100px' }">i am level {{ item.index + 1 }}</h1>
    <p v-text="item.value"></p>
  </section>
</template>

<script>
  /**
   * newSize:
   * perspective === 0 ? return oldSize
   * perspective === translateZ ? return infinity
   * return perspective / (perspective - translateZ) * oldSize
   */
  export default {
    name: 'v-space',
    props: {
      item: {
        required: true,
        type: Object
      }
    },
    computed: {
      spaceScale () {
        const range = this.$store.state.index.range
        const scale = 1 / (range.max / this.$rate - this.item.index)
        const index = (range.max - range.now) / this.$rate - this.item.index
        const show = index >= 0 && index < 1
        return {
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'auto' : 'none',
          transform: `translateZ(${range.max - (this.item.index + 1) * this.$rate}px) scale3d(${scale}, ${scale}, 1)`
        }
      }
    }
  }
</script>
