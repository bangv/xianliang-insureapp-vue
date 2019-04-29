<template>
  <div id="insure-type" v-if="insure">
    <div class="item" v-if="insure.CheSun > 0">
      <p>
        <img :src="successIcon">车损险
      </p>
      <p v-if="insure.BuJiMianCheSun > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.DaoQiang > 0">
      <p>
        <img :src="successIcon">盗抢险
      </p>
      <p v-if="insure.BuJiMianDaoQiang > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.SanZhe>0">
      <p>
        <img :src="successIcon">
        三者险({{insure.SanZhe/10000}}万)
      </p>
      <p class="holiday" v-if="insure.SanZheJieJiaRi>0&&insure.BuJiMianSanZhe==0">
        <i></i>三者节假日翻倍险
      </p>
      <p v-if="insure.BuJiMianSanZhe > 0&&(insure.SanZheJieJiaRi==0||!insure.SanZheJieJiaRi)">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item holiday-item" v-if="insure.SanZheJieJiaRi>0&&insure.BuJiMianSanZhe > 0">
      <p class="holiday">
        <i></i>三者节假日翻倍险
      </p>
      <p v-if="insure.BuJiMianSanZhe > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.SiJi>0">
      <p>
        <img :src="successIcon">
        座位险-司机({{insure.SiJi/10000}}万)
      </p>
      <p v-if="insure.BuJiMianSiJi > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.ChengKe>0">
      <p>
        <img :src="successIcon">
        座位险-乘客({{insure.ChengKe/10000}}万)
      </p>
      <p v-if="insure.BuJiMianChengKe > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.HuaHen > 0">
      <p>
        <img :src="successIcon">
        划痕险({{insure.HuaHen>=10000? insure.HuaHen/10000 + '万' : insure.HuaHen/1000 + '千'}})
      </p>
      <p v-if="insure.BuJiMianHuaHen > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.SheShui > 0">
      <p>
        <img :src="successIcon">涉水险
      </p>
      <p v-if="insure.BuJiMianSheShui > 0">
        <i></i>不计免赔
      </p>
    </div>

    <div class="item" v-if="insure.ZiRan > 0">
      <p>
        <img :src="successIcon">自燃险
      </p>
      <p v-if="insure.BuJiMianZiRan > 0">
        <i></i>不计免赔
      </p>
    </div>
    <div class="item" v-if="insure.BoLi > 0">
      <p>
        <img :src="successIcon">玻璃险
      </p>
    </div>
    <div class="item" v-if="insure.HcSanFangTeYue > 0">
      <p>
        <img :src="successIcon">无法找到第三方
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {

  computed: {
    ...mapGetters({
      insure: "INSURED_INFO"
    }),
    successIcon() {
      return this.$baseUrl + "icon/success_s.png";
    }
  },
  created() {
    console.log(this.$baseUrl);
  }
};
</script>
<style lang="scss" scoped>
#insure-type {
  .item {
    display: flex;
    align-items: center;
    line-height: 80px;
    color: #8f8f8f;
    p {
      display: flex;
      align-items: center;
      flex: 1;
      img {
        margin-right: 20px;
        width: 32px;
      }
    }
    p:nth-child(2n) {
      font-size: 24px;
      img {
        width: 24px;
      }
    }
    i {
      width: 20px;
      height: 20px;
      margin-right: 20px;
      border-radius: 50%;
      background-color: #45c46c;
    }
    .holiday {
      padding-left: 6px;
    }
  }
}
</style>

