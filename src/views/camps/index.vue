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
          width="200px"
        />
        <el-table-column
          prop="state"
          label="地区"
          width="200px"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          label="库存"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="toStockList(scope.row.id)">管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="房间"
          width="150px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="toRoomList(scope.row.id)">管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="toCamp(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteCamp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        currentPage: 1,
        total: 0
      }
    }
  },
  mounted() {
    this.getCamps()
  },
  methods: {
    // 获取营地
    getCamps() {
      this.$store.dispatch('camp/getCamps').then(res => {
        this.tableData = res.data
      })
    },
    handleCurrentChange() {},
    // 跳转到营地
    toCamp(id) {
      this.$router.push(`/camps/edit/${id}`)
    },
    // 跳转到房间列表
    toRoomList(id) {
      this.$router.push(`/roomList/${id}`)
    },
    toStockList(id) {
      this.$router.push(`/stockList/${id}`)
    },
    // 删除营地
    deleteCamp(camp) {
      this.$confirm(`确定要删除${camp.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('camp/deleteCamp', camp.id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getCamps()
        })
      }).catch(() => {})
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
