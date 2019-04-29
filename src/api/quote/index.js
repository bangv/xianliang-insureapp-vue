import fetch from '../fetch'
// 获取用户信息
export function getCarInfo(params) {
  return fetch.post('/wxInsureQuotationService/load', params)
}
// 上传图片
export function uploadPhoto(params) {
  return fetch.post('/wxChatService/uploadPhotos', params)
}
// 获取图片
export function getPhotos(params) {
  return fetch.post('/wxChatService/getPhotosByPlatUserId', params)
}
// 通过品牌获取车型信息(一)
export function getCarTypeInfoByCarBrand(params) {
  return fetch.post('/wxInsureQuotationService/getUniteVehicleInfo', params)
}
// 通过品牌获取车型信息(二)
export function getVehicleInfoByCarVin(params){
  return fetch.post('/wxInsureQuotationService/getVehicleInfoByCarVin', params)
}

// 保司
export function getInsureCompany(params) {
  return fetch.post('/partnerSalesService/w/getAppointSource', params)
}
// 保司详情
export function getInsuranceCompanyDetail(params) {
  return fetch.post('/wxInsureQuotationService/findInsureDetailById', params)
}
/********车辆报价********/
// 获取一般 报价信息
export function getQuoteInfo(params) {
  return fetch.post('/wxInsureQuotationService/quote', params)
}

// 自选险种，获取报价信息
// getCustomQuoteInfo(params) {
//   return fetch.post('/wxInsureQuotationService/asynQueryQuote', params)
// },
export function getCustomQuoteInfo(params) {
  return fetch.post('/wxInsureQuotation2Service/asynQueryQuote', params)
}
// 自动获取系统自选报价信息
export function getAutoSelectQuote(params) {
  return fetch.post('/wxInsureQuotation2Service/autoSelectQuote', params)
}
/********订单模块********/
// 创建订单
export function postOrderCreate(params) {
  return fetch.post('/wxInsureQuotation2Service/createOrder', params)
}
// 确认订单
export function postOrderConfirm(params) {
  return fetch.post('/wxChatService/signWxContract', params)
}
// 更新收货地址
export function queryOrUpdateReceiverAddress(params) {
  return fetch.post('/platformUserService/w/queryOrUpdateReceiverAddress', params)
}
// 电销人员确认订单
export function postSalesmanConfirmOrder(params) {
  return fetch.post('/insureQuotationInfoLogService/w/doConfirmInfoLog', params)
}
// 稀释 二维码密度，更清晰
export function getShortUrl(params) {
  return fetch.post('/wxChatService/shortUrl', params)
}
// 输入车牌号获取最新报价单信息
export function getQuotationSheet(params) {
  return fetch.post('/insureQuotationInfoService/w/queryLatestQuotation', params)
}
// 河南大地信息确认
export function verifyBankCard(params) {
  return fetch.post('/partnerSalesService/w/verifyBankCard', params)
}
