<template>
  <div class="device-mine">
    <div class="device-choose insure-card">
      <div class="choose-car" v-if="carList.length>0">
        <select class="brand-txt" v-model="carId" @click="reRotate">
          <option
            v-for="(car,index) in carList "
            :key="index"
            :value="car.carId == '' ? carList[0].carId : car.carId"
          >{{car.lincenNo == '' ? carList[0].lincenNo : car.lincenNo}}</option>
        </select>
        <em class="arrows" :class="{ 'arrowTrans': showCarList }" v-show="carList.length>1"></em>
      </div>
      <p class="ins-center border-bottom-scaleY">
        <img :src="$baseUrl+'images/device_box.png'" alt="设备盒子">
      </p>
      <h2>天天车保专用设备</h2>
    </div>

    <div class="device-list" v-if="currentDevice.linkStatus==0">
      <div class="navbar-wrap">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">设备绑定</mt-tab-item>
          <mt-tab-item id="2">设备调试</mt-tab-item>
        </mt-navbar>
      </div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <DeviceBind :selected="selected" :device="currentDevice" :car="currentCar"></DeviceBind>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <DeviceBind :selected="selected" :device="currentDevice" :car="currentCar"></DeviceBind>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <DeviceActivated :car="currentCar" :device="currentDevice" v-if="currentDevice.linkStatus==1"></DeviceActivated>
    <CustomerServiceFooter></CustomerServiceFooter>
    <!-- <div class="device-bottom">
      <a
        href="tel:400-9898-988"
        class="ins-align"
      >
        <em class="icon-service"> </em>
        如您有疑问，请联系客服
      </a>
    </div>-->
  </div>
</template>

<script>
import DeviceBind from "./components/DeviceBind";
// import DeviceActivated from "./components/DeviceActivated";
import CustomerServiceFooter from "@/components/share/CustomerServiceFooter";
import { mapGetters } from "vuex";
export default {
  name: "DeviceMy",
  components: {
    DeviceBind,
    DeviceActivated: () => import("./components/DeviceActivated"),
    CustomerServiceFooter
  },
  data() {
    return {
      selected: "1",
      DevBind: {}, // 绑定

      carList: [], // 设备绑定车辆 列表
      showCarList: false,
      carId: null,
      currentCar: {},
      currentDevice: {} // 调试
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  watch: {
    carId(val) {
      if (val) {
        this.debugDevice();
        const results = this.carList.filter(item => item.carId == this.carId);
        if (results.length > 0) {
          this.currentCar = results[0];
        }
      }
    }
  },
  created() {
    this.chooseOwnerCar();
  },
  methods: {
    // 获取当前用户拥有的车辆
    chooseOwnerCar() {
      const params = {
        platUserId: this.userId,
        type: 2
      };
      this.$http.chooseOwnerCar(params).then(res => {
        const cars = res.data.cars;
        if (res.data.respcode == "00" && cars.length > 0) {
          this.carList = cars;
          this.carId = cars[0].carId;
          this.debugDevice();
        }
      });
    },
    // 查询设备绑定信息与设备调试信息
    debugDevice() {
      this.$http.debugDevice({ carId: this.carId }).then(res => {
        this.currentDevice = res.data;
        // this.currentDevice["carId"] = this.carId;
      });
    },
    reRotate() {
      this.showCarList = !this.showCarList;
    },
    goToRefund() {
      this.$router.push({
        name: "Refund",
        query: {
          carId: this.currentCar.carId,
          depositId: this.currentCar.depositId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.device-mine {
  .device-choose {
    margin: 30px 20px 60px;

    .choose-car {
      text-align: right;
      position: relative;
      font-size: 30px;
      height: 48px;
      line-height: 48px;
      select {
        font-size: 26px !important;
      }
      .brand-txt {
        // width: 200px;
        padding-right: 40px;
      }
    }
    /*    .arrows {
      @include icon(32, 18, '../../../static/icon/arrows-down.png');
      position: absolute;
      top: 15px;
      right: 20px;
      transition: transform 0.25s linear;
    }
    .arrowTrans {
      transform: rotate(180deg);
      transition: transform 0.25s linear;
    }*/
    img {
      width: 220px;
      height: 194px;
    }
    h2 {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      margin-top: 20px;
    }
  }
  .arrows {
    @include icon(32, 18, "icon/arrows-down.png");
    position: absolute;
    top: 14px;
    right: 0;
    transition: transform 0.25s linear;
  }
  .arrowTrans {
    transform: rotate(180deg);
    transition: transform 0.25s linear;
  }
  img {
    width: 220px;
    height: 194px;
  }
  h2 {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
  }
}

.navbar-wrap {
  display: flex;
  justify-content: center;
}
.mint-navbar {
  width: 81%;
  line-height: 90px;
  border-radius: 45px;
}
.mint-tab-item {
  height: 90px;
  padding: 30px 0;
  // border: 1px solid #007aff;
  font-size: 30px !important;
  color: #007aff;
  &.is-selected {
    width: 27%;
    color: #fff !important;
    background: linear-gradient(to left, #007aff, #22aefe);
    border-bottom: 0;
  }
  &:nth-of-type(1) {
    border-radius: 45px 0 0 45px;
  }

  &:nth-of-type(2) {
    border-radius: 0 45px 45px 0;
  }
}
.device-bottom {
  width: 100%;
  margin: 100px 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  .icon-service {
    margin-right: 20px;
    @include icon(38, 40, "icon/device/service.png");
  }
}
</style>
