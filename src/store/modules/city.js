import { getCitys } from '@/api/city';
import { session } from '@/utils/browser'
import { location } from '@/utils/location'
import { insure } from '@/utils/insure'
import BaiDuMap from '@/plugins/BMap'
import { ua } from '@/utils/browser';
import { wechat } from '@/utils/wechat';
let state = {
  city: {}, // 选中城市
  citys: [], // 城市列表
  locationCity: null, // 定位城市
  province: ''
}
// 获取 state 数据
const getters = {
  CITY: state => state.city,
  CITYS: state => state.citys,
  LOCATION_CITY: state => state.locationCity,
}

// 请求接口
const actions = {
  getCityList({ state, commit, rootGetters }) {
    return new Promise(resolve => {
      if (state.citys.length != 0) {
        return resolve(state.citys)
      }
      let params = {
        channel_user_id: rootGetters.businessParams.channel_user_id
      }
      getCitys(params).then(res => {
        if (res) {
          commit('setCityList', res.data.regionPlanList)
          resolve(res.data.regionPlanList)
        }
      })
    })

  },
  async  getLocation({ state, commit }) {
    if (state.city.regionCode) return  // 已经定位过直接返回

    const provinces = await this.dispatch('getCityList')
    if (provinces) {
      let cityName
      const BMap = await BaiDuMap.init()

      if (!ua.isWeChat) {
        cityName = await location.getCurrentCityPosition(BMap)
      } else {
        const isReady = await wechat.ready()
        const result = await wechat.getLocation()
        // 定位失败
        if (result.errMsg != 'getLocation:ok') {
          cityName = await location.getCurrentCityPosition(BMap)
        } else {  // 定位成功
          // 转换为百度坐标
          const ctResult = await location.coordinateTransformation(BMap, { lat: result.latitude, lng: result.longitude })
          const grResult = await location.geocodingReverse(BMap, ctResult)   // 根据坐标得到地址
          cityName = grResult.addressComponents.city
        }
      }

      insure.matchCity(provinces, cityName).then(city => {
        commit('setLicense', city.licensePrefix, { root: true })
        commit('SET_CITY', city)
        commit('SET_LOCATION_CITY', city)
        commit(
          'SET_MARK_INFO',
          {
            regionCode: city.regionCode,
            cityAbbr: city.licensePrefix
          },
          { root: true }
        )
      })
    }
  }
}
// 接口返回数据后赋值给 state
const mutations = {
  SET_CITY(state, data) {
    state.city = data
  },
  setCityList(state, data) {
    state.citys = data
  },
  SET_LOCATION_CITY(state, data) {
    state.locationCity = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
