<style lang="scss" scoped="">
  .space {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    perspective-origin: 50% 50%;

    .space-line {
      position: absolute;
      left: 50px;
      bottom: 50px;
      height: 100px;
      width: 10px;
    }
  }

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    background-color: transparent;
  }
</style>

<template>
  <div>
    <div class="space" :style="spaceStyle">
      <div class="box" v-for="item in maps" :style="space3D(item)">
        i'am {{ item.level }}
      </div>
      <div class="space-line">
        <v-range v-model="range.now"
                 :min='range.min'
                 :max="range.max"
                 :vertical="true"
        ></v-range>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * newSize:
   * perspective === 0 ? return oldSize
   * perspective === translateZ ? return infinity
   * return perspective / (perspective - translateZ) * oldSize
   */
  export default {
    name: 'v-page-index',
    components: {

    },
    props: {

    },
    watch: {

    },
    computed: {
      spaceStyle () {
        return { perspective: `${this.range.now}px` }
      }
    },
    data () {
      return {
        rate: 10,
        range: {
          min: 0,
          max: 0,
          now: 0
        },
        maps: [
          {
            level: 0,
            color: '#f00'
          },
          {
            level: 1,
            color: '#0f0'
          },
          {
            level: 2,
            color: '#00f'
          },
          {
            level: 3,
            color: '#ff0'
          },
          {
            level: 4,
            color: '#f0f'
          },
          {
            level: 5,
            color: '#0ff'
          }
        ]
      }
    },
    created () {
      this.range = {
        min: this.rate,
        max: this.maps.length * this.rate,
        now: this.maps.length * this.rate
      }
    },
    methods: {
      space3D (item) {
        const scale = (this.maps.length - item.level) / this.maps.length
        return {
          transform: `translate3d(-50%, -50%, ${item.level * this.rate}px) scale3d(${scale}, ${scale}, 1)`
        }
      },
      carousel (e) {
        const delta = e.wheelDelta || -e.detail
        if (delta > 0 && this.range.now < this.range.max) {
          this.range.now++
        }
        if (delta < 0 && this.range.now > this.range.min) {
          this.range.now--
        }
        e.preventDefault()
      }
    },
    mounted () {
      // 滚轮事件
      document.addEventListener('mousewheel', (e) => {
        this.carousel(e)
      })
      document.addEventListener('DOMMouseScroll', (e) => {
        this.carousel(e)
      })
    }
  }
</script>
