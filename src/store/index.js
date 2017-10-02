import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      index: {
        state: {
          range: null
        },
        mutations: {
          set_range (state, data) {
            state.range = data
          },
          now_range (state, data) {
            state.range.now += data
          }
        },
        actions: {},
        getters: {}
      }
    }
  })
}
