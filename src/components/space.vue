<style lang="scss" scoped="">
  .space {
    position: absolute;
    left: 50%;
    top: 50%;
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
      i am level {{ item.level }}
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
    components: {

    },
    props: {
      item: {
        required: true,
        type: Object
      },
      rate: {
        required: true,
        type: Number
      },
      range: {
        required: true,
        type: Number
      },
      zone: {
        required: true,
        type: Number
      }
    },
    watch: {

    },
    computed: {
      spaceScale () {
        const scale = (this.zone - this.item.level) / this.zone
        const level = this.range / this.rate - this.item.level
        const show = level >= 0 && level <= 1
        return {
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'auto' : 'none',
          transform: `translate3d(-50%, -50%, ${this.item.level * this.rate}px) scale3d(${scale}, ${scale}, 1)`
        }
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
