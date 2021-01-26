<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第三步 封面图片</h2>
        <p class="tip">请上传营地封面图片</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="info" label-width="80px">
        <div class="img-cut-con">
          <ImgCutter
            v-if="!previewImg"
            rate="34:48"
            :box-height="500"
            :is-modal="false"
            @cutDown="cutDown"
          >
            <!-- <el-button slot="open">选择图片</el-button> -->
          </ImgCutter>
          <div v-if="previewImg" class="preview-con">
            <div class="tit">图片预览</div>
            <img v-if="previewImg" class="preview-img" :src="previewImg">
            <div>
              <el-button @click="previewImg = null">重新选择</el-button>
              <el-button v-if="data.thumbnail && data.campInfo.id" type="primary" @click="resetImg">还原</el-button>
            </div>
          </div>
        </div>
        <el-form-item size="large">
          <el-button @click="changeStep(1)">上一步</el-button>
          <el-button type="primary" :disabled="!previewImg" @click="changeStep(3)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ImgCutter from '@/components/ImageCutter'
export default {
  components: {
    ImgCutter
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      info: {},
      previewImg: null
    }
  },
  mounted() {
    if (!this.data.thumbnail && this.data.campInfo.id) { // 初始化显示图片
      this.previewImg = this.downUrl + this.data.campInfo.thumbUrl
    } else if (this.data.thumbnail) {
      this.previewImg = this.data.thumbnail.dataURL
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    cutDown(obj) {
      this.data.thumbnail = obj
      this.previewImg = obj.dataURL
    },
    resetImg() {
      this.previewImg = this.downUrl + this.data.campInfo.thumbUrl
      this.data.thumbnail = null
    }
  }
}
</script>
<style lang="scss" scoped>
.preview-con{
  .preview-img{
    width: 300px;
  }
}
</style>

