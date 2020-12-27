<template>
  <div class="page-container step-page">
    <div class="head">
      <div class="tit">营地编辑</div>
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
import CampInfo from './components/campInfo'
import CampImg from './components/campImg'
import SwiperImg from './components/swiperImg'
export default {
  components: {
    CampInfo,
    CampImg,
    SwiperImg
  },
  data() {
    return {
      campEditStep: [
        {
          name: '基础信息',
          component: 'CampInfo'
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
      currentStep: 0
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
