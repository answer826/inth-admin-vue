<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第四步 轮播图片</h2>
        <p class="tip">请上传营地轮播图片</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" label-width="80px">
        <div class="img-cut-con img-upload-list">
          <div class="tit">轮播图片</div>
          <div class="cons">
            <div class="con">
              <ImgCutter
                rate="75:70"
                :box-height="500"
                @cutDown="cutDown"
              >
                <div slot="open" class="open">
                  <i class="el-icon-plus" />
                </div>
              </ImgCutter>
            </div>
            <div v-for="(item,index) in imageList" :key="index" class="con img" :style="`background-image:url('${item.dataURL}')`" />
          </div>
        </div>
        <el-form-item size="large">
          <el-button @click="changeStep(2)">上一步</el-button>
          <el-button type="primary" :disabled="!imageList.length" @click="doSave">完成</el-button>
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
      imageList: [],
      previewImg: null
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    cutDown(obj) {
      this.imageList.push(obj)
      console.log(obj)
      this.previewImg = obj.dataURL
    },
    doSave() { // 保存营地

    }
  }
}
</script>
