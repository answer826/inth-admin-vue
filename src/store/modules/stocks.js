import api from '@/api'
import utils from '@/utils'

const state = {}

const mutations = {}

const actions = {
  // 显示库存列表
  getStocks({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.get(`/stocks`, params).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 添加库存物品
  addStocks({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/stocks`, params).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除库存物品
  delStocks({ commit }, id) {
    return new Promise((resolve, reject) => {
      return api.delete(`/stocks/${id}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 获取库存物品
  getStock({ commit }, id) {
    return new Promise((resolve, reject) => {
      return api.get(`/stocks/${id}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  editStocks({ commit }, params) {
    return new Promise((resolve, reject) => {
      const stockId = params.stockId
      delete params.stockId
      return api.patch(`/stocks/${stockId}` + utils.base.obj2ParamsStr(params)).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除库存物品
  stockIn({ commit }, params) {
    return new Promise((resolve, reject) => {
      const stockId = params.stockId
      delete params.stockId
      return api.post(`/stocks/${stockId}/stockin`, params).then(res => {
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
