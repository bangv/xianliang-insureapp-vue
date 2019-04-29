import { session } from '@/utils/browser'
import { chooseOwnerCar } from '@/api/device';
import { updateChannelUserId, checkChannelUserIdExists } from '@/api/auth'
import router from '@/router'
let state = {
  userInfo: {},
  userCarList: []
}
// 获取 state 数据
const getters = {
  userInfo: state => state.userInfo,
  userCarList: state => state.userCarList
}

const actions = {
  // 检测渠道号是否合法
  checkChannelUserIdExists({ commit, rootGetters }, channelUserId) {
    if (channelUserId) {
      const params = {
        channelUserId: channelUserId
      }
      checkChannelUserIdExists(params).then(res => {
        if (res.data.respcode == '00') {
          // 带工号设置默认渠道ID
          this.dispatch('updateChannelUserId', channelUserId)
          // commit('setBusinessParams', { channel_user_id: channelUserId }, { root: true })
        }else{
             commit('setBusinessParams', { channel_user_id: null }, { root: true })
        }
      })
    }
  },
  // 更新渠道用户id（channel_user_id）
  updateChannelUserId({ rootState }, channelUserId) {
    const userId = rootState.userId
    if (userId && channelUserId) {
      const params = {
        platUserId: userId,
        channel_user_id: channelUserId
      };
      updateChannelUserId(params);
    }
  },

  // 获取用户车里列表
  getUserCarList({ commit, rootState }) {
    return new Promise(resolve => {
      if (rootState.userId) {
        const params = {
          platUserId: rootState.userId
        }
        chooseOwnerCar(params).then(res => {
          if (res.data.respcode == '00') {
            commit('setUserCarList', res.data.cars)
            resolve(res.data.cars)
          }
        })
      }
    })
  }
}
// 接口返回数据后赋值给 state
const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setUserCarList(state, data) {
    state.userCarList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
