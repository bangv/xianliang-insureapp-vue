<template>
  <div class="ins-detail-wrap">
    <TipModal @hide="closeModal" :line="false" :title="item.insName">
      <div class="content-text">
        <div class="img">
          <img :src="$baseUrl+item.insImg" alt>
        </div>
        <p>{{item.insContent}}</p>
      </div>
    </TipModal>
  </div>
</template>

<script>
import TipModal from "@/components/modal/TipModal";
export default {
  name: "InsDetailModal",
  components: {
    TipModal
  },
  props: {
    type: String
  },
  data() {
    return {
      item: Object,
      currentType: "",
      insDetail: [
        {
          insType: "CheSun",
          insName: "车损险",
          insImg: "images/quote/ins_chesun.jpg",
          insContent:
            "机动车车损险，简称车损险:负责赔偿车辆遭受自然灾害或意外事故造成保险车辆自身的损失"
        },
        {
          insType: "SanZhe",
          insName: "三者险",
          insImg: "images/quote/ins_sanzhe.jpg",
          insContent:
            "商业第三者责任险，简称三者险:负责赔偿保险车辆因意外事故，致第三者遭受的直接损失"
        },
        {
          insType: "SanZheJieJiaRi",
          insName: "三者节假日翻倍险",
          insImg: "images/quote/ins_szjiari.jpg",
          insContent:
            "第三者责任险节假日保费翻倍附加险，简称三者节假日翻倍险。投保本附加险后，在法定节假日期间发生第三者责任保险范围内的事故，三者险的责任限额在保险但载明的基础上增加一倍"
        },
        {
          insType: "DaoQiang",
          insName: "盗抢险",
          insImg: "images/quote/ins_daoqiang.jpg",
          insContent:
            "全车盗抢险，简称盗抢险:负责赔偿车辆因被盗窃、被抢劫、被抢夺造成车辆的全部损失，以及期间由于车辆损坏或车上零部件、附属设备丢失所造成的损失"
        },
        {
          insType: "SiJi",
          insName: "司机座位险",
          insImg: "images/quote/ins_siji.jpg",
          insContent:
            "车上人员责任保险，简称座位险或人员险，分为司机险与乘客险:负责赔偿意外事故中本车中的人身伤亡损失"
        },
        {
          insType: "ChengKe",
          insName: "乘客座位险",
          insImg: "images/quote/ins_chengke.jpg",
          insContent:
            "车上人员责任保险，简称座位险或人员险，分为司机险与乘客险:负责赔偿意外事故中本车中的人身伤亡损失"
        },
        {
          insType: "HuaHen",
          insName: "划痕险",
          insImg: "images/quote/ins_huahen.jpg",
          insContent:
            "车身划痕损失险，简称划痕险:负责赔偿车辆在使用过程中发生的无明显碰撞痕迹的车身划痕损失，划痕险需在投保车损险的基础上进行投保"
        },
        {
          insType: "BoLi",
          insName: "玻璃险",
          insImg: "images/quote/ins_jkboli.jpg",
          insContent:
            "玻璃单独破碎，简称玻璃险:负责赔偿车辆风挡玻璃或车窗玻璃的单独破碎损失，玻璃险需在投保车损险的基础上进行投保"
        },
        {
          insType: "ZiRan",
          insName: "自燃险",
          insImg: "images/quote/ins_ziran.jpg",
          insContent:
            "自燃损失险，简称自燃险:负责赔偿由于本车电器、线路、供油系统、供气 系统等车辆自身原因或所载货物自身原因起火燃烧造成的本车损失，自燃险需在投保车损险的基础上进行投保"
        },
        {
          insType: "SheShui",
          insName: "涉水险",
          insImg: "images/quote/ins_sheshui.jpg",
          insContent:
            "发动机涉水损失险，简称涉水险:负责赔偿因发动机进水后导致的本车发动机的直接损毁，涉水险需在投保车损险的基础上进行投保"
        },
        {
          insType: "HcSanFangTeYue",
          insName: "无法找到第三方",
          insImg: "images/quote/ins_dsfang.jpg",
          insContent:
            "机动车损失保险无法找到第三方特约险:投保本附加险后，因无法找到第三方而增加的由被保险人自行承担的免赔金额，由保险公司负责赔偿，本附加险需在投保车损险的基础上进行投保"
        },
        {
          insType: "force",
          insName: "交强险",
          insImg: "images/quote/ins_force.jpg",
          insContent:
            "交强险：国家规定的强制保险（按自然年缴纳）；车船税：国家税收，按排量收取（按当前车购买日期缴纳）"
        }
      ]
    };
  },
  watch: {
    type(val) {
      this.insDetail.filter(item => {
        if (item.insType === val) {
          this.item = item;
        }
      });
    }
  },
  methods: {
    // 关闭modal
    closeModal() {
      this.$parent.state.showInsDetailModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.content-text {
  p {
    padding: 25px 30px 0 30px;
    line-height: 50px;
    font-size: 24px;
  }
}

.tip-modal /deep/ {
  .modal-heder .line {
    border-bottom: 1px solid red;
  }
}
</style>
