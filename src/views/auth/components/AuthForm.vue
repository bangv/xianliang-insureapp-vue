<template>
  <div class="form-content">
    <div class="form-group">
      <input
        type="tel"
        oninput="if(value.length>11)value=value.slice(0,11)"
        placeholder="请输入您的手机号码"
        v-model="formData.userPhone"
        v-gate="'required|phone'"
      >
    </div>
    <div class="form-group">
      <input
        type="tel"
        class="password"
        oninput="if(value.length>6)value=value.slice(0,6)"
        placeholder="请输入验证码"
        v-model="formData.SMSCode"
        v-gate="'required|SMSCode'"
      >
      <button
        class="btn check-code-btn"
        @click="getSMSCode"
        :disabled="isSendSMSCode"
      >{{SMSCodeTip}}</button>
    </div>
    <button
      class="sign-up-btn"
      @click="validateForm()"
      @keyup.enter="validateForm()"
    >{{btnText}}</button>
  </div>
</template>

<script>
import { storage, session, cookie, ua } from "@/utils/browser";
export default {
  name: "AuthForm",
  props: {
    btnText: String
  },
  data() {
    return {
      isSendSMSCode: false, // 是否已发送验证码
      second: 60,
      SMSCodeTip: "获取验证码",
      bindStatus: "", // 企业用户绑定状态
      formData: {
        userPhone: "",
        SMSCode: ""
      }
    };
  },
  methods: {
    // 获取验证码
    getSMSCode() {
      this.$gate.validate("phone").then(res => {
        if (res.message) {
          return this.$toast(res.message);
        }
        const params = {
          cellphone: this.formData.userPhone
        };
        this.$http.getSMSCode(params).then(res => {
          if (res) {
            this.$toast("验证码发送成功");
            this.isSendSMSCode = true;
            this.countDown(this.second);
          } else {
            this.$toast("验证码发送失败");
          }
        });
      });
    },
    // 验证码倒计时
    countDown(second) {
      if (second > 0) {
        this.SMSCodeTip = `${second--}秒`;
        setTimeout(() => {
          this.countDown(second);
        }, 1000);
      } else {
        this.SMSCodeTip = `获取验证码`;
        this.isSendSMSCode = false;
      }
    },
    /**
     * @description 前端验证表单
     */ validateForm() {
      this.$gate.validateAll().then(results => {
        for (let i = 0; i < results.length; i++) {
          if (results[i].message) {
            return this.$toast(results[i].message);
          }
        }
        this.validateSMSCode();
      });
    },

    /**
     * @description 服务器验证验证码
     */
    validateSMSCode() {
      const params = {
        licenseno: "123456789", // 车牌号: 随便填...
        cellphoneCode: this.formData.SMSCode, // 验证码
        username: this.formData.userPhone, // 手机号
        customerfrom: 1
      };

      this.$http.validateSMSCode(params).then(res => {
        switch (res.data.resultCode) {
          case "99":
            this.$toast("验证码输入错误");
            break;
          case "100":
            // 渠道id
            this.$emit("success", this.formData);
            break;
          case "49":
            this.$toast("验证码过期");
            break;
        }
      });
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/style/variables.scss";

.form-content {
  padding: 100px 38px 80px;
  margin: 0 24px;
  border-radius: 9px;
  background-color: #fff;
  .sign-up-btn {
    width: 100%;
    margin-top: 20px;
    // font-size: 42px;
  }
}
.form-group {
  display: flex;
  margin-bottom: 45px;
  input {
    flex: 1;
    height: 76px;
    padding: 20px 35px;
    /*text-indent: 30px;*/
    border-radius: 38px;
    border: solid 1px #d8d8d8;
    line-height: 36px;
    font-size: 28px;
    color: #131313;
    &:focus {
      border: 1px solid #ccc;
      outline: 0; /*去掉默认谷歌点击input边框显示蓝色  */
      background: #fff; /*input内背景为白色*/
      color: #131313;
      text-shadow: 0 0 0 #495057;
      -webkit-text-fill-color: transparent;
    }
  }
  .password {
    width: 85%;
    margin-right: 20px;
  }
  .check-code-btn {
    width: 220px;
    height: 72px;
    text-align: center;
    font-size: 26px;
    color: #fff;
    background: linear-gradient(to left, #007aff, #22aefe);
    border-radius: 36px;
  }
}
</style>
