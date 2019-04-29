<template>
  <div class="custom-insurance">
    <div class="business-insurance-pannel pannel">
      <header>
        <h2>{{markInfo.linceNo}}&nbsp; &nbsp;{{carInfo.CarOwnersName}}</h2>
        <div class="business-insurance-switch">
          <p class="flex flex-jc-b">商业险</p>
          <p class="flex ins-align flex-jc-b">起保日期
            <InsureDate v-model="carInfo.BizStartDate" placeholder="请选择商业险起保日期" id="BizStartDate"></InsureDate>
            <i class="iconfont icon-edit">&#xe612;</i>
          </p>
        </div>
      </header>
      <div class="main-insurance insurance">
        <h2 class="title">主险</h2>
        <!--不计免赔险种----车损险-->
        <div class="item">
          <p>
            <span>车损险</span>
            <i class="iconfont question" @click="showInsDetailModal('CheSun')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianCheSun"
              :disabled="insuredInfo.CheSun==0"
              class
            >不计免赔</SwitchBtn>
          </p>
          <InsureSwitch v-model="insuredInfo.CheSun"></InsureSwitch>
        </div>
        <!--可选保费，且不计免赔---三者险-->
        <div class="item">
          <div class="item-content">
            <span>三者险</span>
            <i class="iconfont question" @click="showInsDetailModal('SanZhe')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianSanZhe"
              :disabled="insuredInfo.SanZhe==0"
              class
            >不计免赔</SwitchBtn>
            <div class="select" :class="{ 'uncheck': insuredInfo.SanZhe==0}">
              <select
                name="info2"
                id="info2"
                v-model="insuredInfo.SanZhe"
                :disabled="sanzhe.switch==0"
              >
                <option
                  v-for="item in sanzhe.options"
                  :key="item.value"
                  :value="item.value"
                >{{item.text}}</option>
              </select>
              <i class="iconfont">&#xe615;</i>
            </div>
          </div>
          <InsureSwitch v-model="sanzhe.switch"></InsureSwitch>
        </div>

        <!--不计免赔险种----盗抢险-->
        <div class="item">
          <p>
            <span>盗抢险</span>
            <i class="iconfont question" @click="showInsDetailModal('DaoQiang')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianDaoQiang"
              :disabled="insuredInfo.DaoQiang==0"
              class
            >不计免赔</SwitchBtn>
          </p>

          <InsureSwitch v-model="insuredInfo.DaoQiang" class></InsureSwitch>
        </div>

        <!--可选保费，且不计免赔---座位险-->
        <div class="item">
          <div class="item-content">
            <span>司机座位险</span>
            <i class="iconfont question" @click="showInsDetailModal('SiJi')">&#xe6dd;</i>
            <SwitchBtn v-model="insuredInfo.BuJiMianSiJi" :disabled="insuredInfo.SiJi==0"></SwitchBtn>

            <div class="select" :class="{ 'uncheck': insuredInfo.SiJi==0}">
              <select name="seat" id="seat" v-model="insuredInfo.SiJi" :disabled="seat.sjSwitch==0">
                <option
                  v-for="seat in seat.options"
                  :key="seat.value"
                  :value="seat.value"
                >{{seat.text}}</option>
              </select>
              <i class="iconfont">&#xe615;</i>
            </div>
          </div>
          <InsureSwitch v-model="seat.sjSwitch"></InsureSwitch>
        </div>
        <div class="item">
          <div class="item-content">
            <span>乘客座位险</span>
            <i class="iconfont question" @click="showInsDetailModal('ChengKe')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianChengKe"
              :disabled="insuredInfo.ChengKe==0"
              class
            >不计免赔</SwitchBtn>
            <div class="select" :class="{ 'uncheck':insuredInfo.ChengKe==0}">
              <select
                name="seat"
                id="seat"
                v-model="insuredInfo.ChengKe"
                :disabled="seat.ckSwitch==0"
              >
                <option
                  v-for="seat in seat.options"
                  :key="seat.value"
                  :value="seat.value"
                >{{seat.text}}</option>
              </select>
              <i class="iconfont">&#xe615;</i>
            </div>
          </div>
          <InsureSwitch v-model="seat.ckSwitch"></InsureSwitch>
        </div>
      </div>
      <div class="sub-insurance insurance">
        <h2 class="title">附加险</h2>
        <!--不计免赔险种----划痕险-->
        <div class="item">
          <div class="item-content">
            <span>划痕险</span>
            <i class="iconfont question" @click="showInsDetailModal('HuaHen')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianHuaHen"
              :disabled="insuredInfo.HuaHen==0"
              class
            >不计免赔</SwitchBtn>

            <div class="select" :class="{ 'uncheck': insuredInfo.HuaHen==0}">
              <select
                name="info3"
                id="info3"
                v-model="insuredInfo.HuaHen"
                :disabled="huahen.switch==0"
              >
                <option
                  v-for="cache in huahen.options"
                  :key="cache.value"
                  :value="cache.value"
                >{{cache.text}}</option>
              </select>
              <i class="iconfont">&#xe615;</i>
            </div>
          </div>
          <InsureSwitch v-model="huahen.switch"></InsureSwitch>
        </div>
        <!--不可选保费，无免赔---玻璃险-->
        <div class="item boli">
          <div class="item-content">
            <span>玻璃险</span>
            <i class="iconfont question" @click="showInsDetailModal('BoLi')">&#xe6dd;</i>
            <div class="select" :class="{ 'uncheck': insuredInfo.BoLi==0}">
              <select v-model="insuredInfo.BoLi" :disabled="boli.switch==0">
                <option
                  v-for="(option,index) in boli.options"
                  :value="option.value"
                  :key="index"
                >{{option.text}}</option>
              </select>
              <i class="iconfont">&#xe615;</i>
            </div>
          </div>

          <InsureSwitch v-model="boli.switch"></InsureSwitch>
        </div>
        <!--不计免赔险种----自燃险-->
        <div class="item">
          <p>
            <span>自燃险</span>
            <i class="iconfont question" @click="showInsDetailModal('ZiRan')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianZiRan"
              :disabled="insuredInfo.ZiRan==0"
              class
            >不计免赔</SwitchBtn>
          </p>
          <InsureSwitch v-model="insuredInfo.ZiRan" class></InsureSwitch>
        </div>

        <!--不计免赔险种----涉水险-->
        <div class="item">
          <p>
            <span>涉水险</span>
            <i class="iconfont question" @click="showInsDetailModal('SheShui')">&#xe6dd;</i>
            <SwitchBtn
              v-model="insuredInfo.BuJiMianSheShui"
              :disabled="insuredInfo.SheShui==0"
              class
            ></SwitchBtn>
          </p>
          <InsureSwitch v-model="insuredInfo.SheShui" class></InsureSwitch>
        </div>
        <div class="item">
          <p>
            <span>三者节假日翻倍险</span>
            <i class="iconfont question" @click="showInsDetailModal('SanZheJieJiaRi')">&#xe6dd;</i>
          </p>
          <InsureSwitch v-model="insuredInfo.SanZheJieJiaRi" :disabled="sanzhe.switch==0"></InsureSwitch>
        </div>
        <!--不可选保费，无免赔---无法找到第三方-->
        <div class="item">
          <p>
            <span>无法找到第三方</span>
            <i class="iconfont question" @click="showInsDetailModal('HcSanFangTeYue')">&#xe6dd;</i>
          </p>
          <InsureSwitch v-model="insuredInfo.HcSanFangTeYue" class></InsureSwitch>
        </div>
      </div>
    </div>
    <div class="force-insurance-pannel pannel">
      <!--交强险和车船税-->
      <div class="item">
        <div class="text">
          <p>
            <em>交强险</em>
            <i class="iconfont question" @click="showInsDetailModal('force')">&#xe6dd;</i>
          </p>
          <span>(交强险、车船税)</span>
        </div>
        <InsureSwitch v-model="insuredInfo.ForceTax" @input="resetForceDate"></InsureSwitch>
      </div>
      <div class="item" v-show="insuredInfo.ForceTax==1">
        <!--交强险日期，前面未选才会显示日期-->
        <label for="ins-mandatory">起保日期</label>
        <InsureDate v-model="carInfo.ForceStartDate" placeholder="请选择交强险起保日期" id="ForceStartDate"></InsureDate>
        <i class="iconfont icon-edit">&#xe612;</i>
      </div>
    </div>
    <div class="btn-wrap">
      <button type="button" class="sign-up-btn" @click="handleQuotation">获取报价</button>
    </div>
    <InsDetailModal :type="insureType" v-show="state.showInsDetailModal"></InsDetailModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { date } from "@/utils/date";
import InsureDate from "@/components/form/InsureDate";
import InsureSwitch from "@/components/form/InsureSwitch";
import SwitchBtn from "@/components/form/SwitchBtn";
// import InsDetailModal from "./components/InsDetailModal";
export default {
  components: {
    InsureDate,
    InsureSwitch,
    SwitchBtn,
    InsDetailModal: () => import("./components/InsDetailModal")
  },
  data() {
    return {
      // 三者险保额 选项
      sanzhe: {
        switch: 0,
        options: [
          { text: "200万", value: "2000000" },
          { text: "150万", value: "1500000" },
          { text: "100万", value: "1000000" },
          { text: "50万", value: "500000" },
          { text: "30万", value: "300000" },
          { text: "20万", value: "200000" },
          { text: "15万", value: "150000" },
          { text: "5万", value: "50000" },
          { text: "不投保", value: "0" }
        ]
      },
      // 座位险保额 选项
      seat: {
        sjSwitch: 0,
        ckSwitch: 0,
        options: [
          // { text: "100万", value: "1000000" },
          // { text: "50万", value: "500000" },
          { text: "20万", value: "200000" },
          { text: "15万", value: "150000" },
          { text: "10万", value: "100000" },
          { text: "5万", value: "50000" },
          { text: "4万", value: "40000" },
          { text: "3万", value: "30000" },
          { text: "2万", value: "20000" },
          { text: "1万", value: "10000" },
          { text: "不投保", value: "0" }
        ]
      },
      // 划痕险 选项
      huahen: {
        switch: 0,
        options: [
          { text: "2万", value: "20000" },
          { text: "1万", value: "10000" },
          { text: "5千", value: "5000" },
          { text: "2千", value: "2000" },
          { text: "不投保", value: "0" }
        ]
      },
      boli: {
        switch: 0,
        options: [
          { text: "国产玻璃", value: 1 },
          { text: "进口玻璃", value: 2 },
          { text: "不投保", value: 0 }
        ]
      },
      // 默认险种
      defaultInsureInfo: {
        // linceNo:'',
        QuoteGroup: 1,
        Quote: 1,
        ForceTax: 1,
        BuJiMianCheSun: 1,
        CheSun: 1,
        BuJiMianSanZhe: 1,
        SanZheJieJiaRi: 0,
        SanZhe: "1000000",
        BuJiMianSiJi: 1,
        SiJi: "50000",
        BuJiMianChengKe: 1,
        ChengKe: "50000",
        BuJiMianHuaHen: 0,
        HuaHen: 0,
        BoLi: 0,
        BuJiMianZiRan: 0,
        ZiRan: 0,
        BuJiMianSheShui: 0,
        SheShui: 0,
        HcSanFangTeYue: 0,
        BuJiMianDaoQiang: 0,
        DaoQiang: 0
      },
      state:{
        showInsDetailModal:false
      },
      insureType: ""
    };
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO",
      insuredInfo: "INSURED_INFO",
      markInfo: "MARK_INFO",
      salesPhone: "salesPhone"
    })
  },
  beforeRouteEnter(to, from, next) {
    // 避免从报价页面无法返回该页面
    if (from.name === "Proposal") {
      to.query.autoQuote = false;
    }
    next();
  },
  // 离开页面前缓存信息
  beforeRouteLeave(to, from, next) {
    this.$store.commit("SET_INSURED_INFO", this.insuredInfo);
    next();
  },
  watch: {
    // 不计免同步相应险种
    "insuredInfo.CheSun"(newVal) {
      this.insuredInfo.BuJiMianCheSun = newVal > 0 ? 1 : 0;
      // 关闭主险【车损险】，则附加险：玻璃险、划痕险、涉水险、无法找到第三方、自燃险也同步关闭
      if (newVal == 0) {
        this.insuredInfo.BoLi = this.insuredInfo.HuaHen = this.insuredInfo.SheShui = this.insuredInfo.HcSanFangTeYue = this.insuredInfo.ZiRan = 0;
      }
    },
    "insuredInfo.SanZhe"(newVal) {
      this.sanzhe.switch = newVal > 0 ? 1 : 0;
      if (newVal == 0) {
        this.insuredInfo.SanZheJieJiaRi = 0;
      }
    },
    "insuredInfo.SiJi"(newVal) {
      this.seat.sjSwitch = newVal > 0 ? 1 : 0;
    },
    "insuredInfo.ChengKe"(newVal) {
      this.seat.ckSwitch = newVal > 0 ? 1 : 0;
    },

    "insuredInfo.DaoQiang"(newVal) {
      this.insuredInfo.BuJiMianDaoQiang = newVal > 0 ? 1 : 0;
    },
    "insuredInfo.BoLi"(newVal) {
      this.boli.switch = newVal > 0 ? 1 : 0;
    },

    "insuredInfo.HuaHen"(newVal) {
      this.huahen.switch = newVal > 0 ? 1 : 0;
    },
    "insuredInfo.ZiRan"(newVal) {
      this.insuredInfo.BuJiMianZiRan = newVal > 0 ? 1 : 0;
    },
    "insuredInfo.SheShui"(newVal) {
      this.insuredInfo.BuJiMianSheShui = newVal > 0 ? 1 : 0;
    },
    //     "insuredInfo.ForceTax"(val) {
    //       // console.log(JSON.stringify(this.insuredInfo))
    //       if(val){
    //  this.carInfo.ForceStartDate = "";
    //       }

    //     },

    "sanzhe.switch"(newVal) {
      if (newVal == 0) {
        return (this.insuredInfo.SanZhe = this.insuredInfo.BuJiMianSanZhe = 0);
      }
      if (this.insuredInfo.SanZhe == 0) {
        this.insuredInfo.SanZhe = this.sanzhe.options[2].value;
        this.insuredInfo.BuJiMianSanZhe = 1;
      }
    },
    "huahen.switch"(newVal) {
      if (newVal == 0) {
        return (this.insuredInfo.HuaHen = this.insuredInfo.BuJiMianHuaHen = 0);
      }

      if (this.insuredInfo.HuaHen == 0) {
        this.insuredInfo.HuaHen = this.huahen.options[3].value;
        this.insuredInfo.BuJiMianHuaHen = 1;
      }
    },
    "seat.sjSwitch"(newVal) {
      if (newVal == 0) {
        return (this.insuredInfo.SiJi = this.insuredInfo.BuJiMianSiJi = 0);
      }
      if (this.insuredInfo.SiJi == 0) {
        this.insuredInfo.SiJi = this.seat.options[1].value;
        this.insuredInfo.BuJiMianSiJi = 1;
      }
    },
    "seat.ckSwitch"(newVal) {
      if (newVal == 0) {
        return (this.insuredInfo.ChengKe = this.insuredInfo.BuJiMianChengKe = 0);
      }
      if (this.insuredInfo.ChengKe == 0) {
        this.insuredInfo.ChengKe = this.seat.options[1].value;
        this.insuredInfo.BuJiMianChengKe = 1;
      }
    },
    "boli.switch"(newVal) {
      if (newVal == 0) {
        return (this.insuredInfo.BoLi = 0);
      }
      if (this.insuredInfo.BoLi == 0) {
        this.insuredInfo.BoLi = 1;
      }
    }
  },

  created() {
    // 第一次进入该页面
    if (
      !this.insuredInfo ||
      this.insuredInfo.linceNo != this.markInfo.linceNo
    ) {
      this.setInsureInfo();
      this.getAutoSelectQuote();
    } else {
      this.autoJumpPage();
    }
    this.initSwitchStaus();
    //  console.log(this.insuredInfo)
  },
  methods: {
    // 设置险种（默认为默认险种）
    setInsureInfo(insureInfo = this.defaultInsureInfo) {
      insureInfo["linceNo"] = this.markInfo.linceNo;
      this.$store.commit("SET_INSURED_INFO", insureInfo);
    },
    // C 端自动报价
    autoJumpPage() {
      if (this.$route.query.autoQuote) {
        this.handleQuotation();
      }
    },
    // 自动获取系统自选报价信息
    getAutoSelectQuote() {
      const { BizStartDate, ForceStartDate, RegisterDate } = this.carInfo;
      // 有报价记录
      if (this.markInfo.carId && BizStartDate && RegisterDate) {
        const params = {
          CarId: this.markInfo.carId,
          RegisterDate: RegisterDate,
          BizStartDate: BizStartDate,
          ForceStartDate: ForceStartDate
        };
        this.$http.getAutoSelectQuote(params).then(res => {
          const insureInfo = res.data.insureDatas;
          if (insureInfo) {
            this.setInsureInfo(insureInfo);
            this.initSwitchStaus();
            this.autoJumpPage();
          }
        });
      }
    },
    // 显示险种说明
    showInsDetailModal(str) {
      this.state.showInsDetailModal = true;
      this.insureType = str;
    },
    /**
     * @description 初始化开关状态
     */
    initSwitchStaus() {
      this.sanzhe.switch = this.insuredInfo.SanZhe > 0 ? 1 : 0;
      this.huahen.switch = this.insuredInfo.HuaHen > 0 ? 1 : 0;
      this.seat.sjSwitch = this.insuredInfo.SiJi > 0 ? 1 : 0;
      this.seat.ckSwitch = this.insuredInfo.ChengKe > 0 ? 1 : 0;
      this.boli.switch = this.insuredInfo.BoLi > 0 ? 1 : 0;
    },
    /**
     * @description 清空交强险时间
     */
    resetForceDate() {
      if (this.insuredInfo.ForceTax) {
        this.carInfo.ForceStartDate = "";
      }
    },
    handleQuotation() {
      const {
        ZiRan,
        CheSun,
        HuaHen,
        SheShui,
        SiJi,
        ChengKe,
        BoLi,
        DaoQiang,
        SanZhe,
        HcSanFangTeYue
      } = this.insuredInfo;

      // 险种连并限制
      if (
        (ZiRan > 0 ||
          HuaHen > 0 ||
          SheShui > 0 ||
          BoLi > 0 ||
          HcSanFangTeYue > 0) &&
        !CheSun
      ) {
        return this.$toast({
          message:
            "如果您选中 划痕险/玻璃险/自燃险/涉水险/无法找到第三方，车损险将为必选项！",
          duration: 2000
        });
      }
      // 处理商业险
      const today = date.getSpecifiedDate(0);
      const maxDay = date.getSpecifiedDate(90);

      if (!this.carInfo.BizStartDate) {
        return this.$toast("请选择商业险保险日期");
      }
      if (this.carInfo.BizStartDate <= today) {
        return this.$toast("商业险起保日期不能小于当前日期");
      }
      if (this.carInfo.BizStartDate > maxDay) {
        return this.$toast("商业险日期距今不能超过90天");
      }
      // 处理交强险
      if (this.insuredInfo.ForceTax == 1) {
        const ForceStartDate = this.carInfo.ForceStartDate;
        if (!ForceStartDate) {
          return this.$toast("请选择交强险保险日期");
        }
        if (ForceStartDate <= today) {
          return this.$toast("交强险起保日期不能小于当前日期");
        }
        if (ForceStartDate > maxDay) {
          return this.$toast("交强险起保日期距今不能超过90天");
        }
      }
      // 已至少选择一种险种
      if (CheSun > 0 || DaoQiang > 0 || SanZhe > 0 || SiJi > 0 || ChengKe > 0) {
        this.$store.commit("SET_CAR_INFO", this.carInfo);
        this.$store.commit("SET_INSURED_INFO", this.insuredInfo);
        // 前往报价页面
        this.$router.push({
          name: "Proposal"
        });
      } else {
        // 未选险种
        this.$toast({
          message: "请至少选择一个主险种",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-insurance {
  padding: 30px 30px 100px 30px;
  font-size: 24px;
  .title {
    font-size: 26px;
    color: #0581ff;
  }
}
.pannel {
  margin-bottom: 30px;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #fff;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
    p {
      display: flex;
    }
    .question {
      margin-right: 30px;
      font-size: 24px;
      color: #0581ff;
    }
  }
}
.icon-edit {
  font-size: 24px;
  color: #0b8aff;
}

.force-insurance-pannel /deep/ .insure-date .placeholder,
.business-insurance-switch /deep/ .insure-date .placeholder {
  position: absolute;
  bottom: -18px;
  right: 30px;
  text-align: right !important;
  color: #a9a9a9;
}

// 商业险
.business-insurance-pannel {
  header {
    h2 {
      line-height: 88px;
      font-size: 30px;

      color: #131313;

      border-bottom: 1px solid #eaeaea;
    }
    .business-insurance-switch {
      padding-top: 30px;
      border-bottom: 1px solid #eaeaea;
      p {
        padding-bottom: 30px;
      }
    }
  }
  .item {
    // display: flex;
    // justify-content: space-between;
    // margin-bottom: 30px;
    .item-content {
      display: flex;
      align-items: center;
    }
    span {
      display: inline-block;
      width: 120px;
      margin-right: 20px;
    }
    .select {
      display: flex;
      align-items: center;
      margin-left: 56px;
      padding: 0 10px;
      height: 40px;
      border-radius: 6px;
      font-size: 24px;

      border: solid 1px #0581ff;
      select,
      .iconfont {
        color: #0581ff;
      }
    }
    .uncheck {
      border: solid 1px #c6cfd7;
      select,
      .iconfont {
        color: #c6cfd7;
      }
    }
  }
  .insurance {
    h2 {
      margin: 40px 0;
    }
    .boli {
      .select {
        margin-left: 0;
      }
    }
  }
  .main-insurance {
    border-bottom: 1px solid #eaeaea;
  }
}
// 交强险
.force-insurance-pannel {
  padding: 30px;
  .text {
    em {
      display: inline-block;
      width: 120px;
      margin-right: 20px;
    }
    span {
      color: #a3a2a2;
    }
  }
}
.btn-wrap {
  margin-top: 100px;
  text-align: center;
}
</style>
