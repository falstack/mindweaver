const Helpers = {}

Helpers.install = function (Vue, options) {
  Vue.prototype.$rate = 50

  Vue.prototype.$bus = new Vue()
}

export default Helpers
