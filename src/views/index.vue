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
    <v-space v-if="maps" :item="maps"></v-space>
    <template v-else>
      loading...
    </template>
    <div class="time-line">
      <v-range v-model="range.now"
               :min='range.min'
               :max="range.max"
               :disabled="!$auto"
               :vertical="true"
      ></v-range>
    </div>
  </div>
</template>

<script>
  const resource = {
    id: 1,
    index: 0,
    subIndex: 0,
    value: '这是根节点，它有两个子元素，是一个递归树',
    children: [
      {
        id: 2,
        index: 1,
        subIndex: 0,
        value: '一级节点，它有一个子元素',
        children: [
          {
            id: 4,
            index: 2,
            subIndex: 0,
            value: '二级节点，它没有子元素',
            children: []
          }
        ]
      },
      {
        id: 3,
        index: 1,
        subIndex: 1,
        value: '一级节点，它有两个子元素',
        children: [
          {
            id: 5,
            index: 2,
            subIndex: 1,
            value: '二级节点，它没有子元素',
            children: []
          },
          {
            id: 6,
            index: 2,
            subIndex: 2,
            value: '二级节点，它有一个子元素',
            children: [
              {
                id: 7,
                index: 3,
                subIndex: 0,
                value: '三级节点，它没有子元素',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }

  const computeDepth = (map) => {
    let depth = 0
    if (map.children && map.children.length) {
      map.children.forEach(item => {
        depth = computeDepth(item)
      })
    } else {
      depth = map.index ? map.index + 1 : 0
    }
    return depth
  }

  export default {
    name: 'v-page-index',
    computed: {
      spaceStyle () {
        return { perspective: `${this.range.now * this.$rate}px` }
      },
      range () {
        return this.$store.state.index.range
      },
      maps () {
        return this.$store.state.index.data
      }
    },
    data () {
      return {

      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        const depth = computeDepth(resource)
        this.$store.commit('set_depth', depth)
        this.$store.commit('set_range', {
          min: 1,
          max: depth,
          now: depth
        })
        this.$store.commit('set_data', resource)
      },
      carousel (e) {
        const delta = e.wheelDelta || -e.detail
        if (delta > 0 && this.range.now < this.range.max) {
          this.$store.commit('now_range', 1 / this.$rate)
        }
        if (delta < 0 && this.range.now >= this.range.min) {
          this.$store.commit('now_range', -1 / this.$rate)
        }
        e.preventDefault()
      }
    },
    mounted () {
      if (this.$auto) {
        // 滚轮事件
        document.addEventListener('mousewheel', (e) => {
          this.carousel(e)
        })
        document.addEventListener('DOMMouseScroll', (e) => {
          this.carousel(e)
        })
      }
    }
  }
</script>
