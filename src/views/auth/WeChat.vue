<template>
  <div class="wechat-login" v-if="!businessParams.end">
    <div class="login-content">
      <img :src="$baseUrl+'icon/logo.png'" alt>
      <p>点击下方按钮微信登录进入“天天车保”</p>
    </div>
    <button class="sign-btn" @click="getWeChatAuth">微信一键登录</button>
  </div>
</template>
<script>
import { storage, session, cookie, ua } from "@/utils/browser";
import { routeRedirection } from "./components/common";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["openId"]),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },

  created() {
    // B 端自动获取授权
    if (this.$route.query.end == "sales") {
      this.getWeChatAuth();
    }
  },
  mounted() {
    this.getWeChatUserOpenId();
  },
  methods: {
    /**
     * @description 微信授权
     */
    getWeChatAuth() {
      if (ua.isWeChat) {
        const params = {
          redirectUrl: `${window.location.origin}${this.$baseUrl}auth/wechat`
        };
        // console.log(params.redirectUrl);
        this.$http.getWeChatLoginAuth(params).then(res => {
          if (res.data.respcode == "00") {
            window.location.href = res.data.url;
          }
        });
      }
    },
    /**
     * @description 获取openid
     */
    getWeChatUserOpenId() {
      const code = this.$route.query.code;
      if (code) {
        const params = {
          code: code
        };
        this.$http.getWeChatUserOpenId(params).then(res => {
          if (res.data.respcode == "00") {
            this.$store.dispatch("updateChannelUserId"); // 更新渠道用户id（channel_user_id）
            this.$store.commit("setOpenId", res.data.openid);
            this.$store.commit("setUserPhone", res.data.cellphone);

            // storage.setItem("USER_PHONE", res.data.cellphone);
            const { end, jobNo } = this.businessParams;
            if (end === "sales") {
              routeRedirection(this.$router);
            } else {
              if (jobNo) {
                this.decodeJobNo(jobNo); // 企业用户
              } else {
                this.checkWeChatUserBindPhoneState(); // 非企业用户
              }
            }
          }
        });
      }
    },
    /**
     * @description 获取微信用户是否已经绑定手机号
     * @param {String} openid openid
     */
    checkWeChatUserBindPhoneState() {
      if (this.openId) {
        const params = {
          openid: this.openId
        };
        this.$http.queryOrBindWxUserPhone(params).then(res => {
          // res.data.respcode = "01";
          this.avatar = res.data.headImgUrl;
          if (res.data.respcode == "00") {
            this.$store.commit("setUserId", res.data.platUserId);
            // storage.setItem("USER_PHONE", res.data.cellphone);
            routeRedirection(this.$router);
          } else {
            this.goToBindPage();
          }
        });
      }
    },
    // 工号解密
    decodeJobNo(jobNo) {
      this.$http.jobNoDecode({ jobNo: jobNo }).then(res => {
        if (res.data.respcode == "00" && res.data.jobNo) {
          this.queryJobNoExist(res.data.jobNo);
        }
      });
    },
    // 查询职工是否存在
    queryJobNoExist(jobNo) {
      if (jobNo) {
        const params = {
          jobNo: jobNo,
          openId: this.openId
        };
        // storage.setItem("B_USER", jobNo);

        this.$http.queryJobNoExist(params).then(res => {
          this.$store.commit("setUserId", res.data.platUserId);
          // 响应码 00成功 01失败 02需要绑定
          switch (res.data.respcode) {
            case "00":
              // storage.setItem("USER_PHONE", res.data.cellphone);
              routeRedirection(this.$router);
              break;
            case "01":
              this.$router.replace({
                name: "IllegalUser"
              });
              break;
            case "02":
              this.goToBindPage(res.data.bindStatus);
              // if (ua.isWeChat) {
              // this.$toast('该工号无记录,请先绑定手机号')
              // this.jobNoBind(res.data.bindStatus);
              // }
              break;
          }
        });
      }
    },

    // 前往绑定页面
    goToBindPage(jobNoStatus) {
      this.$router.replace({
        name: "Bind",
        query: {
          avatar: this.avatar,
          bindStatus: jobNoStatus
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wechat-login {
  padding: 187px 56px;
  text-align: center;
  .login-content {
    display: inline-block;
  }
  p {
    margin-top: 36px;
    font-size: 22px;
    color: #838383;
  }
  span {
    display: block;
  }
  img {
    width: 150px;
    height: 150px;
  }
  .sign-btn {
    width: 100%;
    height: 96px;
    border-radius: 47px;
    margin-top: 134px;
    font-size: 36px;
    color: #ffffff;
    border-radius: 48px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: #1aad19;
  }
}
</style>
