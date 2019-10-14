const formatTime = (date, type) => {
  /**
   * type: 日期显示格式
   * 2: 仅显示 年-月-日
   */
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  switch (type) {
    case 2:
      return [year, month, day].map(formatNumber).join('-');
      break;
    default:
      return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时间转时间戳
const timestamp = date => {
  // 传入时间为'-' 或 '/'
  date = date.replace(/-/g, '/');
  return new Date(date).getTime()
}

module.exports = {
  formatTime: formatTime,
  timestamp: timestamp
}
