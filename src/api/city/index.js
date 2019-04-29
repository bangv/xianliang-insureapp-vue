import fetch from '../fetch'
// 获取城市列表
export function getCitys(params) {
  return fetch.post('/regionPlanService/w/queryRegionListBygroup', params)
}
