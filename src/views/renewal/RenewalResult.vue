<template>
  <div class="result">
    <div class="device-status" v-if="state==='success'">
      <div class="img-wrap">
        <img :src="`${baseUrl}images/upload_success.png`" alt="续期成功">
      </div>
      <h2>恭喜 {{$route.query.linceNo}}，服务续期成功！</h2>
      <p v-if="!salesPhone">如您有任何疑问，请咨询客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>

      <p v-else class="result-hint border-top-scaleY">服务续期消息已通过“天天车保”微信公众号进行推送，
        <br>请车主前往查看并进行确认
      </p>

      <button type="button" class="sign-up-btn" @click="goToOrderDetail">查看订单</button>
    </div>

    <div class="device-status" v-if="state==='fail'">
      <div class="img-wrap">
        <img :src="`${baseUrl}images/upload_defeate.png`" alt="续期失败">
      </div>
      <h2>抱歉，服务续期失败！</h2>
      <p>请点击重新续期，重新完成操作！</p>
      <button type="button" class="sign-up-btn" @click="goBack">重新续期</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      state: this.$route.query.state
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   const result = to.query.state;
  //   debugger;
  //   if (result == "success") {
  //     to.meta.title = "续期成功";
  //   } else {
  //     to.meta.title = "续期失败";
  //   }
  //   // to.meta.title=result == "success"?"续期成功":"续期失败";
  //   console.log(to);
  //   next();
  // },
  computed: {
    ...mapGetters({
      salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "Renewal",
        linceNo: this.$route.query.license,
        orderId: this.$route.query.orderId
      });
    },
    goToOrderDetail() {
      if (this.salesPhone) {
        this.$router.push({
          name: "BusinessOrderList",
          query: {
            tab: "CompletedOrder"
          }
        });
      } else {
        this.$router.push({
          name: "OrderList",
          query: {
            tab: "UnCompletedOrder"
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.device-status {
  text-align: center;
  .img-wrap {
    padding: 100px 0 20px;
    img {
      width: 301px;
      height: 216px;
    }
  }
}
.result-hint {
  margin: 100px 30px 0;
  padding-top: 60px;
  border-top: 1px solid #d9d9d9;
  line-height: 60px;
  text-align: center;
  color: #9d9d9d;
}
button {
  margin-top: 100px;
}
h2 {
  margin-top: 50px;
  margin-bottom: 20px;

  font-size: 36px;
  line-height: 60px;
}
p {
  font-size: 22px;
  line-height: 36px;
  color: #838383;
}
</style>
