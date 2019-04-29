import fetch from '../fetch'
/**设备绑定相关api ---- device 模块  * */
// 获取当前用户拥有的车辆
export function chooseOwnerCar(params) {
  return fetch.post('/insureUserService/w/getMyQuoteCarByPlatUserId', params)
}

// 查询设备绑定信息与设备调试信息
export function debugDevice(params) {
  return fetch.post('/deviceService/w/queryBindDeviceInfo', params)
}

// 查询对应车辆设备绑定后的费用明细
export function queryDeductionDetail(params) {
  return fetch.post(
    '/paymentWithholdOrderService/w/getPaymentWithholdInfo',
    params
  )
}
// 检测设备是否已连接
export function checkDeviceState(params) {
  return fetch.post('/deviceEventService/w/queryInsurBoxInsert', params)
}
// 绑定设备
export function bindDevice(params) {
  return fetch.post('/deviceService/w/bindDevice', params)
}
// 检查盒子状态
export function checkBoxStatus(params){
  return fetch.post('/deviceEventService/w/checkBoxStatus', params)
}
// 微信退款申请
export function postRefund(params){
  return fetch.post('/paymentRefundOrderService/w/addPaymentRefundOrder2', params)
}
// 查询退款申请状态
export function getRefundStatus(params){
  return fetch.post('/insureDepositService/w/getDepositInfoByCarId', params)
}
