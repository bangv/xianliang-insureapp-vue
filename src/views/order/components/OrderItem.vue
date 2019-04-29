<template>
  <div
    class="order-card"
    @click="goToOrderDetail"
  >
    <div
      class="item-top layout"
      v-if="type"
    >
      <em>{{order.creatTime | handleTimeStr}}</em>
      <p
        class="blues"
        v-if="type==1"
      >已完成</p>
      <p
        class="blues"
        v-if="type==0"
      >{{order.status==7?'已取消':'待完成'}}</p>
    </div>
    <div class="content-item">
      <div class=" layout ">
        <em>车牌号</em>
        <p class="">
          {{order.linceNo}}

          <!--<span-->
            <!--@click.stop="uploadInfo"-->
            <!--class="upload-entry"-->
            <!--v-if="type==0&&order.status!=7"-->
          <!--&gt;<i class="iconfont camera-icon">&#xe62b;</i>上传资料</span>-->
        </p>
      </div>
      <div class=" layout ">
        <em>服务承保</em>
        <p class="insure-flexbox insure-flexbox-align-center">
          <span>{{order.source |companyName}}</span>
        </p>
      </div>
      <div class=" layout ">
        <em>服务费用</em>
        <p>{{order.daily_price}}元/天</p>

      </div>
      <div
        class=" layout "
        v-if="order.total_days>0"
      >
        <em>封顶天数</em>
        <p>{{order.total_days}}天</p>

      </div>
      <OrderInsure :insure="order"></OrderInsure>

      <div class=" layout insure-date">
        <em>服务时间</em>
        <p>
          <time v-if="order.quotation_startdate">{{order.quotation_startdate.split(' ')[0]}}</time>
          <time v-if="order.quotation_enddate">至{{order.quotation_enddate.split(' ')[0]}}</time>

        </p>

      </div>
      <div
        class=" layout "
        v-if="order.forceTotal+order.taxTotal>0"
      >
        <em class="ins-left">交强险</em>
        <p class="ins-info-right ">
          交强险、车船税
        </p>
      </div>
      <!-- <div class=" layout insure-date" v-if="order.forceTotal+order.taxTotal>0">
        <em>服务期限（交强险）</em>
        <p class="">
          <time>{{order.force_startdate}}</time>
          <time>至{{order.force_enddate}}</time>
        </p>
      </div> -->
      <button
        class="insure-btn close-order-btn"
        v-if="order.status!=7&&order.sign_status != 1&&order.force_status != 6"
        @click.stop="closeOrder"
      >订单取消</button>

    </div>

    <div class="content-item order-status">
      <div class=" layout ">
        <em class="insure-flexbox insure-flexbox-align-center">
          <span>开通微信自动续费&nbsp;</span>
        </em>
        <span v-if="order.sign_status == 1 "> 已开通</span>
        <button
          class="insure-btn"
          v-else
          @click.stop="h5Sign"
          :disabled="order.status==7"
        >立即开通</button>
      </div>
      <div class=" layout ">
        <em class="insure-flexbox insure-flexbox-align-center">
          <span>设备押金（{{order.deposit?order.deposit:200}}元）</span>
        </em>
        <i v-if="order.note"> 已支付</i>
        <button
          class="insure-btn"
          @click.stop="goToPayment('device')"
          :disabled="order.status==7||state.isPaying"
          v-else
        >{{state.isPaying?'支付中...':'立即支付'}}</button>
      </div>
      <div
        class=" layout "
        v-if="+order.forceTotal + +order.taxTotal>0"
      >
        <!-- 1:报价失败 2:审核失败 3:等待人工审核结果 4:审核成功 ：5:已支付, 6:已支付 -->
        <em class="insure-flexbox insure-flexbox-align-center">
          <span>交强险、车船税
            <i :class="{'oranges':order.status!=7}">({{order.forceTotal |operation(order.taxTotal,'+')}}元)</i>
          </span>
        </em>
        <button
          class="insure-btn"
          v-if="order.source!=32&&order.force_status != 6"
          @click.stop="handlePayment"
          :disabled="order.status==7"
        >立即支付</button>
        <button
          class="insure-btn"
          v-if="order.source==32&&order.force_status != 6"
          @click.stop="handlePayment"
          :disabled="order.status==7||(!order.paymentNo&&!order.checkNo)"
        >立即支付</button>
        <span v-if="order.force_status == 6">已支付</span>
      </div>
      <!--7:已取消-->
      <div
        class="layout insure-flexbox insure-flexbox-align-center insure-flexbox-content-between"
        v-if="!order.device_code"
      >
        <em>硬件绑定
        </em>
        <button
          class="insure-btn"
          @click.stop="goToBindDevice"
          :disabled="order.status==7"
        >立即前往</button>
      </div>
      <div
        class="layout insure-flexbox insure-flexbox-align-center insure-flexbox-content-between"
        v-else
      >
        <em>硬件激活
        </em>
        <button
          class="insure-btn"
          @click.stop="goToConectDevice"
          v-if="order.sim==0"
          :disabled="order.status==7"
        >立即前往</button>
        <span v-else>已完成</span>
      </div>

      <div class="layout ins-box" v-if="order.status!=7">
        <em>上传资料
        </em>
        <button
          class="insure-btn"
          @click.stop="uploadInfo"
          v-if="order.status!=2"
        >立即上传</button>
        <span v-else>已上传</span>
      </div>


      <div class="policy-item">
        <p v-if="order.status!=7">
          <em>服务保单</em>
          <i
            class="oranges"
            v-if="order.status!=2"
          >（未审核）</i>
          <span v-else>已审核</span>
        </p>
        <p v-if="order.status!=7&&order.status!=2">
          <i class="oranges">温馨提示：</i>
          服务费用以最终审核通过为准！
        </p>
      </div>
    </div>
    <div class="express-item">
      <div class="state">
        <p>物流状态（设备）</p>
        <p>{{order.trackingNumber?'已寄送':'未寄送'}}</p>
      </div>
      <p
        class="blues"
        v-if="order.trackingNumber"
      >查看物流</p>
    </div>
    <div class="card-footer">
      <div class=" layout ">
        <em>订单编号</em>
        <p class="">{{order.order_id}}</p>
      </div>
      <button class="insure-btn close-order-btn">订单详情</button>
    </div>
  </div>

</template>

<script>
import { storage, session, ua, platform } from "@/utils/browser";

import { mapGetters } from "vuex";
// import OrderInsure from "@/components/share/OrderInsure";
import { insure } from "@/utils/insure";
export default {
  components: {
    OrderInsure:()=> import("@/components/share/OrderInsure")
  },
  props: {
    order: Object, //  订单对象
    type: String // 订单类型
  },
  data() {
    return {
      payTimer: null,
      payLoopCount: 0,
      state: {
        isPaying: false
      }
    };
  },
  computed: {
    ...mapGetters(["userId", "openId"])
  },
  destroyed() {
    clearInterval(this.payTimer);
  },
  methods: {
    closeOrder() {
      const order = this.order;
      this.$messageBox.confirm("确定要取消该订单吗？").then(value => {
        if (value === "confirm") {
          const params = {
            orderId: order.order_id
          };
          this.$http.closeOrder(params).then(res => {
            if (res.data.respcode == "00") {
              this.$emit("reload");
              this.$toast("取消成功");
            } else {
              this.$toast("取消失败");
            }
          });
        }
      });
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
        if (res.data.respcode == "01") {
          return this.$toast("签约失败");
        }
        if (res.data.signStatus == 1) {
          this.$emit("reload");
          this.$toast("该用户已签约");
        } else {
          // this.checkSignStateModal()
          // storage.setItem("SIGN_ORDER", params.orderId); // 标记正在签约状态
          window.location.href = res.data.redirectUrl;
        }
      });
    },
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
    //             this.loopQueryOrderPayState();
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
    //       this.$emit("reload");
    //       // this.$indicator.close()
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
     * @description 前往订单详情
     */
    goToOrderDetail() {
      this.$router.push({
        name: "OrderDetail",
        params: {
          id: this.order.order_id
        }
      });
    },
    /**
     * @description 前往设备绑定
     */
    goToBindDevice() {
      this.$router.push({
        name: "BindDevice",
        query: {
          carId: this.order.car_id
        }
      });
    },
    /**
     * @description 前往设备调试
     */
    goToConectDevice() {
      const { linceNo, device_code } = this.order;
      this.$router.push({
        name: "ConnectDevice",
        query: {
          lincenNo: linceNo,
          deviceCode: device_code
        }
      });
    },
    /**
     * @description 前往 交强险 支付页面
     */
    handlePayment() {
      const { source, paymentNo, checkNo, linceNo, order_id } = this.order;
      if (source == 32) {
        this.$toast("正在前往大地保险支付平台");
        setTimeout(() => {
          session.setItem("INSURE_PAYING_ORDER", order_id);
          window.location.href = `https://secure.95590.cn/epay/mobile/mobileQuickPay.htm?consumerID=gateway&paymentNo=${paymentNo}&systemSourceCode=3404&checkNo=${checkNo}`; // 正式
          // window.location.href = `https://ssotest.ccic-net.com.cn/ebiz-pay/mobile/mobileQuickPay.htm?consumerID=gateway&paymentNo=${paymentNo}&systemSourceCode=3404&checkNo=${checkNo}` // 测试
          // window.location.href =
          // 'https://ssotest.ccic-net.com.cn/ebiz-pay/mobile/mobileQuickPay.htm?consumerID=gateway&paymentNo=d8561c8bd61854a4e63c2829cc8ae0f2&systemSourceCode=3404&checkNo=70a539a743c9befd'
        }, 1500);
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
      //     type: type
      //   }
      // });
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

.order-card {
  padding: 20px 30px;
  margin-bottom: 30px;
  line-height: 80px;
  font-size: 28px;
  border-radius: 15px;
  color: #8f8f8f;
  background-color: #fff;
  #order-insure /deep/ {
    align-items: center;
    margin-bottom: 25px;
    em {
      line-height: 30px;
    }
    p {
      display: inline-block;
      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .insure-date {
    align-items: start !important;
    em {
      line-height: 40px;
    }
    p {
      line-height: 40px;
      max-width: 60%;
    }
    time {
      display: block;
      text-align: right;
    }
  }

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
    padding: 20px 0;
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
    padding-top: 20px;
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
  .express-item {
    margin-bottom: 20px;
    line-height: 40px;
    .state {
      display: flex;
      justify-content: space-between;
    }
    .blues {
      text-align: right;
    }
  }
}
</style>
