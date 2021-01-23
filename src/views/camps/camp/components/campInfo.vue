<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第一步 基础信息</h2>
        <p class="tip">请填写营地基本信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="data.campInfo" :rules="rules" label-width="80px">
        <el-form-item label="营地名称" prop="name">
          <el-input v-model.trim="data.campInfo.name" placeholder="请输入营地名称" />
        </el-form-item>
        <el-form-item label="营地介绍" prop="description">
          <el-input v-model.trim="data.campInfo.description" type="textarea" placeholder="请输入营地介绍" resize="none" :rows="8" />
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
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入营地介绍', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    changeStep(step) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('dispatch', 'changeStep', step)
        }
      })
    }
  }
}
</script>
