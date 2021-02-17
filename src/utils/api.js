const isRefreshTokenExpired = (time) => {
  // token刷新时间
  const TOKEN_REFRESH_TIME = 50
  // token最大时效
  const TOKEN_DISTROTED_DAY = 14

  const nTime = new Date().getTime()
  const stamp = nTime - time
  const minutes = Math.round((stamp / (1000 * 60)))
  const days = stamp / (1 * 24 * 60 * 60 * 1000)
  // token超过最大天数
  if (days >= TOKEN_DISTROTED_DAY) return 'DISTROTED'
  if (minutes >= TOKEN_REFRESH_TIME) return 'REFRESH'
  return true
}

export default {
  isRefreshTokenExpired
}
