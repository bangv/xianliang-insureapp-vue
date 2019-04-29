<template>
  <div id="order-insure">
    <div class="insure-header">
      <em class="insure-left">商业险</em>
      <i class="iconfont" :class="{'show':state.showInsure}" @click.stop="toggleInsure">&#xe649;</i>
    </div>
    <div class="insure-right insure-flexbox-item" v-show="state.showInsure">
      <div class="insure-type">
        <div class="item" v-if="insure.cheSun_BaoE > 0 ">
          <p>
            <img :src="successIcon">车损险
          </p>
          <p v-if="insure.buJiMianCheSun_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>
        <div class="item" v-if="insure.daoQiang_BaoE > 0 ">
          <p>
            <img :src="successIcon">盗抢险
          </p>
          <p v-if="insure.buJiMianDaoQiang_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>
        <div class="item" v-if="insure.sanZhe_BaoE>0">
          <p>
            <img :src="successIcon">
            三者险({{insure.sanZhe_BaoE/10000}}万)
          </p>
          <p class="holiday" v-if="insure.sanZheJieJiaRi_BaoE>0&&insure.buJiMianSanZhe_BaoE==0">
            <i></i>三者节假日翻倍险
          </p>
          <p v-if="insure.buJiMianSanZhe_BaoE>0&&insure.sanZheJieJiaRi_BaoE==0">
            <i></i>不计免赔
          </p>
        </div>
        <div
          class="item holiday-item"
          v-if="insure.sanZheJieJiaRi_BaoE>0&&insure.buJiMianSanZhe_BaoE>0"
        >
          <p v-if="insure.sanZheJieJiaRi_BaoE>0" class="holiday">
            <i></i>三者节假日翻倍险
          </p>
          <p v-if="insure.buJiMianSanZhe_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>

        <div class="item" v-if="insure.siJi_BaoE>0">
          <p>
            <img :src="successIcon">
            座位险(司机)({{insure.siJi_BaoE/10000}}万)
          </p>
          <p v-if="insure.buJiMianSiJi_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>
        <div class="item" v-if="insure.chengKe_BaoE>0">
          <p>
            <img :src="successIcon">
            座位险(乘客)({{insure.chengKe_BaoE/10000}}万)
          </p>
          <p v-if="insure.buJiMianChengKe_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>
        <div class="item" v-if="insure.huaHen_BaoE > 0 ">
          <p>
            <img :src="successIcon">
            划痕险({{insure.huaHen_BaoE>=10000? insure.huaHen_BaoE/10000 + '万' : insure.huaHen_BaoE/1000 + '千'}})
          </p>
          <p v-if="insure.buJiMianHuaHen_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>
        <div class="item" v-if="insure.sheShui_BaoE > 0 ">
          <p>
            <img :src="successIcon">涉水险
          </p>
          <p v-if="insure.buJiMianSheShui_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>
        <div class="item" v-if="insure.boLi_BaoE > 0 ">
          <p>
            <img :src="successIcon">玻璃险
          </p>
        </div>
        <div class="item" v-if="insure.ziRan_BaoE > 0 ">
          <p>
            <img :src="successIcon">自燃险
          </p>
          <p v-if="insure.buJiMianZiRan_BaoE>0">
            <i></i>不计免赔
          </p>
        </div>

        <div class="item" v-if="insure.hcSanFangTeYue_BaoE > 0 ">
          <p>
            <img :src="successIcon">无法找到第三方
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    insure: Object
  },
  data() {
    return {
      state: {
        showInsure: false
      },
      successIcon: this.$baseUrl + "icon/success_s.png"
    };
  },
  methods: {
    toggleInsure() {
      this.state.showInsure = !this.state.showInsure;
    }
  }
};
</script>
<style lang="scss" >
#order-insure {
  .insure-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont {
      font-size: 30px;
      transition: transform ease 0.5s;
      &.show {
        transform: rotate(180deg);
      }
    }
  }
  .insure-left {
    width: 30%;
    line-height: 50px;
    color: #141414;
  }
  .insure-type {
    display: inline-block;
    width: 100%;
    line-height: 50px;
  }
  .item,
  .item p {
    display: flex;
    align-items: center;
  }
  .item {
    line-height: 80px;
    p {
      flex: 1;
    }
    p:first-of-type {
      img {
        width: 32px;
      }
    }
    p:nth-child(even) {
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
    img {
      margin-right: 20px;
    }
  }
  .holiday-item {
    // margin-top: -30px;
    font-size: 24px;
  }
}
</style>
