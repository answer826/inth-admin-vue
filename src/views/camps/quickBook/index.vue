<template>
  <div class="quickBook">
    <div class="tit">快速下单</div>
    <div class="con">
      <el-form ref="form" :model="bookInfo" label-width="80px">
        <el-form-item label="房间选择">
          <el-select v-model="bookInfo.roomId" placeholder="请选择房间">
            <el-option
              v-for="item in roomList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker
            v-model="bookInfo.dateBegin"
            align="right"
            type="date"
            placeholder="选择日期"
            :disabled="!bookInfo.roomId"
            :picker-options="dateBegin"
            @change="getMonthPrice('start')"
          />
        </el-form-item>
        <el-form-item label="退房时间">
          <el-date-picker
            v-model="bookInfo.dateEnd"
            align="right"
            type="date"
            placeholder="选择日期"
            :disabled="!bookInfo.dateBegin"
            :picker-options="dateEnd"
            @change="updateTotalPrice"
          />
        </el-form-item>
        <el-form-item label="价格">
          ￥{{ totalPrice }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即下单</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import utils from '@/utils'
export default {
  data() {
    return {
      id: this.$route.params.id,
      bookInfo: {
        roomId: null,
        name: '',
        dateBegin: null,
        dateEnd: null
      },
      reservedDate: [],
      priceList: [],
      dateBegin: {},
      dateEnd: {},
      disabledDate: [],
      roomList: [], // 房间列表
      totalPrice: '-'
    }
  },
  watch: {
    'bookInfo.roomId': function() {
      this.getMonthPrice('start')
    }
  },
  mounted() {
    this.getRooms()
  },
  methods: {
    onSubmit() {},
    selectDate() {},
    beginDataChange() {},
    getRooms() { // 获取房间列表
      this.$store.dispatch('room/getRoomList', this.id).then(res => {
        this.roomList = res.data
      })
    },
    getMonthPrice(type) {
      let year, month
      if (type === 'start') {
        if (this.bookInfo.dateBegin) {
          year = new Date(this.bookInfo.dateBegin).getFullYear()
          month = new Date(this.bookInfo.dateBegin).getMonth() + 1
        } else {
          year = new Date().getFullYear()
          month = new Date().getMonth() + 1
        }
        this.bookInfo.dateEnd = null
      } else {
        if (this.bookInfo.dateEnd) {
          year = new Date(this.bookInfo.dateEnd).getFullYear()
          month = new Date(this.bookInfo.dateEnd).getMonth() + 1
        } else {
          year = new Date().getFullYear()
          month = new Date().getMonth() + 1
        }
      }
      const params = {
        roomId: this.bookInfo.roomId,
        startdate: utils.date.dateFormat('YYYY-mm-dd', new Date(`${year}-${month}-1`)),
        enddate: utils.date.dateFormat('YYYY-mm-dd', new Date(`${year}-${month + 1}-${utils.date.getMonthDays(year, month)}`))
      }
      this.$store.dispatch('room/getRoomPrice', params).then(res => {
        this.priceList = res.data
        this.disabledDate = []
        for (const key in res.data) {
          if (res.data[key].availability === '1') this.disabledDate.push(key)
        }
        this.updateDisabledDate(type)
      })
    },
    updateDisabledDate(type) {
      const this_ = this
      if (type === 'start') {
        this.dateBegin = {
          disabledDate(time) {
            return this_.disabledDate.includes(utils.date.dateFormat('YYYY-mm-dd', new Date(time))) || time < new Date(utils.date.getCalculateDate(new Date(), -1))
          }
        }
        this.updateDisabledDate('end')
      } else {
        let maxDate = utils.date.getCalculateDate(this_.bookInfo.dateBegin, 14)
        this.disabledDate.forEach(dDate => {
          if (dDate < maxDate && dDate > this_.bookInfo.dateBegin) {
            maxDate = dDate
          }
        })
        this.dateEnd = {
          disabledDate(time) {
            return time <= new Date(this_.bookInfo.dateBegin) || time >= new Date(maxDate)
          }
        }
      }
    },
    // 计算价格
    updateTotalPrice() {
      if (this.bookInfo.dateEnd) {
        const startdate = utils.date.dateFormat('YYYY-mm-dd', new Date(this.bookInfo.dateBegin))
        const enddate = utils.date.dateFormat('YYYY-mm-dd', new Date(this.bookInfo.dateEnd))
        this.totalPrice = this.priceList[startdate].price
        let date = startdate
        for (let i = 0; i < utils.date.getDaysBetween(startdate, utils.date.getCalculateDate(enddate, -1)); i++) {
          date = utils.date.getCalculateDate(date, 1)
          this.totalPrice = utils.math.add(this.totalPrice, this.priceList[date].price)
        }
      } else {
        this.totalPrice = '-'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .quickBook {
    background: #fff;
    padding: 40px;
    .tit {
      font-size: 20px;
    }
    .con {
      width: 500px;
      margin: 0 auto;
      margin-top: 80px;
      .line {
        text-align: center;
      }
      .el-date-editor.el-input,
      .el-select {
        width: 100%;
      }
    }
  }
</style>
