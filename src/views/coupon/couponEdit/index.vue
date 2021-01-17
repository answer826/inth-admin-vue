<template>
  <div class="page-container coupon-index">
    <div class="head">
      <div class="tit">优惠券编辑</div>
    </div>
    <div class="block">
      <el-form ref="form" class="form" :model="info" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="info.name" placeholder="请输入营地名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="info.resource">
            <el-radio label="固定金额" />
            <el-radio label="比例" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="折扣">
          <el-input v-model="info.name" placeholder="请输入折扣" />
        </el-form-item>
        <el-form-item label="总量">
          <el-input v-model="info.name" placeholder="请输入总量" />
        </el-form-item>
        <el-form-item label="最低金额">
          <el-input v-model="info.name" placeholder="请输入最低金额" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="info.date" type="date" placeholder="选择开始日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="info.date" type="date" placeholder="选择结束日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="启用">
          <el-radio-group v-model="info.resource">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      couponId: this.$route.params.id
    }
  },
  methods: {
    save() {}
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
