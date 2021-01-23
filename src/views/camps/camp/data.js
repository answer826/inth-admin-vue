export default {
  getData() {
    return {
      thumbnail: null, // 需要上传的封面对象
      campInfo: {
        name: null,
        address: null,
        description: null,
        city: null,
        state: null,
        latitude: null,
        longitude: null,
        thumbUrl: null
      },
      campImgs: []
    }
  }
}
