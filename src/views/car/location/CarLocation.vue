<template>
  <div class="location" v-if="carList.length>0">
    <div id="map" v-if="state.showMap"></div>
    <DefaultImg v-else text="暂无数据"></DefaultImg>

    <div class="location-header">
      Hi，尊敬的
      <select v-model="currentCarDeviceCode" @change="getLocation">
        <option v-for="car in carList" :key="car.deviceCode" :value="car.deviceCode">{{car.linceNo}}</option>
      </select>
      <i class="iconfont" v-show="carList.length>1">&#xe649;</i>
    </div>
    <!-- <div class="location-footer">
      <h3 class="blues">您的爱车最后位置</h3>
      <p>
        <i></i>{{address.road}}({{address.build}})</p>
    </div>-->
  </div>
  <DefaultImg v-else text="暂无数据"></DefaultImg>
</template>
<script>
import { mapGetters } from "vuex";
import DefaultImg from "@/components/share/DefaultImg";
import { location } from "@/utils/location";
import BaiDuMap from "@/plugins/BMap";
export default {
  components: {
    DefaultImg
  },
  data() {
    return {
      currentCarDeviceCode: "",
      carList: [],
      state: {
        showMap: true
      }
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    iconMarker() {
      return this.$baseUrl + "icon/iconfont-location.png";
    }
  },
  created() {
    this.getActivedCarList();
  },
  methods: {
    /**
     * @description 查询车辆列表
     */
    getActivedCarList() {
      const params = {
        platformId: this.userId
        // platformId: '186'
      };
      this.$http.getUserCarState(params).then(res => {
        if (res.data && res.data.length > 0) {
          this.carList = res.data;
          this.currentCarDeviceCode = res.data[0].deviceCode;
          this.getLocation();
        }
      });
    },
    /**
     * @description 查询车辆实时位置
     */
    getLocation() {
      const params = {
        deviceCode: this.currentCarDeviceCode
        // deviceCode: 'Y755001001390'
      };
      this.$http.getUserCarLocation(params).then(res => {
        if (res.data) {
          const { gps_longitude, gps_latitude } = res.data;
          if (!gps_longitude && !gps_latitude) {
            this.state.showMap = false;
          } else {
            this.state.showMap = true;
            this.createMap(gps_longitude, gps_latitude);
          }
        }
      });
    },

    /**
     * @description 创建地图
     * @param {Number} lng 纬度
     * @param {Number} lat 经度
     */
    createMap(lng, lat) {
      BaiDuMap.init().then(BMap => {
        const map = new BMap.Map("map"); //创建百度地图实例，这里的allmap是地图容器的id
        const point = new BMap.Point(lng, lat); //创建一个点对象，这里的参数是地图上的经纬度
        const geoc = new BMap.Geocoder();

        geoc.getLocation(point, result => {
          if (result) {
            // console.log(result)
            let detailAddress;
            if (result.surroundingPois) {
              detailAddress =
                result.surroundingPois.length > 0
                  ? result.surroundingPois[0].title
                  : "";
            }
            const addressText = `<div style="padding-right:20px;"><h3 style="color: #141414;font-size:15px;">${
              result.address
            }</h3><p style="color: #838383;font-size:12px;">${detailAddress}</p></div>`;

            const infoWindow = new BMap.InfoWindow(addressText); // 创建信息窗口对象

            const iconMarker = new BMap.Icon(
              this.iconMarker,
              new BMap.Size(80, 80),
              {
                imageOffset: new BMap.Size(25, 6)
              }
            );
            const marker = new BMap.Marker(point, { icon: iconMarker });
            map.addOverlay(marker);
            map.centerAndZoom(point, 20); //这里是将
            marker.addEventListener("click", () => {
              this.openInfoWindow(map, point, infoWindow);
            });

            this.openInfoWindow(map, point, infoWindow);
          }
        });
      });
    },
    openInfoWindow(map, point, infoWindow) {
      map.openInfoWindow(infoWindow, point); //开启信息窗口
    }
  }
};
</script>
<style lang="scss" scoped>
.location {
  //   position: relative;
  .location-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 25px 40px;
    font-size: 30px;
    background-color: #fff;
    font-size: 30px;
    select {
      font-size: 30px;
      font-family: PingFang-SC-Medium;
    }
    i {
      font-size: 30px;
    }
  }
  #map {
    position: absolute !important;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .location-footer {
    position: absolute;
    left: 23px;
    right: 23px;
    bottom: 20px;
    padding: 38px;
    border-radius: 9px;
    background-color: #fff;

    h3 {
      margin-bottom: 40px;
      font-size: 30px;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 24px;
    }
    i {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      border-radius: 50%;
      background-color: #0093ff;
    }
  }
}
</style>
