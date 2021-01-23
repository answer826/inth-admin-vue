import api from '@/api'
import { obj2FormData } from '@/utils'
// 营地相关api

const state = {}

const mutations = {}

const actions = {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
