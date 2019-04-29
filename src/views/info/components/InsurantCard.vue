<template>
  <div class="order-insured pannel-card" v-if="carInfo">
    <div class="info-title flex flex-ai-c flex-jc-b">
      <span>被保险人信息</span>
      <p class="switch-box flex flex-ai-c">同车主
        <InsureSwitch v-model="carInfo.isDefaultInsurant"></InsureSwitch>
      </p>
    </div>
    <div class="card-content">
      <div class="item">
        姓名：
        <input
          class="input-name"
          type="text"
          v-model="carInfo.InsuredName"
          placeholder="请输入被保人姓名"
          :disabled="carInfo.isDefaultInsurant"
        >
        <i class="iconfont">&#xe612;</i>
      </div>
      <div class="item">
        证件类型：
        <select
          v-model="carInfo.InsuredIdType"
          dir="rtl"
          :disabled="carInfo.isDefaultInsurant"
        >
          <option v-for="item in credentials" :key="item.id" :value="item.id">{{item.text}}</option>
        </select>
        <i class="iconfont">&#xe612;</i>
      </div>
      <div class="item">证件号：
        <!-- <input id="idCard" type="text" v-model="carInfo.InsuredIdCard" placeholder="请输入被保人证件号" oninput="if(value.length>18)value=value.slice(0,18)"> -->
        <SecretInput
          v-model="carInfo.InsuredIdCard"
          placeholder="请输入被保人证件号"
          :max="18"
          secret="6,0"
          :disabled="carInfo.isDefaultInsurant"
        />
        <i class="iconfont">&#xe612;</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SecretInput from "@/components/form/SecretInput";
import InsureSwitch from "@/components/form/InsureSwitch";
import { credentials } from "@/utils/insure";
export default {
  components: {
    SecretInput,
    InsureSwitch
  },
  props: {
    carInfo: Object
  },

  data() {
    return {
      credentials: []
    };
  },
  watch: {
    // carInfo(){
    //   debugger
    // },
    "carInfo.isDefaultInsurant"(val) {
      if (!val) {
        this.carInfo.InsuredName = "";
        this.carInfo.InsuredIdCard = "";
        this.carInfo.InsuredIdType = 1;
      } else {
        const { CarOwnersName, IdCard, IdType } = this.carInfo;
        this.carInfo.InsuredName = CarOwnersName;
        this.carInfo.InsuredIdCard = IdCard;
        this.carInfo.InsuredIdType = IdType;
      }
    }
  },
  created() {
    this.credentials = credentials;
  }
};
</script>
<style lang="scss" scoped>
// 被保险人
.order-insured {
  margin-bottom: 34px;
  font-size: 26px;
  .info-title {
    height: 90px;
    line-height: 80px;
    padding: 0 20px;
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    background: url($baseUrl+"images/info_card_title.png") no-repeat center
      center/cover;
  }
  .switch-box {
    font-size: 30px;
    label {
      margin-left: 20px;
    }
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .owner-switch {
      display: flex;
      align-items: center;
    }
  }
  .card-content {
    padding: 0 20px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    color: #252525;
    border-bottom: 1px solid #efefef;
    &:last-of-type {
      border-bottom: none;
    }
    p {
      display: flex;
      align-items: center;
    }
    .iconfont {
      margin-left: 20px;
      font-size: 20px;
    }
  }
  input,
  select {
    flex: 1;
    // direction: rtl;
    text-align: right;
    font-size: 26px;
    color: #666;
  }
  .input-name {
    display: block;
    /*width: 180px;*/
  }
  .insured-id {
    margin-right: 30px;
  }
}
</style>
