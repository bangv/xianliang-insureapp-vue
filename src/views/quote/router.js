export default [
  {
    path: '/quote',
    component: () => import('./Index'),
    children: [
      {
        path: 'proposal',
        name: 'Proposal',
        component: () => import('./proposal/Proposal'),
        meta: {
          title: '服务办理',
          requiresAuth: true
        }
      },
      {
        path: 'custom-insure',
        name: 'custom-insure',
        component: () => import('./CustomInsure'),
        meta: {
          title: '自选险种',
          requiresAuth: true
        }
      },
      {
        path: 'sign-result',
        name: 'SignResult',
        component: () => import('./confirm/SignResult'),
        meta: {
          title: '签约结果',
          requiresAuth: true
        }
      },

      {
        path: 'address',
        name: 'Address',
        component: () => import('./confirm/Address'),
        meta: {
          title: '新增地址',
          // requiresAuth: true
        }
      },
      {
        path: 'confirm',
        name: 'OrderConfirm',
        component: () => import('./confirm/OrderConfirm'),
        meta: {
          title: '确认订单',
          requiresAuth: true
        }
      },
      {
        path: 'submit',
        name: 'ConfirmSubmit',
        component: () => import('./confirm/business/QuotationConfirm'),
        meta: {
          title: '确认报价',
          requiresAuth: true
        }
      },
      {
        path: 'submit-status',
        name: 'ConfirmSubmitStatus',
        component: () => import('./confirm/business/QuotationStatus'),
        meta: {
          title: '确认报价',
          requiresAuth: true
        }
      },
    ]
  }
]
