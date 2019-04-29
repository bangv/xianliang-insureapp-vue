<template>
  <div
    class="device-activated"
    v-if="car"
  >
    <div class="pannel-card">
      <div class="card-header flex flex-jc-b">
        <span>尊敬的{{car.lincenNo}}</span>
        <span
          class="faq"
          @click="state.showRefundDescriptionModal=true"
        >如何退押金 <i class="iconfont">&#xe6dd;</i></span>
      </div>
      <div class="card-content">
        <p>您好，您的设备已激活,</p>
        <p>您可无忧使用天天车保服务了！</p>
      </div>
      <!-- <div class="card-footer">
        <p>
          <i class="iconfont">&#xe6c3;</i>
          <span>综合检测</span>
        </p>
        <p>
          <i class="iconfont">&#xe773;</i>
          <span>轨迹位置</span>
        </p>
        <p>
          <i class="iconfont">&#xe671;</i>
          <span>安防监控</span>
        </p>
        <p>
          <i class="iconfont">&#xe604;</i>
          <span>驾驶习惯</span>
        </p>
      </div> -->
      <ServiceFooter></ServiceFooter>
    </div>
    <p
      class="blues"
      v-if="car.depositId"
      @click="goToRefund"
    ><i class="iconfont">&#xe786;</i>申请退押金</p>
    <RefundDescriptionModal v-if="state.showRefundDescriptionModal">
      <div
        class="modal-content"
        slot="modal-content"
      >
        <b> 用户退设备押金，步骤如下：</b>
        <p>第一步：用户发起【申请退押金】填写具体原因；</p>
        <p>第二步：等待工作人员处理；</p>
        <p>第三步：申请通过，进行退款；申请驳回，不能退款。</p>
        <p>如有疑问，可联系天天车保客服热线：<a href="tel:400-9898-988">400-9898-988</a></p>
      </div>
    </RefundDescriptionModal>
  </div>
</template>
<script>
// import RefundDescriptionModal from "@/components/modal/RefundDescriptionModal";
import ServiceFooter from "@/components/share/ServiceFooter";
export default {
  components: {
    RefundDescriptionModal: () =>
      import("@/components/modal/RefundDescriptionModal"),
    ServiceFooter
  },
  props: {
    car: Object,
    device: Object
  },
  data() {
    return {
      state: {
        showRefundDescriptionModal: true
      }
    };
  },
  methods: {
    goToRefund() {
      this.$router.push({
        name: "Refund",
        query: {
          carId: this.car.carId,
          depositId: this.car.depositId,
          deviceCode: this.device.deviceCode
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pannel-card {
  margin: 0 30px;
}
.card-header {
  .faq {
    font-size: 22px;
    color: #008dff;
    i {
      font-size: 24px;
    }
  }
}
.card-content {
  padding: 50px 0 !important;
  margin: 0 30px;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #e5e5e5;
}
// .card-footer {
//   display: flex;
//   padding: 40px 30px;
//   p {
//     width: 25%;
//     text-align: center;
//   }
//   i {
//     display: block;
//     width: 72px;
//     height: 72px;
//     margin: 0 auto 10px auto;
//     text-align: center;
//     line-height: 72px;
//     border-radius: 50%;
//     font-size: 36px;
//     color: #3799ff;
//     background-color: #ffffff;
//     box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.11);
//   }
//   span {
//     font-size: 24px;
//   }
// }
.modal-content {
  padding: 30px;
  font-size: 22px;
  p {
    margin-top: 10px;
  }
}
.blues {
  margin: 30px;
  font-size: 24px;
  .iconfont {
    font-size: 28px;
    padding-right: 8px;
  }
}
</style>
