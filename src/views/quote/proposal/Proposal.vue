<template>
  <div class="quotation-wrap">
    <div class="quotation">
      <!--吸顶部分-->
      <div
        class="owner-info-card"
        ref="ownerInfoCard"
        :class="!scrollTop?'': state.isFixed?'fixed-top':'fixed-move-up'"
      >
        <div class="quo-fixed ins-box">
          <p class>
            <span class="fixed-lince">{{markInfo.linceNo}}</span>
            <span class>{{carInfo.CarOwnersName}}</span>
          </p>
          <p class="quo-fixed-right">{{carInfo.MoldName}}</p>
        </div>
      </div>
      <div class="quo-owner-info insure-card insure-flexbox insure-flexbox-column">
        <!--v-show="!state.isFixed"-->
        <div class="owner-top ins-box">
          <p class="quo-title">
            <span class="car-namber">{{markInfo.linceNo}}</span>
          </p>
          <span class="blues quo-change" @click="returnEditCarInfo">
            <i class="iconfont">&#xe610;</i>修改
          </span>
        </div>
        <p class="owner-name">{{carInfo.CarOwnersName}}</p>
        <p class="owner-car car-info">{{carInfo.MoldName}}</p>
        <p class="car-info">
          服务时间：
          <span>{{carInfo.BizStartDate}}至{{carInfo.BizStartDate|handleDeadline}}</span>
        </p>
      </div>

      <div class="quo-selected insure-card">
        <!--:class="{'mag-top':state.isFixed}"-->
        <div class="selected-top">
          <p class="quo-title ins-box">
            <span>
              已选险种
              <i class="oranges">({{insuranceCount}})</i>
            </span>
            <span @click="returnRecustomIns" class="blues quo-change">
              <i class="iconfont">&#xe610;</i>修改
            </span>
            <!-- <em class=" quo-arrows" :class="{'arrowTrans': showInsuranceInfo }" @click="showInsuranceInfo=!showInsuranceInfo"></em> -->
          </p>
          <!-- <div class="insurance-info" v-show="!showInsuranceInfo">
            <p v-if="(carInfo.ForceStartDate && !$route.query.isAutoQuote) || (autoForceTax != 0 && $route.query.isAutoQuote)"> 商业险+交强险/车船稅</p>
            <div v-else>
              <p>商业险</p>
              <p>交强险：未选择</p>
            </div>
          </div>-->
          <div class="insurance-info">
            <p class="ins-box">
              <span class>商业险</span>
              <!-- <i
                class="iconfont"
                :class="{'show':state.showInsure}"
                @click="state.showSelectedInsure=!state.showSelectedInsure"
              >&#xe649;</i>-->
            </p>
            <SelectedInsure class="ins-info-left" v-show="state.showSelectedInsure"></SelectedInsure>

            <div v-if="(carInfo.ForceStartDate && insuranceInfo.ForceTax)" class="insure-force">
              <p>交强险</p>
              <p>
                <em class="iconfont">&#xe69e;</em>
                <span>交强险/车船税</span>
              </p>
            </div>
            <!--<p v-if=" (carInfo.ForceStartDate && insuranceInfo.ForceTax) ">交强险<span>交强险/车船税</span></p>-->
          </div>
        </div>
      </div>

      <!--进度条说明-->
      <p class="progress" v-if="companys.length>0">
        <!-- 报价已完成
        <span class="oranges">30%</span>，-->
        目前已显示
        <span class="oranges">{{companys.length}}</span>项服务内容
      </p>
      <DefaultImg :text="businessParams.user=='IRB'?'您好，网站正在报备中，暂时无法报价！':'暂无报价内容'" v-else></DefaultImg>
      <!--保司 报价列表-->
      <div class="quo-ins-info" v-for="(company,index) in companys" :key="index">
        <!--报价中加载图片 loading -->
        <div class="loading insure-card" v-show="!company.loaded"></div>
        <div class="company-content insure-card" v-show="company.loaded">
          <div class="owner-top ins-box">
            <p class="quo-title">
              <span class="car-namber">{{company.insure_company_code|companyName}}</span>
            </p>
            <div class="insure-flexbox insure-flexbox-align-center" v-if="company.detail">
              <div class="signed" @click="handleSigning(company)">签约</div>
            </div>
            <p class="button-wrap" v-if="company.warnPlan">
              <a
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='400' || company.warnPlan.respcode==='401' ||
                  company.warnPlan.respcode==='403'"
                href="tel:400-9898-988"
              >联系客服</a>
              <router-link
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='404'"
                :to="{name:'custom-insure'}"
              >修改险种</router-link>

              <button
                type="button"
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='405'"
                @click="getCarTypeListByBrand(company)"
              >选择车型</button>
              <!-- <button type="button" class="quo-failure-btn" @click="getCarTypeListByBrand(company)">选择车型</button> -->
              <button
                type="button"
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='406'"
                @click="returnRecustomIns"
              >修改信息</button>
              <button
                type="button"
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='407'"
                @click="toggleVerificationCodeForm(company)"
              >输入验证码</button>
              <button
                type="button"
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='408'"
                @click="getCustomQuoteInfoByCompanyCode(company)"
              >重试</button>
              
              <button
                type="button"
                class="quo-failure-btn"
                v-if="company.warnPlan.respcode==='409'||company.warnPlan.respcode==='410'"
                @click="returnEditCarInfo"
              >修改信息</button>
            </p>
          </div>

          <label
            class="quo-ins-detail insure-flexbox insure-flexbox-content-between"
            v-for="plan in company.planList"
            :key="plan.id"
          >
            <div class="ins-left" v-if="company.planList.length>1">
              <input type="radio">
            </div>
            <div class="ins-right insure-flexbox insure-flexbox-column insure-flexbox-item">
              <!-- v_1.4.12 版本未修正
              <p class="r-top">
                <span class="price margin-r"><b>{{plan.dailytotal}}</b><i>元/天</i></span>
                <span class="grays margin-r">|</span>
                <span class="grays">服务费用</span>
              </p>

              <p class="r-bottom insure-flexbox insure-flexbox-align-center">
                <span class="blues total-days margin-r">{{plan.total_days}}天</span>
                <span class="grays margin-r">|</span>
                <span class="grays margin-r">封顶天数</span>
                <em
                  class="iconfont icon-faq"
                  @click="showExpenseDescriptionModal(plan)"
                >&#xe6dd;</em>
              </p>
              -->
              <p class="r-top">
                <span class="price margin-r">
                  {{plan.dailytotal}}
                  <i>元/天</i>
                </span>
                <!--<span class="discount margin-r" v-if="plan.discount!=1">{{plan.discount|operation(10,'*')}}折</span>-->
                <!--<span>(商业险)</span>-->
              </p>

              <p class="r-bottom insure-flexbox insure-flexbox-align-center">
                <span class="blues">封顶天数（{{plan.total_days}}天）</span>
                <em class="icon-faq" @click="showExpenseDescriptionModal(plan)"></em>
              </p>

              <div class="icon-box" :sytle="{display:'none'}">
                <em
                  class="arrows"
                  :class="{ 'arrowTrans': company.showDetail }"
                  @click="company.showDetail=!company.showDetail"
                ></em>
              </div>
            </div>
          </label>

          <!--隐藏内容-->
          <InsureTable :insure="company.detail" v-if="company.showDetail"></InsureTable>
          <!--报价失败，四种显示文案，两种跳转页面-->
          <div class="quo-failure" v-if="company.warnPlan">
            <p class="hint-txt insure-flexbox insure-flexbox-align-center insure-flexbox-item">
              <!--<em class="icon-point"></em>-->
              <span
                v-if="company.warnPlan.respcode==='400' || company.warnPlan.respcode==='401'"
              >无法在线报价，请拨打客服联系热线进行人工报价！</span>
              <span
                v-if="company.warnPlan.respcode==='403'"
              >{{company.warnPlan.tip?company.warnPlan.tip:(company.warnPlan.msg?company.warnPlan.msg:'无法在线报价，请拨打客服联系热线进行人工报价！')}}</span>
              
              <span v-if="company.warnPlan.respcode==='402'">请求过于频繁，请间隔一段时间再做提交！</span>
              
              <span v-if="company.warnPlan.respcode==='404'">
                险种不匹配，请修改后重新报价！
                <em class="icon-faq" @click="showReasonModal(company.warnPlan)"></em>
              </span>
              
              <span v-if="company.warnPlan.respcode==='405'">
                {{company.warnPlan.tipmsg?company.warnPlan.tipmsg:'因保司承保规则车险不匹配，请调整车型'}}
                <!-- <span v-if="company.warnPlan.source==='1'">
                  {{company.warnPlan.tipmsg}}
                </span>
                <span v-else-if="company.warnPlan.source==='64'">
                  {{company.warnPlan.msg}}
                </span>-->
                <!-- <span v-else> 因保司承保规则车险不匹配，请调整车型</span> -->
              </span>
              
              <span
                v-if="company.warnPlan.respcode==='406'"
                class="insure-flexbox insure-flexbox-align-center"
              >
                <template
                  v-if="company.warnPlan.bizStartDate||company.warnPlan.forceStartDate"
                >{{company.warnPlan.bizStartDate?'商业险':'交强险'}}起保时间有误，建议改为{{company.warnPlan.bizStartDate||company.warnPlan.forceStartDate}}</template>
                <template v-else>起保时间有误，请重新填写！</template>
                <em class="icon-faq" @click="state.showHint=true"></em>
              </span>
              <span v-if="company.warnPlan.respcode==='407'">因保司规则限制,请输入验证码后办理服务</span>
              <span v-if="company.warnPlan.respcode==='408'">目前报价人数过多，系统请求忙，请重试！</span>
              <span v-if="company.warnPlan.respcode==='409'">该车辆为过户车，请勾选过户选项后报价！</span>
              <span v-if="company.warnPlan.respcode==='410'">该车辆不为过户车，请取消过户选项后报价！</span>
              <span v-if="company.warnPlan.respcode==='412'">因受服务规则限制，暂不支持商业险总价未超过1200元的订单</span>
              <span v-if="company.warnPlan.respcode==='413'">{{company.warnPlan.msg}}</span>
            </p>
            <VerificationCodeForm
              :plan="company.warnPlan"
              v-if="company.showVerificationCodeForm"
              @submit="submitVerificationCodeForm(company,$event)"
            ></VerificationCodeForm>
          </div>
        </div>
      </div>
    </div>
    <p
      @click="html2Image"
      class="blues screenshot"
      v-if="salesPhone&&quoteSuccessedCompanys.length>0"
    >生成图片</p>
    <p class="tips" v-if="companys.length>0">以上价格仅供参考，价格可能受您的历史理赔情况等原因影响，最终价格以出单为准</p>
    <ChargeModal :plan="plan" v-if="state.showCharge"></ChargeModal>
    <HintModal v-show="state.showHint"></HintModal>
    <!-- <ConfirmDateModal
      v-if="state.showConfirmDate"
      @confirm="state.showInfoConfirmModal=true"
    ></ConfirmDateModal>-->
    <CarTypeSheetModal
      :list="carTypeList"
      :code="carInfo.JYModuleCode"
      v-show="state.showCarTypeSheetModalModal"
      @selected="selectedCarType($event)"
    ></CarTypeSheetModal>
    <ReasonModal :plan="plan" v-if="state.showReasonModal"></ReasonModal>
    <InfoConfirmModal v-show="state.showInfoConfirmModal" @submit="signing"></InfoConfirmModal>
    <ProposalScreenshot
      ref="screenshotChild"
      :companys="quoteSuccessedCompanys"
      v-if="salesPhone&&state.showProposalScreenshot"
    ></ProposalScreenshot>
  </div>
</template>

<script>
import { insure } from "@/utils/insure";

import { storage, session } from "@/utils/browser";
import { mapGetters } from "vuex";

import ChargeModal from "./components/ChargeModal";
import HintModal from "./components/HintModal";
import InsureTable from "./components/InsureTable";
// import ConfirmDateModal from "./components/ConfirmDateModal";
import SelectedInsure from "@/components/share/SelectedInsure";
import CarTypeSheetModal from "@/components/modal/CarTypeSheetModal";
import ReasonModal from "./components/ReasonModal";
import VerificationCodeForm from "./components/VerificationCodeForm";
import InfoConfirmModal from "./components/InfoConfirmModal";
import DefaultImg from "@/components/share/DefaultImg";
import ProposalScreenshot from "./components/ProposalScreenshot";

export default {
  components: {
    SelectedInsure,
    ChargeModal,
    HintModal,
    // ConfirmDateModal,
    CarTypeSheetModal,
    InsureTable,
    ReasonModal,
    VerificationCodeForm,
    InfoConfirmModal,
    DefaultImg,
    ProposalScreenshot
  },
  data() {
    return {
      insuranceCount: 0, // 险种数量
      companys: [], // 保险公司,
      quoteSuccessedCompanys: [],
      quotationParams: {},
      plan: null,
      carTypeList: [],
      company: {},
      // autoForceTax: "", // 自动报价后的交强险
      state: {
        // autoFixed: false, // 自动吸顶
        isFixed: false, // 顶部卡片是否固定在顶部
        showHint: false,
        showCharge: false,
        // showConfirmDate: false,
        showCarTypeSheetModalModal: false,
        showVerificationCodeModal: false,
        showReasonModal: false,
        showSelectedInsure: true,
        showInfoConfirmModal: false,
        showProposalScreenshot: false
      },
      scrollTop: null, // 用于首次进入页面，屏蔽顶部滑动效果y
      photoSrc: ""
    };
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO",
      markInfo: "MARK_INFO",
      insuranceInfo: "INSURED_INFO",
      // insurant: "insurant",
      userId: "userId",
      salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  created() {
    this.initData();
    this.countInsurance();
    // C端无渠道id不报价
    if (this.businessParams.channel_user_id || this.salesPhone) {
      this.getCompanyList();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    //在methods监控滚动时间
    handleScroll() {
      this.$nextTick(() => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let headerHeight = this.$refs.ownerInfoCard.offsetHeight;
        // console.log('滚动的距离:'+scrollTop,'头部的高度:'+ headerHeight)
        if (scrollTop >= 60) {
          this.state.isFixed = true;
          this.scrollTop = 1;
        } else {
          this.state.isFixed = false;
        }
      });
    },
    // 计算已选险种数目
    countInsurance() {
      const insuranceCount = [
        this.insuranceInfo.ForceTax,
        this.insuranceInfo.CheSun,
        this.insuranceInfo.DaoQiang,
        this.insuranceInfo.SanZhe,
        this.insuranceInfo.ZiRan,
        this.insuranceInfo.BoLi,
        this.insuranceInfo.SheShui,
        this.insuranceInfo.HcSanFangTeYue,
        this.insuranceInfo.HuaHen,
        this.insuranceInfo.SiJi,
        this.insuranceInfo.ChengKe
      ];
      this.insuranceCount = insure.getInsuredCount(insuranceCount);
    },
    // 初始化数据
    initData() {
      if (this.markInfo) {
        const { linceNo, carId, regionCode } = this.markInfo;
        const { jobNo, channel_user_id, serialNo } = this.businessParams;
        // 添加参数
        this.carInfo["CarId"] = carId;
        this.carInfo["CityCode"] = regionCode;
        this.carInfo["AutoMoldCode"] = this.carInfo.JYModuleCode;
        this.carInfo["LicenseNo"] = linceNo;

        // // 合并报价参数
        this.quotationParams = Object.assign(
          {
            onlineSales: this.salesPhone ? null : 1, //网销平台标志
            jobNoFlag: jobNo ? 1 : 0, // 企业用户标志
            channel_user_id: channel_user_id, // 企业员工标志
            platUserId: this.userId,
            serialNo: serialNo // 电销大地流水号
          }
          // ,
          // this.carInfo,
          // this.insuranceInfo
        );
      }
    },
    /**
     * @description 获取车辆类型
     * @param {Object} company 保司对象
     *
     */
    getCarTypeListByBrand(company) {
      this.company = company;
      if (this.carTypeList.length > 0) {
        return (this.state.showCarTypeSheetModalModal = true);
      }
      // let moduleName;
      // if (company.warnPlan.msg) {
      //   let str = company.warnPlan.msg.split("：")[1];
      //   moduleName = str
      //     ? str.replace(/[\u4e00-\u9fa5]+w*$/, "")
      //     : this.carInfo.MoldName;
      // }
      /*
      else {
        moduleName = this.carInfo.MoldName
          ? this.carInfo.MoldName.split("/")[0].replace(
              /[\u4e00-\u9fa5]+w*$/,
              ""
            )
          : "";
      }
*/

      const params = {
        linceNo: this.markInfo.linceNo,
        CityCode: this.markInfo.regionCode,
        frameNum: this.carInfo.CarVin,
        moduleName: company.warnPlan.tipmsg
          ? company.warnPlan.tipmsg
          : this.carInfo.MoldName,
        engineNum: this.carInfo.EngineNo,
        mobilePhone: this.carInfo.MobilePhone,
        registerTime: this.carInfo.RegisterDate,
        insure_company_code_ref: company.insure_company_code
      };
      this.$http.getCarTypeInfoByCarBrand(params).then(res => {
        if (res.data.list) {
          this.carTypeList = res.data.list;
          this.state.showCarTypeSheetModalModal = true;
        } else {
          this.$toast("未查询到车型 ");
        }
      });
    },
    /**
     * @description 选择车型
     * @param {Object} company 保司对象
     *
     */
    selectedCarType(item) {
      this.company.loaded = false;
      this.state.showCarTypeSheetModalModal = false;
      this.carInfo.JYModuleCode = item.vehicleNo;
      this.carInfo.JYModuleInfo = item.info;
      this.carInfo.AutoMoldCode = item.vehicleNo;

      // const { carId, regionCode } = this.markInfo;

      // this.carInfo.CarId = carId;
      // this.carInfo.CityCode = regionCode;
      // 重选车型清空安心图片验证码
      if (this.quotationParams.cQryCde) {
        this.quotationParams.cQryCde = null;
        this.quotationParams.JQcQryCde = null;
        this.quotationParams.JQcHeckCode = null;
        this.quotationParams.cHeckCode = null;
      }
      this.$store.commit("SET_CAR_INFO", this.carInfo); // 同步一遍数据到缓存
      this.getCustomQuoteInfoByCompanyCode(this.company);
    },
    /**
     * @description 显示费用说明modal
     */
    showExpenseDescriptionModal(plan) {
      this.plan = plan;
      this.state.showCharge = true;
    },
    showReasonModal(plan) {
      this.plan = plan;
      this.state.showReasonModal = true;
    },
    // 显示隐藏详情
    toggleCompanyDetail(company) {
      company.showDetail = !company.showDetail;
    },
    // 显示验证码
    toggleVerificationCodeForm(company) {
      company.showVerificationCodeForm = !company.showVerificationCodeForm;
    },
    // 提交验证码
    submitVerificationCodeForm(company, formdata) {
      company.loaded = false;
      company.showVerificationCodeForm = false;
      Object.assign(this.quotationParams, formdata);
      this.getCustomQuoteInfoByCompanyCode(company);
    },
    // 获取保司列表
    getCompanyList() {
      this.countInsurance();
      const params = {
        cityCode: this.markInfo.regionCode,
        // cellphone: this.carInfo.MobilePhone,
        salesPhone: this.salesPhone, // 电销业务员
        channel_user_id: this.businessParams.channel_user_id // 网销渠道ID
      };
      this.$http.getInsureCompany(params).then(res => {
        this.companys = res.data.data.map((item, index) => {
          item["showDetail"] = false;
          item["showVerificationCodeForm"] = false;
          item["index"] = index; // 存储当前保司索引
          this.getCustomQuoteInfoByCompanyCode(item);
          return item;
        });
      });
    },
    // 根据保司编码请求报价接口
    getCustomQuoteInfoByCompanyCode(company) {
      // console.log(this.insuranceInfo);
      const companyCode = company.insure_company_code;
      const params = Object.assign(
        {},
        this.quotationParams,
        this.insuranceInfo,
        this.carInfo
      ); // 拷贝参数
      // debugger
      params.Quote = params.QuoteGroup = companyCode; // 修改保司编码为当前保司编码
      params.cellphone = this.salesPhone; // 修改保司编码为当前保司编码

      this.$http.getCustomQuoteInfo(params).then(res => {
        const plan = res.data[0];

        // 有报价id
        company["loaded"] = plan.id ? plan.id : true;
        if (plan.id) {
          plan["showCharge"] = false;
          this.getInsuranceCompanyDetail(company, plan);
        } else {
          // 除验证码出现使用上一次标志外都更新一遍
          if (plan["codeImg"] != "uselast") {
            Object.assign(company, {
              warnPlan: plan
            });
          }
          this.$set(this.companys, company.index, company);
        }
        // this.sortCompanyList();
      });
    },
    // 通过报价成功ID获取保险详情

    getInsuranceCompanyDetail(company, plan) {
      const params = {
        Id: plan.id
      };
      this.$http.getInsuranceCompanyDetail(params).then(res => {
        // 报成功后清除之前未报成功的标志
        if (company.warnPlan) {
          company.warnPlan = null;
        }

        Object.assign(company, {
          planList: new Array(plan),
          detail: res.data
        });
        this.quoteSuccessedCompanys.push(company);
        this.$set(this.companys, company.index, company);
      });
    },
    // 全部保司报过价后报价成功的排前面
    sortCompanyList() {
      const comanyList = this.companys;
      if (comanyList.length > 1) {
        const loadedCompanyList = comanyList.filter(item => item.loaded);
        // 全部保司均以报过价（不论报价成功或失败）
        if (comanyList.length === loadedCompanyList.length) {
          // comanyList.sort((a, b) => {
          //   if (a.planList && !b.planList) return -1;
          // });
          // console.log(comanyList)
          let list = [];
          for (let i = 0; i < loadedCompanyList.length; i++) {
            const item = comanyList[i];
            console.log(item.insure_company_name);
            if (typeof item.loaded === "string") {
              list.unshift(item);
            } else {
              list.push(item);
            }
          }
          // comanyList.map((item, index) => {
          //   if (typeof item.loaded === "string") {
          //     list.unshift(item);
          //   } else {
          //     list.push(item);
          //   }
          // item.planList ? list.unshift(item) : list.push(item);
          // this.$set(this.companys, index, item);
          // });
          // console.log(list);
          this.companys = list;
        }
      }
    },

    // 判断签约保司是否为大地，是则弹框，确定起保日期
    handleSigning(company) {
      this.company = company;
      const {
        businessexpiredate,
        businessstartdate,
        forcestartdate,
        forceexpiredate
      } = this.company.detail;

      storage.setItem(
        "PLAN_INFO",
        Object.assign(this.company.planList[0], {
          businessexpiredate: businessexpiredate,
          businessstartdate: businessstartdate,
          forcestartdate: forcestartdate,
          forceexpiredate: forceexpiredate
        })
      );

      //大地
      // if (company.insure_company_code == 32&&this.markInfo.cityAbbr.includes('豫')) {
      //   this.checkInfoConfirmState();
      // } else {
      //   this.signing();
      // }
      this.signing();
    },

    // 签约
    signing() {
      if (!this.salesPhone) {
        this.$router.push({
          name: "OrderConfirm"
        });
      } else {
        this.$router.push({
          name: "ConfirmSubmit"
        });
      }
    },
    // 检查用户是否需要信息验证
    checkInfoConfirmState() {
      const { InsuredIdCard } = this.carInfo;

      const params = {
        type: 1,
        idCard: InsuredIdCard
      };

      this.$http.verifyBankCard(params).then(res => {
        if (res.data.respcode == "01") {
          this.state.showInfoConfirmModal = true;
        } else {
          this.signing();
        }
      });
    },
    // 返回修改车辆信息
    returnEditCarInfo() {
      const { linceNo, regionCode } = this.markInfo;
      this.$router.push({
        name: "Info",
        query: {
          linceNo: linceNo,
          regionCode: regionCode
        }
      });
    },

    // 返回修改自定義信息
    returnRecustomIns() {
      const { linceNo } = this.markInfo;
      this.$router.push({
        name: "custom-insure"
        // query: {
        //   linceNo: linceNo
        // }
      });
    },
    html2Image() {
      this.state.showProposalScreenshot = true;
      this.$refs.screenshotChild.html2Image();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.single-line {
  display: flex;
}
.owner-name {
  margin-bottom: 10px;
}
.quotation-wrap {
  padding-bottom: 40px;
  .start-date {
    right: inherit;
  }
  /deep/ {
    .ins-default-img {
      padding-bottom: 200px;
    }
  }
}

.quotation {
  background-color: #f5f5f5;
  padding: 30px 20px;
  font-size: 24px;

  .quo-fixed {
    padding: 0 40px;
    background: #fff;
    text-wrap: normal;
    line-height: 120px;
    font-size: 28px;
    color: #121212;
    z-index: 9;
    .quo-fixed-right {
      @include text-overflow-percent-ellipsis(50%);
    }
    .fixed-lince {
      margin-right: 20px;
    }
  }

  .company-content {
    .icon-box {
      display: block;
      width: 32px;
      height: 18px;
      position: absolute;
      bottom: 35px;
      right: 0;
    }
  }
  .owner-info-card {
    display: none;
  }
  .fixed-top {
    display: block;
    animation: fixed-down 0.6s 1;
    transition: all 0.6s ease-out;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    box-shadow: 0 5px 20px #9d9d9d;
  }
  .fixed-move-up {
    display: block;
    animation: fixed-up 0.6s 1;
    transition: all 0.6s ease-in;
    position: fixed;
    top: -120px;
    left: 0;
    z-index: 9;
    width: 100%;
    box-shadow: none;
  }
  .quo-title {
    font-size: 30px;
    line-height: 60px;
    font-weight: 500;
  }
  .quo-owner-info {
    position: relative;
    background: #fff;
    .car-info {
      line-height: 40px;
      font-size: 24px;
      color: #9d9d9d;
    }
    .progress-bar-wrap {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 10px;
      .progress-bar {
        height: 10px;
        background: #007aff;
      }
    }
  }
  .progress {
    margin-bottom: 25px;
    font-size: 30px;
    text-align: center;
  }
  .car-namber {
    margin-right: 50px;
  }
  .quo-edit {
    width: 100px;
    color: #007aff;
  }
  .icon-edit {
    display: block;
    width: 29px;
    height: 33px;
    margin-right: 6px;

    @include icon(29, 33, "icon/quo-edit.png");
  }

  .arrows-up {
    @include icon(32, 18, "icon/arrows-up.png");
  }
  .arrows,
  .arrows-down {
    @include icon(32, 18, "icon/arrows-down.png");
    position: absolute;
    top: 0;
    right: 0;
    transition: transform 0.25s linear;
  }
  .arrowTrans {
    transform: rotate(180deg);
    transition: transform 0.25s linear;
  }
  .icon-faq {
    margin-left: 15px;
    @include icon(32, 32, "icon/quo-faq.png");
    /*font-size: 32px;*/
    /*color: #0b8aff;*/
  }

  .explain {
    color: #9d9d9d;
  }
}
.quo-change {
  font-size: 26px;
  line-height: 28px;
  // border-bottom: solid 1px #007aff;
  .iconfont {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 4px;
  }
}
.quo-selected {
  .selected-top {
    position: relative;
    .quo-arrows {
      @include icon(32, 18, "icon/arrows-down.png");
      position: absolute;
      top: 70px;
      right: 0;
      transition: transform 0.25s linear;
    }

    .insurance-info {
      line-height: 40px;
      font-size: 24px;
      color: #252525;

      .iconfont {
        font-size: 24px;
      }
    }
    .ins-info-left {
      // width: 90%;
      text-align: justify;
    }
    .custom-ins {
      display: flex;
      align-items: center;
      position: absolute;
      top: 45px;
      right: 0;
    }
    .info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.insure-force {
  line-height: 50px;
  .iconfont {
    margin-right: 15px;
    font-size: 32px !important;
    color: #45c46c;
  }
  p:last-child {
    color: #9d9d9d;
  }
}
.signed {
  width: 140px;
  height: 60px;
  border-radius: 30px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  line-height: 60px;
  background: linear-gradient(to left, #007aff, #22aefe);
}
.text-through {
  text-decoration: line-through;
  margin: 0 10px;
}
.quo-ins-info {
  .ins-left {
    input[type="radio"] {
      width: 36px;
      height: 36px;
      margin: 9px 10px 0 0;
    }
  }
  .ins-right {
    font-size: 24px;
    color: #9d9d9d;
    /*line-height: 70px;*/
    /*    .price {
      display: inline-block;
      width: 170px;
      font-size: 30px;
      color: #ff5e03;
      b {
        font-size: 32px;
      }
      i {
        font-size: 24px;
      }
    }*/
    line-height: 50px;
    .price {
      font-size: 30px;
      color: #ff5e03;
      i {
        font-size: 24px;
      }
    }
    .discount {
      // display: block;
      height: 30px;
      padding: 0 25px;
      line-height: 30px;
      color: #ff5e03;
      background: #fee122;
      border-radius: 15px;
    }
  }
  .total-days {
    display: inline-block;
    width: 177px;
  }

  .quo-bottom {
    margin-top: 20px;
    p {
      height: 32px;
      line-height: 32px;
      font-size: 24px;
      margin-right: 10px;
      color: #fff;
      padding: 0 15px;
      background: #70b1ff;
      border-radius: 16px;
      @include multi-line-exllipsis(1);
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .quo-failure {
    padding: 30px 0;
    font-size: 24px;
    line-height: 50px;
    color: #9d9d9d;
    .icon-point {
      @include icon(37, 37, "icon/quo_point.png");

      margin-right: 20px;
    }
  }
}
.quo-failure-btn {
  display: block;
  padding: 0 30px;
  /*width: 150px;*/
  height: 60px;
  margin-left: 10px;
  border-radius: 30px;
  font-size: 26px;
  line-height: 60px;
  text-align: center;
  background: linear-gradient(to left, #007aff, #22aefe);
  color: #fff;
}

.quo-ins-detail {
  padding-top: 20px;
  position: relative;
  // border-bottom: 1px solid #efefef;
}

.margin-r {
  margin-right: 10px;
}
.loading {
  width: 100%;
  height: 300px;
  background: url($baseUrl+"images/loadings.gif") no-repeat center center/cover;
}
.tips {
  width: 80%;
  margin: auto;
  text-align: center;
  font-size: 24px;
  color: #9b9b9b;
}

@keyframes fixed-down {
  from {
    top: -120px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
@keyframes fixed-up {
  from {
    top: 0;
    opacity: 1;
  }
  to {
    top: -120px;
    opacity: 0;
  }
}
.screenshot {
  margin: 30px 0;
  font-size: 24px;
  text-align: right;
  padding-right: 20px;
  text-decoration: underline;
}
</style>
