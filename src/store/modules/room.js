import api from '@/api'
import utils from '@/utils'
// 房间相关api

const state = {}

const mutations = {}

const actions = {
  // 获取房间列表
  getRoomList({ commit }, campId) {
    return new Promise((resolve, reject) => {
      return api.get(`/${campId}/room`, {}).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 获取房间列表
  getRoom({ commit }, roomId) {
    return new Promise((resolve, reject) => {
      return api.get(`/room/${roomId}`, {}).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 增加房间
  addRoom({ commit }, params) {
    return new Promise((resolve, reject) => {
      const campId = params.campId
      delete params.campId
      return api.post(`/${campId}/room` + utils.base.obj2ParamsStr(params), {}).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 上传营地轮播图
  uploadRoomImgs({ commit }, params) {
    const roomId = params.roomId
    delete params.roomId
    return new Promise((resolve, reject) => {
      return api.post(`/room/${roomId}/roomimgs`, utils.base.obj2FormData(params), { 'Content-Type': 'multipart/form-data' }).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除房间
  deleteRoom({ commit }, id) {
    return new Promise((resolve, reject) => {
      return api.delete(`/room/${id}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 编辑房间
  updateRoom({ commit }, params) {
    return new Promise((resolve, reject) => {
      const roomId = params.roomId
      delete params.roomId
      return api.patch(`/room/${roomId}` + utils.base.obj2ParamsStr(params), {}).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除营地轮播图
  deleteRoomImgs({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.delete(`/room/${params.roomId}/${params.imgId}`, utils.base.obj2FormData(params), { 'Content-Type': 'multipart/form-data' }).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 获取房间价格列表
  getRoomPrice({ commit }, params) {
    return new Promise((resolve, reject) => {
      const roomId = params.roomId
      delete params.roomId
      return api.get(`/room/${roomId}/price`, params).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 设置单日房间价格
  setRoomPrice({ commit }, params) {
    return new Promise((resolve, reject) => {
      const roomId = params.roomId
      delete params.roomId
      return api.patch(`/room/${roomId}/price` + utils.base.obj2ParamsStr(params), {}).then(res => {
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
