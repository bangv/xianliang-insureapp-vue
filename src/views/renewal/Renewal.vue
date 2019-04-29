<template>
  <div id="renewal" v-if="orderInfo">
    <LastCarInfoCard
      :carList="carList"
      :plan="planInfo"
      :order="orderInfo"
      @selected="singleCarQuote($event)"
      @href="syncInfo('info')"
    ></LastCarInfoCard>

    <ServiceContent class="sevice-content" title="享受服务及福利">
      <li slot="insure-service" class="insure-service">
        <div class="ins-box">
          <p class="service-left" @click="insSer.showSerExp=!insSer.showSerExp">
            <em class="iconfont" v-html="insSer.serviceIcon"></em>
            <span>{{orderInfo.source|companyName}}车险服务</span>
            <em :class="{'arrowTrans': insSer.showSerExp , 'iconfont':true, 'arrow':true }">&#xe649;</em>
          </p>
          <em class="iconfont">&#xe69e;</em>
        </div>
        <div
          :class="[{'service-explain' : insSer.showSerExp}, 'service-bottom']"
          v-show="insSer.showSerExp"
        >
          <div class="insure-type">
            <div class="item">
              <p>商业险险种</p>
              <p></p>
              <p>保额(元)</p>
            </div>
            <div class="item" v-if="orderInfo.cheSun_BaoE > 0 ">
              <p>车损险</p>
              <p v-if="orderInfo.buJiMianCheSun_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p>{{orderInfo.cheSun_BaoE}}</p>
            </div>
            <div class="item" v-if="orderInfo.daoQiang_BaoE > 0 ">
              <p>盗抢险</p>
              <p v-if="orderInfo.buJiMianDaoQiang_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p>{{orderInfo.daoQiang_BaoE}}</p>
            </div>
            <div class="item" v-if="orderInfo.sanZhe_BaoE>0">
              <p>三者险</p>
              <p v-if="orderInfo.buJiMianSanZhe_BaoE>0&&orderInfo.sanZheJieJiaRi_BaoE==0">
                <span>不计免赔</span>
              </p>
              <p v-else></p>
              <p>{{orderInfo.sanZhe_BaoE}}</p>
            </div>
            <div class="item holiday-item" v-if="orderInfo.sanZheJieJiaRi_BaoE>0">
              <p v-if="orderInfo.sanZheJieJiaRi_BaoE>0" class="holiday">三者节假日翻倍险</p>
              <p>{{orderInfo.sanZheJieJiaRi_BaoE}}</p>
            </div>

            <div class="item" v-if="orderInfo.siJi_BaoE>0">
              <p>座位险(司机)</p>
              <p v-if="orderInfo.buJiMianSiJi_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p v-else></p>
              <p>{{orderInfo.siJi_BaoE}}</p>
            </div>
            <div class="item" v-if="orderInfo.chengKe_BaoE>0">
              <p>座位险(乘客)</p>
              <p v-if="orderInfo.buJiMianChengKe_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p v-else></p>
              <p>{{orderInfo.chengKe_BaoE}}</p>
            </div>
            <div class="item" v-if="orderInfo.huaHen_BaoE > 0 ">
              <p>划痕险</p>
              <p v-if="orderInfo.buJiMianHuaHen_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p v-else></p>
              <p>{{orderInfo.huaHen_BaoE}}</p>
            </div>
            <div class="item" v-if="orderInfo.sheShui_BaoE > 0 ">
              <p>涉水险</p>
              <p v-if="orderInfo.buJiMianSheShui_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p></p>
            </div>
            <div class="item" v-if="orderInfo.boLi_BaoE > 0 ">
              <p>玻璃险</p>
            </div>
            <div class="item" v-if="orderInfo.ziRan_BaoE > 0 ">
              <p>自燃险</p>
              <p v-if="orderInfo.buJiMianZiRan_BaoE>0">
                <span>不计免赔</span>
              </p>
              <p>{{orderInfo.ziRan_BaoE}}</p>
            </div>

            <div class="item" v-if="orderInfo.hcSanFangTeYue_BaoE > 0 ">
              <p>无法找到第三方</p>
            </div>
          </div>
        </div>

        <div class="tips" v-if="!businessParams.modifiable">
          <span>注：当前方案为去年方案</span>
          <!-- <router-link class="blues" :to="{name:'custom-insure'}">调整方案</router-link> -->
          <span class="blues" @click="syncInfo('insure')">调整方案</span>
        </div>
      </li>
    </ServiceContent>
    <div class="sign-status pannel-card">
      <div class="content">
        <div class="left">
          <p>
            <img :src="$baseUrl+'icon/wechat_pay.jpg'" alt>
            微信免密支付
          </p>
          <span>{{orderInfo.sign_status==1?'已开通':'未开通'}}</span>
        </div>
      </div>
      <!--<time v-if="orderInfo.checkTime">时间：{{ orderInfo.checkTime | handleTimeStr }}</time>-->
      <div class="content">
        <div class="left">
          <p>
            <img :src="$baseUrl+'icon/device/device-small.png'" alt>
            设备激活状态
          </p>
          <span>{{orderInfo.sim==1 ?'已激活':'未激活'}}</span>
        </div>
      </div>
      <!--<time v-if="orderInfo.note">时间：{{ orderInfo.note | handleTimeStr }}</time>-->
    </div>

    <ConfirmButton
      :disabled="(this.planInfo&&!this.planInfo.id)?true:false"
      ref="confirmButton"
      @change="confirmRenewal($event)"
      :text="'确定续期'"
    ></ConfirmButton>

    <div class="phone-wrap">
      <p>热线电话：
        <a href="tel:400-9898-988">400-9898-988</a>
      </p>
    </div>
  </div>
  <DefaultImg text="暂无数据" v-else></DefaultImg>
</template>
<script>
import { mapGetters } from "vuex";
import { date } from "@/utils/date";
import { credentials, insure } from "@/utils/insure";
import DefaultImg from "@/components/share/DefaultImg";
import LastCarInfoCard from "./components/LastCarInfoCard";
import ConfirmButton from "@/components/share/ConfirmButton";
import ServiceContent from "@/components/share/ServiceContent";
import CustomerServiceFooter from "@/components/share/CustomerServiceFooter";

export default {
  components: {
    LastCarInfoCard,
    ServiceContent,
    DefaultImg,
    ConfirmButton,
    CustomerServiceFooter
  },
  computed: {
    ...mapGetters({
      salesPhone: "salesPhone",
      userId: "userId"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      carList: [],
      planInfo: null, // 今年报价方案
      orderInfo: null, // 上一年订单详情
      currentCarIndex: 0,
      state: {
        isQuoteSuccess: false // 是否报价成功
      },
      // 保险信息
      insSer: {
        serviceName: "保险车险服务",
        serviceIcon: "&#xe611;",
        showSerExp: false
      }
    };
  },
  created() {
    if (this.$route.query.modifiable) {
      return this.getRenewalDetailInfo();
    }
    if (this.salesPhone) {
      this.getOrderDetailByOrderId();
    } else {
      this.getAllWillExpireCar();
    }
  },
  methods: {
    /**
     * @description 获取业务员续保 报价单详情( 仅用于公众号进入该页面时)
     */
    getRenewalDetailInfo() {
      const params = {
        platUserId: this.$route.query.platUserId,
        quotationId: this.$route.query.quotationId
      };
      this.$http.getRenewalDetailInfo(params).then(res => {
        if (res.data.respcode == "00") {
          this.planInfo = this.orderInfo = res.data;
        } else {
          return this.$router.push({
            name: "QuoteResult",
            query: {
              linceNo: this.$route.query.linceNo,
              orderId: this.$route.query.orderId,
              result: "2"
            }
          });
        }
      });
    },
    /**
     * @description 查询用户可续期车里
     */
    getAllWillExpireCar() {
      const params = {
        platUserId: this.userId
      };
      this.$http.getAllWillExpireCar(params).then(res => {
        if (res.data) {
          this.carList = res.data.datas;
          this.getOrderDetailByOrderId();
        }
      });
    },
    /**
     * @description B端 保司续期 报价
     */
    besinessLoopQuote(orderId) {
      const params = {
        orderId: this.salesPhone
          ? this.$route.query.orderId
          : orderId
          ? orderId
          : this.carList[0].orderId,
        salesPhone: this.salesPhone
      };
      this.$http.renewalForService(params).then(res => {
        if (res.data.id) {
          return (this.planInfo = res.data);
        }
        if (res.data.respcode == "01") {
          this.planInfo = res.data;
          if (this.salesPhone) {
            this.$router.push({
              name: "QuoteResult",
              query: {
                linceNo: this.salesPhone
                  ? this.$route.query.linceNo
                  : this.carList[0].linceNo,
                orderId: this.salesPhone
                  ? this.$route.query.orderId
                  : this.carList[0].orderId,
                result: "1"
              }
            });
          }
        }
      });
    },
    /**
     * @description 循环报价直到报出为止
     */
    /*
    loopQuote() {
      const car = this.carList[this.currentCarIndex];
      if (!car) return;
      const params = {
        orderId: car.orderId,
        // platUserId: this.userId
      };
      this.$http.renewalForService(params).then(res => {
        if (res.data.id) {
          this.planInfo = res.data;
          this.getOrderDetailByOrderId(params.orderId);
        } else {
          const lastCar = this.carList[this.carList.length - 1];
          // 若当前车为最后一辆车
          if (params.orderId === lastCar.orderId) {
            return this.$router.push({
              name: "QuoteResult",
              query: {
                linceNo: car.linceNo,
                orderId: lastCar.orderId,
                result:'1'
              }
            });
          }
          this.currentCarIndex++;
          this.loopQuote();
        }
      });
    },
*/

    /**
     * @description 下拉选择车辆报价
     */
    singleCarQuote(orderId) {
      this.planInfo = null; // 清空上次报价显示 load 图片
      const params = {
        orderId: orderId
        // platUserId: this.userId
      };
      this.$http.renewalForService(params).then(res => {
        if (res.data) {
          this.planInfo = res.data;
          this.getOrderDetailByOrderId(params.orderId);
        }
        /*        else {
          // const carList = this.carList.filter(item => item.orderId == orderId);
          if (carList.length > 0) {
            this.$router.push({
              name: "QuoteResult",
              query: {
                linceNo: carList[0].linceNo,
                orderId: orderId,
                result:'1'
              }
            });
          }
        }*/
      });
    },
    /**
     *@description 查询订单，显示订单中险种及支付，调试状态
     */
    getOrderDetailByOrderId(orderId) {
      if (!orderId) {
        orderId = this.salesPhone
          ? this.$route.query.orderId
          : this.carList[this.currentCarIndex].orderId;
      }
      const params = {
        orderId: orderId
      };
      this.$http.getMyOrderList(params).then(res => {
        if (res.data.respcode == "00") {
          this.orderInfo = res.data.insureOrderlist[0];
          // 报价失败则直到报价成功或可续期车辆都报过为止
          if (!this.planInfo) {
            this.besinessLoopQuote(orderId);
            /*            if (this.salesPhone) {
              this.besinessLoopQuote();
            } else {
              this.loopQuote();
            }*/
          }
        }
      });
    },
    /**
     * @description 确定续期，区分B，C 端
     */
    confirmRenewal() {
      if (this.salesPhone) {
        this.sendRenewalMsg();
      } else {
        this.createOrder();
      }
    },
    /**
     * @description C 端 确定续期，生成订单
     */
    createOrder() {
      const mergeParams = Object.assign({}, this.orderInfo, this.planInfo);
      const params = insure.assemblyCreateOrederParameter(mergeParams);

      this.$http.postOrderCreate(params).then(res => {
        // 已签约
        const orderId = res.data.orderId;

        if (orderId) {
          this.$router.push({
            name: "RenewalResult",
            query: {
              state: "success",
              linceNo: this.$route.query.linceNo,
              orderId: this.$route.query.orderId
            }
          });
        } else {
          this.$router.push({
            name: "RenewalResult",
            query: {
              state: "fail",
              linceNo: this.$route.query.linceNo,
              orderId: this.$route.query.orderId
            }
          });
        }
      });
    },
    //
    /**
     * @description  B端业务员 续保成功后 会将消息推送给车主微信（不生成订单，仅为报价单）
     * @params quotationId 报价单id ， platUserId 平台用户id
     */
    sendRenewalMsg() {
      const params = {
        quotationId: this.planInfo.id,
        platUserId: this.orderInfo.platUserId
      };
      this.$http.sendRenewalMsg(params).then(res => {
        // 续保成功
        if (this.salesPhone && res.data.respcode == "00") {
          this.$router.push({
            name: "RenewalResult",
            query: {
              state: "success",
              linceNo: this.$route.query.license,
              orderId: this.$route.query.orderId
            }
          });
        }
      });
    },
    syncInfo(type) {
      const orderInfo = this.orderInfo;
      this.setMarkInfo(orderInfo);
      this.setCarInfo(orderInfo);
      this.setInsureInfo(orderInfo);
      if (type === "info") {
        this.$router.push({
          name: "Info",
          query: {
            linceNo: orderInfo.linceNo,
            regionCode: orderInfo.cityCode
          }
        });
      }
      if (type === "insure") {
        this.$router.push({ name: "custom-insure" });
      }
    },
    setMarkInfo(orderInfo) {
      const markInfo = {
        linceNo: orderInfo.linceNo,
        regionCode: orderInfo.cityCode,
        carId: orderInfo.car_id,
        cityAbbr: orderInfo.linceNoPrefix
      };

      this.$store.commit("SET_MARK_INFO", markInfo);
    },

    /**
     * @description 缓存车辆信息
     */
    setCarInfo(orderInfo) {
      // 后台返回时间有误，重新转化时间戳，再转年月日
      const today = date.getSpecifiedDate(0);
      const laterweek = date.getSpecifiedDate(7);
      const maxDay = date.getSpecifiedDate(90);
      let businessstartdate = this.planInfo.businessstartdate
        ? this.planInfo.businessstartdate
        : this.planInfo.quotation_enddate;
      let dateTime = new Date(businessstartdate);
      dateTime = dateTime.setDate(dateTime.getDate() + 1);
      businessstartdate = date.changeDate(dateTime);

      if (
        businessstartdate &&
        businessstartdate > today &&
        businessstartdate < maxDay
      ) {
        orderInfo["businessstartdate"] = businessstartdate;
      } else {
        orderInfo["businessstartdate"] = laterweek;
      }

      const carInfo = insure.assemblyCarInfo(orderInfo);

      this.$store.commit("SET_CAR_INFO", carInfo);
    },
    /**
     * @description 缓存险种信息
     */
    setInsureInfo(orderInfo) {
      const insureInfo = insure.assemblyInsureInfo(orderInfo);
      this.$store.commit("SET_INSURED_INFO", insureInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
#renewal {
  padding: 30px;
  .insure-service {
    .service-left {
      display: flex;
      align-items: center;
    }
  }

  .sevice-content {
    margin-top: 30px;
  }
  .insure-type {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 60px;
      p {
        width: 33.33%;
      }
      p:nth-child(2) {
        text-align: center;
        span {
          padding: 5px 10px;
          border-radius: 30px;
          border: 1px solid #efefef;
        }
      }
      p:nth-child(3) {
        text-align: right;
      }
    }
  }
  .tips {
    // padding-right: 30px;
    font-size: 24px;
    .blues {
      float: right;
    }
  }
  .sign-status {
    padding: 30px;
    .left,
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    img {
      width: 45px;
      height: 45px;
      margin-right: 14px;
    }
    time {
      padding-left: 60px;
      margin-bottom: 20px;
      font-size: 20px;
      line-height: 30px;
      color: #8f8f8f;
    }
    .content {
      line-height: 90px;
      font-size: 28px;
    }
  }
  /*协议*/
  .protocol {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 60px 0;
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
  .phone-wrap {
    text-align: center;
    p {
      margin-top: 50px;
      font-size: 26px;

      color: #a0a0a0;
      a {
        color: #0b8aff !important;
      }
    }
  }
}
</style>
