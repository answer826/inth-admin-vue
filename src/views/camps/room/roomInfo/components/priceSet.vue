<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第四步 价格设置</h2>
        <p class="tip">请设置房间价格</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="roomData.roomInfo" :rules="rules" label-width="80px">
        <el-form-item label="基础价格" prop="base_price">
          <el-input v-model="roomData.roomInfo.base_price" type="number" placeholder="请输入房间基础价格" />
        </el-form-item>
        <!-- <el-form-item label="价格总览">
          <el-calendar class="room-price-set">
            <template slot="dateCell" slot-scope="{ date, data }">
              <div :class="['date-cell', {disabled: new Date(data.day) < todayDate}]" @click.stop.prevent="selectDate(new Date(data.day), data.day)">
                <div class="date-con">{{ data.day.split('-').slice(2).join('-') }}</div>
                <div v-if="roomData.roomInfo.base_price" class="price-con" :title="`￥${roomData.roomInfo.base_price}`">￥{{ roomData.roomInfo.base_price }}</div>
              </div>
            </template>
          </el-calendar>
        </el-form-item> -->
        <el-form-item size="large">
          <el-button @click="changeStep(2)">上一步</el-button>
          <el-button type="primary" @click="doSave">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    roomData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      todayDate: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`),
      rules: {
        base_price: [
          { required: true, message: '请输入基础价格', trigger: 'change' }
        ]
      }
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
    },
    doSave() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('dispatch', 'doSave')
        }
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
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
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
                  color: #999 !important;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;
                }
            }
        }
    }
}
</style>

