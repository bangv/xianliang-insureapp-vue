<template>
  <div id="bind-phone">
    <img :src="$route.query.avatar||avatar" alt class="avatar">
    <AuthForm btnText="绑定" ref="child" @success="bind($event)"></AuthForm>
  </div>
</template>

<script>
import { storage, ua } from "@/utils/browser";
import AuthForm from "./components/AuthForm";
import { insure } from "@/utils/insure";
import { routeRedirection } from "./components/common";
import { mapGetters } from "vuex";

export default {
  components: {
    AuthForm
  },
  computed: {
    ...mapGetters(["openId"]),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      avatar: this.$baseUrl + "icon/default_avatar.png",
      formData: {}
    };
  },
  methods: {
    bind(formData) {
      this.formData = formData;
      const jobNoStatus = this.$route.query.jobNoStatus;
      if (jobNoStatus) {
        this.jobNoBind();
      } else {
        this.weChatBind();
      }
    },
    /**
     * @description 微信用户绑定手机号
     */
    weChatBind() {
      if (ua.isWeChat) {
        const userPhone = this.formData.userPhone;
        const params = {
          openid: this.openId,
          bindCellphone: userPhone
        };
        this.$http.queryOrBindWxUserPhone(params).then(res => {
          if (res.data.respcode == "00") {
            // storage.setItem("USER_PHONE", userPhone);
            this.$store.commit("setUserPhone", userPhone);
            routeRedirection(this.$router);
            this.$store.commit("setUserId", res.data.platUserId);
          } else {
            this.$toast(res.data.errMsg);
          }
        });
      }
    },
    // 绑定职工(只在微信调用)
    jobNoBind(jobNoStatus) {
      const params = {
        jobNo: this.businessParams.jobNo,
        openId: this.openId,
        cellphone: this.formData.userPhone,
        bindStatus: jobNoStatus
      };
      this.$http.jobNoBind(params).then(res => {
        if (res.data.respcode == "00") {
          routeRedirection(this.$router);
        } else {
          this.$toast(res.data.errMsg);
        }
      });
    }
  }
};
</script>

<style  lang="scss" scoped>
#bind-phone {
  .avatar {
    display: block;
    width: 163px;
    height: 163px;
    margin: 75px auto 40px auto;
    border-radius: 50%;
  }
}
</style>
