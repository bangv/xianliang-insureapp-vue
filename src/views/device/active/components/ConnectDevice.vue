<template>
  <div class="step2">
    <div class="connect-step">
      <p class="step-text">操作步骤</p>
      <div class="sub-step">
        <div class="step-item ">
          <em class="blues">step1</em>
          <span @click="state.showOBDModal=true">插入盒子</span>
          <div
            class="item-right"
            @click="state.showOBDGuide=!state.showOBDGuide"
          >
            <i
              class="insure-arrow-down"
              :class="{'insure-arrow-up':state.showOBDGuide}"
            ></i>
            <p class="blues">{{state.showOBDGuide?'收起':'展开'}}</p>
          </div>

          <!-- <p>找不到接口？</p> -->

          <div
            class="obd-guide"
            v-if="state.showOBDGuide"
          >
            <img
              :src="`${baseUrl}images/obd-guide2.jpg`"
              alt=""
            >
            <div class="guide-text">
              <p>OBD盒子接口位置</p>
              <span>（图片仅供参考）</span>
            </div>
            <div class="modal-entry grays">
              OBD接口位置,请参考
              <span
                class="blues"
                @click="state.showOBDModal=true"
              >OBD接口位置指引</span>
            </div>
            <div class="customer-service insure-flexbox insure-flexbox-content-between">
              <p class="insure-flexbox insure-flexbox-align-center">
                <i class="iconfont">&#xe682;</i>联系客服</p>
              <a
                href="tel:400-9898-988"
                class="blues"
              > 400-9898-988</a>
            </div>
          </div>

        </div>
        <div class="step-item item2">
          <em class="blues">step2</em>
          <span @click="state.shwoInterfaceModal=true">点火连接</span>
          <p class="grays">插好设备后，请进行车辆点火，系统会自动连接</p>
          <!-- <button class="connect-btn" v-show="!connectState" @click="checkDeviceState"> 连接</button>
          <button class="connect-btn" v-show="connectState==='ing'" :disabled="connectState==='ing'"> 连接中...</button>
          <button class="connect-btn" v-show="connectState==='fail'" @click="checkDeviceState"> 重新连接</button> -->
        </div>
      </div>
      <div class="state">
        <div
          class="ing"
          v-if="connectState==='ing'"
        >
          <img
            :src="`${baseUrl}images/connecting.png`"
            alt=""
          >
          <p> Tips：请将车辆尽量开至空旷信号良好的地方，</p>
          <p>保证点火时长3-5分钟。切勿熄火或拔出设备。</p>
        </div>
        <div
          class=" failed"
          v-if="connectState==='fail'||connectState==='vinErr'"
        >
          <p class="warn-tip"> <img
              :src="`${baseUrl}icon/warn.png`"
              alt=""
              align="center"
            >{{connectState==='vinErr'?'您插入的车辆车架号与行驶证不符':'抱歉，连接失败，请检查设备插入情况'
            }}</p>
          <p>如有疑问，请联系客服：
            <a href="tel:400-9898-988">400-9898-988</a>
          </p>
        </div>
      </div>
      <!-- <div class="state">
        <div class="ing" v-if="connectState==='ing'">
          <img :src="`${baseUrl}images/connecting.png" alt="">
          <p> 连接过程中可能有点耗时，请耐心等待，</p>
          <p>切勿熄火或拔出设备，正在获取设备信号……</p>
        </div>
        <div class=" failed" v-if="connectState==='fail'||connectState==='vinErr'">

          <p class="warn-tip"> <img :src="`${baseUrl}icon/warn.png" alt="" align="center">{{connectState==='vinErr'?'您插入的车辆车架号与行驶证不符':'抱歉，连接失败，请检查设备插入情况'

            }}</p>
          <p>如有疑问，请联系客服：
            <a href="tel:400-9898-988">400-9898-988</a>
          </p>
        </div>

        <div class=" successed" v-if="connectState==='success'">
          <p class="warn-tip">
            <img :src="`${baseUrl}icon/success.png" alt="" align="center">恭喜您，设备成功连接，已上传数据……
          </p>
          <div class="btn-box">
            <button class="sign-up-btn" @click="nextStep">下一步</button>
          </div>
        </div>
      </div> -->
      <OBDModal v-if="state.showOBDModal"></OBDModal>
      <!-- <InterfaceModal
        :show="state.shwoInterfaceModal"
        @hide="state.shwoInterfaceModal=false"
      ></InterfaceModal> -->
    </div>
  </div>
</template>
<script>
// import OBDModal from "./OBDModal";
// import InterfaceModal from "./InterfaceModal";

export default {
  components: {
    OBDModal: () => import("./OBDModal"),
    // InterfaceModal
    // CarTypeConfirm
  },
  data() {
    return {
      state: {
        showOBDModal: false,
        // shwoInterfaceModal: true,
        showOBDGuide: false
      },
      connectState: "", // 连接状态
      connectTimer: null, // 定时器
      connectCount: 0 // 轮询次数
    };
  },
  created() {
    this.checkDeviceState();
  },
  destroyed() {
    clearInterval(this.connectTimer);
  },
  methods: {
    /**
     * @description 轮询检测设备是否已连接
     */
    checkDeviceState() {
      // this.state.showOBDGuide = false;
      const { deviceCode, lincenNo } = this.$route.query;
      if (deviceCode && lincenNo) {
        this.connectState = "ing";

        const params = {
          deviceCode: deviceCode,
          lincenNo: lincenNo
        };
        this.$http.checkDeviceState(params).then(res => {
          this.connectCount++;
          // 连接成功
          if (res.data.respcode == "00") {
            this.nextStep();
            return (this.connectState = "success");
          }
          // 连接失败
          // res.data.errMSg = "vinErr"
          if (res.data.respcode == "01" && res.data.errMsg == "vinErr") {
            return (this.connectState = "vinErr");
          }

          // 限制轮询次数
          if (this.connectCount < 10 && !this.connectTimer) {
            this.connectTimer = setInterval(() => {
              this.checkDeviceState();
            }, 5000);
          }
          if (this.connectCount === 10 && this.connectTimer) {
            this.connectState = "fail";
            this.connectCount = 0;
            clearInterval(this.connectTimer);
            this.connectTimer = null;
          }
        });
      }
    },
    nextStep() {
      this.$router.push({
        name: "Step3"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.step2 {
  .step-text {
    margin-top: 55px;
    margin-left: 70px;
    font-size: 24px;
    color: #ff9600;
  }
  .sub-step {
    margin: 30px 36px 65px 36px;
    padding: 60px 34px 52px 34px;
    font-size: 24px;
    border-radius: 8px;
    background-color: #fff;
    em {
      width: 40px;
      height: 40px;
      margin-right: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      color: #027dff;
      // border: 1px solid #027dff;
    }
    .step-item {
      position: relative;
      margin-bottom: 80px;
      .item-right {
        position: absolute;
        top: 0;
        right: 0;
        text-align: center;
      }
      .obd-guide {
        margin-top: 40px;
        padding-bottom: 50px;
        border-bottom: 1px solid #dbdbdb;
      }
      .customer-service {
        margin-top: 80px;
        i {
          margin-right: 7px;
          font-size: 32px;
        }
      }
      .grays {
        margin-top: 10px;
      }
      .connect-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        // height: 47px;
        padding: 12px 30px;
        border-radius: 30px;
        color: #fff;
        background: linear-gradient(to left, #007aff, #22aefe);
      }
      &.item2 {
        position: relative;
        margin-bottom: 0;
      }
    }
  }
  .guide-text {
    margin-top: 30px;
    text-align: center;
    p {
      margin-bottom: 20px;
      font-size: 24px;
      color: #ff9600;
    }
    span {
      font-size: 20px;

      color: #b5b5b5;
    }
  }
  .modal-entry {
    text-align: center;
  }
  .state {
    text-align: center;
    font-size: 24px;
    color: #a6a6a6;
    .ing {
      img {
        width: 373px;
        margin-top: 80px;
        margin-bottom: 50px;
      }
      p {
        line-height: 50px;
      }
    }
    .failed,
    .successed {
      img {
        width: 71px;
        height: 71px;
        margin-right: 23px;
      }
    }
    .warn-tip {
      margin-bottom: 16px;
      font-size: 30px;
      color: #ff9600;
    }
    a {
      color: #0886ff;
    }
  }
  .btn-box {
    margin-top: 124px;
    text-align: center;
  }
}
</style>
