import axios from 'axios'
import { getConfig } from './config'
const methods = ['get', 'put', 'post']
class Api {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, data = {}, headers = {}) => new Promise((resolve, reject) => {
        const { API_URL } = getConfig(path)
        const url = API_URL + path
        const options = {
          method: method,
          url: url,
          withCredentials: true,
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
        }).catch((error) => {
          reject(error)
        })
      })
    })
  }
}
export default new Api()
