<template>
  <div class="page-container step-page">
    <div class="head">
      <div class="tit">订单管理</div>
    </div>
    <div class="step-tit">
      <div>华美达营地 - 隐室</div>
    </div>
    <el-calendar class="room-order-info">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div :class="['date-cell', {disabled: new Date(data.day) < todayDate}, {reserved: reservedDate.includes(data.day)}]" @click.stop.prevent="selectDate(new Date(data.day), data.day)">
          <div class="date-con">{{ data.day.split('-').slice(2).join('-') }}</div>
          <div class="price-con">￥1260</div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
      todayDate: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`),
      reservedDate: [`2021-01-09`, `2021-01-12`]
    }
  },
  methods: {
    selectDate(data, day) {
      if (data < this.todayDate || this.reservedDate.includes(day)) return
      this.$prompt(`请输入 ${day} 的价格`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputPattern: /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/,
        inputErrorMessage: '金额格式不正确'
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
<style lang="scss" scoped>
.step-tit {
    div {
        cursor: default;
    }
}
</style>
<style lang="scss">
.step-tit {
    div {
        cursor: default;
    }
}
.room-order-info {
    user-select: none;
    .el-calendar__header{
        padding-top: 40px;
    }
    .el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev{
        pointer-events: none;
    }
    .el-calendar-table{
        td.is-today {
            color: #000;
        }
        td.is-selected{
            background: none;
        }
        .next{
            .price-con{
                color: #999 !important;
            }
        }
        .el-calendar-day{
            height: auto;
            padding: 0;
            &:hover {
                background: #fff;
            }
            .date-cell {
                height: 100px;
                padding: 10px;
                &.disabled{
                    opacity: .5;
                    .price-con{
                        color: #999;
                    }
                    &:hover {
                        background: none;
                        cursor: default;
                    }
                }
                &.reserved{
                    background: rgba($color: #F56C6C, $alpha: 0.1);
                    .price-con{
                        color: #999;
                    }
                    &:hover {
                        background: rgba($color: #F56C6C, $alpha: 0.1);
                    }
                }
                &:hover {
                    background: rgba($color: #409EFF, $alpha: 0.1);
                }
                .price-con{
                    padding-top: 45px;
                    color: #409EFF;
                }
            }
        }
    }
}
</style>
