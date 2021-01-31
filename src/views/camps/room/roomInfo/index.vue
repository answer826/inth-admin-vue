<template>
  <div class="page-container step-page">
    <div class="head">
      <div class="tit">华美达房间 - {{ roomId > 0 ? '隐室' : '新增房间' }}</div>
    </div>
    <div class="step-tit">
      <div v-for="(step, index) in roomEditStep" :key="index" :class="{active:currentStep===index}" @click="roomId > 0 ? changeStep(index) : false">{{ step.name }}</div>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="roomEditStep[currentStep].component" :room-data="data" @dispatch="dispatch" />
    </transition>
  </div>
</template>
<script>
import RoomInfo from './components/roomInfo'
import SwiperImg from './components/swiperImg'
import Amenities from './components/amenities'
import PriceSet from './components/priceSet'
import data from './data'
export default {
  components: {
    RoomInfo,
    SwiperImg,
    Amenities,
    PriceSet
  },
  data() {
    return {
      roomEditStep: [
        {
          name: '基础信息',
          component: 'RoomInfo'
        },
        {
          name: '房间特色',
          component: 'Amenities'
        },
        {
          name: '轮播图片',
          component: 'SwiperImg'
        },
        {
          name: '价格设置',
          component: 'PriceSet'
        }
      ],
      currentStep: 0,
      roomId: this.$route.params.roomId,
      campId: this.$route.params.campId,
      data: data.getData() // 公共组件变量
    }
  },
  mounted() {
    if (this.roomId > 0) {
      this.$store.dispatch('room/getRoom', this.roomId).then(res => {
        this.data.roomInfo = res.data
        this.data.roomInfo.amenities = this.data.roomInfo.amenities.map(item => item.id)
        this.data.roomImgs = res.data.roomimgs.map(item => {
          return {
            ...item,
            viewUrl: this.downUrl + item.url
          }
        })
        // 删除不需要的属性
        delete this.data.roomInfo.available_status
        delete this.data.roomInfo.roomimgs
        delete this.data.roomInfo.camps
      })
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
    // 保存房间
    async doSave() {
      const lading = this.$loading({ // 打开遮罩层
        lock: true,
        text: '正在保存中',
        spinner: 'el-icon-loading'
      })
      if (this.roomId > 0) { // 更新房间逻辑
        const roomInfoParams = {
          ...this.data.roomInfo,
          amenities: this.data.roomInfo.amenities.toString(),
          roomId: this.roomId
        }
        await this.$store.dispatch('room/updateRoom', roomInfoParams)
        if (this.data.deleteImgs.length) { // 如果有需要删除的图片
          const deleteImgs = []
          for (const i in this.data.deleteImgs) {
            deleteImgs.push(this.$store.dispatch('room/deleteRoomImgs', { roomId: this.roomId, imgId: this.data.deleteImgs[i] })) // 删除轮播图片
          }
          await Promise.all(deleteImgs)
        }
        if (this.data.roomImgs.filter(item => !item.id).length) { // 如果有需要上传的图片
          const uploadImgs = []
          for (const i in this.data.roomImgs.filter(item => !item.id)) {
            uploadImgs.push(this.$store.dispatch('room/uploadRoomImgs', { roomId: this.roomId, img: this.data.roomImgs.filter(item => !item.id)[i].file })) // 删除轮播图片
          }
          await Promise.all(uploadImgs)
        }
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        lading.close()
      } else { // 新建房间逻辑
        // 创建房间
        const roomInfoParams = {
          ...this.data.roomInfo,
          campId: this.campId
        }
        const uploadRoomRes = await this.$store.dispatch('room/addRoom', roomInfoParams)
        console.log(uploadRoomRes)
        const roomId = uploadRoomRes.data.id // 新建的房间ID
        const uploadImgs = []
        for (const i in this.data.roomImgs) {
          uploadImgs.push(this.$store.dispatch('room/uploadRoomImgs', { roomId, img: this.data.roomImgs[i].file })) // 上传轮播图片
        }
        await Promise.all(uploadImgs)
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        lading.close()
      }
      this.$router.back()
    }
  }
}
</script>
