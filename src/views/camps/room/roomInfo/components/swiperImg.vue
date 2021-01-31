<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第三步 轮播图片</h2>
        <p class="tip">请上传房间轮播图片</p>
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
            <div v-for="(item,index) in roomData.roomImgs" :key="index" class="con img" :style="`background-image:url('${item.id?item.viewUrl:item.dataURL}')`">
              <div class="options">
                <!-- <i class="fas fa-search-plus" /> // 暂时先不加预览 -->
                <i class="fas fa-trash-alt" @click="deleteImg(index)" />
              </div>
            </div>
          </div>
        </div>
        <el-form-item size="large">
          <el-button @click="changeStep(1)">上一步</el-button>
          <el-button type="primary" :disabled="!roomData.roomImgs.length" @click="changeStep(3)">下一步</el-button>
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
    roomData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    cutDown(obj) { // 保存裁剪图片
      this.roomData.roomImgs.push(obj)
      this.previewImg = obj.dataURL
    },
    deleteImg(index) { // 删除图片
      if (this.roomData.roomImgs[index].id) {
        this.roomData.deleteImgs.push(this.roomData.roomImgs[index].id)
      }
      this.roomData.roomImgs.splice(index, 1)
    },
    doSave() { // 保存
      this.$emit('dispatch', 'doSave')
    }
  }
}
</script>
<style lang="scss" scoped>
.img-upload-list {
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
