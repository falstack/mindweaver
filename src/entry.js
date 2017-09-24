import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
