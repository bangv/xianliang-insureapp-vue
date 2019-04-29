<template>
  <div id="login">
    <div class="logo-banner"></div>
    <AuthForm btnText="登录" ref="child" @success="signIn($event)"></AuthForm>
  </div>
</template>
<script>
import { storage, session, cookie, ua } from "@/utils/browser";
import AuthForm from "../components/AuthForm";

import { mapGetters } from "vuex";
export default {
  components: {
    AuthForm
  },
  // computed: {
  //   businessParams() {
  //     return this.$store.getters.businessParams;
  //   }
  // },
  created() {
    // this.handleAutoSignIn();
  },
  methods: {
    // handleAutoSignIn() {
    //   const { channelComCode, mobile } = this.businessParams;
    //   if (mobile && channelComCode) {
    //     this.ccicCellphoneDecode();
    //   }
    // },
    // 判断当前手机号是否为业务员 ,（仅业务员可登录）
    signIn(formData) {
      const params = {
        workNumber: "",
        salesPhone: formData.userPhone
      };
      // 判断接口返回是否存在 ID
      this.$http.getSalesPhone(params).then(res => {
        if (res.data.id) {
          this.$store.commit("setSalesPhone", formData.userPhone);
          this.$router.replace({ name: "Home" });
          // window.location.href = window.location.origin + this.$baseUrl;
        } else {
          this.$toast("抱歉！您不是业务员，不可登陆");
        }
      });
    }
    // // 	大地业务员手机号解密
    // ccicCellphoneDecode() {
    //   const params = {
    //     cellphone: this.businessParams.mobile,
    //     channelComCode: this.businessParams.channelComCode
    //   };
    //   this.$http.ccicCellphoneDecode(params).then(res => {
    //     if (res.data.cellphone) {
    //       this.$store.commit("setSalesPhone", res.data.cellphone);
    //       this.$router.replace({ name: "Home" });
    //     } else {
    //       this.$toast("非正常手机号码 ");
    //     }
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
#login {
  position: relative;
  background-color: #f6f6f6;
  .form-content {
    margin-top: -85px;
  }
}
.logo-banner {
  width: 100%;
  height: 380px;
  background: url($baseUrl+"images/login.png") no-repeat center center/cover;
}
</style>
