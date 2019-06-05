<template>
  <div id="car-cost" v-if="carList.length>0">
    <header>
      <select v-model="currentCarId">
        <option v-for="car in carList" :key="car.carId" :value="car.carId">{{car.lincenNo}}</option>
      </select>
      <em class="arrows" :class="{ 'arrowTrans': state.showCarList }" v-show="carList.length>1"></em>
    </header>
    <div class="content">
      <div class="total-day" v-if="statistics.payedDays>=0||statistics.totalDays>=0">
        <div class="item">
          <em>已扣款天数</em>
          <span class="refund-text">{{statistics.payedDays}}天</span>
        </div>
        <div class="item">
          <em>封顶扣款天数（剩余）</em>
          <span class="refund-text">{{statistics.totalDays-statistics.payedDays}}天</span>
        </div>
      </div>
      <div class="calendar">
        <Calendar
          ref="Calendar"
          :sundayStart="true"
          :futureDayHide="disabledDate.toString()"
          :markDateMore="monthInfo"
          @changeMonth="changeMonth($event)"
          @choseDay="choseDay($event)"
          :class="{'selected':state.isSelectedOtherDay}"
        ></Calendar>
        <div class="calendar-footer">
          <div class="footer-content">
            <p>
              <i class="charge"></i>扣款
            </p>
            <p>
              <i class="refund"></i>退款
            </p>
          </div>
        </div>
      </div>
      <!-- eventType	Int	事件类型 1:点火事件 2:熄火事件 3:失联事件 4:设备拔出事件 5:换车事件 -->
      <!-- payStatus	Int	支付状态 0:未审核1:正在审核中 2:扣款成功 3:退款成功 4:审核不通过，退款失败 5:扣款失败 -->
      <!-- 扣款 start -->
      <div class="state-pannel" v-if="dayInfo&&dayInfo.eventType!=3">
        <div class="pannel-header">
          <p class="fail" v-if="dayInfo.payStatus==5">
            <img :src="$baseUrl+'icon/fail.png'" align="center">
            扣款失败
          </p>
          <p class="success" v-else>
            <img :src="$baseUrl+'icon/success.png'" align="center">
            扣款成功
          </p>
          <!-- 尊敬的车主，今日已扣款 -->
          <!-- <p @click="state.showDeductionExplainModal=true">
            扣款说明
            <img
              src="../../../static/icon/quo-faq.png'"
              alt=""
              align="center"
            >
          </p>-->
        </div>
        <div class="pannel-content">
          <!-- 扣款 start-->
          <div class="item">
            <p>事件类型</p>
            <p>{{dayInfo.eventType|deviceStatusText}}</p>
          </div>
          <div class="item">
            <p>事件时间</p>
            <p>{{dayInfo.odbDate||dayInfo.obdTime}}</p>
          </div>
          <div class="item">
            <p>金额</p>
            <p>{{dayInfo.money}}元</p>
          </div>
          <!-- <template v-if="dayInfo.payStatus==2||dayInfo.payStatus==5"> -->
          <!-- <div class="item">
              <em>点火时间</em>
              <span>{{dayInfo.odbDate?dayInfo.odbDate:'-'}}</span>
          </div>-->
          <!-- &&dayInfo.eventType!=3&&dayInfo.eventType!=4 -->
          <!-- <template v-if="dayInfo.payStatus==2">
            <div class="item">
              <em>扣款时间</em>
              <span class="charge-success">扣款成功</span>
            </div>
            <div class="sub-item">
              <span>{{dayInfo.holdDate}}</span>
            </div>
          </template>-->
          <div class="item" v-if="dayInfo.payStatus==5">
            <p>失败原因</p>
            <p>扣款失败{{dayInfo.errDesc}}</p>
          </div>
          <!-- </template> -->
          <!-- 扣款 end -->
          <!-- <div
            class="item refund-tips"
            v-if="(dayInfo.eventType==3||dayInfo.eventType==4)&&(!canNotRefundPayStatus.includes(dayInfo.payStatus))"
          >
            <em>如您对扣款有疑问，可申请退款</em>
            <span
              class="refund-text"
              @click="state.showRefundModal=true"
            >申请退款</span>
          </div>-->
          <!-- 退款 start -->
          <!-- <template v-if="dayInfo.payStatus==0||dayInfo.payStatus==1">
            <div class="item">
              <em>申请退款时间</em>
              <span class="refund-text">退款中</span>
            </div>
            <div class="sub-item">
              <span>{{dayInfo.applicationDate}}</span>
            </div>
            <div class="item reason">
              <p>
                <em>申请原因：</em>
                <span> {{dayInfo.refundReason}}</span>
              </p>
            </div>
          </template>-->
          <!-- <template v-if="dayInfo.payStatus==3">
            <div class="item">
              <em> 退款金额：{{dayInfo.money}}元</em>
              <span>退款成功</span>
            </div>
            <div class="item">
              <em> 退款时间</em>
              <span>{{dayInfo.refundDate}}</span>
            </div>
          </template>
          <div
            class="item"
            v-if="dayInfo.payStatus==4&&dayInfo.rejectReason"
          >
            退款失败：{{dayInfo.rejectReason}}
          </div>-->
          <!-- 退款 end -->
        </div>
        <div class="pannel-footer">
          <p class="tips" v-if="dayInfo.payStatus==5">TIPS：请尽快查看原因，以免影响您正常使用天天车保服务</p>
        </div>
        <div class="description-entry">
          <span @click="state.showDeductionExplainModal=true">
            扣款说明
            <img :src="$baseUrl+'icon/quo-faq.png'" alt align="center">
          </span>
        </div>
      </div>
      <!-- 扣款 end -->
      <!-- 退款 start-->
      <div class="refund-pannel" v-if="dayInfo&&dayInfo.eventType==3">
        <div class="pannel-header refund-steps flex"  v-if="isOverEleven">
          <div class="line-box">
            <div
              class="light-line"
              :class="{'half':[0,1].includes(dayInfo.payStatus),'full':[3,4].includes(dayInfo.payStatus)}"
            ></div>
          </div>
          <p class="completed-step">
            <i class="iconfont">&#xe786;</i>
            <span>申请退款</span>
          </p>

          <p :class="{'completed-step':[0,1,3,4].includes(dayInfo.payStatus)}">
            <i class="iconfont">&#xe784;</i>
            <span>申请处理中</span>
          </p>
          <p
            class="last-step"
            v-if="dayInfo.payStatus==4"
            :class="{'completed-step':dayInfo.payStatus==4}"
          >
            <i class="iconfont">&#xe77e;</i>
            <span>退款驳回</span>
          </p>
          <p v-else class="last-step" :class="{'completed-step':dayInfo.payStatus==3}">
            <i class="iconfont">&#xe77d;</i>
            <span>退款成功</span>
          </p>
        </div>
        <div class="pannel-content">
          <div class="item">
            <p>事件类型</p>
            <p>设备失联</p>
          </div>
          <!-- <div class="item">
            <p>事件时间</p>
            <p>{{dayInfo.odbDate?dayInfo.odbDate:'-'}}</p>
          </div>-->
          <div class="item">
            <p>金额</p>
            <p style='color:red'>{{dayInfo.money}}</p>
          </div>

          <template v-if="dayInfo.payStatus==0||dayInfo.payStatus==1">
            <div class="item">
              <p>申请退款时间</p>
              <p>{{dayInfo.applicationDate}}</p>
            </div>

            <div class="item">
              <p>申请原因</p>
              <p>{{dayInfo.refundReason}}</p>
            </div>
          </template>
          <template v-if="dayInfo.payStatus==3">
            <div class="item">
              <p>退款时间</p>
              <p>{{dayInfo.refundDate}}</p>
            </div>
          </template>
          <div class="item" v-if="dayInfo.payStatus==4&&dayInfo.rejectReason">
            <p>驳回原因</p>
            <p>{{dayInfo.rejectReason}}</p>
          </div>
        </div>
        <div class="pannel-footer">
          <template v-if="!canNotRefundPayStatus.includes(dayInfo.payStatus)">
            <p class="description">因运营商网络信号不稳定，导致系统于<span style='color:red'>{{currentDateCancle}}</span>的00:00至24:00间无法查到您的设备，故做设备失联补扣款处理。</p>

            <div class="btn-box" v-if="isOverEleven">
              <button class="sign-up-btn" @click="state.showRefundModal=true">申请退款</button>
            </div>
            <!-- <p class="tips" v-if="isOverEleven">说明：如您对扣款有疑问可申请退款</p> -->
            
            <p class="tips" v-if="isOverEleven">说明：请于<span style='color:red'>{{elevenBeforeDate}}</span>前发起申请退款，超出期限则不予退款。</p>
          </template>

          <p class="description-entry" v-if="isOverEleven">
            <span @click="state.showRefundDescriptionModal=true">
              退款说明
              <img :src="$baseUrl+'icon/quo-faq.png'" alt align="center">
            </span>
          </p>
        </div>
      </div>
      <!-- 退款 end-->
      <!-- 没有扣款 start -->
      <div class="state-pannel missing" v-if="!dayInfo">
        <div class="pannel-header">
          <p>
            <img :src="$baseUrl+'icon/gray.jpg'" align="center">尊敬的车主，今日无任何扣款
          </p>
        </div>
        <div class="pannel-content missing-tips">温馨提示：开车收费，不开车不收费</div>
        <div class="description-entry">
          <span @click="state.showDeductionExplainModal=true">
            扣款说明
            <img :src="$baseUrl+'icon/quo-faq.png'" alt align="center">
          </span>
        </div>
      </div>
      <!-- 没有扣款 end -->
    </div>
    <CustomerServiceFooter></CustomerServiceFooter>
    <RefundModal v-if="state.showRefundModal" :id="dayInfo&&dayInfo.id" @submit="submitRefundApply"></RefundModal>
    <RefundDescriptionModal v-if="state.showRefundDescriptionModal">
      <div class="modal-content" slot="modal-content">
        <b>针对事件类型（设备失联），用户如有疑问可发起【申请退款】，退款流程如下：</b>
        <p>第一步：用户发起【申请退款】填写具体原因；</p>
        <p>第二步：等待工作人员处理</p>
        <p>第三步：申请通过，进行退款；申请驳回，不能退款。</p>
        <p>
          如有疑问，可联系天天车保客服热线：
          <a href="tel:400-9898-988">400-9898-988</a>
        </p>
      </div>
    </RefundDescriptionModal>
    <DeductionExplainModal v-if="state.showDeductionExplainModal"></DeductionExplainModal>
  </div>
  <DefaultImg v-else text="暂无数据"></DefaultImg>
</template>
<script>
import Calendar from "vue-calendar-component";
// import RefundModal from "../components/RefundModal";
// import DeductionExplainModal from "../components/DeductionExplainModal";
// import RefundDescriptionModal from "@/components/modal/RefundDescriptionModal";
import CustomerServiceFooter from "@/components/share/CustomerServiceFooter";
import DefaultImg from "@/components/share/DefaultImg";
import { character } from "@/utils/character";
import { mapGetters } from "vuex";

export default {
  components: {
    Calendar,
    CustomerServiceFooter,
    DefaultImg,
    RefundModal: () => import("../components/RefundModal"),
    DeductionExplainModal: () => import("../components/DeductionExplainModal"),
    RefundDescriptionModal: () =>
      import("@/components/modal/RefundDescriptionModal")
  },
  data() {
    return {
      currentCarId: "",
      carList: [],
      monthInfo: [], // 整月明细
      dayInfo: null, // 单日明细
      calendarYear: "",
      currentDate: "",
      disabledDate: new Date().getTime() / 1000, //未来天数不可点击
      state: {
        isSelectedOtherDay: false, // 选中当天的日子
        showCarList: false,
        showRefundModal: false, // 是否显示退款申请
        showDeductionExplainModal: false, // 是否显示扣款说明
        showRefundDescriptionModal: false // 是否显示扣退款说明
      },
      isOverEleven:true,//是否大于7天就不显示
      elevenBeforeDate:'',//七天前日期
      currentDateCancle:'',//当前申请日期
      canNotRefundPayStatus: [0, 1, 3, 4, 5], //  <!-- payStatus	Int	支付状态 0:未审核1:正在审核中 2:扣款成功 3:退款成功 4:审核不通过，退款失败 5:扣款失败 -->
      statistics: {
        payedDays: 0, // 已扣天数
        totalDays: 0 // 剩余天数
      }
    };
  },
  created() {
    this.getCarList();
  },

  watch: {
    currentCarId() {
      // 更改车辆清空非本车辆的数据
      this.marks = this.monthInfo = [];
      this.dayInfo = null;
      this.statistics.payedDays = this.statistics.totalDays = null;
      this.getPaymentWithholdInfo();
    }
  },
  methods: {
     getDateFromCurrentDate(fromDate,dayInterval){
       //计算某个日期前几天日期 fromDate  需要传入的日期（YYYY-MM-DD）dayInterval小于0  前几天 大于0后几天
      let curDate = new Date(Date.parse(fromDate.replace(/-/g,"/")));
      curDate.setDate(curDate.getDate()+dayInterval);
      let year = curDate.getFullYear();
      let month = (curDate.getMonth()+1)<10?"0"+(curDate.getMonth()+1):(curDate.getMonth()+1);
      let day = curDate.getDate()<10?"0"+curDate.getDate():curDate.getDate();
      return year+"-"+month+"-"+day;
      },
    /**
     * @description 获取车里列表并过滤出合格车辆
     */

    getCarList() {
      this.$store.dispatch("getUserCarList").then(carList => {
        this.carList = carList.filter(item => item.deviceCode);
        this.currentCarId = this.carList.length > 0 && this.carList[0].carId;
      });
    },
    /**
     * @description 查询整年费用明细
     */
    getPaymentWithholdInfo(year = new Date().getFullYear()) {
      this.calendarYear = year;
      const params = {
        carId: this.currentCarId,
        startTime: `${year}-01-01`,
        endTime: `${year}-12-31`
      };
      this.$http.getPaymentWithholdInfo(params).then(res => {
        const { payedDays, totalDays, payInfos } = res.data;

        if (res.data.respcode == "00") {
          this.statistics.payedDays = payedDays;
          this.statistics.totalDays = totalDays;
          if (payInfos.length > 0) {
            this.monthInfo = this.monthInfo.concat(payInfos);
            this.initMarker();
          }

          if (this.$route.query.date) {
            this.auotoChoose();
          } else {
            this.initCurrentDayInfo();
          }
        }
      });
    },

    /**
     * @description 初始化日历标记
     */
    initMarker() {
      this.monthInfo.map(item => {
        item.date = item.obdTime;
        const payStatus = [2, 5];
        // const eventType = [3, 5]; // 失联/换车
        item.className = payStatus.includes(item.payStatus)
          ? "charge"
          : "refund";
        // if (item.payStatus == 5 && eventType.includes(item.eventType)) {
        //   item.className = "";
        // }
      });
    },
    /**
     * @description 从公众号消息进来
     */
    auotoChoose() {
      const date = this.$route.query.date;
      this.$refs.Calendar.ChoseMonth(date);
      // this.$route.query.date = null;
      this.$router.replace({
        name: "CarCost"
      });

      // history.replaceState({car:'cost'}, '费用明细', '/car/cost');
      // this.$store.commit("setSpecifiedCostCar", { date: null, carId: null });
    },

    /**
     * @description 初始化当天数据
     */
    initCurrentDayInfo() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      this.currentDate = "${year}/${month}/${day}";
      const isCurrentDay = ({ day }) => day == this.currentDate;
      const currentDayInfo = this.monthInfo.filter(isCurrentDay)[0];
      this.getPaymentWithholdDetailInfo(currentDayInfo);
    },

    /**
     * @description 获取单日明细
     */
    getPaymentWithholdDetailInfo(day) {
      if (!day || !day.className) {
        return (this.dayInfo = null);
      } 
      if(day){
        this.elevenBeforeDate=this.getDateFromCurrentDate(day.date,7);
        this.currentDateCancle = day.date.split('/').join('-');
        }
        let dayInfo = day;
        if(dayInfo&&dayInfo.eventType===3){
        //this.getDateFromCurrentDate(fromDate,-7){elevenBeforeDate
          let day1 = new Date(dayInfo.date);
          let day2 =  Date.parse(new Date());
          let dayCount = parseInt((day2 - day1) / (1000 * 60 * 60 * 24));
          if(dayCount > 7){
            this.isOverEleven = false;
          }else{
            this.isOverEleven = true;
          }                                
        }
      const params = {
        id: day.id,
        eventType: day.eventType,
        payStatus: day.payStatus
      };
      this.$http.getPaymentWithholdDetailInfo(params).then(res => {
        if (res.data.respcode == "00") {
          this.dayInfo = Object.assign(day, res.data);
          this.$set(this.dayInfo, "refundReason", res.data.refundReason);
        }
      });
    },

    /**
     * @description 月份变更重新请求接口
     * @param {String} date 日期 （2018/8/8）
     */
    changeMonth(calendarDate) {
      let calendarDateTimestamp = new Date(calendarDate).getTime();
      let currentDateTimestamp = new Date().getTime();
      let calendarYear = calendarDate.split("/")[0];
      // 避免重复请求同年数据和未来数据
      if (
        this.calendarYear != calendarYear &&
        calendarDateTimestamp < currentDateTimestamp
      ) {
        this.getPaymentWithholdInfo(calendarYear);
        this.calendarYear = calendarYear;
      }
    },
    /**
     * @description 点击单日
     * @param {String} date 选中的当天的日期 （2018/8/8）
     */
    choseDay(date) {
      // 避免重复请求当天数据
      if (date != this.currentDate) {
        this.state.isSelectedOtherDay = this.currentDate == date ? false : true; // 选中其他日期后当前日期不再高亮
       
        const dayInfo = this.monthInfo.filter(item => item.day === date)[0];
        this.currentDate = date;
        
        this.getPaymentWithholdDetailInfo(dayInfo);
      }
    },
    /**
     * @description 提交退款申请
     */
    submitRefundApply() {
      this.dayInfo.payStatus = 0;
      this.state.showRefundModal = false;
      this.getPaymentWithholdDetailInfo(this.dayInfo);
      this.$refs.Calendar.ChoseMonth(this.dayInfo.day);
    }
  }
};
</script>
<style lang="scss" scoped>
#car-cost {
  padding: 60px 30px 30px;
  select {
    font-size: 28px;
  }
  header {
    position: relative;
    padding-bottom: 30px;

    .arrows {
      z-index: 1;
      right: inherit;
    }
  }
  .total-day {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    font-size: 24px;
    span {
      color: #ff7e00;
    }
  }
  .calendar {
    box-shadow: 0px 6px 29px 0px rgba(210, 210, 210, 0.48);
    border-radius: 8px;
    background-color: #fff;
  }
  .calendar-footer {
    padding: 0 32px;
  }
  .footer-content {
    display: flex;
    align-items: center;
    height: 86px;
    font-size: 20px;
    border-top: 1px solid #efefef;
    color: #7f7f7f;
    p {
      width: 50%;
      text-align: center;
    }
    i {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      border-radius: 8px;
    }
  }

  .state-pannel,
  .refund-pannel {
    margin-top: 32px;
    font-size: 24px;
    background-color: #ffffff;
    box-shadow: 0px 6px 29px 0px rgba(210, 210, 210, 0.48);
    border-radius: 8px;
    .pannel-content {
      border-bottom: 1px solid #efefef;
    }
    .description-entry {
      margin: 0 30px;
      line-height: 90px;

      text-align: center;
      img {
        width: 36px;
        height: 36px;
      }

      color: #0886ff;
    }
  }
  .state-pannel {
    &.missing {
      .pannel-content {
        padding: 80px;
      }
    }
    .pannel-header {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      padding: 30px;
      font-size: 30px;
      .success {
        color: #28d06f;
      }
      .fail {
        color: #f14a4a;
      }
      p {
        margin-right: 20px;
        img {
          width: 50px;
          height: 50px;
          margin-right: 24px;
        }
      }

      // i {
      //   width: 30px;
      //   height: 30px;
      //   background-color: #0886ff;
      //   border-radius: 50%;
      // }
    }
    .pannel-content {
      margin: 0 28px;
      padding-bottom: 20px;
      color: #3a3a3a;
      border-top: 1px solid #efefef;
      &.missing-tips {
        text-align: center;
        p {
          margin-top: 20px;
        }
      }

      .item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        // height: 90px;
        padding: 20px 0;
        p {
          max-width: 70%;
        }
        &.reason {
          p {
            display: flex;
          }
          span {
            overflow: hidden;
            flex: 1;
            text-align: justify;
          }
        }
      }
      .sub-item {
        font-size: 24px;
        color: #9b9b9b;
      }
      .refund-tips {
        em {
          color: #9b9b9b;
        }
        span {
          color: #007eff;
          text-decoration: underline;
        }
      }
      .charge-success {
        color: #28d06f;
      }
      .charge-fail {
        color: #f14a4a;
      }
      .refund-text {
        color: #ff7e00;
      }
    }
    .tips {
      padding: 20px;
      font-size: 20px;
      line-height: 30px;
      color: #a4a4a4;
    }
  }
}

.refund-pannel {
  padding: 0 30px;
  .pannel-header {
    position: relative;
    padding: 30px 0;
    p {
      flex: 1;
      text-align: center;
    }
    //  .last-step {
    //    .iconfont {
    //    margin-right: 4px;
    //    }
    // }
    .line-box {
      position: absolute;
      top: 35%;
      left: 20%;
      width: 60%;
      height: 8px;
      background-color: #f0f0f0;
      .light-line {
        width: 0;
        height: 8px;
        background-color: #0886ff;
        &.half {
          width: 50%;
        }
        &.full {
          width: 100%;
        }
      }
    }
    .completed-step {
      .iconfont {
        color: #fff;
        background-color: #0886ff;
      }

      // &.middle-step {
      //   &::before {
      //     background-color: #0886ff;
      //   }
      // }
      // &.last-step {
      //   &::before {
      //     background-color: #0886ff;
      //   }
      // }
    }
    // .middle-step,
    // .last-step {
    //   position: relative;
    // }
    // .middle-step::before,
    // .last-step::before {
    //   content: "";
    //   position: absolute;
    //   top: 24px;
    //   height: 8px;
    //   width: 80%;

    //   background-color: #f0f0f0;
    // }
    // .middle-step::before,
    // .last-step::before {
    //   left: -40%;
    // }
    // .last-step::after {
    //   left: 60%;
    // }
    .iconfont {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      display: block;
      font-size: 40px;
      width: 50px;
      height: 50px;
      padding: 4px;
      margin: auto;
      border-radius: 50%;
      color: #a8a8a8;
      background-color: #f0f0f0;
    }
    span {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      text-align: center;
      color: #ccc;
    }
    .completed-step {
      span {
        color: #0886ff;
      }
    }
  }
  .pannel-content {
    //  padding: 30px 0;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 70px;
    }
  }
  .pannel-footer {
    .description,
    .tips {
      padding: 20px 0;
      font-size: 20px;
      line-height: 30px;
      color: #a4a4a4;
    }
    .tips {
      text-align: center;
    }
    .btn-box {
      margin: 30px 0;
      text-align: center;
    }
  }
}
#car-cost /deep/ {
  .charge {
    color: #28d06f;
    background-color: #dff8ea;
  }
  .refund {
    color: #ff7e00;
    background-color: #ffecd9;
  }

  .wh_container {
    max-width: 100%;
  }
  .wh_content_all {
    border-radius: 8px 8px 0 0;
    background-color: #fff;
  }

  .wh_top_changge {
    background-color: #007eff;
    li {
      font-size: 26px;
    }
  }
  .wh_item_date {
    width: 60px;
    height: 60px;
  }
  .wh_other_dayhide {
    // opacity: 0;
    &.charge,
    &.refund {
      color: #bfbfbf !important;
      background-color: transparent;
    }
  }
  .wh_content_item {
    width: 14.28%;
    height: auto;
    padding: 10px 0;
    font-size: 24px;
    color: #3a3a3a;
    .charge,
    .refund {
      // color: #fff;
      border-radius: 50%;
    }

    .wh_other_dayhide {
      .charge {
        color: #ffecd9 !important;
      }
    }
  }
  .selected {
    .wh_isToday {
      color: #393939;
      background-color: transparent;
      &.charge {
        color: #28d06f;
        background-color: #dff8ea;
      }
      &.refund {
        color: #fff;
        background-color: #ffecd9;
      }
    }
  }
  .wh_isToday {
    color: #007eff;
    background-color: #d9ecff;
  }
  .wh_chose_day {
    color: #007eff;
    background-color: #d9ecff !important;
    &.wh_isToday {
      background-color: #d9ecff;
    }
  }
}
.modal-content {
  padding: 30px;
  font-size: 22px;
  p {
    margin-top: 10px;
  }
}
</style>
