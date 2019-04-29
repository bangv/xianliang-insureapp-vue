/**
 * @description 操作时间
 */
export const date = {
    /**
     * @description 获取指定天数前后的日期
     * @param {Number} day
     * @return {String} 日期格式
     */
    getSpecifiedDate(day) {
        const date = new Date()
        date.setDate(date.getDate() + day)
        const y = date.getFullYear()
        const m = ('0' + (date.getMonth() + 1)).slice(-2) //获取当前月份的日期
        const d = ('0' + date.getDate()).slice(-2)
        return y + '-' + m + '-' + d
    },
    /**
     * @description 获取指定日期的时间戳
     * @param {String} date 日期格式：2018-07-16
     * @return 返回指定日期的时间戳，默认返回当前时间的时间戳
     */
    getTimestamp(date) {
        return (
            Math.round(date ? new Date(date).getTime() : new Date().getTime()) / 1000
        )
    },
    /**
     * @description 转换为完整月份（ 8 => 08）
     * @param {Number|String} month
     */
    convertToFullMonth(month) {
        return month > 9 ? month : '0' + month
    },
    /**
     * @description 截取完整日期的年月日部分
     */
    getHalfDate(fullDateStr) {
        return fullDateStr ? fullDateStr.split(' ')[0] : ''
    },
    // 处理时间格式
    /**
     * @description 时间戳转日期格式
     * @param {Number} timeStamp 时间戳
     * @return {String} 日期字符串
     */
    changeDate(timeStamp) {
      const d = new Date(timeStamp)
      let year = d.getFullYear()
      let month = (d.getMonth() + 1 ) < 10 ? '0' + (d.getMonth() + 1 ) : '' + (d.getMonth() + 1 )
      let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours()
      let minutes =
        d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes()
      let seconds =
        d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds()
      return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    },
}
