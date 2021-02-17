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
import utils from '@/utils'
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
        label: '开始时间',
        prop: 'beforeDate'
      }, {
        label: '结束时间',
        prop: 'afterDate'
      }],
      tableData: [],
      pageInfo: {
        currentPage: 1,
        total: 0
      }
    }
  },
  mounted() {
    this.getCouponList()
  },
  methods: {
    getCouponList() {
      this.$store.dispatch('coupon/getCouponList').then(res => {
        this.tableData = (res.data || []).map(item => {
          return {
            ...item,
            usedCount: `${item.used}/${item.total}`,
            isActive: item.enabled ? '是' : '否',
            beforeDate: utils.date.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(item.not_before)),
            afterDate: utils.date.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(item.not_after))
          }
        })
      })
    },
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
