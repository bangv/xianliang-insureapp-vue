<template>
    <ul id="insure-table">
        <li v-if="insure.chesun_baoe">
            <span>车损险</span>
            <span>{{insure.chesun_baoe}}</span>
            <span v-if="insure.bujimianchesun_baoe">不计免赔</span>
        </li>

        <li v-if="insure.sanzhe_baoe">
            <span>三者险</span>
            <span>{{insure.sanzhe_baoe}}</span>
            <span v-if="insure.bujimiansanzhe_baoe">不计免赔</span>
        </li>
        <li v-if="insure.sanZheJieJiaRi_baoe">
            <span>三者节假日翻倍险</span>
            <span>{{insure.sanzhe_baoe}}</span>
            <!-- <span>已投保</span> -->
        </li>
        <li v-if="insure.daoqiang_baoe">
            <span>全车盗抢险</span>
            <span>{{insure.daoqiang_baoe}}</span>
            <span v-if="insure.bujimiandaoqiang_baoe">不计免赔</span>
        </li>
        <li v-if="insure.siji_baoe">
            <span>座位险(司机)</span>
            <span>{{insure.siji_baoe}}</span>
            <span v-if="insure.bujimiansiji_baoe">不计免赔</span>
        </li>
        <li v-if="insure.chengke_baoe">
            <span>座位险(乘客)</span>
            <span>{{insure.chengke_baoe}}</span>
            <span v-if="insure.bujimianchengke_baoe">不计免赔</span>
        </li>
        <li v-if="insure.huahen_baoe">
            <span>划痕险</span>
            <span>{{insure.huahen_baoe}}</span>
            <span v-if="insure.bujimianhuahen_baoe">不计免赔</span>
        </li>

        <li v-if="insure.boli_baoe">
            <span>玻璃险</span>
            <span></span>
            <span>已投保</span>
        </li>
        <li v-if="insure.ziran_baoe">
            <span>自燃险</span>
            <span></span>
            <span v-if="insure.bujimianziran_baoe">不计免赔</span>
        </li>
        <li v-if="insure.sheshui_baoe">
            <span>涉水险</span>
            <span></span>
            <span v-if="insure.bujimiansheshui_baoe">不计免赔</span>
        </li>

        <li v-if="insure.hcsanfangteyue_baoe">
            <span>无法找到第三方</span>
            <span></span>
            <span>已投保</span>
        </li>
        <li v-if="insure.forcetotal">
            <span>交强险</span>
            <span>{{insure.forcetotal}}</span>
        </li>
        <li v-if="insure.taxtotal">
            <span>车船税</span>
            <span>{{insure.taxtotal}}</span>
        </li>
    </ul>
</template>
<script>
export default {
  props: {
    insure: Object
  }
};
</script>

<style lang="scss" scoped>
#insure-table {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #efefef;
  font-size: 24px;
  li {
    display: flex;
    line-height: 50px;
    span {
      display: block;
      width: 33.333%;
      color: #8f8f8f;
      &:nth-child(2) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: right;
      }
    }
  }
}
</style>
