<template>
  <div class="page-container camps-index">
    <router-view :key="key" />
    <div class="head">
      <div class="tit">库存 - 华美达营地</div>
      <el-button type="primary" icon="el-icon-plus" @click="toEdit(0)">增加物品</el-button>
    </div>
    <div class="block">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="名称"
        />
        <el-table-column
          prop="spec"
          label="规格"
        />
        <el-table-column
          prop="qty"
          label="库存"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="quickIn(scope.row.id)">快速入库</el-button>
            <el-button size="mini" @click="toEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteStock(scope.row)">删除</el-button>
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
    this.getStocks()
  },
  methods: {
    handleCurrentChange() {},
    getStocks() {
      this.$store.dispatch('stocks/getStocks').then(res => {
        this.tableData = res.data.content
      })
    },
    // 跳转到物品
    toEdit(id) {
      this.$router.push(`/stockDetail/${this.campId}/${id}`)
    },
    // 删除物品
    deleteStock(stock) {
      this.$confirm(`确定要删除${stock.title}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$store.dispatch('stocks/delStocks', stock.id).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getStocks()
        })
      }).catch(() => {})
    },
    quickIn(stockId) {
      this.$prompt(`请输入要入库的数量`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputPattern: /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/,
        inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        const params = {
          stockId,
          qty: value
        }
        this.$store.dispatch('stocks/stockIn', params).then(res => {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.getStocks()
        })
      }).catch(() => {
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
