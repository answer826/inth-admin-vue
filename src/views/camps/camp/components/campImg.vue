<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第二步 封面图片</h2>
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
            </div>
          </div>
        </div>
        <el-form-item size="large">
          <el-button @click="changeStep(0)">上一步</el-button>
          <el-button type="primary" @click="changeStep(2)">下一步</el-button>
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
  data() {
    return {
      info: {},
      previewImg: null
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    cutDown(obj) {
      console.log(obj)
      this.previewImg = obj.dataURL
    }
  }
}
</script>
