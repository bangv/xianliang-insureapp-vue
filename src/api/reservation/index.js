import fetch from '../fetch'
// 添加预约单地址
export function postAppointmentAddress(params) {
  return fetch.post('/appointmentOrder/w/addAppointmentOrderAddress', params)
}
// 业务员 预约列表
export function getReservationList(params) {
  return fetch.post('appointmentOrder/w/getAppointmentOrdersByAppintmentCode', params)
}
// 用户提交 预约单
export function postCreateReservation(params) {
  return fetch.post('/appointmentOrder/w/createAppointmentOrder', params)
}
// 渠道 预约单（大地）
export function postCreateReserve(params) {
    return fetch.post('/appointmentOrder/w/createChannelAppointmentOrder', params)
}

// 预约服务 上传图片
export function businessUploadPhoto(params) {
  return fetch.post('/carService/w/uploadDrivingLicensePhotos', params)
}

// 获取被邀请人信息
export function getInvitedListByInviterId(params) {
  return fetch.post('/appointmentOrder/w/getInvitedListByInviterId', params)
}

// 获取被邀请人的奖励进度
export function getRewardProcess(params) {
  return fetch.post('/appointmentOrder/w/getRewardProcess', params)
}

// 确认邀请预约单
export function createInviterAppointmentOrder(params) {
  return fetch.post('/appointmentOrder/w/createInviterAppointmentOrder', params)
}

// 更新被邀请人支付宝信息
export function updateAliPayInfo(params){
  return fetch.post('/appointmentOrder/w/updateAliPayInfo', params)
}
