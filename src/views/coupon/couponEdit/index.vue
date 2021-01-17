<template>
  <div class="page-container coupon-index">
    <div class="head">
      <div class="tit">优惠券编辑</div>
    </div>
    <div class="block">
      <el-form ref="form" :model="couponInfo" :rules="rules" class="form" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="couponInfo.name" placeholder="请输入优惠券名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="couponInfo.type">
            <el-radio label="fixed" value="fixed">固定金额</el-radio>
            <el-radio label="percent" value="percent">比例</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="couponInfo.type === 'fixed' ? '价值' : '折扣'" prop="value">
          <el-input v-model="couponInfo.value" :placeholder="`请输入${couponInfo.type === 'fixed' ? '价值' : '折扣'}`" />
        </el-form-item>
        <el-form-item label="总量" prop="total">
          <el-input v-model="couponInfo.total" placeholder="请输入总量" />
        </el-form-item>
        <el-form-item label="最低金额" prop="min_amount">
          <el-input v-model="couponInfo.min_amount" placeholder="请输入最低金额" />
        </el-form-item>
        <el-form-item label="开始时间" prop="not_before">
          <el-date-picker v-model="couponInfo.not_before" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd hh:mm:ss" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="结束时间" prop="not_after">
          <el-date-picker v-model="couponInfo.not_after" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd hh:mm:ss" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="启用">
          <el-radio-group v-model="couponInfo.enabled">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" :loading="saving" @click="save">保存{{ saving?'中':'' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validator = (rule, value, callback) => {
      if (value !== '') {
        if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false) {
          callback(new Error('请填写大于0的数字'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      saving: false,
      couponInfo: {
        type: 'fixed',
        enabled: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请输入优惠价值', trigger: 'change' },
          { validator, message: '优惠价值必须为正数' }
        ],
        total: [
          { required: true, message: '请输入总量', trigger: 'change' },
          { validator, message: '总量必须为正数' }
        ],
        min_amount: [
          { required: true, message: '请输入最低金额', trigger: 'change' },
          { validator, message: '最低金额必须为正数' }
        ],
        not_before: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        not_after: [
          { required: true, message: '请选择截止日期', trigger: 'change' }
        ]
      },
      couponId: this.$route.params.id
    }
  },
  methods: {
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.saving = true
          const params = new FormData()
          for (const key in this.couponInfo) {
            params.append(key, this.couponInfo[key])
          }
          this.$store.dispatch('coupon/addCoupon', params).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.back(-1)
          }).finally(() => {
            this.saving = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.coupon-index {
  display: flex;
  flex-direction: column;
  .form{
    margin: 0 auto;
    margin-top: 30px;
    width: 600px;
  }
}
</style>
