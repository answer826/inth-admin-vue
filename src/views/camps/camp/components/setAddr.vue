<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第二步 位置信息</h2>
        <p class="tip">请检索营地位置信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="info" label-width="80px">
        <el-form-item label="营地地址">
          <el-input
            v-model="info.addrName"
            placeholder="请输入营地显示的地址"
          />
        </el-form-item>
        <el-form-item label="营地位置">
          <el-autocomplete
            v-model="findStr"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入关键字检索"
            :trigger-on-focus="false"
            @select="handleSelect"
          />
        </el-form-item>
        <div id="map" />
        <el-form-item size="large">
          <el-button @click="changeStep(0)">上一步</el-button>
          <el-button type="primary" @click="changeStep(2)">下一步</el-button>
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
      findStr: '',
      map: {},
      latLngList: []
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    changeStep(step) {
      this.$emit('dispatch', 'changeStep', step)
    },
    querySearch(queryStr, cb) {
      /* eslint-disable */
      const searchService = new qq.maps.SearchService({
        complete : function(results) {
          if(results.type === "CITY_LIST") {
            searchService.setLocation(results.detail.cities[0].cityName)
            searchService.search(queryStr)
            return
          }
          const pois = results.detail.pois
          cb(pois.map(item => {
            return {
              value: item.name,
              address: item.address,
              latLng: item.latLng
            }
          }))
        }
      })
      searchService.search(queryStr)
    },
    handleSelect(item) {
      // 选择地点
      const this_ = this
      // 清空marker
      for (let i in this.latLngList) {
        this.latLngList[i].setMap(null)
      }
      const latlngBounds = new qq.maps.LatLngBounds()
      const marker = new qq.maps.Marker({
        map: this_.map,
        position: item.latLng
      })
      this.latLngList.push(marker)
      marker.setTitle(item.value)
      latlngBounds.extend(item.latLng)
      this.map.fitBounds(latlngBounds)
    },
    initMap() {
      /* eslint-disable */
      this.map = new qq.maps.Map(document.getElementById("map"), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(39.916527,116.397128),
        mapStyleId: 'style1'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-autocomplete{
    display: block;
}
#map{
    max-width: 720px;
    height: 500px;
    margin-left: 80px;
    margin-bottom: 20px;
}
</style>

