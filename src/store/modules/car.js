import { session } from '@/utils/browser'

const state = {
  carInfo: session.getItem('INSURE_CAR_INFO'), // 车辆信息
  markInfo: session.getItem('INSURE_MARK_INFO'), // 车辆标志信息
  insuredInfo: session.getItem('INSURE_INSUREED_INFO'), // 险种信息

  licenseInfo: {
    license: '粤B',
  },
  carTypeList: [] // 车型列表

}
// 获取 state 数据
const getters = {
  licenseInfo: state => state.licenseInfo,
  CAR_INFO: state => state.carInfo,
  MARK_INFO: state => state.markInfo,
  INSURED_INFO: state => state.insuredInfo,
  carTypeList: state => state.carTypeList
}

// 请求接口
const actions = {
  /**
   * @description 获取车型列表
   */
  getCarTypeList(params) {
    this.$http.getCarTypeInfoByCarBrand(params).then(res => {
      const result = res.data.list;
      if (result && result.length > 0) {
        commit('')
      } else {
        this.$toast("未查询到车型 ");
      }
    });
  }
}
// 接口返回数据后赋值给 state
const mutations = {

  setLicense(state, data) {
    state.licenseInfo.license = data
  },

  // 设置车辆信息
  SET_CAR_INFO(state, data) {
    state.carInfo = data
    session.setItem('INSURE_CAR_INFO', data)
  },
  // 设置险种信息
  SET_INSURED_INFO(state, data) {
    state.insuredInfo = data
    session.setItem('INSURE_INSUREED_INFO', data)
  },
  // 设置车辆标志信息
  SET_MARK_INFO(state, data) {
    state.markInfo = data
    session.setItem('INSURE_MARK_INFO', data)
  },
  // 设置车型列表
  setCarTypeList(state, data) {
    state.carTypeList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

// https://segmentfault.com/a/1190000009434398
