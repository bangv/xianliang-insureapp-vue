export default {}
import fetch from '../fetch'
// 取消订单
export function closeOrder(params) {
  return fetch.post('/insureOrderService/w/closeOrder', params)
}
// 检查订单签约状态
export function checkOrderSignStatus(params) {
  return fetch.post('/wxInsureQuotation2Service/checkOrderSignStatus', params)
}
// 查询物流信息
export function queryRouteService(params) {
  return fetch.post('/SFExpressService/w/queryRouteService', params)
}
// 保单查询
export function getPolicyInfo(params) {
  return fetch.post('/insureOrderService/w/qureyPolicyByOrderId', params)
}
// 通过车牌 获取业务员已报价好的订单
export function getQuotationSheet(params) {
  return fetch.post('/insureQuotationInfoService/w/queryLatestQuotation', params)
}

/**
 * @description 续期
 */
// 保险续签服务
export function renewalForService(params) {
  return fetch.post('/wxInsureQuotation2Service/renewalForService', params)
}
// 查询用户可以续期的车辆
export function getAllWillExpireCar(params) {
  return fetch.post('/carService/w/getAllWillExpireCar', params)
}
// 查询用户详细数据
export function getpaltformUserDetailInfo(params){
  return fetch.post('/platformUserService/w/getpaltformUserDetailInfo', params)
}
// B端 检查车辆是否可以续签服务 response： 00 可以续签， 01 不能续签， 02 新用户正常流程走
export function getCheckCarIsRenewal(params){
  return fetch.post('/partnerSalesService/w/checkCarIsRenewal', params)
}
/**
 * @description B端订单相关接口
 * */

// 获取 当前用户 已完成 & 待完成订单列表
export function getMyOrderList(params) {
  return fetch.post('/insureOrderService/w/getMyOrderList', params)
}
// 通过订单id查询订单详情
export function getOrderDetailByOrderId(params) {
  return fetch.post('/insureOrderService/w/getMyOrderList', params)
}
// 报价记录
export function getQuoteRecord(params) {
  return fetch.post(
    '/insureQuotationDetailLogService/w/quoteRecordByPhone',
    params
  )
}
// 报价记录，翻页
export function getNewQuoteRecord(params) {
  return fetch.post(
    '/insureQuotationInfoService/w/queryConfirmedList2',
    params
  )
}
// 稀释 二维码密度，更清晰
export function getShortUrl (params) {
  return fetch.post('/wxChatService/shortUrl', params)
}
// 业务员 预约列表
export function getReservationList(params) {
  return fetch.post('appointmentOrder/w/getAppointmentOrdersByAppintmentCode', params)
}
// 报价单列表查询 03：参数错误 02：无数据 00：成功
export function getQuotationList(params) {
  return fetch.post('/insureQuotationInfoService/w/queryConfirmedList', params)
}
// 订单列表及查询 00:成功 02:数据不存在 03:参数异常
export function getOrderList(params) {
  return fetch.post('/insureOrderService/w/queryOrderLists', params)
}

