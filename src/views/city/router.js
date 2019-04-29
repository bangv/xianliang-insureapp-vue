export default [
  {
    path: '/city',
    name: 'city',
    component: () => import('./City'),
    meta: {
      title: '选择城市',
      requiresAuth: true
    }
  }
]
