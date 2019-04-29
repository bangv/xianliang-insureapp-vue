<template>
  <div id="insure">
    <keep-alive :include="['Setting', 'City']">
      <router-view></router-view>
    </keep-alive>
    <NavBar v-show="$route.meta.showNav&&businessParams.user!='IRB'"></NavBar>
  </div>
</template>

<script>
import { wechat } from "@/utils/wechat";
import { cookie, ua } from "@/utils/browser";
import NavBar from "@/components/share/NavBar";
export default {
  name: "App",
  components: {
    NavBar
  },
  computed: {
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  created() {
    this.getWeChatAccessToken();
  },
  methods: {
    /**
     * @description 获取微信 token
     */
    getWeChatAccessToken() {
      if (ua.isWeChat) {
        // const token = cookie.getItem("WECHAT_TOKEN");
        const ticket = cookie.getItem("WECHAT_TICKET");

        if (!ticket) {
        this.$http.getWeChatAccessToken().then(res => {
            const result = res.data;
            if (result) {
              const { access_token, expires_in } = result;
              this.getWeChatTicketByToken(access_token);
              // cookie.setItem("WECHAT_TOKEN", access_token, expires_in);
            }
          });
        } 
      }
    },
    /**
     * @description 获取微信 ticket
     * @param {String} token access token
     */
    getWeChatTicketByToken(token) {
      const params = {
        accessToken: token
      };
      this.$http.getWeChatTicket(params).then(res => {
        const result = res.data;
        if (result && result.errcode == 0) {
          const { ticket, expires_in } = result;
          cookie.setItem("WECHAT_TICKET", ticket, expires_in);
        }
      });
    }
   
  }
};
</script>
<style lang="scss" scoped>
#insure {
  overflow: hidden;
  min-height: 100%;
}
</style>
