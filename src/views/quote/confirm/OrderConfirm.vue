<template>
  <div class="order-confirm-wrap">
    <div
      class="order-confirm"
      v-if="confirmInfo ||planInfo"
    >
      <!--服务内容-->
      <ServiceContent>
        <li
          slot="insure-service"
          class="order-service"
        >
          <div class="ins-box">
            <p
              class="service-left"
              @click="insSer.showSerExp=!insSer.showSerExp"
            >
              <em
                class="iconfont"
                v-html="insSer.serviceIcon"
              ></em>
              <span>{{confirmInfo.source||planInfo.source|companyName}}车险服务</span>
              <em :class="{'arrowTrans': insSer.showSerExp , 'iconfont':true, 'arrow':true }"> &#xe649; </em>
            </p>
            <em class="iconfont">&#xe69e;</em>
          </div>
          <div
            :class="[{'service-explain' : insSer.showSerExp}, 'service-bottom']"
            v-show="insSer.showSerExp"
          >
            <SelectedInsure></SelectedInsure>
            <div class="total">
              <p><em>服务费用</em>{{confirmInfo.dailytotal||planInfo.dailytotal}}元/天 </p>
              <p><em>封顶天数</em>{{confirmInfo.total_days||planInfo.total_days}}天</p>
              <p v-if="(confirmInfo.forcetotal > 0 || confirmInfo.taxtotal > 0)||(planInfo.forcetotal>0||planInfo.taxtotal>0)">
                <em>交强险/车船税</em>{{confirmInfo.forcetotal||planInfo.forcetotal}}元/{{confirmInfo.taxtotal||planInfo.taxtotal}}元
              </p>
              <p class="date">
                服务期限
                <span>
                  <time>{{confirmInfo.businessstartdate||planInfo.businessstartdate}}</time>
                  <time>至{{confirmInfo.businessexpiredate||planInfo.businessexpiredate}}</time>
                </span>
              </p>
            </div>
          </div>
        </li>

      </ServiceContent>
      <!--车主信息-->
      <OwnerInfoCard :confirmInfo="confirmInfo"></OwnerInfoCard>
      <!--被保险人信息-->

      <!--收货地址-->
      <div class="order-address pannel-card">
        <div class=" insure-flexbox insure-flexbox-column">
          <div class="address-info card-header">
            <span class="header-title">收货地址</span>
          </div>
          <div class="card-content">
            <div
              class="add-address-entry"
              @click="goToAddress"
              v-if="!receiver.Receiver_Phone"
            >
              <em class="icon-add"></em>
              <p>添加收货地址</p>
            </div>
            <div
              class="address-text"
              v-if="receiver.Receiver_Phone"
            >
              <p class="address-present">
                <span
                  class="blues default-info"
                  @click="goToAddress"
                >修改</span>
                {{receiver.provinceText}}{{receiver.cityText}}{{receiver.areaText}}{{receiver.detailAddress}} {{receiver.Receiver_Name}}{{receiver.Receiver_Phone}}
              </p>
              <p class="grays">办理成功后，会寄送天天车保专用设备，请认真填写 </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 设备说明 -->
      <DeviceCard></DeviceCard>

      <div class="protocol">
        <div class="checkbox">
          <input
            type="checkbox"
            id="protocol-checkbox"
            v-model="state.isAgreeProtocol"
          />
          <label for="protocol-checkbox"></label>
        </div>
        我已阅读并同意
        <router-link
          class="blues"
          :to="{name:'Protocol'}"
        >《天天车保用户服务协议》</router-link>
      </div>
      <div class="order-bottom ">
        合计：
        <span class="oranges">
          {{ businessParams.salesPhone ? confirmInfo.dailytotal : planInfo.dailytotal}}元/天（服务费用）+200元（设备押金）
          <!-- <i v-if="+planInfo.forcetotal + +planInfo.taxtotal>0">+{{planInfo.forcetotal|operation(planInfo.taxtotal,'+')}}元(交强险)</i> -->
        </span>
        <p class="tips">温馨提示：服务费用以最终核保通过为准！</p>
        <div class="btn-box">
          <button
            class="confirm-btn"
            :disabled="!state.isAgreeProtocol"
            @click="formValidate"
          >确认订单</button>
        </div>
      </div>

    </div>
    <DefaultImg
      v-else
      text="您好，暂无订单信息！"
    ></DefaultImg>
  </div>
</template>

<script>
// import { Toast, Switch } from 'mint-ui'
import { mapGetters } from "vuex";
import SelectedInsure from "@/components/share/SelectedInsure";
import DefaultImg from "@/components/share/DefaultImg";

import ServiceContent from "@/components/share/ServiceContent";
import OwnerInfoCard from "./components/OwnerInfoCard";
import DeviceCard from "./components/DeviceCard";

import validate from "@/utils/validate.config";
import { storage, session, cookie, ua, platform } from "@/utils/browser";
import { credentials, insure } from "@/utils/insure";

export default {
  components: {
    SelectedInsure,
    DefaultImg,
    ServiceContent,
    OwnerInfoCard,
    DeviceCard
    // 'mt-switch': Switch
  },
  data() {
    return {
      checkState: false,
      credentials: [],
      // insuranceCount: 0,

      // salesPhone: this.$route.query.salesPhone, // URL 中业务员的手机号（作为B端报价标识
      confirmInfo: {}, // B端 业务员 报价后的订单参数
      // todayDate: '',
      // showOwnerInfo: false,
      state: {
        signTimer: false,
        signLoopCount: 0,
        isAgreeProtocol: false
      },
      planInfo: {},
      //订单信息（参数）
      orderInfo: {
        id: "", // 报价id
        open_id: cookie.getItem("INSURE_OPEN_ID"),
        platUserId: cookie.getItem("INSURE_USER_ID"), // 平台用户ID
        // channel_user_id: '', // 渠道id
        car_id: "",
        // userCellPhone: "", // 车主手机号
        createUserName: "", // 登录手机号
        jqinfo_id: "",
        source: "",
        quotation_startdate: "",
        discount: null,
        total_days: null,
        /* 被保人 */
        InsuredName: "",
        InsuredIdType: "",
        InsuredIdCard: ""
      },
      // 保险信息
      insSer: {
        serviceName: `保险车险服务`,
        serviceIcon: "&#xe611;",
        showSerExp: false
      }
    };
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO",
      // tempLiceNo: "TEMP_LICE_NO",
      receiver: "RECEIVER",
      markInfo: "MARK_INFO",
      // user: 'AUTH',
      // checkState: "CHECK_STATE",
      openId: "openId",
      userId: "userId",
      userPhone: "userPhone"
      // salesPhone: "salesPhone"

      // insurant: "insurant"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },

  created() {
    if (this.businessParams.salesPhone) {
      this.getQuotationSheet();
    } else {
      this.initData();
    }

    this.credentials = credentials;

    // 获取收件人信息
    if (!this.businessParams.salesPhone) {
      this.$store.dispatch("getReceiverInfo");
      // this.$store.dispatch("getReceiverInfo").then(res => {
      //   if (res.data.respcode == "00") {
      //     this.$store.commit("SET_RECEIVER", res.data);
      //   }
      // });
    }
  },
  methods: {
    initData() {
      this.planInfo = storage.getItem("PLAN_INFO");

      const {
        carId,
        id,
        jqinfo_id,
        businessstartdate,
        discount,
        total_days,
        source
      } = this.planInfo;
      const { InsuredIdCard, InsuredIdType, InsuredName } = this.carInfo;
      // 保险信息

      const channelUserId = this.businessParams.channel_user_id;
      // this.orderInfo.platUserId = this.userId

      // 用户信息
      // if (this.carInfo) {
      //   this.orderInfo.userCellPhone = this.carInfo.MobilePhone;
      // } else {
      //   this.orderInfo.userCellPhone = this.userPhone;
      // }

      this.orderInfo.createUserName = channelUserId
        ? channelUserId
        : this.userPhone;
      // 报价方案
      this.orderInfo.car_id = carId;
      this.orderInfo.id = id;
      this.orderInfo.jqinfo_id = jqinfo_id;
      this.orderInfo.source = source;
      this.orderInfo.quotation_startdate = businessstartdate.split(" ")[0]; // 服务开始时间
      this.orderInfo.discount = discount;
      this.orderInfo.total_days = total_days;
      this.orderInfo.InsuredName = InsuredName;
      this.orderInfo.InsuredIdType = InsuredIdType;
      this.orderInfo.InsuredIdCard = InsuredIdCard;

      // Object.assign(this.orderInfo, this.insured, this.receiver);
      Object.assign(this.orderInfo, this.receiver);

      if (this.businessParams.salesPhone) {
        this.confirmOrder();
      }
      // this.checked = this.checkState;

      // this.checkOrderSignPayState();
    },

    initQrcodeInfo() {
      // 保险信息 B端延续
      // if (this.carInfo) {
      //   this.orderInfo.userCellPhone = this.carInfo.MobilePhone;
      // } else {
      //   this.orderInfo.userCellPhone = this.userPhone;
      // }

      this.orderInfo.car_id = this.confirmInfo.carId;
      this.orderInfo.id = this.confirmInfo.id;
      this.orderInfo.open_id = this.openId;

      this.orderInfo.createUserName = this.businessParams.salesPhone;
      this.orderInfo.jqinfo_id = this.$route.query.jqinfo_id;
      this.orderInfo.insuredidtype = this.confirmInfo.insureType;
      this.orderInfo.source = this.confirmInfo.source;
      this.orderInfo.quotation_startdate = this.confirmInfo.businessstartdate; // 服务开始时间
      this.orderInfo.discount = this.confirmInfo.discount;
      this.orderInfo.total_days = this.confirmInfo.total_days;

      this.orderInfo.InsuredName = this.confirmInfo.insuredname;
      this.orderInfo.InsuredIdType = this.confirmInfo.insuredidtype;
      this.orderInfo.InsuredIdCard = this.confirmInfo.insuredidcard;
      // Object.assign(this.orderInfo, this.insured, this.receiver);
      Object.assign(this.orderInfo, this.receiver);

      this.confirmOrder();
    },

    /** 业务员报价后，通过扫码跳转 专用
     * 通过车牌 获取业务员已报价好的 订单 （需检测url中是否携带 salesPhone 参数
     * */
    getQuotationSheet() {
      const params = {
        linceNo: this.businessParams.linceNo,
        salesPhone: this.businessParams.salesPhone
      };
      this.$http.getQuotationSheet(params).then(res => {
        if (res.data.errCode == "00" && res.data.data) {
          this.confirmInfo = res.data.data;
          this.initQrcodeInfo();
        }
      });
    },
    // 获取险种类型 （B端延续）
    confirmOrder() {
      const insuredStroe = {
        ForceTax: this.confirmInfo.forceTax,
        BuJiMianCheSun: this.confirmInfo.bujimianchesun_baoe,
        CheSun: this.confirmInfo.chesun_baoe,
        SanZheJieJiaRi: this.confirmInfo.sanZheJieJiaRi_baoe,
        BuJiMianSanZhe: this.confirmInfo.bujimiansanzhe_baoe,
        SanZhe: this.confirmInfo.sanzhe_baoe,
        BuJiMianSiJi: this.confirmInfo.bujimiansiji_baoe,
        SiJi: this.confirmInfo.siji_baoe,
        BuJiMianChengKe: this.confirmInfo.bujimianchengke_baoe,
        ChengKe: this.confirmInfo.chengke_baoe,
        BuJiMianHuaHen: this.confirmInfo.bujimianhuahen_baoe,
        HuaHen: this.confirmInfo.huahen_baoe,
        BoLi: this.confirmInfo.boli_baoe,
        BuJiMianZiRan: this.confirmInfo.bujimianziran_baoe,
        ZiRan: this.confirmInfo.ziran_baoe,
        BuJiMianSheShui: this.confirmInfo.bujimiansheshui_baoe,
        SheShui: this.confirmInfo.sheshui_baoe,
        HcSanFangTeYue: this.confirmInfo.hcsanfangteyue_baoe,
        BuJiMianDaoQiang: this.confirmInfo.bujimiandaoqiang_baoe,
        DaoQiang: this.confirmInfo.daoqiang_baoe
      };
      this.$store.commit("SET_INSURED_INFO", insuredStroe);
    },

    // /**
    //  *@description 通过订单id查询订单详情检查签约支付状态
    //  */
    // checkOrderSignPayState() {
    //   const orderId = storage.getItem("SIGN_ORDER");
    //   if (orderId) {
    //     const params = {
    //       orderId: orderId
    //     };
    //     this.$http.getMyOrderList(params).then(res => {
    //       storage.removeItem("SIGN_ORDER");
    //       if (res.data.respcode == "00") {
    //         const order = res.data.insureOrderlist[0];
    //         if (order.sign_status == 1) {
    //           this.$router.push({
    //             name: "ActiveGuide"
    //           });
    //         }
    //       }
    //     });
    //   }
    // },

    // 创建订单
    postOrderCreate() {
      const params = Object.assign(
        {},
        { serialNo: this.businessParams.serialNo },
        this.orderInfo,
        this.receiver
      );
      // console.log(params.serialNo);
      this.$http.postOrderCreate(params).then(res => {
        // 已签约
        const orderId = res.data.orderId;

        if (!orderId) {
          return this.$toast("已存在签约订单");
        }
        this.$toast("订单创建成功");
        if (
          res.data.signStatus == 1 ||
          storage.getItem("INSURE_WEBVIEW") === "Android"
        ) {
          this.goToTargetPage();
        } else {
          if (this.businessParams.channel_user_id == 8357) {
            this.$router.replace({
              name: "Follow"
            });
          } else {
            this.h5Sign(orderId);
          }
        }
      });
    },

    /**
     * @description H5 签约
     * @param {String} orderId 订单号
     */
    h5Sign(orderId) {
      if (!ua.isMobile) {
        this.$toast("请在手机完成签约");
      }
      const params = {
        orderId: orderId,
        type: platform.type(),
        platUserId: this.userId,
        openId: this.openId
      };
      this.$http.h5Sign(params).then(res => {
        if (res.data.respcode == "00") {
          if (res.data.signStatus == 1) {
            // this.$toast('您已开通免密签约')
            this.goToTargetPage();
          } else {
            storage.setItem("SIGN_ORDER", orderId);
            window.location.href = res.data.redirectUrl;
          }
        } else {
          // this.$toast("签约失败");
          this.goToTargetPage();
        }
      });
    },

    // 前往未完成订单列表页面

    goToTargetPage() {
      if (!this.businessParams.salesPhone) {
        this.$router.push({
          name: "OrderList",
          query: {
            tab: "UnCompletedOrder"
          }
        });
      } else {
        this.$router.push({
          name: "Follow"
        });
      }
    },
    // 前往用户地址页面，若为B端已报价，需携带 salesPhone，linceNo
    goToAddress() {
      this.$router.push({
        name: "Address"
      });
    },
    // // 前往支付页面
    // goToPayPage(orderId) {
    //   this.$router.push({
    //     name: "Pay",
    //     query: {
    //       orderId: orderId,
    //       type:
    //     }
    //   });
    // },

    //表单验证
    formValidate() {
      const {
        Receiver_Name,
        Receiver_Phone,
        Receiver_IdCard,
        Receiver_Address
      } = this.receiver;
      const [nameValidate, phoneValidate, idCardValidate] = [
        validate.name,
        validate.phone,
        validate.idCard
      ];

      if (!Receiver_Name || !Receiver_Phone) {
        return this.$toast("请填写收货信息");
      }

      this.postOrderCreate();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.order-confirm {
  width: 100%;
  font-size: 26px;
  color: #131313;
  padding: 25px;
  background-color: #f5f5f5;
  .insure-card {
    padding-bottom: 0;
  }
  .icon-del {
    @include icon(29, 29, "icon/order_del.png");
  }
  .icon-add {
    @include icon(34, 34, "icon/order_add.png");
    margin-right: 20px;
  }
  .icon-owner {
    @include icon(30, 35, "icon/order_owner.png");
  }
  .icon-rule {
    @include icon(35, 35, "icon/order_rule.png");
  }
  .insure-info-pannel {
    border-top: 1px solid #e4e4e4;
    // border-bottom: 1px solid #e4e4e4;

    p {
      display: flex;
      // align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    span {
      max-width: 60%;
    }
    .title {
      margin-bottom: 14px;
    }
    time {
      display: block;
      text-align: right;
    }
  }
}

/*地址*/
.order-address {
  margin-bottom: 34px;
  padding-bottom: 30px !important;
  .address-existing {
    margin-bottom: 30px;
  }
  .address-info {
    margin-bottom: 20px;
  }
  .address-present {
    position: relative;
    line-height: 40px;
    padding-right: 100px;
    margin: 15px 0;
  }
  .default-info {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.rule-text {
  margin: 20px;
}

/*协议*/
.protocol {
  display: flex;
  align-items: center;
  .checkbox {
    position: relative;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    border: solid 1px #007aff;
  }
  label {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  input {
    appearance: none;
    background-color: transparent;
  }
  input:checked + label {
    background: #007aff;
  }
}
/*总计*/
.order-bottom {
  bottom: 0;
  z-index: 29;
  padding: 25px;
  font-size: 26px;
  line-height: 64px;
  p {
    flex: 1;
  }
  .btn-box {
    text-align: center;
  }
  .tips {
    font-size: 24px;
    color: #8f8f8f;
  }
  .confirm-btn {
    width: 80%;
    border-radius: 40px;
    height: 80px;
    margin-top: 20px;
    font-size: 28px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;
    &[disabled] {
      background: #d2d2d2;
    }
  }
}
.add-address-entry {
  text-align: center;
}
</style>
