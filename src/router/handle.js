
import { wechat } from "@/utils/wechat";
import { ua } from "@/utils/browser";
import { Toast } from 'mint-ui'
import { ccicCellphoneDecode, decodeCellphone } from '@/api'
import store from '@/store'
const baseUrl = process.env.BASE_URL
const businessParams = [
    'end', // 端类型
    // 'referer', // 来源
    'channel_user_id', // 渠道 id
    'deviceCode', // 设备号
    'salesPhone', // 业务员手机号
    // 'jqinfo_id', // B 端交强险报价成功id
    'appointId', // 预约 id
    'linceNo', // 车牌
    'refundDate', // 费用明细日期
    'jobNo', // 工号
    'channelComCode',
    'mobile',
    'serialNo', // 流水号（保代）
    'orderId', // 订单Id
    'modifiable', // 从公众号消息进入续保页面 不可修改条件
    'user', // 用户类型
    'inviterId',
    'to' // 去往
]

export default {
    // 处理业务参数
    handleParams(to, next) {
        const params = to.query
        Object.keys(params).map(item => {
            if (businessParams.includes(item)) {
                store.commit('setBusinessParams', params)
            }
        })

        const interceptId = ['3994']  // 屏蔽渠道id集合
        const channelUserId = params.channel_user_id
        const sessionChannelUserId = store.getters.businessParams.channel_user_id
        if (to.name != 'WarnChannel' && (interceptId.includes(channelUserId) || interceptId.includes(sessionChannelUserId))) {
            next({
                name: 'WarnChannel',
                replace: true
            })
        }
        // 检测渠道id是否合法
        store.dispatch('checkChannelUserIdExists', params.channel_user_id)
    },
    // 	大地业务员手机号解密
    handleSalesPhone(to, next) {
        const { mobile, channelComCode, channel_user_id, serialNo } = to.query
        if (mobile) {
            // 保代渠道
            if (channelComCode) {
                const params = {
                    cellphone: mobile,
                    channelComCode: channelComCode,
                    serialNo: serialNo
                };
                ccicCellphoneDecode(params).then(res => {
                    if (res.data.cellphone) {
                        store.commit("setSalesPhone", res.data.cellphone);
                        next({ name: "Home", replace: true });
                        // window.location.href= window.location.origin+env.ROOT
                    } else {
                        Toast("非正常手机号码 ");
                    }
                });
            }
            // 其他渠道
            if (channel_user_id) {
                const params = {
                    encSalesPhone: mobile,
                    channel_user_id: channel_user_id
                };
                decodeCellphone(params).then(res => {
                    if (res.data.cellphone) {
                        store.commit("setSalesPhone", res.data.cellphone);
                        next({ name: "Home", replace: true });
                        // window.location.href= window.location.origin+env.ROOT
                    } else {
                        Toast("非正常手机号码 ");
                    }
                })
            }
        }

    },
    // 配置微信 JSSDK
    handleJSSDK(to, next) {
        if (ua.isiOS && !window.sdkUrl) {
            window.sdkUrl = window.location.origin + baseUrl + to.fullPath.replace(/\//, '')
        }
        // 需要配置JSSDK的页面
        const routes = ['Home', 'Reservation', 'Pay', 'BindDevice']
        const routes2 = ['ReservationInvite', 'ReservationInviteGuide']
        if (routes.includes(to.name)) {
            let url
            if (ua.isiOS) {
                url = window.sdkUrl
            } else {
                url = window.location.href.split('#')[0]
            }
            wechat.configJsSdk(url)
        }
        if (ua.isiOS && routes2.includes(to.name)) {
            wechat.configJsSdk(window.sdkUrl)
        }
    },
    handleTitle(to) {
        if (to.meta.title) {
            let title
            if (to.query.type == 'insure') {
                title = '支付交强险'
            }
            if (to.query.type == 'device') {
                title = '支付押金'
            }
            document.title = title ? title : to.meta.title
        }
    },
    // 免登录
    handleAutoLogin(to, next) {
        if (to.query.user == 'IRB') {
            store.commit("setUserId", 'IRB');
            // next({ name: "Home", replace: true });
            window.location.href = window.location.origin + baseUrl
        }
    }
}
