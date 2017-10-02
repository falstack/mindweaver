<style lang="scss" scoped="">
  .time-line {
    position: absolute;
    left: 40px;
    bottom: 50px;
    height: 200px;
    width: 20px;
  }
</style>

<template>
  <div :style="spaceStyle">
    <v-space v-for="item in maps"
             :item="item"
             :zone="maps.length"
             :rate="rate"
             :range="range.now"
    ></v-space>
    <div class="time-line">
      <v-range v-model="range.now"
               :min='range.min'
               :max="range.max"
               :vertical="true"
      ></v-range>
    </div>
  </div>
</template>

<script>
  import vSpace from 'component/space.vue'
  export default {
    name: 'v-page-index',
    components: {
      vSpace
    },
    computed: {
      spaceStyle () {
        return { perspective: `${this.range.now}px` }
      }
    },
    data () {
      return {
        rate: 50,
        range: {
          min: 0,
          max: 0,
          now: 0
        },
        maps: [
          {
            level: 0
          },
          {
            level: 1
          },
          {
            level: 2
          },
          {
            level: 3
          },
          {
            level: 4
          },
          {
            level: 5
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
      carousel (e) {
        const delta = e.wheelDelta || -e.detail
        if (delta > 0 && this.range.now < this.range.max) {
          this.range.now++
        }
        if (delta < 0 && this.range.now >= this.range.min) {
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
