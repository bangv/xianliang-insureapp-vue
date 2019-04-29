import Vue from 'vue'
import companys from '@/assets/javascript/companys.min'
import { character } from '@/utils/character'

// 设备状态类型
const statusText = ['', '车辆点火', '车辆熄火', '车辆失联', '设备拔出', '换车']

const filters = {
  /**
   * @author AeYeung
   * @description 根据保司编码返回保司名称
   * @param {Number} code 保司编码
   * @return {String} 保司编码
   */
  companyName(code) {
    return code && companys.filter(item => item.code == code)[0].name
  },
  // 处理时间格式
  /**
   * @description 时间戳转日期格式
   * @param {Number} timeStamp 时间戳
   * @return {String} 日期字符串
   */
  date(timeStamp) {
    const d = new Date(timeStamp)
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
    let minutes =
      d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
    let seconds =
      d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
  },

  // 处理后台返回数据缺陷（时分秒后多个零）
  handleTimeStr(str) {
    return str && str.split('.', 1)[0]
  },

  // 处理文本格式（中间省略）
  handleStr(str, valueA, valueB) {
    if (str) {
      let s = typeof str === 'string' ? str : str[0]
      if (s && s.length > valueA + valueB) {
        let subStr1 = s.substr(0, valueA)
        let subStr2 = s.substr(s.length - valueB, valueB)
        let subStr = subStr1 + '***' + subStr2
        return subStr
      } else {
        return s
      }
    }
  },
  // 字符串加*号
  secret(value, start, end) {
    if (value) {
      let pattern = new RegExp(
        '^(\\w{' + start + '})(\\w*?)(\\w{' + end + '})$'
      )
      return value.replace(pattern, (str, s1, s2, s3) => {
        return s1 + new Array(s2.length + 1).join('*') + s3
      })
    }
  },

  /** device 模块 */
  /**
   * @author AeYeung
   * @description 根据事件类型编号转换为设备状态文字描述
   * @param {Number} statusNo 事件类型编号（1:点火事件 2:熄火事件 3:失联事件 4:设备拔出事件 5:换车事件）
   * @return {String} 状态描述
   */
  deviceStatusText(statusNo) {
    return statusText[statusNo]
  },

  // 车型字符串转换
  friendlyCarType(str) {
    if (str) {
      let strArr = str.split('/')
      if (strArr.length === 1) {
        return strArr
      } else {
        let year = strArr[5] ? strArr[5].substring(-1, 4) + '款' : ''
        let seat = strArr[3] ? strArr[3] + '座' : ''
        return `${year} ${strArr[0]}${strArr[1]} ${seat}`
      }
    }
  },
  // 小写字母转大写字母
  toUpperCase(str) {
    return str.toUpperCase()
  },
  // 转换特殊分数
  uselessScore(score) {
    return score < -1000 ? '-' : score
  },
  // 精确到指定位数的小数
  numRound(val) {
    let num = Math.round(val * 100) / 100;
    return num;
  },
  /**
   *
   * @param {Number|String} arg1 运算数字
   * @param {Number|String} arg2 运算数字
   * @param {String}} symbol 运算符
   */
  operation(arg1, arg2, symbol) {
    return character.operation(arg1, arg2, symbol)
  },
  replaceAll(str, search, replacement) {
    return character.replaceAll(str, search, replacement)
  },
  // 处理保险时间加一年
  handleDeadline(str) {
    if (str) {
      let d1 = new Date(str);
      let d2 = new Date(d1);
      d2.setFullYear(d2.getFullYear() + 1);
      d2.setDate(d2.getDate() - 1);
      const deadline = `${d2.getFullYear()}-${(d2.getMonth() + 1) > 9 ? (d2.getMonth() + 1) : '0' + (d2.getMonth() + 1)}-${d2.getDate() > 9 ? d2.getDate() : '0' + d2.getDate()}`
      return deadline;
    }
  },
}

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})