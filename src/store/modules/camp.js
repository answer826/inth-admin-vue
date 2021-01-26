import api from '@/api'
import { obj2FormData } from '@/utils'
// 营地相关api

const state = {}

const mutations = {}

const actions = {
  // 获取营地列表
  getCamps({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.get(`/camps`, params, {}).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 上传营地封面
  uploadThumbnail({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/camp/uploadthumbnail`, params, { 'Content-Type': 'multipart/form-data' }).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 添加营地
  addCamp({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.post(`/camp`, params, { 'Content-Type': 'multipart/form-data' }).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 上传营地轮播图
  uploadCampImgs({ commit }, params) {
    const campId = params.campId
    delete params.campId
    return new Promise((resolve, reject) => {
      return api.post(`/campimg/${campId}/uploadcampimgs`, obj2FormData(params), { 'Content-Type': 'multipart/form-data' }).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 上传营地视频
  uploadCampVod({ commit }, params) {
    const campId = params.campId
    delete params.campId
    return new Promise((resolve, reject) => {
      return api.post(`/campvod/${campId}/uploadcampvod`, obj2FormData(params), { 'Content-Type': 'multipart/form-data' }).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除营地
  deleteCamp({ commit }, id) {
    return new Promise((resolve, reject) => {
      return api.delete(`/camp/${id}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除营地图片
  deleteCampImgs({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.delete(`/campimg/${params.campId}/${params.imgId}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 删除营地视频
  deleteCampVods({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.delete(`/campvod/${params.campId}/${params.vodId}`).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 获取营地信息
  getCamp({ commit }, id) {
    return new Promise((resolve, reject) => {
      return api.get(`/camp/${id}`, {}, {}).then(res => {
        resolve(res)
      }, res => {
        reject(res)
      })
    })
  },
  // 更新营地
  updateCamp({ commit }, params) {
    return new Promise((resolve, reject) => {
      return api.patch(`/camp/${params.campId}`, params.params, {}, {}).then(res => {
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
