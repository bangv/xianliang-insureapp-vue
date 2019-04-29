import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import { storage, cookie, session, ua } from '@/utils/browser'

Vue.use(Vuex)

let state = {
  userId: cookie.getItem('INSURE_USER_ID'), // 平台用户 id
  userPhone: cookie.getItem('INSURE_USER_PHONE'),
  openId: storage.getItem('INSURE_OPEN_ID'),
  salesPhone: cookie.getItem('INSURE_SALES_PHONE'), // 电销业务员 手机号
  businessParams: session.getItem("INSURE_BUSINESS_PARAMS"),
  sdkUrl: session.getItem("INSURE_SDK_URL")
}
const getters = {
  userId: state => state.userId,
  userPhone: state => state.userPhone,
  openId: state => state.openId,
  salesPhone: state => state.salesPhone, // 是否为业务员
  businessParams: state => {
    return state.businessParams ? state.businessParams : {}
  },
  sdkUrl: state => state.sdkUrl
}

const mutations = {
  // C 端用户 id
  setUserId(state, data) {
    state.userId = data
    cookie.setItem('INSURE_USER_ID', data, 604800) // 过期时间 7天
  },
  // 退出登录
  logout(state) {
    state.userId = null;
    state.salesPhone = null;
    state.businessParams={};
    // storage.clear();
    session.clear();
    cookie.removeItem("INSURE_USER_ID");
    cookie.removeItem("INSURE_SALES_PHONE");
  },
  // C 端用户手机号
  setUserPhone(state, data) {
    state.userId = data
    cookie.setItem('INSURE_USER_PHONE', data, 604800) // 过期时间 7天
  },
  // 微信 openid
  setOpenId(state, data) {
    state.openId = data
    storage.setItem('INSURE_OPEN_ID', data)
  },
  // B 端业务 id
  setSalesPhone(state, data) {
    state.salesPhone = data
    cookie.setItem('INSURE_SALES_PHONE', data, 604800) // 过期时间 7天
  },
  // 业务参数
  setBusinessParams(state, data) {
    const businessParams = Object.assign({}, state.businessParams, data)
    state.businessParams = businessParams
    session.setItem('INSURE_BUSINESS_PARAMS', businessParams)
  },
  // 微信 JSSDK url
  setSdkUrl(state, data) {
    if (!state.sdkUrl) {
      state.sdkUrl = data
      session.setItem('INSURE_SDK_URL', data)
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: modules
})
