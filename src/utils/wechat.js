/**
 * @description 微信
 */
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
// https://zhuanlan.zhihu.com/p/32227843

import wx from 'weixin-jsapi'
import { cookie, ua } from './browser'
import { date } from './date'
import { character } from './character'

export const wechat = {
    /**
     * @description 微信 JS-SDK 配置
     */
    configJsSdk(url) {
        const ticket = cookie.getItem('WECHAT_TICKET')
        if (ua.isWeChat && ticket) {
            // console.log(url)
            let timestamp = date.getTimestamp().toString()
            let nonceStr = character.random()
            let str = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
            let signature = character.sha(str).getHash('SHA-1', 'HEX')
            wx.config({
                debug: false,
                appId: process.env.VUE_APP_WECHAT_APP_ID,
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名
                jsApiList: ['getLocation', 'scanQRCode', 'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems']
            })
            // this.handleConfigError(url)
        }
    },
    ready() {
        return new Promise(resolve => {
            wx.ready(function () {
                resolve({ errMsg: 'ready:ok' })
            });
        })
    },
    /**
     * @description 检查 api 配置是否成功
     */
    checkJsApi(type) {
        return new Promise(resolve => {
            wx.checkJsApi({
                jsApiList: [type], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: res => {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    // console.log(res.checkResult, res.checkResult[type])
                    resolve(res.checkResult[type])
                }
            });
        })
    },
    handleConfigError(url) {
        wx.error((res) => {
            console.log('error' + res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            this.configJsSdk(url)
        });
    },
    // 获取坐标
    getLocation() {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log('微信定位成功；' + JSON.stringify(res));
                    resolve(res)
                },
                fail: function (error) {
                    console.log('微信定位失败；' + JSON.stringify(error));
                    reject(error)
                }
            });
        })
    },
    // 微信分享
    share(opts) {
        if (ua.isWeChat) {
            this.shareToFriend(opts)
            this.shareToFriendCircle(opts)
            // this.hideMenuItems()
        }
    },
    // 分享给好友
    shareToFriend(opts) {
        wx.onMenuShareAppMessage({
            title: opts.title,
            desc: opts.desc,
            link: opts.link,
            imgUrl: opts.imgUrl,
            trigger: function (res) {
                console.log('用户点击发送给朋友');
            },
            success: function (res) {
                console.log('分享成功');
            },
            cancel: function (res) {
                console.log('你没有分享');
            },
            fail: function (res) {
                console.log('分享失败' + JSON.stringify(res));
            }
        });
    },
    // 分享到朋友圈
    shareToFriendCircle(opts) {
        wx.onMenuShareTimeline({
            title: opts.title,
            link: opts.link,
            imgUrl: opts.imgUrl,
            success: function () {
                console.log('分享成功');
            },
            // 用户取消分享后执行的回调函数
            cancel: function () {
                console.log('取消分享');
            }
        });
    },  // 隐藏微信菜单选项
    hideMenuItems() {
        wx.hideMenuItems({
            menuList: ['menuItem:share:qq', 'menuItem:share:QZone', 'menuItem:share:weiboApp', 'menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录4
            success: function (res) {
                // console.log(res);
            }
        });
    },
}