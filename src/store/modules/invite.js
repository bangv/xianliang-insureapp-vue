import { session } from '@/utils/browser'

const state = {
  // 邀请相关状态
  inviteInfo: session.getItem('INSURE_INVITE_INFO')? session.getItem('INSURE_INVITE_INFO'): {
    inviteStatus: true,
  },
}
// 获取 state 数据
const getters = {
  INVITE_INFO: state => state.inviteInfo,
}


// 接口返回数据后赋值给 state
const mutations = {


  // 邀请活动弹框显示状态
  SET_INVITE_STATUS(state, data) {
    state.inviteInfo = data
    session.setItem('INSURE_INVITE_INFO', data)
  },

}
export default {
  state,
  getters,
  mutations
}

