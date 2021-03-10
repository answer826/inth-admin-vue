const getMonthDays = (year, month) => {
  const stratDate = new Date(year, month - 1, 1)
  const endData = new Date(year, month, 1)
  var days = (endData - stratDate) / (1000 * 60 * 60 * 24)
  return days
}
const dateFormat = (fmt, date) => {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}
const getCalculateDate = (date, day) => { // 获取指定前后天数的日期
  const dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return `${y}-${m}-${d}`
}

const getDaysBetween = (startDate, endDate) => { // 计算两个日期相差的天数
  startDate = Date.parse(startDate)
  endDate = Date.parse(endDate)
  return (endDate - startDate) / (24 * 60 * 60 * 1000)
}
export default {
  getMonthDays,
  dateFormat,
  getCalculateDate,
  getDaysBetween
}
