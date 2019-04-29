import { queryOrUpdateReceiverAddress } from '@/api/quote'
const state = {
  // 收件人信息
  receiver: {
    provinceText: '',
    cityText: '',
    areaText: '',
    detailAddress: '',
    Receiver_Name: '', // 收货人姓名
    Receiver_Phone: '', // 收货人联系方式
    Receiver_Address: '' // 收货人详细地址
  },
  checkState: false
}

const getters = {

  CHECK_STATE: (state) => state.checkState,
  RECEIVER: (state) => {
    const { provinceText, cityText, areaText, detailAddress } = state.receiver
    state.receiver.Receiver_Address = provinceText + cityText + areaText + detailAddress
    return state.receiver
  }
}

const actions = {
  // 获取收件人信息
  getReceiverInfo({ commit, rootState }) {
    const params = {
      platUserId: rootState.userId
    }
    queryOrUpdateReceiverAddress(params).then(res => {
      if (res.data.respcode == "00") {
        commit("SET_RECEIVER", res.data);
      }
    })
  }
}

const mutations = {

  // 设置收件人信息
  SET_RECEIVER(state, data) {
    const { province, city, area, detailAddress, receiver, receiverPhone } = data

    state.receiver.provinceText = province
    state.receiver.cityText = city
    state.receiver.areaText = area
    state.receiver.detailAddress = detailAddress
    state.receiver.Receiver_Name = receiver
    state.receiver.Receiver_Phone = receiverPhone
    state.receiver.Receiver_Address = province + city + area + detailAddress
  },
  // 修改用户同意协议 状态
  CHANGE_CHECK_STATE(state, data) {
    state.checkState = data
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
