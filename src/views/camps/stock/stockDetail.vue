<template>
  <div class="page-container stock-page">
    <div class="head">
      <div class="tit">华美达营地 - {{ stockId > 0 ? '物品编辑' : '新增物品' }}</div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="stockInfo" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="title">
          <el-input v-model="stockInfo.title" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input v-model="stockInfo.spec" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="库存" prop="qty">
          <el-input v-model="stockInfo.qty" placeholder="请输入库存" />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="doSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentStep: 0,
      stockId: this.$route.params.stockId,
      campId: this.$route.params.campId,
      stockInfo: {},
      editStockInfo: {},
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        spec: [
          { required: true, message: '请输入规格', trigger: 'change' }
        ],
        qty: [
          { required: true, message: '请输入库存', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    if (this.stockId > 0) {
      this.$store.dispatch('stocks/getStock', this.stockId).then(res => {
        this.stockInfo = res.data
        this.editStockInfo = {
          ...res.data
        }
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
    doSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const lading = this.$loading({ // 打开遮罩层
            lock: true,
            text: '正在保存中',
            spinner: 'el-icon-loading'
          })
          if (this.stockId > 0) { // 更新物品逻辑
            const upDateParams = {
              stockId: this.stockId
            }
            for (const key in this.stockInfo) {
              if (this.stockInfo[key] !== this.editStockInfo[key]) {
                upDateParams[key] = this.stockInfo[key]
              }
            }
            this.$store.dispatch('stocks/editStocks', upDateParams).then(res => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
              lading.close()
              this.$router.back()
            })
          } else { // 新建房间逻辑
            // 创建房间
            const stockInfoParams = {
              ...this.stockInfo,
              camp_id: this.campId
            }
            this.$store.dispatch('stocks/addStocks', stockInfoParams).then(res => {
              console.log('成功')
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
              lading.close()
              this.$router.back()
            }).catch(res => {
              if (res.code === 2) {
                this.$message({
                  message: '名称重复',
                  type: 'error'
                })
              }
            }).finally(() => {
              console.log('完成')
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form{
  margin: 0 auto;
  margin-top: 30px;
  width: 600px;
}
</style>
