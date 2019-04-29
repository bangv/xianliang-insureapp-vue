export default [
  {
    path: '/profile',
    name: 'mine',
    component: () => import('./Profile'),
    meta: {
      title: '我的',
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/profile/setting',
    name: 'Setting',
    component: () => import('./Setting'),
    meta: {
      title: '设置',
      requiresAuth: true
    }
  },
  {
    path: '/profile/policy',
    name: 'Policy',
    component: () => import('./Policy'),
    meta: {
      title: '我的服务',
      requiresAuth: true
    }
  }
]
