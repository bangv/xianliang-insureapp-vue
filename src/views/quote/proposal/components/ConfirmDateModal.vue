<template>
  <Modal @hide="closeModal">
    <div class="confirm-date-wrap insure-card">
      <div class="modal-explain">
        <h2 class="protocol-border">提示</h2>
        <p class="start-date insure-flexbox insure-flexbox-content-between">
          <span>商业险起保日期：</span>
          <InsureDate v-model="carInfo.BizStartDate" placeholder="请选择起保日期" id="start-date"></InsureDate>
        </p>
        <p>
          <span class="oranges">注意</span>：由于大地保险在线报价规则限制，请严格核对商业险起保日期，避免跟您去年保单生效时间重合，或者脱保而造成不必要的损失。</p>
        <div class="insure-btn-wrap">
          <button class="insure-btn" @click="confirm">确定</button>
        </div>
      </div>
    </div>



  </Modal>
</template>

<script>
import InsureDate from "@/components/form/InsureDate";
import Modal from "@/components/modal/Modal";
import { mapGetters } from "vuex";
export default {
  name: "ConfirmDateModal",
  components: {
    Modal,
    InsureDate
  },
  methods: {
    // 关闭modal
    closeModal() {
      this.$parent.state.showConfirmDate = false;
    },
    confirm() {
      this.closeModal();
      this.$emit('confirm')
      // this.$parent.signing();
    }
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO"
    })
  }
};
</script>

<style lang="scss" scoped>
.confirm-date-wrap {
  width: 90%;
  margin: auto;
  padding: 30px 50px;
  background-color: #fff;
}
input {
  display: block;
  font-size: 26px;
  color: #007aff;
}
input[type="date"] {
  background: #fff;
  font-size: 26px;
}
.start-date {
  font-size: 26px;
  line-height: 90px;
}
#start-date {
  input {
    right: 0;
  }
}
</style>
