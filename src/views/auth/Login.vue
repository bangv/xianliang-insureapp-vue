<template>
  <div id="login">
    <div class="logo-banner"></div>
    <AuthForm btnText="登录" ref="child" @success="login($event)"></AuthForm>
  </div>
</template>
<script>
import { storage, session, cookie, ua } from "@/utils/browser";
import AuthForm from "./components/AuthForm";
import { routeRedirection } from "./components/common";
import { mapGetters } from "vuex";
export default {
  components: {
    AuthForm
  },
  computed: {
    ...mapGetters(["userId"])
  },
  created() {},
  methods: {
    /**
     * @description 登录
     */
    login(formData) {
      const params = {
        cellphone: formData.userPhone // 验证码
      };
      this.$http.insertPlatUserForm(params).then(res => {
        const platUserId = res.data.platUserId;
        if (!platUserId) {
          this.$toast("登录失败，请重新登录");
        } else {
          // storage.setItem("USER_PHONE", formData.userPhone);
          this.$store.commit("setUserPhone", formData.userPhone);

          this.$store.commit("setUserId", platUserId);
          this.$store.dispatch("updateChannelUserId"); // 更新渠道用户id（channel_user_id）
          routeRedirection(this.$router); // 路由重定向
        }
      });
    }
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
  background: url($baseUrl+"images/logo_bg.jpg") no-repeat center center/cover;
}
</style>
