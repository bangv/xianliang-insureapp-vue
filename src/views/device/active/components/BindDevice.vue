<template>
  <div class="step1">
    <div
      class="not-scan"
      v-if="!deviceCode"
    >
      <div class="device-intro">
        <img
          :src="$baseUrl+'images/device-guide.png'"
          alt=""
        >
      </div>
      <div class="tip">
        温馨提示：按照上图指引，请扫描OBD盒子上的二维码，完成绑定
      </div>
      <div
        class="scan"
        @click="scanDeviceQRCode"
      >
        <img
          :src="$baseUrl+'images/saomiao.png'"
          alt=""
        >
        <p>扫描二维码</p>
      </div>
    </div>

    <div
      class="scanned"
      v-if="deviceCode"
    >
      <div class="select-lisence">
        <div class="select">
          车牌号
          <div class="select-content">
            <p v-if="!currentCar">无车辆</p>
            <select
              v-model="currentCar"
              v-if="currentCar"
            >
              <option
                v-for="car in userCarList"
                :key="car.carId"
                :value="car"
              >{{car.lincenNo}}</option>
            </select>
            <i
              class="iconfont"
              v-show="userCarList.length>1"
            >&#xe615;</i>
          </div>

        </div>
        <img
          :src="$baseUrl+'images/device.png'"
          alt=""
        >
        <p
          class="obd-id"
          v-show="deviceCode"
        >
          <em>OBD </em>ID : {{deviceCode}}
        </p>
      </div>
      <div class="btn-box">
        <button
          class="sign-up-btn"
          @click="bindDevice"
          :disabled="state.boxSate==3"
        >绑定盒子</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { wechat } from "@/utils/wechat";
import { storage, cookie, ua, url } from "@/utils/browser";

export default {
  data() {
    return {
      currentCar: null,
      userCarList: [],
      deviceCode: this.$route.query.deviceCode,
      state: {
        isNiceDevice: true, // 设备是否存在
        boxSate: null
      }
    };
  },
  computed: {
    ...mapGetters(["userId", "platformType"])
  },
  // beforeRouteEnter(to, from, next) {
  //   if (!cookie.getItem('INSURE_USER_ID')) {
  //     next({
  //       name: 'Login',
  //       query: {
  //         deviceCode: to.query.deviceCode
  //       }
  //     })
  //   }
  //   next()
  // },
  created() {
    this.getCarList();
    this.checkBoxStatus();
  },
  mounted() {
    // if (!ua.isiOS) {
    //   wechat.configJsSdk(window.location.href.split("#")[0]);
    // }
    window.getCode = this.getCode; // 挂载方法
  },
  methods: {
    /**
     * @description 判断盒子是否已绑定
     */
    checkBoxStatus() {
      let deviceCode = this.deviceCode
        ? this.deviceCode
        : this.$route.query.deviceCode;
      if (deviceCode) {
        const params = {
          deviceCode: deviceCode,
          platUserId: this.userId
        };
        this.$http.checkBoxStatus(params).then(res => {
          if (res.data.respcode == "01") {
            return (this.state.isNiceDevice = false);
          }
          // this.getCarList()
          const { boxStatus, linceNo } = res.data;
          // 盒子状态:0:新盒子  1:旧盒子,已绑定  2:旧盒子,已绑定,已适配  3:该盒子已被其他用户绑定
          if (boxStatus != 0) {
            switch (boxStatus) {
              case "1":
                this.$router.push({
                  name: "ConnectDevice",
                  query: {
                    lincenNo: linceNo,
                    deviceCode: params.deviceCode
                  }
                });
                break;
              case "2":
                this.$router.push({
                  name: "Step3"
                });
                break;
              case "3":
                this.state.boxSate = boxStatus;
                this.$toast("该盒子已被其他用户绑定");
                break;
            }
          }
        });
      }
    },
    /**
     * @author AuYeung
     * @description 初始化车辆
     */
    getCarList() {
      this.$store.dispatch("getUserCarList").then(result => {
        const { carId: currentCarId, deviceCode } = this.$route.query;
        if (result.length > 0) {
          const isUnboundCar = ({ deviceCode }) => !deviceCode; // 未绑定过的车辆
          const isCurrentCar = ({ carId }) => carId == currentCarId;

          this.userCarList = result.filter(isUnboundCar);
          this.currentCar = !currentCarId
            ? this.userCarList[0]
            : this.userCarList.filter(isCurrentCar)[0];
        }
      });
    },
    /**
     * @description 返回url中的设备号
     */
    returnDeviceCode(path) {
      let deviceCode = "";
      let urlObj = url.getQueryObj(path);
      if (!path.includes("open.weixin.qq.com")) {
        // 新盒子
        deviceCode = urlObj.deviceCode;
      } else {
        // 老盒子
        let encodeURI = decodeURIComponent(urlObj.redirect_uri);
        let params = url.getQueryObj(encodeURI);
        deviceCode = params.deviceCode;
      }
      return deviceCode;
    },
    scanDeviceQRCode() {
      if (this.platformType) {
        this.scanQrCodeInWebView();
      } else {
        if (!ua.isWeChat) {
          return this.$toast("请在手机微信扫码");
        }
        this.scanDeviceQRCodeInWeChat();
      }
    },
    /**
     * @description 调用微信扫码功能
     */
    scanDeviceQRCodeInWeChat() {
      wechat.checkJsApi("scanQRCode").then(checkResult => {
        if (checkResult) {
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: result => {
              if (result.errMsg == "scanQRCode:ok") {
                this.deviceCode = this.returnDeviceCode(result.resultStr);
                this.checkBoxStatus();
              }
            }
          });
        }
      });
    },
    /**
     * @description 接收webview扫码结果，改方法名为原生内定不可更改
     */
    getCode(result) {
      // console.log(result)
      this.deviceCode = this.returnDeviceCode(result);
      this.checkBoxStatus();
    },
    /**
     * @description webview 内扫码
     */
    scanQrCodeInWebView() {
      if (this.platformType === "Android") {
        window.app.openQRCode();
      }
      if (this.platformType === "iOS") {
        window.location.href = "scanning:";
      }
    },
    /**
     * @description 绑定设备
     */
    bindDevice() {
      if (!this.state.isNiceDevice) {
        return this.$toast("该设备不存在");
      }

      if (this.state.boxSate == 3) {
        return this.$toast("该盒子已被其他用户绑定");
      }

      if (!this.currentCar) {
        // 没有车辆
        return this.$router.push({
          name: "BindResult",
          query: {
            state: 501
          }
        });
      }
      const { lincenNo, carId } = this.currentCar;
      const params = {
        carId: carId,
        lincenNo: lincenNo,
        deviceCode: this.deviceCode,
        platUserId: this.userId
      };
      this.$http.bindDevice(params).then(res => {
        if (res.data.respcode == "00") {
          this.$toast("绑定成功");
          this.$router.push({
            name: "ConnectDevice",
            query: {
              lincenNo: params.lincenNo,
              deviceCode: params.deviceCode
            }
          });
        } else {
          this.$router.push({
            name: "BindResult",
            query: {
              state: res.data.errStatus,
              carId: this.currentCar.carId,
              deviceCode: params.deviceCode
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.step1 {
  //   padding-bottom: 72px;
  // padding: 0 35px;
  .not-scan {
    padding: 0 36px;
  }
  .device-intro {
    margin-top: 36px;
    padding-top: 72px;
    padding-bottom: 52px;
    text-align: center;
    border-radius: 8px;
    background-color: #fff;
    img {
      width: 86%;
    }
  }
  .tip {
    margin-top: 64px;
    margin-bottom: 39px;
    text-align: center;
    font-size: 22px;
    color: #888686;
  }
  .scan {
    padding-top: 50px;
    padding-bottom: 62px;
    text-align: center;
    background-color: #fff;
    img {
      width: 240px;
      height: 200px;
      margin: auto;
    }
    p {
      margin-top: 46px;
      font-size: 36px;
      color: #0084ff;
    }
  }
  .select-lisence {
    margin-top: 36px;
    padding: 60px 88px 55px 88px;
    border-radius: 8px;
    text-align: center;
    background-color: #fff;

    .select {
      display: flex;
      align-items: center;
      margin-bottom: 130px;
      font-size: 24px;
      .select-content {
        position: relative;
        width: 408px;
        height: 60px;
        margin-left: 24px;
        border-radius: 30px;
        color: #8e8e8e;
        background-color: #f6f6f6;
        p {
          padding-left: 38px;
          line-height: 60px;
          text-align: left;
        }
      }
      .iconfont {
        font-size: 24px;
        position: absolute;
        top: 15px;
        right: 50px;
      }
      select {
        width: 360px;
        height: 60px;

        margin-left: 24px;
        padding-left: 38px;
        font-size: 24px;

        option {
          max-width: 100%;
        }
      }
    }
    .obd-id {
      margin-top: 76px;
      font-size: 30px;

      em {
        color: #0094ff;
      }
    }
    img {
      width: 55%;
    }
  }
  .btn-box {
    margin-top: 104px;
    text-align: center;
  }
}
</style>
