<template>
  <!--天天车保专用设备-->
  <div class="order-equipment pannel-card">
    <div class="ins-box card-header">
      <h2 class="header-title">天天车保专用设备</h2>
      <p
        class="order-explain insure-flexbox insure-flexbox-align-center"
        @click="showOrderRule=true"
      >
        <span class="blues rule-text"><i class="iconfont">&#xe704;</i>设备说明 </span>
      </p>
    </div>

    <div class="card-content ">
      <div class="insure-flexbox insure-flexbox-content-between insure-flexbox-align-center">
        <img
          :src="`${baseUrl}images/order_insure_box.png`"
          alt="因数盒子车载智能终端"
        >
        <p class="grays">因数盒子车载智能终端车险专用智能硬件产品</p>
      </div>
      <div class="content-bottom">
        <p class="equ-info-text">押金：
          <span class="oranges">200元</span>(押金可退)</p>
        <p class="equ-info-text grays">x1</p>
      </div>
    </div>
    <DeviceIntroModal v-if="showOrderRule"></DeviceIntroModal>
  </div>
</template>
<script>
// import DeviceIntroModal from './DeviceIntroModal'
export default {
  components: {
    DeviceIntroModal: () => import("./DeviceIntroModal")
  },
  data() {
    return {
      showOrderRule: false
    };
  }
};
</script>
<style lang="scss" scoped>
// 硬件设备
.order-equipment {
  margin-bottom: 34px;
  .iconfont {
    font-size: 40px;
    vertical-align: middle;
  }
  .card-content {
    padding: 30px;
    img {
      width: 200px;
      margin-right: 60px;
    }
    .content-bottom {
      text-align: right;
    }
  }
}
</style>

