<template>
  <div class="order-detail">
    <div class="order-card">
      <div class="content-item">
        <div class="layout">
          <em>车牌号</em>
          <p class>
            {{order.linceNo}}
            <!--            <span
              @click.stop="uploadInfo"
              class="upload-entry"
              v-if="order.status!=7&&order.force_status != 6"
            ><i class="iconfont camera-icon">&#xe62b;</i>上传资料</span>-->
          </p>
        </div>
        <div class="layout">
          <em>服务承保</em>
          <p class="insure-flexbox insure-flexbox-align-center">
            <span>{{order.source |companyName}}</span>
          </p>
        </div>
        <div class="layout">
          <em>服务费用</em>
          <p>{{order.daily_price}}元/天</p>
        </div>
        <div class="layout" v-if="order.total_days>0">
          <em>封顶天数</em>
          <p>{{order.total_days}}天</p>
        </div>

        <OrderInsure :insure="order"></OrderInsure>

        <div class="layout insure-date">
          <em>服务时间</em>
          <p>
            <time v-if="order.quotation_startdate">{{order.quotation_startdate.split(' ')[0]}}</time>
            <time v-if="order.quotation_enddate">至{{order.quotation_enddate.split(' ')[0]}}</time>
          </p>
        </div>
        <div class="layout" v-if="order.forceTotal+order.taxTotal>0">
          <em class="ins-left">交强险</em>
          <p class="ins-info-right">交强险、车船税</p>
        </div>
        <!-- <div class=" layout insure-date" v-if="order.forceTotal+order.taxTotal>0">
          <em>服务期限（交强险）</em>
          <p>
            <time>{{order.force_startdate}} </time>
            <time>至{{order.force_enddate}} </time>
          </p>
        </div>-->
      </div>

      <div class="content-item order-status">
        <div class="column-item" v-if="order.taxTotal + order.forceTotal>0">
          <!-- 1:报价失败 2:核保失败 3:等待人工审核结果 4:核保成功 ：5:已支付, 6:已支付 -->
          <p>
            <em>交强险、车船税({{order.forceTotal |operation(order.taxTotal,'+')}}元)</em>
            <button
              class="insure-btn"
              v-if="order.source!=32&&order.force_status != 6"
              @click="handlePayment"
              :disabled="order.status==7"
            >立即支付</button>
            <!-- 大地保司 -->
            <button
              class="insure-btn"
              v-if="order.source==32&&order.force_status != 6"
              @click="handlePayment"
              :disabled="order.status==7||(!order.paymentNo&&!order.checkNo)"
            >立即支付</button>
            <span v-if="order.force_status == 6">已支付</span>
          </p>
          <time v-if="order.force_status == 6">支付时间：{{order.force_statusStr|handleTimeStr}}</time>
        </div>

        <div class="column-item">
          <p>
            <em class="insure-flexbox insure-flexbox-align-center">
              <span>开通微信自动续费&nbsp;</span>
            </em>
            <span v-if="order.sign_status == 1 ">已开通</span>
            <button class="insure-btn" @click="h5Sign()" :disabled="order.status==7" v-else>立即开通</button>
          </p>
          <time v-if="order.checkTime&&order.sign_status == 1">开通时间：{{order.checkTime}}</time>
        </div>

        <div class="column-item">
          <p>
            <em>设备押金（{{order.deposit?order.deposit:200}}元）</em>
            <i v-if="order.note">已支付</i>
            <button
              class="insure-btn"
              @click="goToPayment('device')"
              :disabled="order.status==7||state.isPaying"
              v-else
            >{{state.isPaying?'支付中...':'立即支付'}}</button>
          </p>
          <time v-if="order.note">支付时间：{{order.note|handleTimeStr}}</time>
        </div>
      </div>
    </div>

    <OrderExpress :express="express" :receiver="order"></OrderExpress>

    <div class="insure-card receiver-info device-status">
      <h3>硬件激活</h3>
      <p class="ins-box">
        <span class="step">1.硬件绑定</span>
        <span class="ins-align">
          <em class="icon-finish" v-if="order.device_code"></em>
          <button
            type="button"
            class="insure-btn"
            :disabled="order.status==7"
            @click="goToBindDevice"
            v-else
          >立即绑定</button>
        </span>
      </p>
      <p class="ins-box">
        <span class="step">2.安装调试</span>
        <span class="ins-align">
          <em class="icon-finish" v-if="order.sim == 1"></em>
          <button
            type="button"
            class="insure-btn"
            :disabled="!order.device_code||order.status==7"
            @click="goToDebugDevice"
            v-else
          >立即调试</button>
        </span>
      </p>
    </div>
    <div class="insure-card policy-info" v-if="order.elecUrl">
      <em>服务保单</em>
      <p>
        <a class="blues" :href="policyUrl">查看电子保单</a>
      </p>
    </div>
    <div class="order-info">
      <p>订单编号：{{order.order_id}}</p>
      <p>更新时间：{{order.creatTime | handleTimeStr }}</p>
    </div>
    <CustomerServiceFooter></CustomerServiceFooter>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { session, storage, ua, platform } from "@/utils/browser";
import OrderExpress from "./components/OrderExpress";
// import OrderInsure from "@/components/share/OrderInsure";
import { insure } from "@/utils/insure";
import CustomerServiceFooter from "@/components/share/CustomerServiceFooter";
export default {
  components: {
    OrderExpress,
    OrderInsure: () => import("@/components/share/OrderInsure"),
    CustomerServiceFooter
  },
  data() {
    return {
      order: {},
      policyUrl: "",
      payTimer: null,
      payLoopCount: 0,
      state: {
        isPaying: false
      },
      express: {}
      // timer: null
    };
  },
  computed: {
    ...mapGetters(["userId", "openId"])
  },
  created() {
    this.getOrderDetailByOrderId();
  },
  destroyed() {
    clearInterval(this.payTimer);
  },
  methods: {
    // /**
    //  * @description 轮询检查订单签约状态
    //  */
    // loopCheckOrderSignState() {
    //   if (!this.timer) {
    //     this.timer = setInterval(() => {
    //       const params = {
    //         orderId: this.$route.params.id
    //       }
    //       this.$http.checkOrderSignStatus(params).then(res => {
    //         if (res.data.respcode == '00') {
    //           clearInterval(this.timer)
    //           this.$toast('签约成功')
    //           this.getOrderDetailByOrderId()
    //         }
    //       })
    //     }, 3000)
    //   }
    // },
    /**
     *@description 通过订单id查询订单详情
     */
    getOrderDetailByOrderId() {
      const params = {
        orderId: this.$route.params.id
      };
      this.$http.getMyOrderList(params).then(res => {
        if (res.data.respcode == "00") {
          this.order = res.data.insureOrderlist[0];
          this.handlePolicyUrl();
          this.getExpressInfo();
          // // 检查签约结果
          // if (storage.getItem('SIGN_ORDER') && ua.isMobile) {
          //   storage.removeItem('SIGN_ORDER')
          //   if (this.order.sign_status == 0) {
          //     this.$toast('签约失败')
          //   } else {
          //     this.$toast('签约成功')
          //   }
          // }
        }
      });
    },
    /**
     *@description 查询物流信息
     */
    getExpressInfo() {
      if (this.order.trackingNumber) {
        const params = {
          trackingNumber: this.order.trackingNumber
        };
        this.$http.queryRouteService(params).then(res => {
          if (res.data.respcode == "00") {
            this.express = res.data;
          }
        });
      }
    },
    /**
     * @description 保单预览
     */
    handlePolicyUrl() {
      let origin =
        this.$env === "production"
          ? "https://www.meirichexian.com"
          : "https://test1.meirichexian.com";
      if (this.order.elecUrl) {
        this.policyUrl = `${origin}/pdf/${this.order.elecUrl.replace(
          "\\",
          "/"
        )}`;
      }
    },
    /**
     * @description H5 签约
     * @param {Object} order 订单对象
     */
    h5Sign() {
      if (!ua.isMobile) {
        return this.$toast("请在手机完成签约");
      }
      const params = {
        orderId: this.order.order_id,
        type: platform.type(),
        platUserId: this.userId,
        openId: this.openId
      };
      this.$http.h5Sign(params).then(res => {
        // 签约失败
        if (res.data.respcode == "01") {
          return this.$toast("签约失败");
        }
        // 已签约
        if (res.data.signStatus == 1) {
          this.getOrderDetailByOrderId();
          this.$toast("该用户已签约");
        } else {
          // 未签约
          // this.checkSignStateModal()
          // storage.setItem('SIGN_ORDER', params.orderId) // 标记正在签约状态
          window.location.href = res.data.redirectUrl;
        }
      });
    },
    // /**
    //  * @description 检查签约状态弹出框(防止不刷新机型)
    //  */
    // checkSignStateModal() {
    //   setTimeout(() => {
    //     this.$messageBox.alert('您签约了吗?').then(action => {
    //       const params = {
    //         orderId: this.$route.params.id
    //       }
    //       this.$http.checkOrderSignStatus(params).then(res => {
    //         // storage.removeItem('SIGN_ORDER')
    //         if (res.data.respcode == '01') {
    //           this.$toast('签约失败')
    //         } else {
    //           this.$toast('签约成功')
    //           this.getOrderDetailByOrderId()
    //         }
    //       })
    //     })
    //   }, 1000)
    // },
    // /**
    //  * @description 支付 设备押金
    //  * @param {carId} carId
    //  */
    // postPayDeposit() {
    //   this.$messageBox.confirm("确定支付设备押金？").then(value => {
    //     if (value === "confirm") {
    //       if (this.order) {
    //         const params = {
    //           carId: this.order.car_id
    //         };
    //         this.$http.postPayDeposit(params).then(res => {
    //           if (res.data.respcode == "00") {
    //             this.state.isPaying = true;
    //             // this.loopQueryOrderPayState();
    //           }
    //         });
    //       }
    //     }
    //   });
    // },

    // /**
    //  * @description 查询支付押金 状态
    //  * @param {carId} carId
    //  */
    // loopQueryOrderPayState() {
    //   const params = {
    //     carId: this.order.car_id
    //   };
    //   this.$http.getPayDepositStatus(params).then(res => {
    //     this.payLoopCount++;
    //     if (res.data.respcode == "00") {
    //       this.$toast("支付完成");
    //       this.state.isPaying = false;
    //       // this.$indicator.close()
    //       this.getOrderDetailByOrderId();
    //       clearInterval(this.payTimer);
    //     } else {
    //       if (!this.payTimer) {
    //         this.payTimer = setInterval(() => {
    //           this.loopQueryOrderPayState();
    //         }, 3000);
    //       } else {
    //         if (this.payLoopCount >= 7) {
    //           this.payLoopCount = 0;
    //           this.state.isPaying = false;
    //           this.$toast("支付失败");
    //           clearInterval(this.payTimer);
    //         }
    //       }
    //     }
    //   });
    // },
    /**
     * @description 前往 交强险 支付页面
     */
    handlePayment() {
      const { source, paymentNo, checkNo, linceNo, order_id } = this.order;
      if (source == 32) {
        this.$toast("正在前往大地保险支付平台");
        setTimeout(() => {
          session.setItem("INSURE_PAYING_ORDER", order_id);
          window.location.href = `https://ssotest.ccic-net.com.cn/ebiz-pay/mobile/mobileQuickPay.htm?consumerID=gateway&paymentNo=${paymentNo}&systemSourceCode=3404&checkNo=${checkNo}`;
          // window.location.href =
          // 'https://ssotest.ccic-net.com.cn/ebiz-pay/mobile/mobileQuickPay.htm?consumerID=gateway&paymentNo=d8561c8bd61854a4e63c2829cc8ae0f2&systemSourceCode=3404&checkNo=70a539a743c9befd'
        }, 2000);
      } else {
        this.goToPayment("insure");
      }
    },
    /**
     * @description 前往支付页面
     */
    goToPayment(type) {
      const params = {
        orderId: this.order.order_id,
        // linceNo: this.order.linceNo,
        type: type
      };
      insure.goToPayment(this.$router, params);
      // this.$router.push({
      //   name: "Pay",
      //   query: {
      //     orderId: this.order.order_id,
      //     // linceNo: this.order.linceNo,
      //     type: type
      //   }
      // });
    },
    // 跳转至 设备绑定页面
    goToBindDevice() {
      this.$router.push({
        name: "BindDevice",
        query: {
          carId: this.order.car_id
        }
      });
    },
    // 跳转至 设备调试页面
    goToDebugDevice() {
      this.$router.push({
        name: "ConnectDevice",
        query: {
          lincenNo: this.order.linceNo,
          deviceCode: this.order.device_code
        }
      });
    },
    uploadInfo() {
      this.$router.push({
        name: "UploadMultiple",
        query: {
          linceNo: this.order.linceNo
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.order-detail {
  padding: 33px 36px;
  font-size: 28px;
  #order-insure {
    line-height: 40px;
    .insure-type {
      width: 70%;
      text-align: justify;
    }
  }
  .insure-date {
    align-items: start !important;
    margin-top: 16px;
    margin-bottom: 25px;
    em {
      line-height: 40px;
    }
    p {
      max-width: 60%;
      line-height: 40px;
    }
    time {
      display: block;
      text-align: right;
    }
  }

  .order-info {
    margin-top: 40px;
    color: #b2b2b2;
    p {
      margin-bottom: 30px;
    }
  }
  .policy-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // .customer-service {
  //   margin-top: 50px;
  //   text-align: center;
  //   font-size: 20px;
  //   .icon-service {
  //     margin-right: 20px;
  //     @include icon(38, 40, '../../../static/icon/device/service.png');
  //   }
  //   a {
  //     color: #1c2135;
  //   }
  // }
  .device-status {
    h3 {
      font-size: 28px;
      line-height: 50px;
    }
    p {
      line-height: 90px;
    }
  }

  .icon-finish {
    @include icon(52, 52, "icon/order_finish.png");
  }
  .icon-unfinish {
    @include icon(52, 52, "icon/order_unfinish.png");
  }

  .insure-btn {
    height: 56px;
    padding: 0 20px;
    border-radius: 28px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;
    font-size: 24px;
    line-height: 56px;
    &[disabled] {
      background: #d5d5d5;
    }
  }
  .step {
    color: #bcbcbc;
  }
}

.order-card {
  padding: 20px 30px;
  margin-bottom: 30px;
  line-height: 80px;
  font-size: 28px;
  border-radius: 15px;
  color: #8f8f8f;
  background-color: #fff;
  em {
    color: #141414;
  }
  .layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .upload-entry {
      margin-left: 10px;
      color: #007aff;
    }
    .camera-icon {
      font-size: 36px;
      vertical-align: bottom;
    }
  }

  .insure-btn {
    //width: 150px;
    padding: 0 20px;
    border-radius: 28px;
    height: 56px;
    font-size: 28px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;

    &[disabled] {
      background: #d5d5d5;
    }
    &.close-order-btn {
      background: #fff;
      border: solid 1px #9d9d9d;
      color: #9d9d9d;
    }
  }
  .item-top {
    border-bottom: solid 1px #e4e4e4;
  }
  .content-item {
    overflow: hidden;
    &.order-status {
      padding: 30px 0;
      border-top: solid 1px #e4e4e4;
    }
    .close-order-btn {
      margin: 20px 0;

      float: right;
    }
  }
  .card-footer {
    overflow: hidden;
    padding-top: 30px;
    border-top: solid 1px #e4e4e4;
    button {
      float: right;
    }
  }
  // 服务保单
  .policy-item {
    overflow: hidden;
    span {
      float: right;
    }
  }

  .column-item {
    margin-bottom: 40px;
    line-height: 40px;
    &:last-of-type {
      margin-bottom: 0;
    }
    time {
      font-size: 20px;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
