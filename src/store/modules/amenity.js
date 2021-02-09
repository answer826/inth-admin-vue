import api from '@/api'
import { obj2ParamsStr } from '@/utils'

const state = {}

const mutations = {}

const actions = {
  // 增加房间设施
  addAmenity({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/amenity` + obj2ParamsStr(params)).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除房间设施
  delAmenity({ commit }, id) {
    return new Promise((resolve, reject) => {
      return api.delete(`/amenity/${id}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 编辑房间设施
  updateAmenity({ commit }, params) {
    const id = params.id
    delete params.id
    return new Promise((resolve, reject) => {
      return api.patch(`/amenity/${id}` + obj2ParamsStr(params)).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 获取房间设施
  getAmenities({ commit }) {
    return new Promise((resolve, reject) => {
      return api.get(`/amenities`).then(res => {
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
