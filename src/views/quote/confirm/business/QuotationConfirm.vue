<template>
  <div class="quo-confirm-wrap">

    <div class="quo-confirm insure-card">
      <h2 class="border-bottom-scaleY">服务内容</h2>

      <div class="ins-date border-bottom-scaleY">
        <p>
          <span>服务承保：</span>
          <span>{{planInfo.source|companyName}}</span>
        </p>

        <p>
          <span>服务时间：</span>
          <span>{{ carInfo.BizStartDate.split(' ')[0] }}至{{ carInfo.BizStartDate | handleDeadline }}</span>
        </p>

      </div>

      <div class="ins-class border-bottom-scaleY">
        <p>共选择 <span>{{$route.query.insCount}}</span> 个险种</p>
        <SelectedInsure></SelectedInsure>
        <p
          class="explain"
          v-if="planInfo.forcetotal > 0 || planInfo.taxtotal > 0"
        >交强险：交强险/车船税</p>
        <div class="ins-box">
          <p>服务价格：{{planInfo.dailytotal}}元/天</p>
          <p>封顶天数：{{planInfo.total_days}}天</p>
        </div>

        <p v-if="planInfo.forcetotal>0 || planInfo.taxtotal>0">
          <span v-if="planInfo.forcetotal>0">交强险</span><span v-if="planInfo.taxtotal>0">/车船税</span>：
          <span v-if="planInfo.forcetotal>0">{{planInfo.forcetotal}}元</span> <span v-if="planInfo.taxtotal>0">/{{planInfo.taxtotal}}元</span>
        </p>
      </div>

      <div class="ins-owner-info border-bottom-scaleY">

        <p><span>车牌号：</span> <span>{{ carInfo.LicenseNo?carInfo.LicenseNo : '******' }}</span></p>
        <p v-if="planInfo.vehicleinfo"><span>车辆型号：</span> <span>{{ planInfo.vehicleinfo.split('/')[0] }}</span></p>
        <p><span>车主姓名：</span> <span>{{ carInfo.CarOwnersName }}</span></p>
        <p><span>手机号码：</span> <span>{{ carInfo.MobilePhone }}</span></p>
        <p class="owner-info-bottom">
          <span>身份证号：</span>
          <span>{{ carInfo.IdCard }}</span>
        </p>
      </div>
      <!--被保险人信息-->
      <div class="ins-beneficiary">
        <h3 class="">被保险人信息</h3>
        <p><span>被保险人姓名：</span> <span>{{ carInfo.InsuredName }}</span></p>
        <p><span>被保险人证件号：</span> <span>{{ carInfo.InsuredIdCard }}</span></p>
      </div>

    </div>
    <p class="grays hint">温馨提示：请与客户沟通好以上信息，如无疑问，请确认提交！</p>
    <div class="btn-wrap ins-center">
      <button
        type="button"
        class="sign-up-btn"
        @click="postSalesmanConfirmOrder"
      >确认提交</button>
    </div>
  </div>
</template>

<script>
import { storage } from "@/utils/browser";
import { mapGetters } from "vuex";
import SelectedInsure from "@/components/share/SelectedInsure";

export default {
  name: "QuotationConfirm",
  components: {
    SelectedInsure
  },
  data() {
    return {
      planInfo: {},
    };
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO",
      salesPhone: "salesPhone"
    }),
  },

  created() {
    this.planInfo = storage.getItem("PLAN_INFO");

  },
  methods: {

    /**
     * @description 电销人员确认订单
     * @param {String} id 报价单日志ID
     */
    postSalesmanConfirmOrder() {
      const params = {
        id: this.planInfo.id,
        insuredname: this.carInfo.InsuredName,
        insuredidcard: this.carInfo.InsuredIdCard,
        insuredidtype: this.carInfo.InsuredIdType,
        // serialNo : this.businessParams.serialNo
      };

      this.$http.postSalesmanConfirmOrder(params).then(res => {
        // this.result = res.data.errCode;
        // 200：提交订单成功 // 201： 提交订单失败；

        this.$router.push({
          name: "ConfirmSubmitStatus",
          query: {
            result: res.data.errCode, // 订单状态
            linceNo: this.carInfo.LicenseNo,
            ownerName: this.carInfo.CarOwnersName,
            // serialNo : this.businessParams.serialNo
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.quo-confirm-wrap {
  width: 100%;
  padding: 30px 20px;
  background-color: #f5f5f5;
  font-size: 24px;
  line-height: 60px;
}
.quo-confirm {
  h2 {
    font-size: 30px;
    padding-bottom: 10px;
    font-weight: bold;
  }
  h3 {
    font-size: 26px;
    font-weight: bold;
  }
  .owner-info-left {
    width: 45%;
  }
}
.ins-date,
.ins-class {
  padding: 20px 0;
}
.ins-owner-info {
  padding: 20px 0;
  margin-bottom: 20px;
  font-size: 24px;
}
.order-insured {
  font-size: 26px;
  color: #131313;
}
.ins-date {
  img {
    width: 80px;
  }
}

.hint {
  text-align: center;
  line-height: 30px;
  margin-bottom: 60px;
}
</style>
