<template>
  <div class="quotation-record">
    <SearchInput
      ref="searchInput"
      @change="getQuoteRecord($event)"
    ></SearchInput>

    <ul>
      <li
        class="insure-card"
        v-for="(item,index) in recordList"
        :key="index"
      >
        <p class="item-title ins-align ">
          <span>{{item.linceNo}}</span>
          <span>{{item.ownerName | handleStr(15,0)}}</span>
        </p>
        <div class="item-info">
          <div class="info-left grays">
            <p class="ins-box">
              <span
                class="car-vehicle"
                v-if="item.vehicleinfo"
              >{{item.vehicleinfo | handleStr(10,0) }} </span>

              <span>服务承保：{{item.source |companyName }}</span>
            </p>
            <p class="ins-class ">
              <span>险种：商业险{{(item.forcetotal>0||item.taxtotal>0)?'、交强险':''}}</span>
              <span> <em
                  class="arrows"
                  :class="{'arrowTrans': item.showInsuranceInfo }"
                  @click="handleInsInfo(item, $event)"
                ></em></span>
            </p>
            <div
              class="insurance-info border-bottom-scaleY"
              v-show="item.showInsuranceInfo"
            >
              <BusinessInsure
                class="ins-info-left"
                :item="item"
              ></BusinessInsure>
              <div
                v-if="item.forcetotal > 0 || item.taxtotal > 0"
                class="insure-force"
              >
                <p>交强险：</p>
                <p><em class="iconfont">&#xe69e;</em> <span>交强险/车船税</span></p>
              </div>
            </div>

          </div>
          <!--2018-09-28 新增 服务费用以及日期等信息 -->
          <div
            class="ins-info border-bottom-scaleY"
            v-if="(salesType != 2 && item.isEffective != 0) || salesType == 2 "
          >
            <div class=" ins-box ">
              <p>服务费用</p>
              <p>{{item.dailytotal}}元/天</p>
            </div>

            <div class="ins-box">
              <p>封顶天数</p>
              <p>{{item.total_days}}天</p>
            </div>

            <div
              class="ins-box"
              v-if=" item.forcetotal > 0 || item.taxtotal > 0 "
            >
              <p>交强险和车船税&nbsp;</p>
              <p>{{(item.forcetotal + item.taxtotal )| numRound}}元</p>
            </div>

            <div class="ins-box">
              <p>服务时间</p>
              <p class="">{{item.businessstartdate.split(' ')[0]}}&nbsp;至&nbsp;{{item.businessexpiredate}}</p>
            </div>

            <!--<p class="ins-box" v-if=" item.forcetotal > 0 || item.taxtotal > 0 "><span>服务期限（交强险）</span> <span>{{item.forcestartdate}}&nbsp;至&nbsp;{{item.forceexpiredate}}</span></p>-->

          </div>

          <div class="ins-box">
            <p>报价时间：{{item.createtime | handleTimeStr}}</p>
            <!--非大地业务员报价 可显示 二维码-->
            <div
              v-if="salesType != 2 && item.isEffective == 1"
              @click="showPhoto(item, $event)"
            >
              <QrCodeCreate
                :linceNo="item.linceNo"
                :index="index"
              ></QrCodeCreate>
              <p class="blues code-Photo">查看大图</p>
            </div>
            <!--大地业务员报价显示 继续报价-->
            <button
              type="button"
              v-if="salesType == 2 || item.isEffective == 0"
              class="continue-btn"
              @click="checkLicensePlate(item)"
              :disabled="!state.inServiceTime"
            >重新报价</button>
          </div>
        </div>

      </li>
    </ul>
    <p v-if="param.hasData" class="loading">上拉加载更多数据 ↑</p>

    <DefaultImg
      v-show="recordList.length===0"
      text="暂无数据"
    ></DefaultImg>
    <QrCodePhotoModal
      v-if="photoState.showCodePhoto && salesType != 2"
      :linceNo="photoState.linceNo"
      @hide="hideModal"
    ></QrCodePhotoModal>
  </div>
</template>

<script>
import { insure } from "@/utils/insure";
import { cookie } from "@/utils/browser";
import { mapGetters } from "vuex";
import DefaultImg from "@/components/share/DefaultImg";
import BusinessInsure from "./BusinessInsure";
import SearchInput from "./SearchInput";
import QrCodeCreate from "@/components/share/QrCodeCreate";
// import QrCodePhotoModal from '@/components/modal/QrCodePhotoModal'

export default {
  name: "QuotationRecord",
  components: {
    BusinessInsure,
    DefaultImg,
    QrCodeCreate,
    QrCodePhotoModal: () => import("@/components/modal/QrCodePhotoModal"),
    SearchInput
  },
  computed: {
    ...mapGetters(["salesPhone"])
  },

  props: {
    phone: String
  },
  data() {
    return {
      salesType: 2, // salesType 类型：1为 非大地业务员，显示二维码 ；2 为大地业务员 无二维码

      recordList: [],
      state: {
        inServiceTime: true
      },
      photoState: {
        // 二维码大图 相关信息
        showCodePhoto: false, // 显示二维码大图
        linceNo: "" // 车牌号
      },
      param: {
        pages: null,
        page:1,
        rows:5,
        nextPage: true,
        hasData: false // 是否还有下一页数据（滚动时显示）
      }
    };
  },
  watch: {
    param() {
      if (this.param.nextPage) {
        window.addEventListener('scroll', this.handleScroll);
        console.log(window.screen.height)
      } else {
        window.removeEventListener('scroll')
      }
    }
  },

  created() {
    this.initiate()
    // this.getSalesPhone();
    // this.getQuoteRecord();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**
     * @discription 初始化页面
    * */
    initiate() {
      this.getSalesPhone();
      this.param['page'] = 1;
      this.recordList = [];
      this.getNewQuoteRecord();
    },
    // 获取报价记录
    getQuoteRecord(linceNo) {
      // let currentPage = this.pageCount[0]
      const params = {
        salesPhone: this.phone,
        linceNo: linceNo
      };

      this.$http.getQuotationList(params).then(res => {
        if (res.data.errCode == "00" ) {
          const recordList = res.data.data;
          for (let i = 0; i < recordList.length; i++) {
            Object.assign(recordList[i], {
              showInsuranceInfo: false
            });
          }
          this.recordList = recordList;
        } else if (res.data.errCode == "02") {
          this.recordList = [];
        }
      });
    },


    // 获取报价记录( 新增分页功能 )
    getNewQuoteRecord() {
    const params = {
      salesPhone: this.phone,
      page: this.param.page,
      rows: this.param.rows,
    };
    this.param['page']++;
    this.$http.getNewQuoteRecord(params).then(res => {
      if (res.data.errCode == "00" && this.param.page<=res.data.pages+1) {
        this.param.nextPage = res.data.nextPage;
        this.param.pages = res.data.pages;
        const recordList = res.data.data;
        for (let i = 0; i < recordList.length; i++) {
          Object.assign(recordList[i], {
            showInsuranceInfo: false
          });
        }
        this.recordList = [...this.recordList, ...recordList];
        this.param.hasData = false;
      }
    });
  },
    /**
     * @discription 监听滚动 触发底部事件
     * */
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(window.screen.height + scrollTop,document.body.scrollHeight);

      if (window.screen.height + scrollTop >= document.body.scrollHeight && this.param.page<=this.param.pages ) {
        this.param.hasData = true;
        this.getNewQuoteRecord();
      }
      else {
        this.param.nextPage = false
      }
    },

    //检查是否在服务时间
    checkServiceTime() {
      this.$http.checkServiceTime().then(res => {
        this.state.inServiceTime = res.data;
      });
    },

    // 检验车牌状态（是否为新车）
    checkLicensePlate(item) {
      const params = {
        lincenNo: item.linceNo,
        userCellphone: this.phone
      };
      this.$http.checkLicensePlate(params).then(res => {
        if (res.data.msg) {
          this.$toast(res.data.msg);
        } else {
          this.keepQuotation(item);
        }
      });
    },
    // 点击旋转箭头 内容显示或隐藏
    handleInsInfo(item, e) {
      e.stopPropagation();
      item.showInsuranceInfo = !item.showInsuranceInfo;
    },
    // 点击 显示二维码大图
    showPhoto(item, e) {
      e.stopPropagation();
      this.photoState.linceNo = item.linceNo;
      this.photoState.showCodePhoto = !this.photoState.showCodePhoto;
    },
    hideModal() {
      this.photoState.showCodePhoto = false;
    },
    // 判断当前手机号是否为业务员 ,（仅业务员可登录）
    getSalesPhone() {
      const params = {
        salesPhone: this.salesPhone
      };
      // 判断接口返回是否存在 ID
      this.$http.getSalesPhone(params).then(res => {
        this.salesType = res.data.salesType;
      });
    },

    keepQuotation(item) {
      if (item.businessstartdate.length > 12) {
        item.businessstartdate = item.businessstartdate.split(" ")[0];
      }
      const {
        //------车辆信息---------
        linceNoPrefix,
        id,
        carId,
        linceNo,
        region_code,
        businessstartdate, // 商业险起保日期（只能为当天日期之后的90天之内）
        ownerName,
        frameNum,
        engineNum,
        forcestartdate, // 交强险起保日期
        forceTax, // 交强险标志
        insuredidcard,
        insuredidtype,
        automoldcode,
        vehicleinfo,
        // cellphone,
        insuredmobile,
        insuredname,
        phone,
        moduleName,
        registerTime,
        // is_check: '1',
        // purchasePrice: 0,
        transferDate, //过户日期
        //-------保险信息--------
        bujimianchesun_baoe,
        chesun_baoe,
        // bujimiansanzhe_baofei,
        sanZheJieJiaRi_baoe,
        bujimiansanzhe_baoe,
        sanzhe_baoe,
        bujimiansheshui_baoe,
        sheshui_baoe,
        bujimiansiji_baoe,
        siji_baoe,
        bujimianchengke_baoe,
        chengke_baoe,
        bujimianhuahen_baoe,
        huahen_baoe,
        boli_baoe,
        bujimianziran_baoe,
        ziran_baoe,
        bujimiandaoqiang_baoe,
        daoqiang_baoe,
        hcsanfangteyue_baoe,
        forcetotal,
        taxtotal
      } = item;

      const markInfo = {
        linceNo: linceNo,
        regionCode: region_code,
        carId: carId,
        cityAbbr: linceNoPrefix
      };

      let carInfo = {
        Id: id, // 报价记录id
        carId: carId,
        BizStartDate: businessstartdate, // 商业险起保日期（只能为当天日期之后的90天之内）
        CarOwnersName: ownerName,
        CarVin: frameNum,
        EngineNo: engineNum,
        ForceStartDate: forcestartdate, // 交强险起保日期
        ForceTax: forcetotal || taxtotal ? 1 : 0, // 交强险标志
        IdCard: insuredidcard,
        IdType: insuredidtype,
        JYModuleCode: automoldcode,
        JYModuleInfo: vehicleinfo,
        MobilePhone: phone,
        MoldName: moduleName,
        RegisterDate: registerTime,
        // is_check: '1',
        // purchasePrice: 0,
        TransferDate: transferDate, //过户日期
        cellphone: this.phone,
        InsuredName: insuredname,
        InsuredIdType: insuredidtype,
        InsuredIdCard: insuredidcard
      };

      let insClassStore = {
        linceNo: linceNo,
        QuoteGroup: 1,
        Quote: 1,
        ForceTax: forceTax,
        BuJiMianCheSun: bujimianchesun_baoe,
        CheSun: chesun_baoe,
        BuJiMianSanZhe: bujimiansanzhe_baoe,
        SanZheJieJiaRi: sanZheJieJiaRi_baoe,
        SanZhe: sanzhe_baoe,
        BuJiMianSiJi: bujimiansiji_baoe,
        SiJi: siji_baoe,
        BuJiMianChengKe: bujimianchengke_baoe,
        ChengKe: chengke_baoe,
        BuJiMianHuaHen: bujimianhuahen_baoe,
        HuaHen: huahen_baoe,
        BoLi: boli_baoe,
        BuJiMianZiRan: bujimianziran_baoe,
        ZiRan: ziran_baoe,
        BuJiMianSheShui: bujimiansheshui_baoe,
        SheShui: sheshui_baoe,
        HcSanFangTeYue: hcsanfangteyue_baoe,
        BuJiMianDaoQiang: bujimiandaoqiang_baoe,
        DaoQiang: daoqiang_baoe
      };
      // 投保险种
      const insuredType = [
        forceTax,
        chesun_baoe,
        daoqiang_baoe,
        sanzhe_baoe,
        ziran_baoe,
        boli_baoe,
        sheshui_baoe,
        hcsanfangteyue_baoe,
        huahen_baoe,
        siji_baoe,
        chengke_baoe
      ];
      this.$store.commit("SET_MARK_INFO", markInfo);
      this.$store.commit("SET_CAR_INFO", carInfo);
      this.$store.commit("SET_INSURED_INFO", insClassStore);
      this.$router.push({
        name: "Proposal",
        query: {
          regionCode: region_code,
          insCount: insure.getInsuredCount(insuredType)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.ins-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
}
.loading {
  text-align: center;
  font-size: 24px;
  line-height: 60px;
  color: #9d9d9d;
}
.item-title {
  line-height: 60px;
  font-size: 28px;
  span:nth-of-type(1) {
    margin-right: 50px;
  }
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
.ins-info {
  padding-bottom: 30px;
  margin-bottom: 30px;
  line-height: 60px;
  font-size: 26px;
  color: #9d9d9d;
}
.ins-class {
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.arrows {
  @include icon(32, 18, "icon/arrows-down.png");
  position: absolute;
  top: 18px;
  right: 0;
  transition: transform 0.25s linear;
}
.arrowTrans {
  transform: rotate(180deg);
  transition: transform 0.25s linear;
}
button[disabled] {
  border-color: #ccc;
  color: #999;
  background: transparent !important;
}

.insurance-info {
  /*border-top: 0.5px solid #d9d9d9;*/
  /*border-bottom: 0.5px solid #d9d9d9;*/
  margin-bottom: 30px;
  padding-bottom: 20px;
  font-size: 28px;
}
.insure-force {
  line-height: 50px;
  .iconfont {
    font-size: 28px;
    color: #4caf50;
  }
  p:last-child {
    color: #9d9d9d;
  }
}
.code-Photo {
  text-align: center;
  margin-top: 10px;
}
</style>
