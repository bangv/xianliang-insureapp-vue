<template>
  <Modal @hide="hideModal">
    <div class="confirm-modal">
      <h2 class="title">信息确认</h2>
      <div class="modal-form">
        <div class="item">
          <input
            type="text"
            placeholder="请填写被保人银行借记卡卡号"
            oninput="if(value.length>19)value=value.slice(0,19)"
            v-model="formData.bankCard"
            v-gate="'required|bankCard'"
          >
        </div>
        <div class="item">
          <input
            type="text"
            placeholder="请填写被保人银行预留手机号"
            oninput="if(value.length>11)value=value.slice(0,11)"
            v-model="formData.bankPhone"
            v-gate="'required|phone'"
          >
        </div>
        <div class="btn-box">
          <button
            class="btn"
            @click="validateForm"
          >提交</button>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script>
import { mapGetters } from "vuex";
import Modal from "@/components/modal/Modal";
import { storage } from "@/utils/browser";

export default {
  components: {
    Modal
  },

  data() {
    return {
      formData: {
        bankPhone: "",
        bankCard: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  methods: {
    hideModal() {
      this.$parent.state.showInfoConfirmModal = false;
    },
    validateForm() {
      this.$gate.validateAll().then(results => {
        for (let i = 0; i < results.length; i++) {
          if (results[i].message) {
            return this.$toast(results[i].message);
          }
        }
        this.submitForm();
      });
    },
    submitForm() {
      const planInfo = storage.getItem("PLAN_INFO");
      const { InsuredIdCard, InsuredName } = this.carInfo;

      const params = Object.assign(
        {
          type: 2,
          id: planInfo.id,
          idCard: InsuredIdCard,
          name: InsuredName
        },
        this.formData
      );
      this.$http.verifyBankCard(params).then(res => {
        if (res.data.respcode == "01") {
          return this.$toast("借记卡卡号或手机号填写有误，请重新填写");
        }
        this.$emit("submit");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.confirm-modal {
  width: 90%;
  padding: 30px;

  border-radius: 8px;
  background-color: #fff;
  .title {
    margin-bottom: 80px;
    font-size: 30px;
    text-align: center;
  }
  .item {
    padding: 16px 0;
    margin-bottom: 40px;
    border-radius: 30px;
    background-color: #e8e8e8;
    input {
      width: 100%;
      padding-left: 20px;
    }
  }
  .btn-box {
    margin-top: 80px;
    margin-bottom: 40px;
    text-align: center;
    .btn {
      width: 50%;
      height: 80px;
      line-height: 80px;
      color: #fff;
      border-radius: 40px;
      background: linear-gradient(to left, #007aff, #22aefe);
    }
  }
}
</style>
