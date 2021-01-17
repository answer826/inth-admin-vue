<template>
  <div class="page-container coupon-index">
    <div class="head">
      <div class="tit">优惠券列表</div>
      <el-button type="primary" icon="el-icon-plus" @click="toCoupon(0)">新建优惠券</el-button>
    </div>
    <div class="block">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        />
        <el-table-column
          label="操作"
        >
          <template>
            <el-button size="mini" @click="toCoupon(1)">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeader: [{
        label: '名称',
        prop: 'name'
      }, {
        label: '优惠码',
        prop: 'code'
      }, {
        label: '描述',
        prop: 'description'
      }, {
        label: '用量',
        prop: 'usedCount'
      }, {
        label: '是否启用',
        prop: 'isActive'
      }, {
        label: '创建时间',
        prop: 'createDate'
      }],
      tableData: [{
        name: '华美达营地',
        code: 'EXYUYASHS01',
        description: '满3000减200',
        usedCount: '200/1000',
        isActive: '是',
        createDate: '2021-01-17 18:01:16'
      }],
      pageInfo: {
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    handleCurrentChange() {},
    // 优惠券编辑
    toCoupon(id) {
      this.$router.push(`/coupon/edit/${id}`)
    }
  }
}
</script>

<style lang="scss">
.coupon-index {
  display: flex;
  flex-direction: column;
}
</style>
