<template>
  <div class="location">
    <div id="map"></div>
    <div class="location-header">{{travel.startTime}} - {{travel.endTime}}</div>
    <div class="location-footer">
      <div v-show="state.showPannel">
        <div class="pannel" v-show="state.showTab">
          <h3 class="blues">驾驶行为</h3>
          <div class="total">
            <div class="item">
              <p>急加速</p>
              <img :src="mapObj.accIcon" alt>
            </div>
            <div class="item">
              <p>急减速/急刹车</p>
              <img :src="mapObj.dccIcon" alt>
            </div>
            <div class="item">
              <p>急转弯</p>
              <img :src="mapObj.turnIcon" alt>
            </div>
          </div>
        </div>
        <div class="pannel" v-show="!state.showTab">
          <h3 class="blues">行程数据</h3>
          <div class="data">
            <p class="start">
              <i></i>
              {{travel.startAddr}}
            </p>
            <p class="end">
              <i></i>
              {{travel.endAddr}}
            </p>
          </div>
          <!-- <p>时长：30分钟 均速：48.5 km/h</p> -->
        </div>
      </div>
      <div class="tabs flex flex-ai-c flex-jc-c">
        <div class="item" :class="{'active':state.showTab}" @click="handlePannelSwitch">
          <i class="iconfont">&#xe604;</i> 驾驶行为
        </div>
        <div class="item" :class="{'active':!state.showTab}" @click="handlePannelSwitch">
          <i class="iconfont">&#xe67a;</i>行程数据
        </div>
      </div>
      <!-- <div class="pannel">
        <h3 class="blues">驾驶行为</h3>
        <div class="total">
          <div class="item">
            <p>急加速</p>
            <span class="blues">{{track.accelerate>=0?track.accelerate:'-'}}</span>
          </div>
          <div class="item">
            <p>急减速</p>
            <span class="blues">{{track.deceleration>=0?track.deceleration:'-'}}</span>
          </div>
          <div class="item">
            <p>急转弯</p>
            <span class="blues">{{track.corner>=0?track.corner:'-'}}</span>
          </div>
          <div class="item">
            <p>急刹车</p>
            <span class="blues">{{track.deceleration>=0?track.deceleration:'-'}}</span>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
// import BMap from 'BMap'
import BaiDuMap from "@/plugins/BMap";
import { location } from "@/utils/location";

export default {
  data() {
    return {
      list: [],
      track: {},
      travel: {
        startAddr: decodeURI(this.$route.query.startAddr),
        endAddr: decodeURI(this.$route.query.endAddr),
        startTime: this.$route.query.startTime,
        endTime: this.$route.query.endTime
      },
      mapObj: {
        startIcon: this.$baseUrl + "icon/car/qi.png",
        endIcon: this.$baseUrl + "icon/car/zhong.png",
        accIcon: this.$baseUrl + "icon/car/accIcon.png",
        dccIcon: this.$baseUrl + "icon/car/dccIcon.png",
        turnIcon: this.$baseUrl + "icon/car/turnIcon.png"
      },
      state: {
        showTab: true,
        showPannel: true
      }
    };
  },
  mounted() {
    this.getTravel();
  },
  methods: {
    handlePannelSwitch() {
      this.state.showTab = !this.state.showTab;
      this.state.showPannel = true;
    },
    /**
     * @description 获取轨迹坐标
     */
    getTravel() {
      const params = {
        deviceTravelId: this.$route.params.trackId
        // deviceTravelId: 'ab1db7d58a084f5a93ae3f022e3827e0'
      };
      this.$http.queryTravel(params).then(res => {
        if (res.data.respcode == "00") {
          this.track = res.data;
          if (res.data.deviceTraveList) {
            let traveList = JSON.parse(res.data.deviceTraveList);
            this.list = traveList;
            if (traveList.length > 2) {
              this.creatMap(traveList);
            }
          }
        }
      });
    },
    /**
     * @description 处理坐标集合
     * @param {Array} traveList 原始坐标集合
     */
    creatMap(traveList) {
      BaiDuMap.init().then(BMap => {
        const map = new BMap.Map("map");

        const { startIcon, endIcon, accIcon, dccIcon, turnIcon } = this.mapObj;
        // 刹车、减速标志
        const accMarker = new BMap.Icon(accIcon, new BMap.Size(30, 30), {
          imageOffset: new BMap.Size(0, 0)
        });
        const dccMarker = new BMap.Icon(dccIcon, new BMap.Size(30, 30), {
          imageOffset: new BMap.Size(0, 0)
        });
        const turnMarker = new BMap.Icon(turnIcon, new BMap.Size(30, 30), {
          imageOffset: new BMap.Size(0, 0)
        });

        // 坐标处理
        let points = [];
        traveList.map(item => {
          let marker;
          const point = new BMap.Point(item.lng, item.lat);
          points.push(point);

          if (item.isAlarm) {
            switch (item.isAlarm) {
              // 32：加速、33：刹车、34：转弯
              case 32:
                marker = accMarker;
                break;
              case 33:
                marker = dccMarker;
                break;
              case 34:
                marker = turnMarker;
                break;
            }
            map.addOverlay(new BMap.Marker(point, { icon: marker }));
          }
        });

        // 起点终点标志
        const startMarker = new BMap.Icon(startIcon, new BMap.Size(80, 80), {
          imageOffset: new BMap.Size(25, 6)
        });
        const endMarker = new BMap.Icon(endIcon, new BMap.Size(80, 80), {
          imageOffset: new BMap.Size(25, 6)
        });

        // 创建地图

        map.addOverlay(new BMap.Marker(points[0], { icon: startMarker }));
        map.addOverlay(
          new BMap.Marker(points[points.length - 1], { icon: endMarker })
        );
        map.addOverlay(
          new BMap.Polyline(points, {
            strokeColor: "green", //设置颜色
            strokeWeight: 4, //宽度
            strokeOpacity: 1
          })
        );

        map.setViewport(points);
        map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放功能

        map.addEventListener("click", () => {
          this.state.showPannel = false;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.location {
  //   position: relative;
  .location-header {
    position: absolute;
    left: 0;
    right: 0;
    padding: 25px 40px;
    text-align: center;
    font-size: 30px;
    background-color: #fff;
  }
  #map {
    position: absolute !important;
    width: 100%;
    top: 0;
    left: 0;
    // height: 900px;
    height: 100%;
  }
  .location-footer {
    position: absolute;
    left: 23px;
    right: 23px;
    bottom: 50px;
    .pannel {
      margin-top: 20px;
      margin-bottom: 40px;
      padding: 24px;
      font-size: 24px;
      box-shadow: 0px 6px 29px 0px rgba(210, 210, 210, 0.48);
      border-radius: 9px;
      background-color: #fff;
    }
    h3 {
      margin-bottom: 40px;
      border-radius: 9px;
      font-size: 30px;
    }
    .data {
      p {
        margin-bottom: 32px;
      }
      i {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border-radius: 50%;
      }
      .start {
        i {
          background-color: #0093ff;
        }
      }
      .end {
        margin-bottom: 0;
        i {
          background-color: #ff9d46;
        }
      }
    }
    .total {
      display: flex;
      .item {
        width: 33.33%;
        text-align: center;
        p {
          margin-bottom: 20px;
        }
        img {
          width: 113px;
          height: 113px;
        }
        span {
          font-size: 30px;
        }
      }
    }
  }
  .tabs {
    width: 80%;

    margin: auto;
    border-radius: 42px;
    color: #fff;
    box-shadow: 0px 0px 13px 0px rgba(56, 171, 255, 0.4);
    background-color: #0060ff;
    .item {
      width: 50%;
      height: 94px;
      line-height: 94px;
      border-radius: 42px;
      text-align: center;
      .iconfont {
        margin-right: 10px;
        font-size: 40px;
      }
    }
    .active {
      color: #0060ff;
      background-color: #fff;
    }
  }
}
</style>
