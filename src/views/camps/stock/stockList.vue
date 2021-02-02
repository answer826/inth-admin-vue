<template>
  <div class="page-container camps-index">
    <router-view :key="key" />
    <div class="head">
      <div class="tit">库存 - 华美达营地</div>
      <el-button type="primary" icon="el-icon-plus" @click="toRoom(0)">增加物品</el-button>
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
          prop="unit"
          label="规格"
        />
        <el-table-column
          label="库存"
        >
          <template slot-scope="scope">
            <span class="mar-r-10">{{ scope.row.inventory }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="quickIn">快速入库</el-button>
            <el-button size="mini" @click="toRoom(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteRoom(scope.row)">删除</el-button>
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
      tableData: [
        {
          id: 0,
          name: '杯子',
          unit: '个',
          inventory: 222
        },
        {
          id: 0,
          name: '餐盘',
          unit: '套',
          inventory: 222
        }
      ],
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
      // this.$store.dispatch('room/getRoomList', this.campId).then(res => {
      //   this.tableData = res.data
      // })
    },
    // 跳转到物品
    toRoom(id) {
      this.$router.push(`/stockDetail/${this.campId}/${id}`)
    },
    // 删除物品
    deleteRoom(stock) {
      this.$confirm(`确定要删除${stock.name}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('room/deleteRoom', stock.id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getRooms()
        })
      }).catch(() => {})
    },
    quickIn() {
      this.$prompt(`请输入要入库的数量`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputPattern: /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '设置成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
