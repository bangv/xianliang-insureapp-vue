<template>
  <div class="device-bind-wrap">
    <div
      class="bind"
      v-if="car.carId"
    >
      <div
        class="device-bind insure-card"
        v-if=" selected == 1 && device.bindStatus == 1 "
      >
        <p class="ins-box">
          <span>车牌号</span>
          <span>{{device.lincenNo}}</span>
        </p>
        <p class="ins-box">
          <span>OBD ID</span>
          <span>{{device.deviceCode}}</span>
        </p>
        <p class="ins-box">
          <span>绑定状态</span>
          <span class="blues">{{ device.bindStatus == 1 ? '已绑定' : '未绑定' }}</span>
        </p>
        <p class="ins-box">
          <span>绑定时间</span>
          <span class="blues">{{device.bindTime | handleTimeStr }}</span>
        </p>
      </div>

      <div
        class="device-bind insure-card"
        v-if=" selected == 2 && device.linkStatus == 1 "
      >
        <p class="ins-box">
          <span>车牌号</span>
          <span>{{device.lincenNo}}</span>
        </p>
        <p class="ins-box">
          <span>OBD ID</span>
          <span>{{device.deviceCode}}</span>
        </p>
        <p class="ins-box">
          <span>适配状态</span>
          <span class="blues">{{ device.linkStatus == 1 ? '已适配' : '未适配' }}</span>
        </p>
        <!-- <p class="ins-box">
          <span>适配时间</span>
          <span class="blues">{{device.linkTime | handleTimeStr }}</span>
        </p> -->
      </div>

      <div
        class="device-unbind"
        v-if="selected == 1 &&  device.bindStatus == 0 "
      >
        <p>您的设备还未绑定，请尽快完成绑定！</p>
        <div class="bind-btn-wrap ins-center">
          <button
            type="button"
            class="sign-up-btn"
            @click="goToBindDevice"
          >立即绑定</button>
        </div>
      </div>

      <div
        class="device-unbind"
        v-if="selected == 2 && device.linkStatus == 0 "
      >
        <p>您的设备还未进行安装调试，请绑定设备后完成！</p>
        <div class="bind-btn-wrap ins-center">
          <button
            type="button"
            :disabled="device.bindStatus == 0"
            class="sign-up-btn"
            @click="goToDebugDevice"
          >安装调试</button>
        </div>
      </div>
    </div>

    <DefaultImg
      text="暂无数据"
      v-else
    ></DefaultImg>
  </div>

</template>

<script>
import DefaultImg from "@/components/share/DefaultImg";
export default {
  name: "DeviceBind",
  props: {
    car: Object,
    device: Object,
    selected: String
  },
  components: {
    DefaultImg
  },
  // data() {
  //   return {
  //     status: null
  //   };
  // },
  methods: {
    // 跳转至 设备绑定页面
    goToBindDevice() {
      this.$router.push({
        name: "BindDevice",
        query: {
          carId: this.car.carId
        }
      });
    },
    // 跳转至 设备调试页面
    goToDebugDevice() {
      this.$router.push({
        name: "ConnectDevice",
        query: {
          lincenNo: this.device.lincenNo,
          deviceCode: this.device.deviceCode
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.device-bind-wrap {
  width: 100%;
  padding: 0 25px;
  margin-top: 40px;
}
.device-bind {
  p {
    height: 90px;
  }
}
.device-unbind {
  padding-top: 100px;
  p {
    text-align: center;
    color: #9d9d9d;
    font-size: 28px;
  }
  .bind-btn-wrap {
    margin-top: 100px;
    display: flex;
  }
}

.ins-default-img {
  padding: 50px 0 100px !important;
}
</style>
