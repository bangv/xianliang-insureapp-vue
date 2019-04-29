import fetch from '../fetch'

// 电信员工车
export function insertOrUpdate(params) {
  return fetch.post('/ChinaTelecomEmploteeService/w/insertOrUpdate', params)
}