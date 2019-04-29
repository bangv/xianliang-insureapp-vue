export default [
  {
    path: '/illega',
    name: 'IllegalUser',
    component: () => import('./IllegalUser')
  },
  {
    path: '/mini',
    name: 'Mini',
    component: () => import('./Mini')
  },
  {
    path: '/warn-channel',
    name: 'WarnChannel',
    meta: {
      title: ' ',
    },
    component: () => import('./WarnChannel')
  },
  {
    path: '*',
    component: () => import('./404')
  }
]
