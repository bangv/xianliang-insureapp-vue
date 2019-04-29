import fetch from '../fetch'
// 获取验证码
export function getSMSCode(params) {
  return fetch.post('/wxInsureQuotationService/getCheckCode', params)
}
// 验证验证码
export function validateSMSCode(params) {
  return fetch.post('/wxInsureQuotationService/checkPhoneCode', params)
}
// 获取微信登录
export function getWeChatLoginAuth(params) {
  return fetch.post('/wxChatService/getWebAccessAndCodeUrl', params)
}
// 获取 openid
export function getWeChatUserOpenId(params) {
  return fetch.post('/wxChatService/getWebUserOpenId', params)
}
// 检测微信登录用户是否已绑定手机号
export function queryOrBindWxUserPhone(params) {
  return fetch.post('/platformUserService/w/queryOrBindWxUserPhone', params)
}
// 获取微信 ticket
export function getWeChatTicket(params) {
  return fetch.post('/wxChatService/getJsApiTicket', params)
}
// 获取微信 AccessToken
export function getWeChatAccessToken() {
  return fetch.post('/wxChatService/getAccessToken')
}
// 平台用户插入
export function insertPlatUserForm(params) {
  return fetch.post('/platformUserService/w/insertPlatUserForm', params)
}
// 解绑微信
export function unbindThirdPartySocialAccounts(params) {
  return fetch.post('/platformUserService/w/platformUserUnbind', params)
}
// 工号解密
export function jobNoDecode(params) {
  return fetch.post('/platformUserService/w/jobNoDecode', params)
}
// 查询职工是否存在
export function queryJobNoExist(params) {
  return fetch.post('/platformUserService/w/queryJobNoExist', params)
}
// 绑定职工(只在微信调用)
export function jobNoBind(params) {
  return fetch.post('/platformUserService/w/jobNoBind', params)
}
// 检查渠道号是否存在
export function checkChannelUserIdExists(params){
  return fetch.post('/userService/w/checkChannelUserIdExists', params)
}


// 更新渠道用户id（channel_user_id）
export function updateChannelUserId(params) {
  return fetch.post('/platformUserService/w/updateChannelUserId', params)
}

// 查询职员是否已有服务中的订单
export function checkJobNoExistOrders(params) {
  return fetch.post('/wxInsureQuotation2Service/checkJobNoExistOrders', params)
}

/* B 端 */

// 判断电销人员手机号是否存在
export function getSalesPhone(params) {
  return fetch.post('/partnerSalesService/w/getPartnerSalesByPhone', params)
}
// 手机号解密（保代）
export function ccicCellphoneDecode(params){
  return fetch.post('/partnerSalesService/w/ccicCellphoneDecode', params)
}

// 手机号解密
export function decodeCellphone(params){
  return fetch.post('/partnerSalesService/w/decodeCellphone', params)
}
