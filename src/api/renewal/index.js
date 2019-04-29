import fetch from '../fetch'
// 续保消息推送
export function sendRenewalMsg(params) {
  return fetch.post('/partnerSalesService/w/sendRenewalMessage', params)
}
// 查看续保 报价单详情 ( 仅用于公众号进入续保页面)
export function getRenewalDetailInfo(params) {
  return fetch.post('/insureQuotationInfoLogService/w/getRenewalDetailInfo', params)
}
