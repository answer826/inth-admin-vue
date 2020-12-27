<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第一步 基础信息</h2>
        <p class="tip">请填写房间基本信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="info" label-width="80px">
        <el-form-item label="房间名称">
          <el-input v-model="info.name" placeholder="请输入房间名称" />
        </el-form-item>
        <el-form-item label="房间面积">
          <el-input v-model="info.size" placeholder="请输入房间面积" />
        </el-form-item>
        <el-form-item label="床位信息">
          <el-input v-model="info.beds" placeholder="请输入床位信息" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="changeStep(1)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    }
  }
}
</script>
