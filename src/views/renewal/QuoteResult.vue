<template>
  <div class="result">
    <div v-if="result==='1'">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/state/fail.png'" alt="续期失败">
      </div>
      <h2>尊敬的{{linceNo}}车主</h2>
      <p>由于保司规则限制，无法进行在线报价，请联系我们</p>
      <p>
        工作人员，客服热线:
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>

      <button type="button" class="sign-up-btn" @click="getOrderDetailByOrderId">重新报价</button>
    </div>

    <div v-if="result==='2'">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/device_ungenerate.png'" alt="续期失败">
      </div>
      <h2>尊敬的{{linceNo}}车主</h2>
      <p>经过天天车保产品风险评估，您的车辆无法续期，</p>
      <p>但并不影响您使用天天车保车联网服务</p>
    </div>
  </div>
</template>

<script>
import { insure } from "@/utils/insure";
import { date } from "@/utils/date";
import { storage } from "@/utils/browser";
// import order from "../../store/modules/order";
export default {
  data() {
    return {
      orderInfo: {},
      linceNo: this.$route.query.linceNo,
      result: this.$route.query.result
    };
  },
  methods: {
    /**
     *@description 查询订单，显示订单中险种及支付，调试状态
     */
    getOrderDetailByOrderId() {
      const params = {
        orderId: this.$route.query.orderId
      };
      this.$http.getMyOrderList(params).then(res => {
        if (res.data.respcode == "00") {
          this.orderInfo = res.data.insureOrderlist[0];
          // console.log(this.orderInfo);
          this.syncInfo();
        }
      });
    },

    // 重新报价

    syncInfo() {
      const orderInfo = this.orderInfo;
      this.setMarkInfo(orderInfo);
      this.setCarInfo(orderInfo);
      this.setInsureInfo(orderInfo);
      this.$router.push({
        name: "Proposal"
      });
    },
    setMarkInfo(orderInfo) {
      const markInfo = {
        linceNo: orderInfo.linceNo,
        regionCode: orderInfo.cityCode,
        carId: orderInfo.car_id,
        cityAbbr: orderInfo.linceNoPrefix
      };

      this.$store.commit("SET_MARK_INFO", markInfo);
    },

    /**
     * @description 缓存车辆信息
     */
    setCarInfo(orderInfo) {
      // 后台返回时间有误，重新转化时间戳，再转年月日
      const today = date.getSpecifiedDate(0);
      const laterweek = date.getSpecifiedDate(7);
      const maxDay = date.getSpecifiedDate(90);
      let {
        businessstartdate,
        quotation_enddate,
        force_enddate,
        force_startdate
      } = orderInfo;
      quotation_enddate = quotation_enddate
        ? quotation_enddate.split(" ")[0]
        : laterweek;
      let dateTime = new Date(quotation_enddate);
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      quotation_enddate = date.changeDate(dateTime);
      businessstartdate =
        quotation_enddate &&
        quotation_enddate > today &&
        quotation_enddate < maxDay
          ? quotation_enddate
          : laterweek;

      force_enddate = force_enddate ? force_enddate.split(" ")[0] : laterweek;
      force_startdate =
        force_enddate && force_enddate > today && force_enddate < maxDay
          ? force_enddate
          : laterweek;
      orderInfo = Object.assign({}, orderInfo, {
        businessstartdate: businessstartdate,
        force_startdate: force_startdate
      });
      const carInfo = insure.assemblyCarInfo(orderInfo);

      this.$store.commit("SET_CAR_INFO", carInfo);
    },
    /**
     * @description 缓存险种信息
     */
    setInsureInfo(orderInfo) {
      const insureInfo = insure.assemblyInsureInfo(orderInfo);
      this.$store.commit("SET_INSURED_INFO", insureInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.result {
  text-align: center;
  .img-wrap {
    padding: 100px 0 20px;
    text-align: center;
    img {
      width: 290px;
      height: 224px;
    }
  }
}
.sign-up-btn {
  margin-top: 100px;
}

h2 {
  margin: 20px 0;
  font-size: 36px;
  line-height: 60px;
}
p {
  font-size: 22px;
  line-height: 50px;
}
</style>
