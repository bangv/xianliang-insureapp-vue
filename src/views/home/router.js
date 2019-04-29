export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('./Home'),
    meta: {
      title: '服务办理',
      requiresAuth: true,
      showNav: true
    }
  }
]
