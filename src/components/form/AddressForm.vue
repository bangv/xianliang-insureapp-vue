<template>
  <form class="address-form">
    <div class="form-item ">
      <p class="item-left">联系人</p>
      <div class="item-right">
        <input
          type="text"
          placeholder="请输入联系人"
          v-model="receiver.Receiver_Name"
          oninput="if(value.length>20)value=value.slice(0,20)"
        >
        <!-- <p class="error-tip">请输入真实姓名</p> -->
      </div>
      <!--<i class="clear" ></i>-->
    </div>

    <div class="form-item ">
      <p class="item-left">手机号码</p>
      <div class="item-right">
        <input
          type="tel"
          placeholder="请输入手机号码"
          v-model="receiver.Receiver_Phone"
          oninput="if(value.length>11)value=value.slice(0,11)"
        >
        <!-- <p class="error-tip">请输入正确的手机号码</p> -->
      </div>
      <!--<i class="clear" ></i>-->
    </div>

    <div class="form-item ">
      <p class="item-left">所在地区</p>
      <div class="item-right">
        <ul class="citys">
          <li>
            <label
              for="province"
              v-if="!receiver.provinceText"
            >省</label>
            <select
              v-model="receiver.provinceText"
              @change="handleProvince"
              id="province"
            >
              <option
                v-for="province in addressModel.provinces"
                :key="province.code"
                :value="province.name"
              >{{province.name}}</option>
            </select>
          </li>
          <li>
            <label
              for="city"
              v-if="!receiver.cityText"
            >市</label>
            <select
              v-model="receiver.cityText"
              @change="handleCity"
              id="city"
            >
              <option
                v-for="city in addressModel.citys"
                :key="city.code"
                :value="city.name"
              >{{city.name}}</option>
            </select>
          </li>
          <li>
            <label
              for="area"
              v-if="!receiver.areaText"
            >区</label>
            <select
              v-model="receiver.areaText"
              for="area"
            >
              <option
                v-for="area in addressModel.areas"
                :key="area.code"
                :value="area.name"
              >{{area.name}}</option>
            </select>
          </li>
        </ul>
        <!-- <p class="error-tip">请选择所在地区</p> -->
      </div>
      <!--<i class="clear" ></i>-->
    </div>

    <div class="form-item item-address ">
      <p class="item-left">详细地址</p>
      <div class="item-right">
        <textarea
          rows="5"
          cols="35"
          placeholder="请输入详细地址"
          maxlength="160"
          v-model="receiver.detailAddress"
        ></textarea>
        <!-- <p class="error-tip">请输入详细地址</p> -->
      </div>
      <!--<i class="clear" ></i>-->
    </div>

  </form>

</template>

<script>
import provinces from "@/assets/javascript/provinces.min";
import { mapGetters } from "vuex";
import validate from "@/utils/validate.config";
export default {
  data() {
    return {
      addressModel: {
        provinces: [],
        citys: [],
        areas: []
      }
    };
  },
  computed: {
    ...mapGetters({
      receiver: "RECEIVER",
      //   userId: "userId",
      salesPhone: "salesPhone"
    })
  },
  created() {
    // 初始化值
    this.addressModel.provinces = provinces;
    if (!this.salesPhone) {
         this.handleProvince();
          this.handleCity();
      // this.$store.dispatch("getReceiverInfo").then(res => {
      //   if (res.data.respcode == "00") {
      //     this.handleProvince();
      //     this.handleCity();
      //   }
      // });
    }
  },
  methods: {
    // 选择省份
    handleProvince() {
      const provinces = this.addressModel.provinces;
      const provinceText = this.receiver.provinceText;
      for (let i = 0; i < provinces.length; i++) {
        let province = provinces[i];
        if (province.name == provinceText) {
          let city = province.children[0];
          let area = city.children[0];
          this.receiver.cityText = city.name;
          this.receiver.areaText = area.name;
          this.addressModel.citys = province.children;
          this.addressModel.areas = city.children;
          return;
        }
      }
    },
    // 选择城市
    handleCity() {
      const citys = this.addressModel.citys;
      const cityText = this.receiver.cityText;
      for (let i = 0; i < citys.length; i++) {
        let city = citys[i];
        if (city.name == cityText) {
          this.receiver.areaText = city.children[0].name;
          this.addressModel.areas = city.children;
          return;
        }
      }
    },
    formValidate() {
      const {
        Receiver_Name,
        Receiver_Phone,
        areaText,
        Receiver_Address,
        detailAddress
      } = this.receiver;
      // 姓名
      const userName = this.receiver.Receiver_Name;
      const nameValidate = validate.name;
      // 手机号
      const userPhone = this.receiver.Receiver_Phone;
      const phoneValidate = validate.phone;
      if (!userName) {
        return this.$toast(nameValidate.requiredMsg);
      }
      if (!nameValidate.pattern.test(userName)) {
        return this.$toast(nameValidate.invalidMsg);
      }
      if (!userPhone) {
        return this.$toast(phoneValidate.requiredMsg);
      }
      if (!phoneValidate.pattern.test(userPhone)) {
        return this.$toast(phoneValidate.invalidMsg);
      }
      if (this.receiver.provinceText.length === 0) {
        return this.$toast("请选择所在地区");
      }
      if (!detailAddress) {
        return this.$toast("请输入详细地址");
      }

      this.$emit("submit");
    }
  }
};
</script>
<style lang="scss" scoped>
.address-form {
  .form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    margin-bottom: 60px;
    .item-left {
      width: 120px;
      white-space: nowrap;
      margin-right: 40px;
    }
    .item-right {
      flex: 1;
      position: relative;
      input,
      textarea {
        background: #fff;
        font-size: 28px;
      }

      .error-tip {
        position: absolute;
        bottom: -40px;
        color: red;
      }
    }
  }
  .citys {
    display: flex;
    select {
      width: 100%;
      height: 100%;
    }
  }
  .citys li {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    margin-right: 10px;
    flex: 1;
    height: 70px;
    border-radius: 35px;
    border: 1px solid #dadada;
    text-indent: 22px;
    background: #fff;
    &:last-child {
      margin-right: 0;
    }
  }
  label {
    position: relative;
    margin-right: -50px;
  }
  input {
    width: 100%;
    height: 70px;
    border-radius: 35px;
    border: 1px solid #dadada;
    text-indent: 30px;
  }
  .item-address {
    height: auto;
    align-items: start;
  }
  textarea {
    width: 100%;
    height: 160px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #dadada;
    text-indent: 10px;
    line-height: 36px;
    font-size: 30px;
    resize: none;
  }
  .btn-wrap {
    margin-top: 120px;
  }
  .sign-up-btn {
    width: 100%;
  }
}
</style>
