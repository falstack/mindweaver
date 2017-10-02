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
    <span>
      i am level {{ item.index + 1 }}
    </span>
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
        const scale = 1 / (this.item.index + 1)
        const index = this.$store.state.index.range.now / this.$rate - this.item.index
        const show = index > 0 && index <= 1
        return {
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'auto' : 'none',
          transform: `translateZ(${this.item.index * this.$rate}px) scale3d(${scale}, ${scale}, 1)`
        }
      }
    }
  }
</script>
