<template>
  <Modal @hide="closeModal">
    <div class="refund-modal-wrap insure-card">
      <div class="modal-explain">
        <h2 class="protocol-border">申请退款</h2>
        <textarea
          name="refund"
          id="refund"
          cols="30"
          rows="10"
          required
          autofocus
          contenteditable="true"
          maxlength="100"
          placeholder="请根据实际情况描述原因"
          v-model="refundReason"
        ></textarea>

        <div class="insure-btn-wrap">
          <button
            class="insure-btn"
            @click="postApplyForRefund"
            :disabled="!refundReason||inRequest"
          >{{inRequest?'提交中...':'提交'}}</button>
        </div>
        <p class="modal-bottom">如有疑问，请联系客服热线：
          <a
            class="blues"
            href="tel:400-9898-988"
          >400-9898-988</a>
        </p>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/modal/Modal'

import { mapGetters } from "vuex";
export default {
  name: "RefundModal",
  components: {
    Modal
  },
  props: {
    id: Number // 退款id
  },
  data() {
    return {
      refundReason: "",
      inRequest: false
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    // 关闭modal
    closeModal() {
      this.$parent.state.showRefundModal = false;
    },
    // 微信退款申请
    postApplyForRefund() {
      this.inRequest = true;
      const params = {
        platUserId: this.userId,
        orderId: this.id,
        refundReason: this.refundReason,
        type: "1"
      };
      this.$http.postApplyForRefund(params).then(res => {
        this.inRequest = false;
        if (res.data.respcode == "00") {
          this.$emit("submit");
          this.$toast("退款申请提交成功");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  position: fixed;
  width: 100%;
  height: 100%;
}
.refund-modal-wrap {
  width: 90%;
  margin: auto;
  padding: 30px 50px 60px;
  position: relative;
  background-color: #fff;
}
textarea {
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 15px;
  background: #f6f6f6;
  overflow-y: hidden;
}
.modal-bottom {
  margin-top: 30px;
  margin-bottom: -30px;
  text-align: center;
  color: #a5a5a5;
}
</style>
