export default [

  {
    path: '/login', // 路径已定不改更改
    name: 'Transfer',
    component: () => import('./Transfer'),
    meta: {
      title: '登录',
      requiresAuth: true
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('./Login'),
    meta: {
      title: '登录',
      requiresAuth: true

    }
  },
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: () => import('./business/SignIn'),
    meta: {
      title: '登录',
      requiresAuth: true

    }
  },
  {
    path: '/auth/wechat',
    name: 'WeChat',
    component: () => import('./WeChat'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/auth/bind',
    name: 'Bind',
    component: () => import('./Bind'),
    meta: {
      title: '绑定',
      requiresAuth: true
    }
  },
]
