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
          label="订单"
        >
          <template>
            <el-button size="mini" @click="toOrder(1)">订单管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="toRoom(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteRoom(scope.row)">删除</el-button>
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
      },
      campId: this.$route.params.campId
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    this.getRooms()
  },
  methods: {
    handleCurrentChange() {},
    getRooms() {
      this.$store.dispatch('room/getRoomList', this.campId).then(res => {
        this.tableData = res.data
      })
    },
    // 跳转到房间
    toRoom(id) {
      this.$router.push(`/roomInfo/${this.campId}/${id}`)
    },
    toOrder(id) {
      this.$router.push(`/orderMgr/${id}`)
    },
    // 删除房间
    deleteRoom(room) {
      this.$confirm(`确定要删除${room.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('room/deleteRoom', room.id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getRooms()
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
