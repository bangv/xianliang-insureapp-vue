<template>
  <div class="address-form-wrap">
    <AddressForm
      ref="form"
      @submit="handleSubmit"
    ></AddressForm>
    <div class="btn-wrap insure-flexbox insure-flexbox-content-center">
      <button
        type="button"
        class="sign-up-btn"
        @click="formValidate"
      >保存</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddressForm from "@/components/form/AddressForm";
export default {
  components: {
    AddressForm
  },
  computed: {
    ...mapGetters({
      receiver: "RECEIVER",
      userId: "userId"
      // salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      // salesPhone: this.$route.query.salesPhone
    };
  },

  methods: {
    formValidate() {
      this.$refs.form.formValidate();
    },
    handleSubmit() {
    
      if (this.businessParams.salesPhone) {
        this.goBack();
      } else {
        this.updateReceiverInfo();
      }
    },
    goBack() {
      this.$router.push({
        name: "OrderConfirm"
      });
    },
    /**
     * 更新收件人信息
     */
    updateReceiverInfo() {
      const {
        provinceText,
        cityText,
        areaText,
        detailAddress,
        Receiver_Name,
        Receiver_Phone
      } = this.receiver;

      const params = {
        platUserId: this.userId,
        provinceText: provinceText,
        cityText: cityText,
        areaText: areaText,
        detailAddress: detailAddress,
        Receiver_Name: Receiver_Name,
        Receiver_Phone: Receiver_Phone
      };
     
      this.$http.queryOrUpdateReceiverAddress(params).then(res => {
        if (res.data.respcode == "00") {
            // this.$store.commit("SET_RECEIVER", res.data);
          this.goBack();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.address-form-wrap {
  width: 100%;
  font-size: 30px;
  color: #131313;
  padding: 70px 50px 0;
  .btn-wrap {
    margin-top: 120px;
  }
  .sign-up-btn {
    width: 100%;
  }
}
</style>
