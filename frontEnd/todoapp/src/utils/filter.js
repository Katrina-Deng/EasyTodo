/*
 * @Des:过滤器
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-08 22:14:05
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-09 17:02:26
 */
import moment from 'moment'
const DateFilter = function(val) {
  const filterFarmat = n => {
    return n < 10 ? `0${n}` : n
  }

  const time = new Date(val)

  // eslint-disable-next-line no-unused-vars
  const [day, month, year, hour, minutes, seconds] = [
    filterFarmat(time.getDate()),
    filterFarmat(time.getMonth() + 1),
    filterFarmat(time.getFullYear()),
    filterFarmat(time.getHours()),
    filterFarmat(time.getMinutes()),
    filterFarmat(time.getSeconds())
  ]
  return `${year}年${month}月${day}日${hour}时${minutes}分${seconds}秒`
}

moment.updateLocale('zh-cn', {
  meridiem: function(hour, minute, isLowercase) {
    if (hour < 9) {
      return '早上'
    } else if (hour < 11 && minute < 30) {
      return '上午'
    } else if (hour < 13 && minute < 30) {
      return '中午'
    } else if (hour < 18) {
      return '下午'
    } else {
      return '晚上'
    }
  }
})
const momentFilter = function(val) {
  return moment().format('LLL')
}
export { DateFilter, momentFilter }
