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
export default {
  components: {
    CampInfo,
    CampImg,
    SwiperImg,
    SetAddr
  },
  data() {
    return {
      campEditStep: [
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
      currentStep: 0,
      campId: this.$route.params.id,
      data: data.getData()
    }
  },
  methods: {
    changeStep(step) {
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
        text: '正在上传中',
        spinner: 'el-icon-loading'
      })
      if (this.campId > 0) { // 更新营地逻辑
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
