export default [
  {
    path: '/activity',
    component: () => import('./Index'),
    children:[
      {
        path: 'telecom',
        name: 'Telecom',
        component: () => import('./Telecom'),
        meta: {
          title: '中国电信员工车专属福利'
        }
      }
    ]
  }]

  