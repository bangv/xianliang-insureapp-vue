<template>
  <div class="track" v-if="carList.length>0">
    <div class="track-header">
      <div class="lincen-no">
        <h3>Hi，尊敬的 </h3>
        <select v-model="currentCarId" @change="getTrackList">
          <option v-for="(car,index) in carList" :key="index" :value="car.carId">{{car.linceNo}}</option>
        </select>
        <i class="iconfont" v-show="carList.length>1">&#xe649;</i>
      </div>
      <div class="date">
        <div class="item">
          <p>开始时间</p>
          <input id="start-date" type="date" v-model="query.startDate" />
          <i>至</i>
        </div>

        <div class="item">
          <!-- <i> 至</i> -->
          <p>结束时间</p>
          <input id="end-date" type="date" v-model="query.endDate" />
        </div>
      </div>
    </div>
    <div class="track-list" v-if="trackList.length>0">
      <TrackCard v-for="(track,index) in trackList" :key="index" :track="track"></TrackCard>
    </div>
    <DefaultImg v-else text="暂无数据"></DefaultImg>
  </div>
  <DefaultImg v-else text="暂无数据"></DefaultImg>
</template>
<script>
import TrackCard from "../components/TrackCard";
import { location } from "@/utils/location";
import BaiDuMap from "@/plugins/BMap";
import { date } from "@/utils/date";
import DefaultImg from "@/components/share/DefaultImg";

import { mapGetters } from "vuex";
export default {
  components: {
    TrackCard,
    DefaultImg
  },
  data() {
    return {
      carList: [],
      trackList: [],
      currentCarId: "",
      query: {
        startDate: "",
        endDate: ""
      },
      state: {
        isFirstQuery: true
      }
    };
  },
  created() {
    this.getUserCarList();
  },
  computed: {
    ...mapGetters(["userId"])
  },
  watch: {
    // 'query.startDate'(newVal, oldVal) {
    //   if (newVal > this.query.endDate) {
    //     this.query.startDate = oldVal
    //     this.$toast('开始时间不能大于结束时间')
    //   }
    // },
    // 'query.endDate'(newVal, oldVal) {
    //   if (newVal > this.query.endDate) {
    //     this.query.endDate = oldVal
    //     this.$toast('结束时间不能晚于今天')
    //   }
    //   if (this.query.endDate < this.query.startDate) {
    //     this.query.endDate = oldVal
    //     this.$toast('结束时间不能早于开始时间')
    //   }
    // },
    query: {
      deep: true,
      handler(val) {
        if (!this.state.isFirstQuery) {
          this.getTrackList();
        }
        this.state.isFirstQuery = false;
      }
    }
  },

  methods: {
    /**
     * @description 查询用户有轨迹的车辆
     */
    getUserCarList() {
      const params = {
        platformId: this.userId
        // platformId: '186'
      };
      this.$http.getUserCarState(params).then(res => {
        if (res.data && res.data.length > 0) {
          this.currentCarId = res.data[0].carId;
          this.carList = res.data;
          this.getTrackList();
        }
      });
    },
    /**
     * @description 查询用户当前车辆行程列表
     */
    getTrackList() {
      this.trackList = [];
      const carList = this.carList;
      const isCurrentCar = ({ carId }) => carId == this.currentCarId;
      const currentCar = carList.filter(isCurrentCar)[0];

      const params = {
        linceNo: currentCar.linceNo,
        // linceNo: '粤BL22N1',
        poweron_time: this.query.startDate,
        poweron_time_end: this.query.endDate,
        device_code: currentCar.deviceCode
        // delete_flag: ''
      };
      this.$http.getCarTrackList(params).then(res => {
        const trackList = res.data.daList;
        if (trackList && trackList.length > 0) {
          this.geocodingReverse(trackList);
          const { poweronTime, poweronTimeEnd } = res.data;
          // 回显后台给的日期
          if (this.state.isFirstQuery && poweronTime && poweronTimeEnd) {
            this.query.startDate = poweronTime.split(" ")[0];
            this.query.endDate = poweronTimeEnd.split(" ")[0];
          }
        }
      });
    },
    /**
     * @description 将经纬度转换为地址
     */
    geocodingReverse(trackList) {
      BaiDuMap.init().then(BMap => {
        let geocodingAfterList = trackList.map(item => {
          item.startTimestamp = date.getTimestamp(item.poweron_time);

          let startCoor = {
            lat: item.poweron_gps_latitude,
            lng: item.poweron_gps_longitude
          };
          let endCoor = {
            lat: item.poweroff_gps_latitude,
            lng: item.poweroff_gps_longitude
          };

          // 坐标转换为地址
          return Promise.all([
            location.geocodingReverse(BMap, startCoor),
            location.geocodingReverse(BMap, endCoor)
          ]).then(result => {
            // console.log(result)
            // console.log(result[0].surroundingPois)
            let startDetailAddr = result[0].surroundingPois;
            let endDetailAddr = result[1].surroundingPois;
            item.start =
              result[0].address +
              (startDetailAddr.length > 0 ? startDetailAddr[0].title : "");
            item.end =
              result[1].address +
              (endDetailAddr.length > 0 ? endDetailAddr[0].title : "");
            return item;
          });
        });

        Promise.all(geocodingAfterList).then(list => {
          this.orderTrackListByStartTimestamp(list);
        });
      });
    },
    /**
     * @description 通过开始时间排序
     */
    orderTrackListByStartTimestamp(trackList) {
      this.trackList = trackList.sort((a, b) => {
        return b.startTimestamp - a.startTimestamp;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.track {
  .track-header {
    height: 300px;
    padding: 54px 42px 140px 42px;
    font-size: 34px;
    color: #ffffff;
    background-image: linear-gradient(0deg, #21acfe 0%, #037fff 100%);
    .lincen-no {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
    }
    h3 {
      font-size: 34px;
    }
    p {
      font-size: 24px;
    }
    select {
      font-family: PingFang-SC-Medium;
      font-size: 34px;
      color: #fff;
    }
    .iconfont {
      margin-left: 15px;
    }
    .date {
      // position: relative;
      display: flex;
      // align-items: center;
      // justify-content: space-between;
      color: #fff;
      // label {
      //   color: #fff !important;
      // }
      // p {
      //   position: relative;
      //   display: flex;
      //   align-items: center;
      // }
      .item {
        position: relative;
        width: 50%;
        font-size: 24px;
      }
      // label {
      //   padding: 8px 20px;
      //   border-radius: 20px;
      //   font-size: 24px;
      //   border: solid 1px #ffffff;
      //   color: #fff;
      // }

      input {
        margin: 15px 0;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        color: #fff;
        border-bottom: 1px solid #fff;
      }
      i {
        position: absolute;
        right: 40px;
        bottom: 14px;
        // left: 40%;

        // margin-left: 30px;
        // margin-right: 50px;
        // margin-left: -40px;
      }
      label {
        position: absolute;
        right: 10px;
        font-weight: bold;
      }
    }
  }
  .track-list {
    margin-top: -60px;
    padding-bottom: 30px;
    font-size: 24px;
    .track-card {
      margin-bottom: 20px;
    }
  }
}
</style>
