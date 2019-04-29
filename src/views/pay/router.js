export default [
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('./Pay'),
    meta: {
      title: '支付',
      requiresAuth: true
    }
  },
  {
    path: '/pay/result',
    name: 'PayResult',
    component: () => import('./PayResult'),
    meta: {
      title: '支付状态',
      requiresAuth: true
    }
  }
]
