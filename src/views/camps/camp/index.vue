<template>
  <div class="page-container step-page">
    <div class="head">
      <div class="tit">{{ campId > 0 ? '华美达营地' : '新增营地' }}</div>
    </div>
    <div class="step-tit">
      <div v-for="(step, index) in campEditStep" :key="index" :class="{active:currentStep===index}">{{ step.name }}</div>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="campEditStep[currentStep].component" :data="data" @dispatch="dispatch" />
    </transition>
  </div>
</template>
<script>
import CampInfo from './components/campInfo'
import CampImg from './components/campImg'
import SwiperImg from './components/swiperImg'
import SetAddr from './components/setAddr'
import data from './data'
// import qs from 'Qs'
export default {
  components: {
    CampInfo,
    CampImg,
    SwiperImg,
    SetAddr
  },
  data() {
    return {
      campEditStep: [ // 步骤列表
        {
          name: '基础信息',
          component: 'CampInfo'
        },
        {
          name: '位置信息',
          component: 'SetAddr'
        },
        {
          name: '封面图片',
          component: 'CampImg'
        },
        {
          name: '轮播图片',
          component: 'SwiperImg'
        }
      ],
      currentStep: 0, // 初始化步骤
      campId: this.$route.params.id, // 当前的营地ID，0为新增其他为编辑
      data: data.getData() // 公共组件变量
    }
  },
  mounted() {
    if (this.campId) {
      this.$store.dispatch('camp/getCamp', this.campId).then(res => {
        this.data.campInfo = res.data
        this.data.campImgs = res.data.campsimgs.map(item => {
          return {
            ...item,
            viewUrl: this.downUrl + item.url
          }
        })
        if (res.data.campsvods.length) {
          this.data.campVod = res.data.campsvods.map(item => {
            return {
              ...item,
              viewUrl: this.downUrl + item.url
            }
          })[0]
        }
        // 删除不需要的属性
        delete this.data.campInfo.campsimgs
        delete this.data.campInfo.campsvods
        delete this.data.campInfo.rooms
      })
    }
  },
  methods: {
    changeStep(step) { // 改变步骤
      this.currentStep = step
    },
    // 事件分发
    dispatch(action, data) {
      this[action](data)
    },
    // 保存营地
    async doSave() {
      // 先调用判断逻辑
      if (!this.checkInfo()) return
      const loading = this.$loading({ // 打开遮罩层
        lock: true,
        text: '正在保存中',
        spinner: 'el-icon-loading'
      })
      if (this.campId > 0) { // 更新营地逻辑
        if (this.data.thumbnail) { // 如果有更换封面图片
          const uploadThumbnailParams = new FormData()
          uploadThumbnailParams.append('thumbnail', this.data.thumbnail.file)
          const uploadThumbnailRes = await this.$store.dispatch('camp/uploadThumbnail', uploadThumbnailParams)
          this.campInfo.thumbUrl = uploadThumbnailRes.data.path
        }
        const campInfoParams = new URLSearchParams()
        for (const key in this.data.campInfo) { // 遍历营地信息添加到form表单里
          if (key !== 'id') campInfoParams.append(key, this.data.campInfo[key])
        }
        await this.$store.dispatch('camp/updateCamp', this.campId, campInfoParams)
        if (this.data.deleteImgs.length) { // 如果有需要删除的图片
          const deleteImgs = []
          for (const i in this.data.deleteImgs) {
            deleteImgs.push(this.$store.dispatch('camp/deleteCampImgs', { campId: this.campId, imgId: this.data.deleteImgs[i] })) // 删除轮播图片
          }
          await Promise.all(deleteImgs)
        }
        if (this.data.campImgs.filter(item => !item.id).length) { // 如果有需要上传的图片
          const uploadImgs = []
          for (const i in this.data.campImgs.filter(item => !item.id)) {
            uploadImgs.push(this.$store.dispatch('camp/uploadCampImgs', { campId: this.campId, img: this.data.campImgs.filter(item => !item.id)[i].file })) // 删除轮播图片
          }
          await Promise.all(uploadImgs)
        }
        if (this.data.deleteVods) { // 如果有需要删除的视频
          await this.$store.dispatch('camp/deleteCampVods', { campId: this.campId, vodId: this.data.deleteVods })
        }
        if (this.data.campVod && !this.data.campVod.id) { // 如果有需要上传的视频
          await this.$store.dispatch('camp/uploadCampVod', { campId: this.campId, vod: this.data.campVod })
        }
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        loading.close()
      } else { // 新建营地逻辑
        // 上传封面图片
        const uploadThumbnailParams = new FormData()
        uploadThumbnailParams.append('thumbnail', this.data.thumbnail.file)
        const uploadThumbnailRes = await this.$store.dispatch('camp/uploadThumbnail', uploadThumbnailParams)
        // 上传封面图片后创建营地
        const campInfoParams = new FormData()
        for (const key in this.data.campInfo) { // 遍历营地信息添加到form表单里
          campInfoParams.append(key, this.data.campInfo[key])
        }
        campInfoParams.append('thumbUrl', uploadThumbnailRes.data.path)
        const uploadCampRes = await this.$store.dispatch('camp/addCamp', campInfoParams)
        const campId = uploadCampRes.data.id // 新建的营地ID
        const uploadImgs = []
        for (const i in this.data.campImgs) {
          uploadImgs.push(this.$store.dispatch('camp/uploadCampImgs', { campId, img: this.data.campImgs[i].file })) // 上传轮播图片
        }
        await Promise.all(uploadImgs)
        if (this.data.campVod) { // 如果有视频上传视频
          await this.$store.dispatch('camp/uploadCampVod', { campId, vod: this.data.campVod })
        }
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        loading.close()
      }
      this.$router.back()
    },
    checkInfo() { // 判断逻辑
      if (this.data.campVod && this.data.campVod.size / 1024 > 1024 * 10) {
        this.$message.error('视频最大不能超过10M')
        return false
      }
      return true
    }
  }
}
</script>
