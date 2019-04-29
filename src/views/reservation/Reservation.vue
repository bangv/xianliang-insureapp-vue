<template>
  <div class="reservation-wrap">
    <div class="banner"></div>
    <LicenseCityForm btnText="提交" @submit="submitForm"></LicenseCityForm>

    <div class="tips-title">
      <router-link class="blues invite-link" :to="{name: 'ReservationInvite'}">
        <em class="iconfont">&#xe63c;</em> 邀请有礼
      </router-link>
      <p>加入天天车保，立享车联网服务</p>
    </div>
    <ServiceFooter></ServiceFooter>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LicenseCityForm from "@/components/form/LicenseCityForm";
import ServiceFooter from "@/components/share/ServiceFooter";

export default {
  components: {
    LicenseCityForm,
    ServiceFooter
  },
  computed: {
    ...mapGetters({
      licenseInfo: "licenseInfo",
      city: "CITY",
      userId: "userId"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },

  methods: {
    submitForm() {
      const params = {
        linceNo: this.licenseInfo.license,
        cityCode: this.city.regionCode,
        platUserId: this.userId,
        inviterId: this.businessParams.inviterId
      };
      this.$http.createInviterAppointmentOrder(params).then(res => {
        if (res.data.respcode == "01") {
          this.$toast(res.data.errMsg);
        } else {
          this.$router.push({
            name: "ReservationResult"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.reservation-wrap {
  width: 100%;
  .banner {
    width: 100%;
    height: 380px;
    background: url($baseUrl+"images/reserve/reserve_banner.jpg") no-repeat
      center center/cover;
    margin-bottom: -80px;
  }
  .tips-title {
    position: relative;
    margin-top: 80px;

    font-size: 24px;

    text-align: center;
    color: #5f5f5f;
    &::before {
      content: "";
      position: absolute;
      left: 10%;
      right: 10%;
      top: 0;
      bottom: 0;
      height: 1px;
      margin: auto;
      background-color: #ddd;
    }
    p {
      display: inline-block;
      position: relative;
      padding: 0 30px;
      background-color: #f5f5f5;
    }
  }
}
</style>