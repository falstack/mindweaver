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
    <!--
    <v-space v-for="item in maps"
             :key="item.id"
             :item="item"
             v-if="maps.length"
    ></v-space>
    -->
    <v-space v-if="maps" :item="maps"></v-space>
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
  const tree2Array = (object, array = []) => {
    array.push(object)
    if (object.children.length) {
      object.children.forEach(item => {
        tree2Array(item, array)
      })
    }
  }

  const resource = {
    id: 1,
    index: 0,
    depth: 4,
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
      },
      {
        id: 3,
        index: 1,
        subIndex: 2,
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

  export default {
    name: 'v-page-index',
    computed: {
      spaceStyle () {
        return { perspective: `${this.range.now}px` }
      },
      range () {
        return this.$store.state.index.range
      }
    },
    data () {
      return {
        maps: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
//        const arr = []
//        tree2Array(resource, arr)
//        this.maps = _.orderBy(arr, ['index', 'subIndex'])
        this.maps = resource
        this.$store.commit('set_range', {
          min: this.$rate,
          max: resource.depth * this.$rate,
          now: resource.depth * this.$rate
        })
      },
      carousel (e) {
        const delta = e.wheelDelta || -e.detail
        if (delta > 0 && this.range.now < this.range.max) {
          this.$store.commit('now_range', 1)
        }
        if (delta < 0 && this.range.now >= this.range.min) {
          this.$store.commit('now_range', -1)
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
