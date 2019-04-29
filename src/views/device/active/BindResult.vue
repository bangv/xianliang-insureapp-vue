<template>
  <div class="device-status-wrap">
    <div class="device-status" v-if="state == 501">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/device_ungenerate.png'" alt="未生成订单">
      </div>
      <h2>您目前尚未生成投保订单，
        <br>无法激活该设备!
      </h2>
      <p>如您有疑问或咨询投保其他问题，请联系天天车保</p>
      <p>
        客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>

      <button type="button" class="sign-up-btn" @click="backHomePage">返回个人中心</button>
    </div>

    <div class="device-status" v-if="state == 403||state==402">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/device_mismatching.png'" alt="无法绑定">
      </div>
      <h2>您的账号与设备不匹配，
        <br>无法进行绑定!
      </h2>
      <p>如您有疑问或咨询投保其他问题，请联系天天车保</p>
      <p>
        客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>

      <button type="button" class="sign-up-btn" @click="backHomePage">返回个人中心</button>
    </div>

    <div class="device-status" v-if=" state == 401 ">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/device_unopened.png'" alt="未开通微信自动扣费">
      </div>
      <h2>您的订单未开通微信自动扣费，
        <br>请开通后进行绑定!
      </h2>
      <p>如您有疑问或咨询投保其他问题，请联系天天车保</p>
      <p>
        客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>

      <button type="button" class="sign-up-btn" @click="h5Sign">前往开通</button>
    </div>

    <div class="device-status" v-if="state == 405">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/device_not_deposit.png'" alt="未支付押金">
      </div>
      <h2>您未支付该设备押金，
        <br>请完成支付后进行绑定!
      </h2>
      <p>如您有疑问或咨询投保其他问题，请联系天天车保</p>
      <p>
        客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>

      <button
        type="button"
        class="sign-up-btn"
        @click="postPayDeposit"
        :disabled="status.isPaying||!order"
      >{{status.isPaying?'支付中...':'立即支付'}}</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { platform } from "@/utils/browser";
export default {
  data() {
    return {
      state: this.$route.query.state, // state: 401未签约 402设备已被绑定 403绑定失败 404 参数非法
      carId: this.$route.query.carId,
      deviceCode: this.$route.query.deviceCode,
      order: null,
      payTimer: null,
      payLoopCount: 0,
      status: {
        isPaying: false
      }
    };
  },
  computed: {
    ...mapGetters(["userId", "openId"])
  },
  created() {
    this.getSingleOrderByCarId();
  },
  destroyed() {
    clearInterval(this.payTimer);
  },
  methods: {
    backHomePage() {
      this.$router.push({
        name: "mine"
      });
    },
    /**
     * @description 查询要支付的订单信息
     */
    getSingleOrderByCarId() {
      // 需支付状态
      if (this.state == 401 || this.state == 405) {
        const params = {
          platUserId: this.userId,
          orderType: "0",
          pageIndex: 1,
          pageSize: 100
        };
        this.$http.getMyOrderList(params).then(res => {
          if (res.data.respcode == "00") {
            const carId = this.carId;
            const orderList = res.data.insureOrderlist.list;
            // this.order = orderList.filter(item => {
            //   return carId == item.car_id
            // })
            for (let order of orderList) {
              if (carId == order.car_id) {
                this.order = order;
                this.handleSigleOrderSignAfter(order);
                return;
              }
            }
          }
        });
      }
    },
    /**
     * @description 处理订单签约完后返回该页面
     */
    handleSigleOrderSignAfter(order) {
      // 如果当前页面是发起签约的页面且已签约
      if (this.state == 401) {
        if (order.sign_status == 1) {
          this.$toast("签约成功");
          this.$router.push({
            name: "BindDevice",
            query: {
              carId: this.carId,
              deviceCode: this.deviceCode
            }
          });
        }
      }
    },
    /**
     * @description H5 签约
     */
    h5Sign() {
      // 若改订单未签约
      if (!this.order.sign_status || this.order.sign_status == 0) {
        const params = {
          orderId: this.order.order_id,
          type: platform.type(),
          platUserId: this.userId,
          openId: this.openId
        };
        this.$http.h5Sign(params).then(res => {
          if (res.data.respcode == "00") {
            if (res.data.signStatus == 1) {
              return this.$toast("该用户已签约");
            }
            // this.checkSignStateModal()
            window.location.href = res.data.redirectUrl;
          }
        });
      }
    },
    // /**
    //  * @description 检查签约状态弹出框(防止不刷新机型)
    //  */
    // checkSignStateModal() {
    //   setTimeout(() => {
    //     this.$messageBox.alert('您签约了吗?').then(action => {
    //       const params = {
    //         orderId: this.order.order_id
    //       }
    //       this.$http.checkOrderSignStatus(params).then(res => {
    //         if (res.data.respcode == '01') {
    //           this.$toast('签约失败')
    //         } else {
    //           this.$toast('签约成功')
    //           this.$router.push({
    //             name: 'BindDevice',
    //             query: {
    //               carId: this.carId
    //             }
    //           })
    //         }
    //       })
    //     })
    //   }, 1000)
    // },

    /**
     * @description 支付 设备押金
     * @param {carId} carId
     */
    postPayDeposit() {
      this.$messageBox.confirm("确定支付设备押金？").then(value => {
        if (value === "confirm") {
          if (this.order) {
            const params = {
              carId: this.carId
            };
            this.$http.postPayDeposit(params).then(res => {
              if (res.data.respcode == "00") {
                this.status.isPaying = true;
                // this.$indicator.open()
                this.loopQueryOrderPayState();
              }
            });
          }
        }
      });
    },
    /**
     * @description 查询支付押金 状态
     * @param {carId} carId
     */
    loopQueryOrderPayState() {
      const params = {
        carId: this.carId
      };
      this.$http.getPayDepositStatus(params).then(res => {
        this.payLoopCount++;
        if (res.data.respcode == "00") {
          this.$toast("支付完成");
          this.status.isPaying = false;
          // this.$indicator.close()
          clearInterval(this.payTimer);
          this.$router.push({
            name: "PayResult",
            query: {
              state: "success",
              carId: this.carId,
              deviceCode: this.deviceCode
            }
          });
        } else {
          if (!this.payTimer) {
            this.payTimer = setInterval(() => {
              this.loopQueryOrderPayState();
            }, 3000);
          } else {
            if (this.payLoopCount >= 7) {
              this.payLoopCount = 0;
              this.status.isPaying = false;

              clearInterval(this.payTimer);
              this.$router.push({
                name: "PayResult",
                query: {
                  state: "fail",
                  carId: this.carId,
                  deviceCode: this.deviceCode,
                  status: this.$route.query.state
                }
              });
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.device-status-wrap {
  width: 100%;
  padding: 30px 50px;
}
.device-status {
  text-align: center;
  .img-wrap {
    padding: 100px 0 20px;
    img {
      width: 50%;
    }
  }
}

button {
  margin-top: 100px;
}
h2 {
  margin: 60px 0;
  font-size: 36px;
  line-height: 60px;
}
p {
  font-size: 22px;
  line-height: 36px;
}
</style>
