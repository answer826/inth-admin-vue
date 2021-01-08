<template>
  <div class="page-container camps-index">
    <router-view :key="key" />
    <div class="head">
      <div class="tit">房间列表 - 华美达营地</div>
      <el-button type="primary" icon="el-icon-plus" @click="toRoom(0)">增加房间</el-button>
    </div>
    <div class="block">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="date"
          label="创建时间"
        />
        <el-table-column
          label="订单"
        >
          <template>
            <el-button size="mini" @click="toOrder(1)">订单管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button size="mini" @click="toRoom(1)">编辑</el-button>
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
      tableData: [{
        name: '隐室',
        date: '2020-12-27 00:02:29'
      }],
      pageInfo: {
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    handleCurrentChange() {},
    // 跳转到营地
    toRoom(id) {
      this.$router.push(`/roomInfo/${id}`)
    },
    toOrder(id) {
      this.$router.push(`/orderMgr/${id}`)
    }
  }
}
</script>

<style lang="scss">
.camps-index {
  display: flex;
  flex-direction: column;
}
</style>
