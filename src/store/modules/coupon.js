import api from '@/api'

const state = {}

const mutations = {}

const actions = {
  // 添加优惠券
  addCoupon({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/couponcode`, params, { 'Content-Type': 'multipart/form-data' }).then(res => {
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

