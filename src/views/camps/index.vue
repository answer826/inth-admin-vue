<template>
  <div class="page-container camps-index">
    <div class="head">
      <div class="tit">营地列表</div>
      <el-button type="primary" icon="el-icon-plus" @click="toCamp(0)">增加营地</el-button>
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
          prop="address"
          label="地址"
        />
        <el-table-column
          label="房间"
        >
          <template>
            <el-button size="mini" @click="toRoomList(1)">管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template>
            <el-button size="mini" @click="toCamp(1)">编辑</el-button>
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
        name: '华美达营地',
        date: '2020-12-27 00:02:29',
        address: '四川省阿坝藏族羌族自治州理县古尔沟镇温泉路33号'
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
    toCamp(id) {
      this.$router.push(`/camps/edit/${id}`)
    },
    // 跳转到房间列表
    toRoomList(id) {
      this.$router.push(`/roomList/${id}`)
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
