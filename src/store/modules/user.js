import { resetRouter } from '@/router'
import api from '@/api'

const getDefaultState = () => {
  return {
    userInfo: sessionStorage.getItem('UserInfo') ? JSON.parse(sessionStorage.getItem('UserInfo')) : null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userInfo) => {
    sessionStorage.setItem('UserInfo', JSON.stringify(userInfo))
    state.userInfo = userInfo
  }
}

const actions = {
  // 登录接口
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/login`, params, { 'Content-Type': 'multipart/form-data' }).then(res => {
        commit('SET_USERINFO', res.data)
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
        sessionStorage.removeItem('UserInfo')
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

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

