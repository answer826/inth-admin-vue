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
          <div v-if="priceList[data.day]" class="price-con">￥{{ priceList[data.day].price }}</div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
import utils from '@/utils'
export default {
  data() {
    return {
      info: {},
      roomId: this.$route.params.roomId,
      todayDate: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`),
      reservedDate: [`2021-01-09`, `2021-01-12`],
      currentDate: {
        month: null,
        year: null
      },
      priceList: [],
      basePrice: null
    }
  },
  mounted() {
    this.init()
    this.getMonthPrice()
  },
  methods: {
    getMonthPrice() {
      const params = {
        roomId: this.roomId,
        startdate: utils.date.dateFormat('YYYY-mm-dd', new Date(`${this.currentDate.year}-${this.currentDate.month}-1`)),
        enddate: utils.date.dateFormat('YYYY-mm-dd', new Date(`${this.currentDate.year}-${this.currentDate.month}-${utils.date.getMonthDays(this.currentDate.year, this.currentDate.month)}`))
      }
      this.$store.dispatch('room/getRoomPrice', params).then(res => {
        this.priceList = res.data
      })
    },
    initBasePrice() {
      this.$store.dispatch('room/getRoom', this.roomId).then(res => {
        this.basePrice = parseInt(res.data.base_price)
      })
    },
    init() {
      // 查询基础价格
      this.initBasePrice()
      // 绑定点击事件
      this.initCalendar()
      // 初始化当前年月
      this.initDate()
    },
    initDate() {
      // 初始化当前月份
      this.currentDate = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      }
    },
    initCalendar() {
      this.$nextTick(() => {
        // 点击上个月
        const prevBtn1 = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(1)')
        prevBtn1.addEventListener('click', () => {
          console.log('上个月')
          if (this.currentDate.month === 1) {
            this.currentDate = {
              month: 12,
              year: this.currentDate.year - 1
            }
          } else {
            this.currentDate.month -= 1
          }
          this.getMonthPrice()
        })
        // 点击今天
        const prevBtn2 = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(2)')
        prevBtn2.addEventListener('click', () => {
          console.log('今天')
          this.initDate()
          this.getMonthPrice()
        })
        // 点击下个月
        const prevBtn3 = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(3)')
        prevBtn3.addEventListener('click', () => {
          console.log('下个月')
          if (this.currentDate.month === 12) {
            this.currentDate = {
              month: 1,
              year: this.currentDate.year + 1
            }
          } else {
            this.currentDate.month += 1
          }
          this.getMonthPrice()
        })
      })
    },
    selectDate(data, day) {
      if (data < this.todayDate || this.reservedDate.includes(day)) return
      this.$prompt(`请输入 ${day} 的价格`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputPattern: /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/,
        inputErrorMessage: '金额格式不正确'
      }).then(({ value }) => {
        const params = {
          roomId: this.roomId,
          date: day,
          price: value - this.basePrice
        }
        // console.log(params)
        this.$store.dispatch('room/setRoomPrice', params).then(res => {
          this.getMonthPrice()
          this.$message({
            type: 'success',
            message: '设置成功'
          })
        })
      }).catch(() => {
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
