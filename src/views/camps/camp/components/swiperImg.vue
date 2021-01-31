<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第四步 轮播视频与图片</h2>
        <p class="tip">请上传营地视频与轮播图片</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" label-width="80px">
        <div class="img-cut-con img-upload-list">
          <div class="tit">营地视频（可选）</div>
          <div class="cons">
            <div v-if="!videoUrl && !data.campVod" class="con">
              <input id="uploadVod" type="file" class="uploadInput" :value="selectVod" accept="video/*" @change="chooseVideoInput">
              <label class="open" for="uploadVod">
                <i class="el-icon-plus" />
              </label>
            </div>
            <div v-else class="videoCon">
              <video id="video" :src="data.campVod.id ? data.campVod.viewUrl : videoUrl" x5-playsinline="" playsinline="" webkit-playsinline preload="auto" controls="controls" />
              <div>
                <input id="uploadVod" type="file" class="uploadInput" :value="selectVod" accept="video/*" @change="chooseVideoInput">
                <label for="uploadVod">
                  更换视频
                </label>
                <el-button type="danger" size="mini" style="margin-left:10px" @click="deleteVod">删除视频</el-button>
              </div>
            </div>
          </div>
        </div>
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
            <div v-for="(item,index) in data.campImgs" :key="index" class="con img" :style="`background-image:url('${item.id?item.viewUrl:item.dataURL}')`">
              <div class="options">
                <!-- <i class="fas fa-search-plus" /> // 暂时先不加预览 -->
                <i class="fas fa-trash-alt" @click="deleteImg(index)" />
              </div>
            </div>
          </div>
        </div>
        <el-form-item size="large">
          <el-button @click="changeStep(2)">上一步</el-button>
          <el-button type="primary" :disabled="!data.campImgs.length" @click="doSave">保存</el-button>
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
      videoUrl: null,
      selectVod: null
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    cutDown(obj) { // 保存裁剪图片
      this.data.campImgs.push(obj)
      this.previewImg = obj.dataURL
    },
    deleteImg(index) { // 删除图片
      if (this.data.campImgs[index].id) {
        this.data.deleteImgs.push(this.data.campImgs[index].id)
      }
      this.data.campImgs.splice(index, 1)
    },
    chooseVideoInput(event) { // 选择视频转换成url预览
      if (this.data.campVod && this.data.campVod.id) this.data.deleteVods = this.data.campVod.id
      this.data.campVod = document.getElementById('uploadVod').files[0]
      const url = URL.createObjectURL(this.data.campVod)
      this.videoUrl = url
      this.selectVod = null
    },
    deleteVod() { // 删除视频
      this.$confirm('确定要删除此视频吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (this.data.campVod.id) this.data.deleteVods = this.data.campVod.id
        this.videoUrl = null
        this.data.campVod = null
      }).catch(() => {})
    },
    doSave() { // 保存营地
      this.$emit('dispatch', 'doSave')
    }
  }
}
</script>
<style lang="scss" scoped>
.img-upload-list {
  .videoCon{
    video{
      margin-bottom: 10px;
      width: 500px;
    }
    input{
      display: none;
    }
    label{
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #FFF;
      border: 1px solid #DCDFE6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      padding: 7px 15px;
      font-size: 12px;
      border-radius: 3px;
    }
  }
  .con {
    position: relative;
    cursor: default;
    .options {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: .6);
      color: #fff;
      opacity: 0;
      display: none;
      transition: all .3s;
      align-items: center;
      justify-content: center;
      i{
        margin: 0 10px;
        font-size: 18px;
        display: inline-block;
        cursor: pointer;
      }
    }
    &:hover{
      .options {
        opacity: 1;
        display: flex;
      }
    }
  }
}
</style>
