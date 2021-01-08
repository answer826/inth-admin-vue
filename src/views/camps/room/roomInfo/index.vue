<template>
  <div class="page-container step-page">
    <div class="head">
      <div class="tit">华美达营地 - {{ campId > 0 ? '隐室' : '新增房间' }}</div>
    </div>
    <div class="step-tit">
      <div v-for="(step, index) in campEditStep" :key="index" :class="{active:currentStep===index}">{{ step.name }}</div>
    </div>
    <transition name="fade-transform" mode="out-in">
      <component :is="campEditStep[currentStep].component" @dispatch="dispatch" />
    </transition>
  </div>
</template>
<script>
import RoomInfo from './components/roomInfo'
import SwiperImg from './components/swiperImg'
import Amenities from './components/amenities'
import PriceSet from './components/priceSet'
export default {
  components: {
    RoomInfo,
    SwiperImg,
    Amenities,
    PriceSet
  },
  data() {
    return {
      campEditStep: [
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
      campId: this.$route.params.id
    }
  },
  methods: {
    changeStep(step) {
      this.currentStep = step
    },
    // 事件分发
    dispatch(action, data) {
      this[action](data)
    }
  }
}
</script>
