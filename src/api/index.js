import { Loading } from 'element-ui'

import axios from 'axios'
import store from '../store'
import { getConfig } from './config'
import utils from '@/utils'
const methods = ['get', 'put', 'post', 'delete', 'patch']
//  是否正在刷新的标志
let isRefreshing = false
//  存储请求的数组
let requestList = []
class Api {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, data = {}, headers = {}, hasToken = true, isRefreshToken = false) => new Promise((resolve, reject) => {
        const { API_URL } = getConfig(path)
        const url = API_URL + path
        const options = {
          method: method,
          url: url,
          withCredentials: true,
          timeout: 60 * 60 * 1000,
          headers: {
            'Content-Type': method === 'get' ? 'multipart/form-data' : 'application/json',
            ...headers
          }
        }
        options['hasToken'] = hasToken
        options['isRefreshToken'] = isRefreshToken
        method === 'get' ? options.params = data : options.data = data

        axios(options).then(res => {
          console.log(res.status)
          if (res.status === 200) {
            const code = res.data.code
            if (code === 0) {
              resolve(res.data)
            } else {
              const lading = Loading.service({
                lock: true
              })
              lading.close()
              reject(res.data)
            }
          }
          if (res.status === 201) {
            resolve(res.data) //  添加成功
          }
          if (res.status === 204) {
            resolve(res.data) //  delete成功
          }
        }).catch((error) => {
          reject(error)
        })
      })
    })

    //  响应拦截器
    axios.interceptors.response.use(
      response => {
        return response
      },
      async error => {
        if (error.response && error.response.status === 401) {
          requestList = []
          isRefreshing = false
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
        return error
      }
    )
    //  请求拦截器
    axios.interceptors.request.use(
      async config => {
        //  不需要token的情况
        if (!config['hasToken']) {
          delete config['hasToken']
          delete config['isRefreshToken']
          return config
        } else {
          delete config['hasToken']
          //  需要token的情况
          const tokenInfo = store.state['user'].tokenInfo
          if (tokenInfo) {
            if (utils['api'].isRefreshTokenExpired(tokenInfo.date) === 'DISTROTED') {
              //  token存在且超过最大天数
              await this.$store.dispatch('user/logout')
              this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            } else if (utils['api'].isRefreshTokenExpired(tokenInfo.date) === 'REFRESH' && !config['isRefreshToken']) {
              //  } else if (true && !config['isRefreshToken']) {
              //  token存在且需要刷新
              delete config['isRefreshToken']
              config.headers['Authorization'] = `Bearer ${tokenInfo.token}`
              return getToken(config)
            } else {
              //  如果存在token并且未过期
              delete config['isRefreshToken']
              config.headers['Authorization'] = `Bearer ${tokenInfo.token}`
              return config
            }
          } else {
            //  token不存在的情况
          }
        }
      },
      err => {
        return Promise.reject(err)
      }
    )

    // 刷新token
    async function getToken(config) {
      if (!isRefreshing) {
        isRefreshing = true
        const tokenRes = await getRefreshToken()
        // 用户不存在
        if (!tokenRes || tokenRes.code === 1005) {
          requestList = []
          // eslint-disable-next-line
          isRefreshing = false
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          // 取消请求
          return Promise.reject()
        } else {
          // 刷新token并请求
          store.commit('user/SET_TOKEN', tokenRes.data.token)
          requestList.forEach(cb => cb(tokenRes.data.token))
          requestList = []
          // eslint-disable-next-line
          isRefreshing = false
          config.headers['Authorization'] = `Bearer ${tokenRes.data.token}`
          return config
        }
      } else {
        return new Promise(resolve => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requestList.push(token => {
            config.headers['Authorization'] = `Bearer ${token}`
            resolve(config)
          })
        })
      }
    }
    // 刷新token
    async function getRefreshToken() {
      let tokenRes
      await store.dispatch('user/refreshToken').then(res => {
        tokenRes = res
      }).catch(() => {
        requestList = []
        isRefreshing = false
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
      return tokenRes
    }
  }
}
export default new Api()
