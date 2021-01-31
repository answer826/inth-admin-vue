<template>
  <div class="step-con">
    <div class="tit-con">
      <div class="tit">
        <h2 class="name">第二步 位置信息</h2>
        <p class="tip">请检索营地位置信息</p>
      </div>
    </div>
    <div class="container">
      <el-form ref="form" class="form" :model="data.campInfo" label-width="80px">
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
          <el-button type="primary" :disabled="disabled" @click="changeStep(2)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      findStr: '',
      map: null,
      latLngList: [],
      disabled: false // 初始化下一步flag
    }
  },
  watch: {
    // 判断是否位置信息是否完整
    'data.campInfo': {
      handler() {
        this.disabled = false
        const keys = ['latitude', 'longitude', 'address', 'state', 'city'] // 需要检查的key
        keys.forEach(key => { // 遍历需要检查的key
          if (!this.data.campInfo[key]) this.disabled = true // 如果有一个key为空设置flag为true
        })
      },
      immediate: true, // 初始化执行一次handler
      deep: true // 深度监听
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
            console.log(results.detail.cities[0])
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
      // 设置选择的地理位置
      this.data.campInfo.latitude = item.latLng.lat
      this.data.campInfo.longitude = item.latLng.lng
      this.data.campInfo.address = item.address
      // 获取选择地点的省市信息
      this.getCityInfoByLatLng(item.latLng)
      this.initMapMarker(item)
    },
    initMap() {
      /* eslint-disable */
      this.map = new qq.maps.Map(document.getElementById("map"), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(39.916527,116.397128),
        mapStyleId: 'style1'
      })
      // 如果有经纬度初始化地图标记
      if (this.data.campInfo.latitude && this.data.campInfo.longitude) {
        const item = {
          value: this.data.campInfo.name,
          latLng: new qq.maps.LatLng(this.data.campInfo.latitude, this.data.campInfo.longitude)
        }
        this.initMapMarker(item)
      }
    },
    initMapMarker(item) {
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
    // 根据经纬度返回城市信息
    getCityInfoByLatLng(latLng) {
      const cityService = new qq.maps.CityService()
      //设置请求成功的回调函数
      cityService.setComplete(results => {
        const cityInfo = results.detail.detail.split(',').reverse() // 城市信息
        const isPLM = cityInfo.length === 3 // 判断是否为直辖市
        this.data.campInfo.state = cityInfo[1] // 获取的省
        this.data.campInfo.city = isPLM ? cityInfo[1] : cityInfo[2] // 获取的市
      })
      cityService.searchCityByLatLng(latLng)
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

