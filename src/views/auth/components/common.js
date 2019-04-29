import { session, env } from '@/utils/browser'

// 路由重定向
export function routeRedirection(router) {
    const businessParams = session.getItem('INSURE_BUSINESS_PARAMS')
    console.log('businessParams',businessParams)
    if (!businessParams) {
        router.replace({
            name: "mine"
        });
    } else {
        const {
            end,
            // referer,
            deviceCode,
            salesPhone,
            refundDate,
            appointId,
            linceNo,
            modifiable,
            // jqinfo_id,
            to,
            inviterId
        } = businessParams;
        // 电销
        if (end === "sales") {
            return router.replace({
                name: "SignIn"
            });
        }
        // 直接扫码进入
        if (deviceCode) {
            return router.replace({
                name: "BindDevice",
                query: {
                    deviceCode: deviceCode
                }
            });
        }
        // 业务员报价后进入C 端确认订单页面

        if (salesPhone) {
            return router.replace({
                name: "OrderConfirm",
                query: {
                    salesPhone: salesPhone,
                    linceNo: linceNo,
                    // jqinfo_id: jqinfo_id
                }
            });
        }
        // 业务员报价后进入C 端确认订单页面
        if (appointId) {
            return router.replace({
                name: "Reservation",
                query: {
                    appointId: appointId,
                    linceNo: linceNo
                }
            });
        }
        // 公众号消息进入费用明细
        if (refundDate) {
            return router.replace({
                name: "CarCost",
                query: {
                    date: refundDate
                }
            });
        }
        // 公众号消息进入 续保服务 (业务员已报价)
        if (modifiable) {
            return router.replace({
                name: "Renewal",
                query: {
                    date: modifiable
                }
            });
        }

        // 预约邀请
        if (inviterId) {
            // return router.replace({
            //     name: "Reservation",
            //     query: {
            //         inviterId: inviterId
            //     }
            // });
            return window.location.href = window.location.origin + process.env.BASE_URL + 'reservation?inviterId=' + inviterId
        }
        if (to == 'reservationInvite') {
            // return router.replace({
            //     name: "ReservationInvite"
            // });
            return window.location.href = window.location.origin + process.env.BASE_URL + 'reservation/invite'
        }
        router.replace({
            name: "mine"
        });
    }
}
