export default [
    {
        path: '/renewal',
        component: () => import('./Index'),
        children: [
            {
                path: '/',
                name: 'Renewal',
                component: () => import('./Renewal'),
                meta: {
                    title: '服务续期',
                    requiresAuth: true
                }
            },
            {
                path: 'quote-result',
                name: 'QuoteResult',
                component: () => import('./QuoteResult'),
                meta: {
                    title: '服务续期',
                    requiresAuth: true
                }
            },
            {
                path: 'renewal-result',
                name: 'RenewalResult',
                component: () => import('./RenewalResult'),
                meta: {
                    title: '续期结果',
                    requiresAuth: true
                }
            },
        ]

    }
]
