<template>
  <div class="home">
    <div class="home-banner" :class="{'irb':businessParams.user=='IRB'}"></div>
    <div class="home-content">
      <div class="msg-tip" v-if="!state.inServiceTime">您好,每日22:00-次日8:00,不提供报价服务,请明天再试!</div>
      <LicenseCityForm
        btnText="前往办理"
        :btnDisabled="!state.inServiceTime"
        @submit="getCheckCarIsRenewal"
      ></LicenseCityForm>
      <p class="hotline" v-if="state.inServiceTime">
        客服热线：
        <a href="tel:400-9898-988">400-9898-988</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LicenseCityForm from "@/components/form/LicenseCityForm";
export default {
  components: {
    LicenseCityForm
  },
  data() {
    return {
      state: {
        inServiceTime: true // 是否在服务时间
      }
    };
  },
  computed: {
    ...mapGetters({
      licenseInfo: "licenseInfo",
      city: "CITY",
      mark: "MARK_INFO",
      userId: "userId",
      salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },

  created() {
    this.checkServiceTime();
  },

  methods: {
    // 检查是否在服务时间
    checkServiceTime() {
      this.$http.checkServiceTime().then(res => {
        this.state.inServiceTime = res.data;
      });
    },
    // 检查车辆是否可以续签服务,,可以，直接跳转续期页面
    getCheckCarIsRenewal() {
      const params = {
        lincenNo: this.licenseInfo.license
      };
      this.$http.getCheckCarIsRenewal(params).then(res => {
        //B,C,若该车辆不符合续期条件，则不可报价，也不可续期
        if (res.data.respcode == "01") {
          return this.$router.push({
            name: "QuoteResult",
            query: {
              linceNo: this.licenseInfo.license,
              orderId: res.data.orderId,
              result: "2"
            }
          });
        }

        // 若该车辆符合续期条件，则B 端跳转续期页面 ，否则走正常流程
        if (this.salesPhone && res.data.respcode == "00") {
          return this.$router.push({
            name: "Renewal",
            query: {
              linceNo: this.licenseInfo.license,
              orderId: res.data.orderId
            }
          });
        } else {
          this.checkQuoteAuth();
        }
      });
    },

    // 检查是否能够报价
    checkQuoteAuth() {
      if (this.businessParams.jobNo) {
        this.checkJobNoExistOrders();
      } else {
        this.checkLicensePlate();
      }
    },
    // 查询职员是否已有服务中的订单
    checkJobNoExistOrders() {
      const params = {
        platUserId: this.userId
      };
      this.$http.checkJobNoExistOrders(params).then(res => {
        if (res.data.respcode == "00") {
          this.checkLicensePlate();
        } else {
          this.$toast(res.data.errMsg);
        }
      });
    },
    // 检验车牌状态（是否为新车）
    checkLicensePlate() {
      const params = {
        lincenNo: this.licenseInfo.license,
        platUserId: this.userId,
        userCellphone: this.salesPhone
      };
      this.$http.checkLicensePlate(params).then(res => {
        // 保监局无需检测能否可报价
        if (res.data.msg && this.businessParams.user != "IRB") {
          this.$toast(res.data.msg);
        } else {
          this.callRenewalAPI();
        }
      });
    },

    // 通知后台调用续期 API
    callRenewalAPI() {
      const params = {
        licenseno: this.licenseInfo.license,
        citycode: this.mark.regionCode
      };
      this.$http.callRenewalAPI(params).then(res => {
        if (res.data) {
          this.goToInformation();
        }
      });
    },
    // 前往城市选择页面
    goToSelectCtiyPage() {
      this.$router.push({
        name: "city",
        query: {
          referer: "Home"
        }
      });
    },
    // 点击前往报价按钮 ，完善订单
    goToInformation() {
      this.$router.push({
        name: "Info",
        query: {
          linceNo: this.licenseInfo.license,
          regionCode: this.mark.regionCode,
          source: this.mark.source
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>

.home {
  padding-bottom: 280px;
}
.home-banner {
  width: 100%;
  height: 380px;
  margin-bottom: 40px;
  background: url($baseUrl+"images/home_banner.png") no-repeat center
    center/cover;
  &.irb {
    background: url($baseUrl+"images/home_banner_02.png") no-repeat center
      center/cover;
  }
}

.car-status {
  margin-bottom: 35px;
  .status-name {
    display: block;
    line-height: 50px;
    margin: 0 50px 0 30px;
  }
}
.btn-wrap {
  width: 100%;
  margin: 50px 0 30px 0;
}
.hotline {
  text-align: center;
}
.disbg {
  background: #d9d9d9;
}

.icon-star {
  background: url($baseUrl+"icon/star.png") no-repeat center center/contain;
}
.rec {
  margin-top: 25px;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  color: #aeaeae;
}
</style>
