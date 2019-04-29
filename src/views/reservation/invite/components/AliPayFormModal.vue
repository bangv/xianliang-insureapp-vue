<template>
  <Modal @hide="hideModal">
    <div class="modal-content">
      <h2>领取奖励</h2>
      <div class="form-content">
        <div class="item">
          <input type="text" placeholder="请填写支付宝账户" v-model="formData.inviterAliPayAccount">
        </div>
        <div class="item">
          <input type="text" placeholder="请填写姓名" v-model="formData.inviterAliPayName">
        </div>
        <p class="tips">温馨提示：请认真填写您的支付宝信息用于领取奖励</p>
      </div>
      <div class="form-footer">
        <button @click="hideModal">取消</button>
        <button
          class="confirm-btn"
          @click="validateForm"
          :disabled="!formData.inviterAliPayAccount||!formData.inviterAliPayName"
        >提交</button>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal";
export default {
  components: {
    Modal
  },
  props: {
    orderId: String
  },
  data() {
    return {
      formData: {
        inviterAliPayAccount: "",
        inviterAliPayName: ""
      }
    };
  },
  methods: {
    hideModal() {
      this.$parent.state.showAliPayFormModal = false;
    }, //重置表单
    resetForm() {
      this.formData.inviterAliPayAccount = this.formData.inviterAliPayName = "";
    },
    validateForm() {
      const { inviterAliPayAccount, inviterAliPayName } = this.formData;

      // 手机号
      if (!inviterAliPayAccount.includes("@")) {
        if (inviterAliPayAccount.length != 11) {
          return this.$toast("请输入真实的支付宝账号");
        }
      } else {
        if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(inviterAliPayAccount)) {
          return this.$toast("请输入真实的支付宝账号");
        }
      }
      if (!/[\u4e00-\u9fa5]/.test(inviterAliPayName)) {
        return this.$toast("请输入真实的姓名");
      }
      this.confirmForm();
    },
    // 提交表单
    confirmForm() {
      const params = {
        orderId: this.orderId,
        ...this.formData
      };

      this.$http.updateAliPayInfo(params).then(res => {
        if ((res.data.respcode = "00")) {
          this.resetForm();
          this.$emit("reload");
          this.$toast("提交成功");
        }
      });
      this.$parent.state.showAliPayFormModal = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-content {
  width: 90%;
  padding: 50px 30px;
  border-radius: 8px;
  background-color: #fff;
  h2 {
    text-align: center;
    font-size: 30px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 68px;
    padding-left: 30px;
    margin-top: 60px;

    background-color: #f6f6f6;
    border-radius: 34px;
    border: solid 1px #efefef;
    input {
      width: 100%;
      font-size: 24px;
    }
  }
  .form-content {
    margin-bottom: 80px;
    .tips {
      margin: 40px 0 40px 10px;
      font-size: 20px;

      color: #a5a5a5;
    }
  }
  .form-footer {
    text-align: center;
  }
  button {
    width: 191px;
    height: 56px;
    margin: 0 30px;
    font-size: 24px;
    color: #fff;
    background-image: linear-gradient(90deg, #d0d0d0 0%, #bbbbbb 100%);
    border-radius: 28px;
  }
  .confirm-btn {
    background-image: linear-gradient(90deg, #22aefe 0%, #007aff 100%);
  }
}
</style>

