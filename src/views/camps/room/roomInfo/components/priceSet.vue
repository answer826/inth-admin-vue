<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第四步 价格设置</h2>
        <p class="tip">请设置房间价格</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="info" label-width="80px">
        <el-form-item label="基础价格">
          <el-input v-model="info.name" placeholder="请输入房间基础价格" />
        </el-form-item>
        <el-form-item label="价格总览">
          <el-calendar class="room-price-set">
            <template slot="dateCell" slot-scope="{ date, data }">
              <div :class="['date-cell', {disabled: new Date(data.day) < todayDate}]" @click.stop.prevent="selectDate(new Date(data.day), data.day)">
                <div class="date-con">{{ data.day.split('-').slice(2).join('-') }}</div>
                <div class="price-con">￥1260</div>
              </div>
            </template>
          </el-calendar>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="changeStep(2)">上一步</el-button>
          <el-button type="primary">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
      todayDate: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`)
    }
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    selectDate(data, day) {
      if (data < this.todayDate) return
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
<style lang="scss">
.room-price-set {
    user-select: none;
    .el-calendar__header{
        padding-top: 0;
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
                &:hover {
                    background: rgba($color: #409EFF, $alpha: 0.1);
                }
                .price-con{
                    color: #409EFF;
                }
            }
        }
    }
}
</style>

