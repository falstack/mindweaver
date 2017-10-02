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
             :key="item.id"
             :item="item"
             :zone="maps.length"
             :rate="rate"
             :range="range.now"
             v-if="maps.length"
    ></v-space>
    <template v-else>
      loading...
    </template>
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
        maps: [],
        resource: {
          id: 1,
          index: 0,
          depth: 4,
          key: '0-0',
          value: '这是根节点，它有一个子元素，是一个递归树',
          children: [
            {
              id: 2,
              index: 1,
              key: '1-0',
              value: '一级节点，它有一个子元素',
              children: [
                {
                  id: 4,
                  index: 2,
                  key: '2-0',
                  value: '二级节点，它没有子元素',
                  children: []
                }
              ]
            },
            {
              id: 3,
              index: 1,
              key: '1-1',
              value: '一级节点，它有两个子元素',
              children: [
                {
                  id: 5,
                  index: 2,
                  key: '2-1',
                  value: '二级节点，它没有子元素',
                  children: []
                },
                {
                  id: 6,
                  index: 2,
                  key: '2-2',
                  value: '二级节点，它有一个子元素',
                  children: [
                    {
                      id: 7,
                      index: 3,
                      key: '3-0',
                      value: '三级节点，它没有子元素',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.maps = [
          { id: 1, index: 0 },
          { id: 2, index: 1 },
          { id: 3, index: 2 },
          { id: 4, index: 3 },
          { id: 5, index: 4 },
          { id: 6, index: 5 }
        ]
        this.range = {
          min: this.rate,
          max: this.maps.length * this.rate,
          now: this.maps.length * this.rate
        }
      },
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
