export default [
    // C 端
    {
        path: '/reservation',
        component: () => import('./Index'),
        children: [
            {
                path: '/',
                name: 'Reservation',
                component: () => import('./Reservation'),
                meta: {
                    title: '服务预约',
                    requiresAuth: true
                }
            },
            {
                path: 'result',
                name: 'ReservationResult',
                component: () => import('./ReservationResult'),
                meta: {
                    title: '提交成功',
                }
            },
            {
                path: 'embed',
                name: 'ReservationEmbed',
                component: () => import('./ReservationEmbed'),
                meta: {
                    title: '服务预约',
                }
            },
            {
                path: 'invite',
                name: 'ReservationInvite',
                component: () => import('./invite/Invite'),
                meta: {
                    title: '邀请有礼',
                    requiresAuth: true
                }
            },
            // B 端
            {
                path: 'b',
                component: () => import('./business/Index'),
                children: [
                    {
                        path: '/',
                        name: 'BusinessReservation',
                        component: () => import('./business/Reservation'),
                        meta: {
                            title: '服务预约'
                        }
                    },
                    {
                        path: 'result',
                        name: 'BusinessReservationResult',
                        component: () => import('./business/ReservationResult'),
                        meta: {
                            title: '预约结果',
                        }
                    },
                    {
                        path: 'address',
                        name: 'BusinessReservationAddress',
                        component: () => import('./business/ReservationAddress'),
                        meta: {
                            title: '服务预约',
                            requiresAuth: true
                        }
                    },
                ]

            }
        ],

    },

]
