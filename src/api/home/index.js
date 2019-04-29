import fetch from '../fetch'
// 检查是否在服务时间
export function checkServiceTime() {
  return fetch.post('/wxChatService/validateQuoteTime')
}
// // 检验车牌（是否为新车）
// checkLicensePlate(params) {
//   return fetch.post('/insureOrderService/w/queryInsureOrderByLinceNo', params)
// },
// 检验车牌（是否为新车）
export function checkLicensePlate(params) {
  return fetch.post('/wxInsureQuotation2Service/checkCarQuote', params)
}
// 通知后台调用续期 API
export function callRenewalAPI(params) {
  return fetch.post('/wxInsureQuotationService/callRenewalApi', params)
}

// 查询是否调用续期接口
export function checkRenewal(params) {
  return fetch.post('/wxInsureQuotationService/checkInsureMapQueen', params)
}
