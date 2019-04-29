<template>
  <div class="pay-status-wrap">
    <div class="device-status" v-if="state==='success'">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/upload_success.png'" alt="支付成功">
      </div>
      <h2>恭喜您，支付成功！</h2>
      <p type="button">
        页面将在
        <i class="blues">{{second}}</i> 秒后自动跳转
      </p>
    </div>

    <div class="device-status" v-if="state==='fail'">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/upload_defeate.png'" alt="支付失败">
      </div>
      <h2>抱歉，支付失败！</h2>
      <p>如您有疑问或咨询投保其他问题，请联系天天车保</p>
      <p>
        客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>
      <button type="button" class="sign-up-btn" @click="goToFailAfterPage">重新支付</button>
    </div>
  </div>
</template>

<script>
import { insure } from "@/utils/insure";
export default {
  data() {
    return {
      state: this.$route.query.state,
      second: 3,
      timer: null
    };
  },
  mounted() {
    this.handleAutoGoBack();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    handleAutoGoBack() {
      if (this.state == "success") {
        this.timer = setInterval(() => {
          this.second--;
          if (this.second === 0) {
            clearInterval(this.timer);
            this.goToSuccessAfterPage();
          }
        }, 1000);
      }
    },
    // 支付成功前往下一步页面
    goToSuccessAfterPage() {
      const { orderId, carId, deviceCode } = this.$route.query;
      if (orderId) {
        this.$router.replace({
          name: "OrderList",
          query: {
            tab: "UnCompletedOrder"
          }
        });
      }

      if (carId && deviceCode) {
        this.$router.replace({
          name: "BindDevice",
          query: {
            carId: carId,
            deviceCode: deviceCode
          }
        });
      }
    },
    // 支付失败后返回来源页面
    goToFailAfterPage() {
      const { orderId, carId, deviceCode, status, type } = this.$route.query;
      if (orderId) {
        const params = {
          orderId: this.order.order_id,
          // linceNo: this.order.linceNo,
          type: type
        };
        insure.goToPayment(this.$router, params);

        // if (ua.isiOS) {
        //   window.location.href = `${window.location.origin}${
        //     env.ROOT
        //   }pay?orderId=${orderId}&type=${type}`;
        // } else {
        //   this.$router.replace({
        //     name: "Pay",
        //     query: {
        //       orderId: orderId,
        //       type: type
        //     }
        //   });
        // }
      }
      // 设备激活流程
      if (carId && deviceCode) {
        this.$router.replace({
          name: "BindResult",
          query: {
            state: status,
            carId: carId,
            deviceCode: deviceCode
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
