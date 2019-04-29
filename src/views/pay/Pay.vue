<template>
  <div class="pay-ment-wrap">
    <div class="pay-ment">
      <div class="pay-info">
        <div class="pay-info-header flex flex-jc-b">
          <span>尊敬的{{order.linceNo}}</span>
          <span>{{order.ownerName}}</span>
        </div>
        <div class="insure-content" v-if="type=='insure'">
          <p class="ins-box">
            <span>请支付您的交强险</span>
            <span>金额：￥{{total}}</span>
          </p>
          <p class="ins-align">
            <span>（交强险+车船税）</span>
            <em class="icon-faq" @click="showDeductionModal=true"></em>
          </p>
        </div>
        <div class="device-content" v-if="type=='device'">
          <!-- <p>请进行支付</p> -->
          <p class="desciption flex flex-jc-b">
            <span>因数盒子</span>
            <span>押金
              <em class="tip">(可退)</em>
            </span>
          </p>
          <p class="tip">(车险专用智能硬件产品）</p>
          <p class="tip">温馨提示：如后续服务停止或不再使用本服务，押金可退回。</p>
        </div>

        <div class="pay-info-bottom">
          <p class="ins-box">
            <span>支付方式</span>
            <span>￥{{total}}</span>
          </p>
          <div class="ins-box">
            <span class="ins-align">
              <em class="icon-weChat"></em>微信支付
            </span>
            <div class="out-checkbox-wrap">
              <div class="ins-checkbox-wrap">
                <input type="checkbox" id="typeWechat" class="ins-checkbox" v-model="checkWxPay">
                <span :class="{'ins-check': checkWxPay }"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="protocol-wrap">
        <div class="out-checkbox-wrap">
          <div class="ins-checkbox-wrap">
            <input type="checkbox" id="type" class="ins-checkbox" v-model="checkProtocol">
            <span :class="{'ins-check': checkProtocol }"></span>
          </div>
        </div>
        <p>我已阅读并同意
          <router-link class="blues" :to="{name:'Protocol'}">《天天车保用户服务协议》</router-link>
        </p>
      </div>

      <div class="btn-wrap ins-center">
        <button
          type="button"
          class="sign-up-btn"
          :disabled="!checkProtocol || !checkWxPay ||total==null"
          @click="handlePay"
        >确认支付</button>
      </div>
    </div>
    <DeductionModal v-if="showDeductionModal"></DeductionModal>
  </div>
</template>

<script>
// import DeductionModal from "./components/DeductionModal";
import { ua } from "@/utils/browser";
// import { wechat } from "@/utils/wechat";
import { character } from "@/utils/character";
import { mapGetters } from "vuex";
// import wx from 'weixin-jsapi'
export default {
  components: {
    DeductionModal: () => import("./components/DeductionModal")
  },
  data() {
    return {
      checkWxPay: false,
      checkProtocol: false,
      showDeductionModal: false,
      order: {},
      type: this.$route.query.type
      // iOSPath: "https://www.meirichexian.com/insureapp/"
    };
  },
  computed: {
    ...mapGetters(["userId", "openId"]),
    total() {
      const { forceTotal, taxTotal } = this.order;
      return this.type == "insure"
        ? character.operation(forceTotal, taxTotal, "+")
        : 200;
    }
  },
  created() {
    this.getOrderDetailByOrderId();
  },
  methods: {
    /**
     *@description 通过订单id查询订单详情
     */
    getOrderDetailByOrderId() {
      const params = {
        orderId: this.$route.query.orderId
      };
      this.$http.getMyOrderList(params).then(res => {
        if (res.data.respcode == "00") {
          this.order = res.data.insureOrderlist[0];
        }
      });
    },
    /**
     * @description 支付
     * @param {Object} order 订单对象
     */
    handlePay() {
      if (!ua.isMobile) {
        return this.$toast("请在手机完成支付");
      }

      // 交强险支付
      if (this.type == "insure") {
        const params = {
          orderno: this.order.order_id,
          fee: this.total,
          openId: this.openId,
          platUserId: this.userId
        };
        this.payInsure(params);
      }
      // 设备押金支付
      if (this.type == "device") {
        const params = {
          carId: this.order.car_id,
          openId: this.openId,
          platUserId: this.userId
        };
        this.payDevice(params);
      }
    },

    // /**
    //  * @description 检查签约状态弹出框(防止不刷新机型)
    //  */
    // checkWebPayStateModal() {
    //   setTimeout(() => {
    //     this.$messageBox.alert("您支付了吗?").then(action => {
    //       this.checkWebPayState();
    //     });
    //   }, 3000);
    // },
    // /**
    //  * @description 检查支付状态
    //  */
    // checkWebPayState() {
    //   const params = {
    //     orderId: this.$route.query.orderId
    //   };
    //   this.$http.getMyOrderList(params).then(res => {
    //     const order = res.data.insureOrderlist[0];
    //     if (res.data.respcode == "00") {
    //       if (order.force_status == 6) {
    //         this.goToResultPage("success");
    //       } else {
    //         this.goToResultPage("fail");
    //       }
    //     }
    //   });
    // },
    /**
     * @description 支付设备押金
     */
    payDevice(params) {
      this.$http.payDepositByCarId2(params).then(res => {
        if (res.data.respcode == "00") {
          if (res.data.h5PayUrl) {
            window.location.href = res.data.h5PayUrl;
          } else {
            if (ua.isWeChat) {
              this.weChatPay(res.data.finalPackage);
            }
          }
        }
      });
    },
    /**
     * @description 支付交强险
     */
    payInsure(params) {
      this.$http.h5WechatPay(params).then(res => {
        if (res.data.respcode == "00") {
          if (res.data.h5PayUrl) {
            window.location.href = res.data.h5PayUrl;
          } else {
            if (ua.isWeChat) {
              this.weChatPay(res.data.finalPackage);
            }
          }
        }
      });
    },

    /**
     * @description 微信支付
     */
    weChatPay(config) {
      wx.chooseWXPay({
        timestamp: config.timeStamp.toString(), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
        package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: config.paySign, // 支付签名
        success: () => {
          this.goToResultPage("success");
        },
        fail: () => {
          this.goToResultPage("fail");
        }
      });
    },

    goToResultPage(state) {
      this.$router.replace({
        name: "PayResult",
        query: {
          state: state,
          type: this.type,
          orderId: this.$route.query.orderId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.pay-ment-wrap {
  width: 100%;
  padding: 30px 20px;
  font-size: 24px;
  line-height: 48px;
}
.pay-info {
  margin-bottom: 50px;
  background-color: #ffffff;
  box-shadow: 0px 6px 29px 0px rgba(210, 210, 210, 0.48);
  border-radius: 9px;
}
.pay-info-header {
  padding: 30px;
}
.insure-content,
.device-content {
  padding: 30px 0;
  margin: 0 30px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.insure-content {
  p:nth-of-type(1) {
    margin-bottom: 20px;
  }
  p:nth-of-type(2) {
    margin-bottom: 20px;
  }
}
.pay-info-bottom {
  padding: 30px;
}
.device-content {
  .tip {
    color: #515151;
  }
}
.pay-info-bottom {
  p:nth-of-type(1) {
    margin-bottom: 50px;
  }
}
.protocol-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
.icon-weChat {
  @include icon(50, 50, "icon/weChat.png");
  margin-right: 20px;
}
.icon-faq {
  margin-left: 15px;
  @include icon(32, 32, "icon/quo-faq.png");
}
</style>
