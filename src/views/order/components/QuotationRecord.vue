<template>
  <div class="quotation-record">
    <ul>
      <li
        class="insure-card"
        v-for="(item,index) in recordList"
        :key="index"
      >
        <p class="item-title ins-box ">
          <span>{{item.linceNo}}</span>
          <span>{{item.ownerName}}</span>
        </p>

        <div class="item-info ins-box">
          <div class="info-left insure-flexbox insure-flexbox-column grays">
            <p>{{item.vehicleinfo |friendlyCarType| handleStr(10,10)}}</p>
            <p>险种：商业险{{(item.forcetotal+item.taxtotal>0)?'、交强险':''}}</p>
            <p>{{item.createtime | handleTimeStr}}</p>
          </div>
          <div class="continue-btn-wrap ">
            <button
              type="button"
              class="continue-btn"
              @click="checkQuoteAuth(item)"
              :disabled="!state.inServiceTime"
            >继续报价</button>
          </div>
        </div>
      </li>
    </ul>
    <DefaultImg
      v-show="recordList.length===0"
      text="暂无数据"
    ></DefaultImg>
  </div>
</template>

<script>
import { insure } from "@/utils/insure";
import { storage, session } from "@/utils/browser";
import DefaultImg from "@/components/share/DefaultImg";
import { mapGetters } from "vuex";
export default {
  name: "QuotationRecord",
  components: {
    DefaultImg
  },
  props: {
    userId: String
  },
  computed: {
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      recordList: [],
      state: {
        inServiceTime: true
      }
    };
  },
  created() {
    this.getQuoteRecord();
    this.checkServiceTime();
  },
  methods: {
    // 获取报价记录
    getQuoteRecord() {
      // let currentPage = this.pageCount[0]
      const params = {
        createUserName: this.userId,
        pageIndex: 1,
        pageSize: 100
      };
      this.$http.getQuoteRecord(params).then(res => {
        // this.pageCount[0]++
        if (res.data.respcode == "00") {
          this.recordList = res.data.insureQuotationInfoCustomList;
        }
      });
    },

    //检查是否在服务时间
    checkServiceTime() {
      this.$http.checkServiceTime().then(res => {
        this.state.inServiceTime = res.data;
      });
    },
    checkQuoteAuth(item) {
      if (this.businessParams.jobNo) {
        this.checkJobNoExistOrders(item);
      } else {
        this.checkLicensePlate(item);
      }
    },
    // 查询职员是否已有服务中的订单
    checkJobNoExistOrders(item) {
      const params = {
        platUserId: this.userId
      };
      this.$http.checkJobNoExistOrders(params).then(res => {
        if (res.data.respcode == "00") {
          this.checkLicensePlate(item);
        } else {
          this.$toast(res.data.errMsg);
        }
      });
    },
    // 检验车牌状态（是否为新车）
    checkLicensePlate(item) {
      const params = {
        lincenNo: item.linceNo,
        platUserId: this.userId
      };
      this.$http.checkLicensePlate(params).then(res => {
        if (res.data.msg) {
          this.$toast(res.data.msg);
        } else {
          this.keepQuotation(item);
        }
      });
    },
    keepQuotation(item) {
      const { linceNo, region_code, carId } = item;

      const carInfo = {
        //------车辆信息---------

        jy_Module_Code: item.automoldcode,
        // vehicleinfo,
        carVin: item.frameNum,
        engineNo: item.engineNum,
        jymoduleinfo: item.vehicleinfo,

        registerDate: item.registerTime,
        transferDate: item.transferDate, //过户日期
        businessstartdate: item.businessstartdate, // 商业险起保日期（只能为当天日期之后的90天之内）
        force_startdate: item.forcestartdate, // 交强险起保日期

        // 车主信息
        ownerName: item.ownerName,
        idType: item.ownerType,
        identity_id: item.identityId,
        mobilePhone: item.cellphone,

        // 被保人信息
        insuredIdCard: item.insuredidcard,
        insuredidtype: item.insuredidtype,
        insuredName: item.insuredname
        // insuredmobile,
      };
      const insureInfo = {
        // id,
        // 保险信息
        linceNo:linceNo,
        buJiMianCheSun_BaoE: item.bujimianchesun_baoe,
        cheSun_BaoE: item.chesun_baoe,
        // bujimiansanzhe_baofei,
        buJiMianSanZhe_BaoE: item.bujimiansanzhe_baoe,
        sanZhe_BaoE: item.sanzhe_baoe,
        sanZheJieJiaRi_BaoE: item.sanZheJieJiaRi_baoe,
        buJiMianSheShui_BaoE: item.bujimiansheshui_baoe,
        sheShui_BaoE: item.sheshui_baoe,
        buJiMianSiJi_BaoE: item.bujimiansiji_baoe,
        siJi_BaoE: item.siji_baoe,
        buJiMianChengKe_BaoE: item.bujimianchengke_baoe,
        chengKe_BaoE: item.chengke_baoe,
        buJiMianHuaHen_BaoE: item.bujimianhuahen_baoe,
        huaHen_BaoE: item.huahen_baoe,
        boLi_BaoE: item.boli_baoe,
        buJiMianZiRan_BaoE: item.bujimianziran_baoe,
        ziRan_BaoE: item.ziran_baoe,
        buJiMianDaoQiang_BaoE: item.bujimiandaoqiang_baoe,
        daoQiang_BaoE: item.daoqiang_baoe,
        hcSanFangTeYue_BaoE: item.hcsanfangteyue_baoe,
        // forceTax, // 交强险标志
        forceTotal: item.forcetotal,
        taxTotal: item.taxtotal
      };

      const markInfo = {
        linceNo: linceNo,
        regionCode: region_code,
        carId: carId,
        cityAbbr:item.linceNoPrefix
      };
      this.$store.commit("SET_MARK_INFO", markInfo);
      this.$store.commit("SET_CAR_INFO", insure.assemblyCarInfo(carInfo));
      this.$store.commit(
        "SET_INSURED_INFO",
        Object.assign({ id: item.id }, insure.assemblyInsureInfo(insureInfo))
      );

      this.$router.push({
        name: "Proposal"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ins-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
}
.item-title {
  line-height: 60px;
  font-size: 28px;
}
.continue-btn-wrap {
  flex-shrink: 1;
}
.continue-btn {
  width: 160px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #007aff;
  background: #fff;
  text-align: center;
  color: #007aff;
}
.info-left {
  line-height: 48px;
}
button[disabled] {
  border-color: #ccc;
  color: #999;
  background: transparent !important;
}
</style>
