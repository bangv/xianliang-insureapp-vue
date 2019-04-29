import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import VConsole from 'vconsole'

import App from './App'
import router from './router'
import store from './store'

import * as api from './api'
import Gate from './plugins/gate'
import validateConfig from './utils/validate.config'

import './filters'
import './components'
import './assets/style/styles.scss' /*引入公共样式*/

Vue.prototype.$http = api
Vue.prototype.$baseUrl = process.env.BASE_URL
Vue.prototype.$env = process.env.NODE_ENV

Vue.config.productionTip = false
Vue.use(Gate, validateConfig)

// 配置 sentry
if (process.env.NODE_ENV !== 'development') {
  Raven.config('https://2e65d58da1fb493d881e2a2912dbdc20@sentry.io/1375619', {
    environment: process.env.NODE_ENV,
    release: '2.x'
  }).addPlugin(RavenVue, Vue).install()

  Vue.config.errorHandler = (err) => {
    Raven.captureException(err)
  }
}

// 测试环境开启微信调试
if (process.env.NODE_ENV === 'test') {
  new VConsole()
}

new Vue({
  el: '#insure',
  router,
  store,
  render: h => h(App)
})
// http://gitbook.cn/books/5a24c793dfb8062cde9557ac/index.html


