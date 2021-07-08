/*
 * @Des:过滤器
 * @Version:
 * @Author: Ellen
 * @Date: 2021-07-08 22:14:05
 * @LastEditors: Ellen
 * @LastEditTime: 2021-07-08 23:01:11
 */

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
export { DateFilter }
