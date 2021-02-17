const getToken = () => {
  return localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))
}
const setToken = (tokenInfo) => {
  localStorage.setItem('token', JSON.stringify(tokenInfo))
}
export default {
  getToken,
  setToken
}
