<template>
    <div id="insure-type">
      <div v-if="item">
        <div class="explain">
          商业险：

          <p class="owner-name" v-if="item.chesun_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>车损险</i></span>
            <span v-if="item.bujimianchesun_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
            </p>
          <p class="owner-name" v-if="item.daoqiang_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>盗抢险</i></span>
            <span v-if="item.bujimiandaoqiang_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
            </p>
          <p class="owner-name" v-if="item.sanzhe_baoe >0">
            <span><em class="iconfont">&#xe69e;</em> <i>三者险({{item.sanzhe_baoe/10000}}万)</i></span>
            <span class="insured-left" v-if="item.sanZheJieJiaRi_baoe > 0 && item.bujimiansanzhe_baoe == 0 "><em class="dot"></em> <i >三者节假日翻倍险</i></span>
            <span v-if="item.bujimiansanzhe_baoe > 0 && item.sanZheJieJiaRi_baoe == 0"><em class="dot"></em> <i>不计免赔</i></span> <br>

            <span class="insured-left" v-if="item.sanZheJieJiaRi_baoe > 0 && item.bujimiansanzhe_baoe > 0"><em class="dot"></em><i >三者节假日翻倍险</i></span>
            <span v-if="item.bujimiansanzhe_baoe > 0 && item.sanZheJieJiaRi_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="item.siji_baoe >0">
            <span><em class="iconfont">&#xe69e;</em> <i>座位险-司机({{item.siji_baoe/10000}}万)</i></span>
            <span v-if="item.bujimiansiji_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
            </p>
          <p class="owner-name" v-if="item.chengke_baoe >0">
            <span><em class="iconfont">&#xe69e;</em> <i>座位险-乘客({{item.chengke_baoe/10000}}万)</i></span>
            <span v-if="item.bujimianchengke_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
            </p>
          <p class="owner-name" v-if="item.huahen_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>划痕险({{item.huahen_baoe>=10000? item.huahen_baoe/10000 + '万' : item.huahen_baoe/1000 + '千'}})</i></span>
            <span v-if="item.bujimianhuahen_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="item.boli_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>玻璃险</i></span>
          </p>
          <p class="owner-name" v-if="item.ziran_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>自燃险</i></span>
            <span v-if="item.bujimianziran_baoe > 0"><em class="dot"></em> <i>不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="item.sheshui_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>涉水险</i></span>
            <span v-if="item.bujimiansheshui_baoe > 0"><em class="dot"></em><i>不计免赔</i></span>
            </p>
          <p class="owner-name" v-if="item.hcsanfangteyue_baoe > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>无法找到第三方</i></span>
            </p>
        </div>
        <!--<p class="explain" v-if="item.forceTax > 0 || item.forceStartDate">交强险：{{(item.forceTax > 0||item.forceStartDate)?'交强险/车船税':'未选择'}}</p>-->
      </div>
      <div v-else>
        <div class="explain">
          商业险：
          <p class="owner-name" v-if="insure.CheSun > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>车损险</i></span>
            <span v-if="insure.BuJiMianCheSun > 0"><em class="dot"></em> <i>不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="insure.DaoQiang > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>盗抢险</i></span>
            <span v-if="insure.BuJiMianDaoQiang > 0"><em class="dot"></em> <i >不计免赔</i></span>
            </p>
          <p class="owner-name" v-if="insure.SanZhe>0">
            <span><em class="iconfont">&#xe69e;</em> <i>三者险({{insure.SanZhe/10000}}万)</i></span>
            <span class="insured-left" v-if="insure.SanZheJieJiaRi > 0 && insure.BuJiMianSanZhe == 0 "><em class="dot"></em> <i >三者节假日翻倍险</i></span>
            <span v-if="insure.BuJiMianSanZhe > 0 && insure.SanZheJieJiaRi == 0 "><em class="dot"></em> <i >不计免赔</i></span> <br>

            <span class="insured-left" v-if="insure.SanZheJieJiaRi > 0 && insure.BuJiMianSanZhe > 0"><em class="dot"></em><i >三者节假日翻倍险</i></span>
            <span v-if="insure.BuJiMianSanZhe > 0 && insure.SanZheJieJiaRi > 0 "><em class="dot"></em> <i >不计免赔</i></span>
          </p>

          <p class="owner-name" v-if="insure.SiJi>0">
            <span><em class="iconfont">&#xe69e;</em> <i>座位险-司机({{insure.SiJi/10000}}万) </i></span>
            <span v-if="insure.BuJiMianSiJi > 0"><em class="dot"></em> <i >不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="insure.ChengKe>0">
            <span><em class="iconfont">&#xe69e;</em> <i>座位险-乘客({{insure.ChengKe/10000}}万)</i></span>
            <span v-if="insure.BuJiMianChengKe > 0"><em class="dot"></em> <i >不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="insure.HuaHen > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>划痕险({{insure.HuaHen>=10000? insure.HuaHen/10000 + '万' : insure.HuaHen/1000 + '千'}})</i></span>
            <span v-if="insure.BuJiMianHuaHen > 0"><em class="dot"></em> <i >不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="insure.SheShui > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>涉水险</i></span>
            <span v-if="insure.BuJiMianSheShui > 0"><em class="dot"></em> <i >不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="insure.BoLi > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>玻璃险</i></span>
          </p>
          <p class="owner-name" v-if="insure.ZiRan > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>自燃险</i></span>
            <span v-if="insure.BuJiMianZiRan > 0"><em class="dot"></em> <i>不计免赔</i></span>
          </p>
          <p class="owner-name" v-if="insure.HcSanFangTeYue > 0">
            <span><em class="iconfont">&#xe69e;</em> <i>无法找到第三方</i></span>
          </p>
        </div>
        <!--<p class="explain" v-if="insure.ForceTax > 0 || carInfo.ForceTax > 0 || carInfo.ForceStartDate">-->
          <!--交强险：{{(insure.ForceTax > 0 || ( insure.ForceTax && (carInfo.ForceTax > 0|| carInfo.ForceStartDate)) )?'交强险/车船税':'未选择'}}</p>-->

        <!--<p class="explain" v-if="forceTotal && forceTotal > 0">交强险：{{(carInfo.ForceTax==1||carInfo.ForceStartDate)?'交强险/车船税':'未选择'}}</p>-->

      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: [
    'item',
    'showSzr'
  ],
  computed: {
    ...mapGetters({
      insure: 'INSURED_INFO',
      carInfo:'CAR_INFO'
    })
  },

}
</script>
<style lang="scss" scoped>
  #insure-type {
    .iconfont {
      color: #4caf50;
      font-size: 28px;
    }
    .dot {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #4caf50;
    }
    .owner-name {
      line-height: 60px;
      font-size: 24px;
      color: #9d9d9d;
      .insured-left, span:nth-of-type(1) {
        display: inline-block;
        width: 280px;
      }
      & span:nth-of-type(2) .iconfont {
        font-size: 18px !important;
      }
      .insured-left .iconfont{
        font-size: 18px !important;
      }
      & span:nth-of-type(4) .iconfont {
        font-size: 18px !important;
      }
    }
  }

</style>
