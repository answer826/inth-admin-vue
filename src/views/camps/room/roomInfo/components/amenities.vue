<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第二步 房间特色</h2>
        <p class="tip">请选择房间特色信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="info" label-width="80px">
        <div class="transfer">
          <el-transfer v-model="value" :data="data" :titles="['未选择', '已选择']" />
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
export default {
  data() {
    return {
      data: [{
        key: 1,
        label: '免费Wifi'
      }, {
        key: 2,
        label: '包含三餐'
      }, {
        key: 3,
        label: '室内温泉'
      }
      ],
      value: [1, 4]
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    }
  }
}
</script>
