import axios from 'axios'
// import { resetRouter } from '@/router'
// import store from '@/store'
import { getConfig } from './config'
const methods = ['get', 'put', 'post', 'delete', 'patch']
class Api { // 通用api请求方法
  constructor() {
    methods.forEach(method => {
      this[method] = (path, data = {}, headers = {}, contextUrl = null) => new Promise((resolve, reject) => {
        const { API_URL, BASE_URL } = getConfig(path)
        const url = (!contextUrl ? API_URL : BASE_URL + contextUrl) + path
        const options = {
          method: method,
          url: url,
          withCredentials: true,
          crossDomain: true,
          timeout: 30 * 24 * 60 * 60 * 1000,
          headers: Object.assign({
            'Content-Type': method === 'get' ? 'multipart/form-data' : 'application/json'
          }, headers)
        }
        method === 'get' ? options.params = data : options.data = data
        axios(options).then(res => {
          if (res.status === 200) {
            const code = res.data.code
            if (code === 0) {
              resolve(res.data)
            } else {
              reject(res.data)
            }
          }
          if (res.status === 204) {
            resolve(res.data) // delete成功
          }
        }).catch((error) => {
          reject(error)
        })
      })
    })

    // http响应拦截器
    // axios.interceptors.response.use(
    //   response => {
    //     console.log(response)
    //     return response
    //   }
    // error => {
    //   if (error.response) {
    //     switch (error.response.status) {
    //       case 401:
    //         sessionStorage.removeItem('UserInfo')
    //         // resetRouter()
    //         // store.commit('RESET_STATE')
    //     }
    //   }
    //   return Promise.reject(error.response.data) // 返回接口返回的错误信息
    // }
    // )
  }
}
export default new Api()
