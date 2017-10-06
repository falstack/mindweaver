import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      index: {
        state: {
          range: null,
          data: null,
          depth: 0,
          showSubIndex: 0
        },
        mutations: {
          set_depth (state, data) {
            state.depth = data
          },
          set_range (state, data) {
            state.range = data
          },
          now_range (state, data) {
            state.range.now += data
          },
          set_data (state, data) {
            state.data = data
          },
          set_show_sub_index (state, data) {
            state.showSubIndex = data
          }
        },
        actions: {},
        getters: {}
      }
    }
  })
}
