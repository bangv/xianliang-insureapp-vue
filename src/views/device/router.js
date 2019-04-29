export default [
  {
    path: '/device',
    component: () => import('./Index'),
    children: [
      {
        path: 'device-my',
        name: 'DeviceMy',
        component: () => import('./DeviceMy'),
        meta: {
          title: '我的设备',
          requiresAuth: true
        }
      },
      {
        path: 'active',
        name: 'DeviceActive',
        component: () => import('./active/DeviceActive'),
        children: [
          {
            path: 'bind',
            name: 'BindDevice',
            component: () => import('./active/components/BindDevice'),
            meta: {
              title: '设备激活',
              requiresAuth: true   // 避免微信直接扫描拿不到被拦截器拦截拿不到设备号
            }
          },
          {
            path: 'connect',
            name: 'ConnectDevice',
            component: () => import('./active/components/ConnectDevice'),
            meta: {
              title: '设备激活',
              requiresAuth: true
            }
          },
          {
            path: 'step3',
            name: 'Step3',
            component: () => import('./active/components/Step3'),
            meta: {
              title: '设备激活',
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'active/guide',
        name: 'ActiveGuide',
        component: () => import('./active/ActiveGuide'),
        meta: {
          title: '激活指引',
          requiresAuth: true
        }
      },
      {
        path: 'active/bind-result',
        name: 'BindResult',
        component: () => import('./active/BindResult'),
        meta: {
          title: '硬件激活',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/refund',
    name: 'Refund',
    component: () => import('./Refund'),
    meta: {
      title: '申请退款',
      requiresAuth: true
    }
  },
]
