export default [

  {
    path: '/info',
    component: () => import('./Index'),
    children: [
      {
        path: '/',
        name: 'Info',
        component: () => import('./Info'),
        meta: {
          title: '完善信息',
          requiresAuth: true
        }
      },
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('./Guide'),
        meta: {
          title: '完善信息指引',
          requiresAuth: true
        }
      },
      {
        path: 'upload',
        component: () => import('./upload/Index'),
        children: [
          {
            path: 'single',
            name: 'UploadSingle',
            component: () => import('./upload/Single'),
            meta: {
              title: '拍照/上传',
              requiresAuth: true
            }
          },
          {
            path: 'multiple',
            name: 'UploadMultiple',
            component: () => import('./upload/Multiple'),
            meta: {
              title: '上传资料',
              requiresAuth: true
            }
          },
          {
            path: 'rule',
            name: 'UploadRule',
            component: () => import('./upload/UploadRule'),
            meta: {
              title: '上传规则',
              requiresAuth: true
            }
          },
          {
            path: 'state',
            name: 'UploadState',
            component: () => import('./upload/UploadState'),
            meta: {
              title: '提交结果',
              requiresAuth: true
            }
          }
        ]
      },
    ]
  }
]
