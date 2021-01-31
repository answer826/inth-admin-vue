<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第一步 基础信息</h2>
        <p class="tip">请填写房间基本信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="roomData.roomInfo" :rules="rules" label-width="80px">
        <el-form-item label="房间名称" prop="name">
          <el-input v-model="roomData.roomInfo.name" placeholder="请输入房间名称" />
        </el-form-item>
        <el-form-item label="房间面积" prop="room_size">
          <el-input v-model="roomData.roomInfo.room_size" placeholder="请输入房间面积" />
        </el-form-item>
        <el-form-item label="床位信息" prop="beds">
          <el-input v-model="roomData.roomInfo.beds" placeholder="请输入床位信息" />
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
    roomData: {
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
        room_size: [
          { required: true, message: '请输入房间面积', trigger: 'change' }
        ],
        beds: [
          { required: true, message: '请输入床位信息', trigger: 'change' }
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
