<template>
    <!-- 安心图片验证码 start v-for 里 使用 ref 获取不到组件-->
    <div id="verification-code-modal">
        <div class="item" v-if="plan.JQCodeImg&&plan.JQcQryCde">
            <input type="text" placeholder="请输入交强险验证码" oninput="if(value.length>4)value=value.slice(0,4)" v-model="verificationCodeFormData.JQcHeckCode">
            <p>
                <img :src="plan.JQCodeImg" alt="">
            </p>
        </div>
        <div class="item" v-if="plan.codeImg&&plan.cQryCde">
            <input type="text" placeholder="请输入商业险验证码" oninput="if(value.length>4)value=value.slice(0,4)" v-model="verificationCodeFormData.cHeckCode">
            <p>
                <img :src="plan.codeImg" alt="">
            </p>
        </div>
        <div class="modal-footer">
            <button class="insure-btn" @click="subimtVerificationCode">提交</button>
        </div>
    </div>

    <!-- 安心图片验证码 end -->
</template>
<script>
export default {
  props: {
    plan: Object,
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 图片验证码
      verificationCodeFormData: {
        source: null,
        JQcHeckCode: null,
        cHeckCode: null,
        cQryCde: null,
        JQcQryCde: null
      }
    };
  },
  methods: {
    // 提交图片验证码
    subimtVerificationCode() {
      const { cQryCde, JQcQryCde } = this.plan;
      const { JQcHeckCode, cHeckCode } = this.verificationCodeFormData;
      if (cQryCde) {
        if (!cHeckCode || cHeckCode.length !== 4) {
          return this.$toast("请输入正确的商业险验证码");
        }
      }
      if (JQcQryCde) {
        if (!JQcHeckCode || JQcHeckCode.length !== 4) {
          return this.$toast("请输入正确的交强险验证码");
        }
      }

      this.verificationCodeFormData.cQryCde = cQryCde;
      this.verificationCodeFormData.JQcQryCde = JQcQryCde;
      this.$emit("submit", this.verificationCodeFormData);
    }
  }
};
</script>
<style lang="scss" scoped>
#verification-code-modal {
  width: 100%;

  margin-top: 20px;
  border-radius: 8px;
  border-top: 1px solid #efefef;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    padding: 30px 0;

    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      margin-right: 30px;
      font-size: 24px;
    }
  }
  .modal-footer {
    margin-top: 30px;
    text-align: center;

    button {
      padding: 0 64px;
      height: 60px;
      border-radius: 30px;
      line-height: 60px;
      font-size: 30px;
      color: #fff;
      background: linear-gradient(to left, #007aff, #22aefe);
      // &[disabled] {
      //   background: #d5d5d5;
      // }
    }
  }
}
</style>
