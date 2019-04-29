import qs from 'qs'
import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

const fetch = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});


fetch.interceptors.request.use(
  config => {
    if (!navigator.onLine) {
      Toast('网络连接失败，请重试')
    } else {
      // loading
      Indicator.open()
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      return config
    }
  },
  error => {
    Indicator.close()
    return Promise.reject(error)
  }
)

fetch.interceptors.response.use(
  response => {
    // loadend
    Indicator.close()
    return response
  },
  error => {
    Indicator.close()
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break

        case 401:
          error.message = '未授权，请登录'
          break

        case 403:
          error.message = '拒绝访问'
          break

        case 404:
          error.message = `请求地址出错`
          break

        case 408:
          error.message = '请求超时'
          break

        case 500:
          error.message = '抱歉，系统繁忙！'
          break

        case 501:
          error.message = '服务未实现'
          break

        case 502:
          error.message = '网关错误'
          break

        case 503:
          error.message = '服务不可用'
          break

        case 504:
          error.message = '网关超时'
          break

        case 505:
          error.message = 'HTTP版本不受支持'
          break

        default:
      }
      Toast(error.message)
    }
    return Promise.reject(error)
  }
)

export default fetch
