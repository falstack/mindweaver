import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      index: {
        state: {
          range: null,
          data: null
        },
        mutations: {
          set_range (state, data) {
            state.range = data
          },
          now_range (state, data) {
            state.range.now += data
          },
          set_data (state, data) {
            state.data = data
          }
        },
        actions: {},
        getters: {}
      }
    }
  })
}
