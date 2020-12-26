<template>
  <div class="page-container camps-index">
    <div class="head">
      <div class="tit">营地列表</div>
      <el-button type="primary" icon="el-icon-plus">增加营地</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        label="房间">
        <template>
          <el-button type="primary" size="mini">管理</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '华美达营地',
        date: '2020-12-27 00:02:29',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style lang="scss">
.page-container{
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(33, 33, 33, 0.14), 0 0 1px 0 rgba(0, 0, 0, 0.14);
}
.camps-index {
  display: flex;
  flex-direction: column;
  &>.head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .tit{
      font-size: 16px;
      user-select: none;
    }
  }
}
</style>
