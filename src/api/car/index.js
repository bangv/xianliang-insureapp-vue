import fetch from '../fetch'
// 获取车辆实时位置
export function getUserCarLocation(params) {
  return fetch.post('/carConditionService/myCarGPS', params)
}

// 车辆检测
export function detectionCar(params) {
  return fetch.post('/platformUserService/w/vehicleTest', params)
}

// 获取车辆轨迹列表
export function getCarTrackList(params) {
  return fetch.post('/wxChatService/getTravelByLinceNoAndDate', params)
}

// 车辆轨迹详情
export function queryTravel(params) {
  return fetch.post('/platformUserService/w/queryTravel', params)
}

// 获取最后一次体检时间
export function getLastTestTime(params) {
  return fetch.post('/platformUserService/w/getDeviceCode', params)
}

//通过测试ID 获取测试详情
export function getTestResultByTestId(params) {
  return fetch.post('/platformUserService/w/getTestId', params)
}

export function getUserCarState(params) {
  return fetch.post('/platformUserService/w/queryMyCar', params)
}
// 查询整月费用明细
export function getPaymentWithholdInfo(params) {
  return fetch.post('/paymentWithholdOrderService/w/getPaymentWithholdInfo', params)
}
// 查询单日费用明细
export function getPaymentWithholdDetailInfo(params) {
  return fetch.post('/paymentWithholdOrderService/w/getPaymentWithholdDetailInfo', params)
}
