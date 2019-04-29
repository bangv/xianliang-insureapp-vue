import fetch from '../fetch'
// 获取用户信息

export function getUserInfo(params) {
  return fetch.post('/platformUserService/w/getpaltformUserDetailInfo', params)
}
// 查询用户设置配置
export function getUserSettingConfig(params) {
  return fetch.post('/wxChatService/getUserConfig', params)
}
// 更新用户设置配置
export function updateUserSettingConfig(params) {
  return fetch.post('/wxChatService/updateUserConfig', params)
}
