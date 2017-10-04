const Helpers = {}

Helpers.install = function (Vue, options) {
  Vue.prototype.$rate = 50

  Vue.prototype.$auto = false

  Vue.prototype.$duration = 1 // second

  Vue.prototype.$bus = new Vue()
}

export default Helpers
