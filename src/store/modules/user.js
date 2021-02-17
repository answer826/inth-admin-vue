import { resetRouter } from '@/router'
import api from '@/api'
import utils from '@/utils'

const getDefaultState = () => {
  return {
    userInfo: sessionStorage.getItem('UserInfo') ? JSON.parse(sessionStorage.getItem('UserInfo')) : null,
    tokenInfo: utils.user.getToken()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    state.userInfo = null
    state.tokenInfo = null
    localStorage.removeItem('token')
    localStorage.removeItem('UserInfo')
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userInfo) => {
    sessionStorage.setItem('UserInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  },
  SET_TOKEN: (state, token) => {
    if (token) {
      const tokenInfo = {
        token: token,
        date: new Date().getTime()
      }
      utils.user.setToken(tokenInfo)
      state.tokenInfo = tokenInfo
    }
  }
}

const actions = {
  // 登录接口
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/login`, params, { 'Content-Type': 'multipart/form-data' }, false).then(res => {
        commit('SET_USERINFO', res.data)
        commit('SET_TOKEN', res.data.token)
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 退出接口
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      return api.post(`/logout`, {}, { 'Content-Type': 'multipart/form-data' }).then(res => {
        resetRouter()
        commit('RESET_STATE')
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },

  // 获取用户信息
  getadmin({ commit }) {
    return new Promise((resolve, reject) => {
      return api.post(`/getadmin`, {}, { 'Content-Type': 'multipart/form-data' }).then(res => {
        console.log(res)
        resolve(res)
      }, res => {
        console.log(res)
        reject(res)
      })
    })
  },

  // 刷新token
  refreshToken({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.put(`/refreshtoken`, params, {}, true, true).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

