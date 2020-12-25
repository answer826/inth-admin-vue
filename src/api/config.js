const devUrl = 'https://test.inthlife.com' // 开发环境
const prodUrl = 'https://test.inthlife.com' // 开发环境
// const prodUrl = 'https://api.inthlife.com' // 生产环境
const contextUrl = '/adminapi'

export const getConfig = () => {
  const BASE_URL = process.env.NODE_ENV === 'development' ? devUrl : prodUrl
  const API_URL = BASE_URL + contextUrl
  return { BASE_URL, API_URL }
}
