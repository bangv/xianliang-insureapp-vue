import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routerHandle from './handle'

Vue.use(Router)

const baseUrl = process.env.BASE_URL


const router = new Router({
  mode: 'history',
  base: baseUrl,
  fallback: true,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 }
  },
  routes: (r => {
    let routes = []
    r.keys().map(key => {
      let routers = r(key).default
      routers.filter(item => routes.push(item))
    })
    return routes
  })(require.context('../views/', true, /router\.js$/))
})

// 路由鉴权
const names = ['Transfer', 'Login', 'Bind', 'SignIn', 'WarnChannel']
router.beforeEach((to, from, next) => {
  const userId = store.getters.userId;
  const salesPhone = store.getters.salesPhone


  routerHandle.handleParams(to, next)   // 存储业务参数
  routerHandle.handleSalesPhone(to, next)
  routerHandle.handleJSSDK(to, next)
  routerHandle.handleTitle(to)
  routerHandle.handleAutoLogin(to, next)


  // 需要登录才可访问
  if (to.meta.requiresAuth) {
    // 未登录
    if (!userId && !salesPhone) {
      if (!names.includes(to.name)) {
        next({
          name: 'Transfer',
          replace: true
        })
      }
    } else {  // 已登录
      if (to.query.user == 'IRB') {
        // return next({
        //   name: 'Home',
        //   replace: true
        // })
        return window.location.href = window.location.origin + baseUrl
      }
      // C 端
      if (userId) {
        // B 端 已登录时进入 C 端登录页面则自动退出
        if (to.name == 'Transfer' && to.query.end === 'sales') {
          store.commit('logout')
          return next({
            path: '/login?end=sales',
            replace: true
          })
        }
        if (names.includes(to.name)) {
          next({
            name: 'mine',
            replace: true
          })
        }
      }
      // B 端
      if (salesPhone) {
        // B 端 已登录时进入 C 端登录页面则自动退出
        if ((to.name == 'Transfer' || to.name == 'mine') && to.query.end != 'sales') {
          store.commit('logout')
          next({
            path: '/login',
            replace: true
          })
        }
        if (names.includes(to.name)) {
          // next({
          //   name: 'Home',
          //   replace: true
          // })
          window.location.href = window.location.origin + baseUrl
        }
      }
    }
  }

  next()
  // // B 端所有链接添加标志避免复制出去的链接为 C 端
  // setTimeout(() => {
  //   if (salesPhone) {
  //     console.log(to.query)
  //     window.history.replaceState(null, null, `?${to.query}&end=sales`)
  //   }
  // }, 200)
})

export default router


