export default [
    {
        path: '/about',
        component: () => import('./Index'),
        children: [
            {
                path: 'faq',
                name: 'Faq',
                component: () => import('./Faq'),
                meta: {
                    title: '常见问题'
                }
            },
            {
                path: 'device',
                name: 'Device',
                component: () => import('./Device'),
                meta: {
                    title: '因数盒子'
                }
            },
            {
                path: 'product',
                name: 'Product',
                component: () => import('./Product'),
                meta: {
                    title: '产品介绍'
                }
            },
            {
              path: 'follow',
              name: 'Follow',
              component: () => import('./Follow'),
              meta: {
                title: '天天车保公众号',
              }
            },
            {
                path: 'protocol',
                name: 'Protocol',
                component: () => import('./Protocol'),
                meta: {
                    title: '天天车保用户服务协议'
                }
            }
        ]
    }
]
