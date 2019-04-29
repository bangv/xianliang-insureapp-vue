export default [
  {
    path: '/order',
    component: () => import('./Index'),
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('./OrderList'),
        meta: {
          title: '订单列表',
          requiresAuth: true,
          showNav: true
        }
      },
      {
        path: ':id',
        name: 'OrderDetail',
        component: () => import('./OrderDetail'),
        meta: {
          title: '订单详情',
          requiresAuth: true
        }
      },
      /** B端订单* */
      {
        path: 'b',
        component: () => import('./business/Index'),
        children: [{
          path: 'list',
          name: 'BusinessOrderList',
          component: () => import('./business/OrderList'),
          meta: {
            title: '订单列表',
            requiresAuth: true,
            showNav: true
          }
        },
        {
          path: 'query',
          name: 'QueryOrder',
          component: () => import('./business/QueryOrder'),
          meta: {
            title: '输入车牌',
          }
        },
        {
          path: ':id',
          name: 'BusinessOrderDetail',
          component: () => import('./business/OrderDetail'),
          meta: {
            title: '订单详情',
            requiresAuth: true,
          }
        },
        ]
      }
    ]
  }
]
