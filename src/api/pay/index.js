import fetch from '../fetch'
// 支付盒子押金
export function postPayDeposit(params) {
  return fetch.post('/insureDepositService/w/payDepositByCarId', params)
}

// 查询押金支付情况
export function getPayDepositStatus(params) {
  return fetch.post('/insureDepositService/w/getDepositInfoByCarId', params)
}

//  签约
// 查询押金支付情况
export function h5Sign(params) {
  return fetch.post('/wxChatService/h5OrPublicSignWxContract', params)
}

// h5微信支付
export function h5WechatPay(params) {
  return fetch.post('/wxChatService/wxH5OrPublicPay', params)
}

// 微信退款申请
export function postApplyForRefund(params) {
  return fetch.post(
    '/paymentRefundOrderService/w/addPaymentRefundOrder2',
    params
  )
}

// 微信支付押金
export function payDepositByCarId2(params) {
  return fetch.post('/insureDepositService/w/payDepositByCarId2', params)
}
