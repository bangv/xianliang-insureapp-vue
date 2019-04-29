export default [
  {
    path: '/car',
    component: () => import('./Index'),
    children: [
      {
        path: 'list',
        name: 'CarList',
        component: () => import('./CarList'),
        meta: {
          title: '我的车辆',
          requiresAuth: true
        }
      },
      {
        path: 'test',
        name: 'CarTest',
        component: () => import('./test/CarTest'),
        meta: {
          title: '车况检测',
          requiresAuth: true
        }
      },
      {
        path: 'test/result',
        name: 'TestResult',
        component: () => import('./test/TestResult'),
        meta: {
          title: '车况检测',
          requiresAuth: true
        }
      },
      {
        path: 'track',
        name: 'TrackList',
        component: () => import('./track/TrackList'),
        meta: {
          title: '行车轨迹',
          requiresAuth: true
        }
      },
      {
        path: 'track/:trackId',
        name: 'TrackDetail',
        component: () => import('./track/TrackDetail'),
        meta: {
          title: '查看轨迹',
          requiresAuth: true
        }
      },
      {
        path: 'location',
        name: 'CarLocation',
        component: () => import('./location/CarLocation'),
        meta: {
          title: '实时位置',
          requiresAuth: true
        }
      },
      {
        path: 'cost',
        name: 'CarCost',
        component: () => import('./cost/CarCost'),
        meta: {
          title: '费用明细',
          requiresAuth: true
        }
      }
    ]
  }
]
