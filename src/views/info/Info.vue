<template>
  <div class="information">
    <div class="info-owner card">
      <div class="info-title">
        <p>车主信息</p>
        <router-link :to="{name:'UploadSingle'}" v-if="!salesPhone">
          <em class="icon-camera"></em>拍照/上传
        </router-link>
      </div>
      <div class="info-item car-type">
        <label>车辆类型</label>
        <div class="radio">
          <input
            type="radio"
            name="car"
            v-model="carType"
            value="1"
            @change="handleSwitchCarType"
            id="private"
          >
          <label for="private">
            <i></i>私家车
          </label>
          <input
            type="radio"
            name="car"
            v-model="carType"
            value="2"
            @change="handleSwitchCarType"
            id="public"
          >
          <label for="public">
            <i></i>公司车（非营运）
          </label>
        </div>
      </div>
      <div class="info-item">
        <label>车主姓名</label>
        <input type="text" v-model="carInfo.CarOwnersName" placeholder="请输入车主姓名">
        <i class="iconfont">&#xe612;</i>
      </div>
      <div class="info-item">
        <label>证件类型</label>
        <select v-model="carInfo.IdType" dir="rtl">
          <option
            v-for="item in credentials"
            :key="item.id"
            :value="item.id"
            v-if="item.type==carType"
          >{{item.text}}</option>
        </select>
        <i class="iconfont">&#xe612;</i>
      </div>
      <div class="info-item">
        <label>证件号码</label>
        <SecretInput v-model="carInfo.IdCard" placeholder="请输入证件号码" :max="18" secret="6,0"/>
        <i class="iconfont">&#xe612;</i>
      </div>

      <div class="info-item">
        <label>手机号码</label>
        <SecretInput
          type="tel"
          v-model="carInfo.MobilePhone"
          placeholder="请输入手机号码"
          :max="11"
          secret="3,4"
        />
        <i class="iconfont">&#xe612;</i>
      </div>
    </div>

    <div class="info-car card">
      <div class="info-title">
        <p>车辆信息</p>
        <router-link :to="{name:'Guide'}">如何查看车辆信息</router-link>
      </div>

      <div class="info-item">
        <label>车辆识别号</label>
        <SecretInput v-model="carInfo.CarVin" placeholder="请输入车辆识别号" :max="17" secret="3,3"/>
        <i class="iconfont">&#xe612;</i>
      </div>

      <div class="info-item">
        <label>发动机号码</label>
        <SecretInput v-model="carInfo.EngineNo" placeholder="请输入发动机号码" secret="3,2"/>
        <i class="iconfont">&#xe612;</i>
      </div>

      <div class="info-item">
        <label>品牌型号</label>
        <input
          type="text"
          id="car-brand"
          v-model.lazy="carInfo.MoldName"
          placeholder="请输入品牌型号"
          @change="getCarTypeListByBrand"
        >
        <i class="iconfont">&#xe612;</i>
      </div>
      <div class="info-item car-type-item" @click="getCarTypeInfoAfterClickSelected">
        <label>车辆型号</label>

        <div>
          <span
            v-if="carInfo.JYModuleInfo&& carInfo.JYModuleCode"
          >{{carInfo.JYModuleInfo|friendlyCarType|handleStr(10,10)}}</span>
          <span v-else>请选择车辆型号</span>
          <i class="iconfont">&#xe612;</i>
        </div>
      </div>
      <div class="info-item">
        <label>注册日期</label>
        <InsureDate v-model="carInfo.RegisterDate" placeholder="请选择注册日期"></InsureDate>
        <i class="iconfont">&#xe612;</i>
      </div>

      <!--起保日期-->
      <div class="insurance-date">
        <div class="info-item">
          <label>是否为过户车</label>
          <mt-switch v-model="state.isTransferCar"></mt-switch>
        </div>
        <div class="info-item" v-if="state.isTransferCar">
          <label>过户日期</label>
          <InsureDate v-model="carInfo.TransferDate" placeholder="请选择过户日期" id="TransferDate"></InsureDate>
          <i class="iconfont">&#xe612;</i>
        </div>
      </div>
    </div>
    <InsurantCard class="card" :carInfo="carInfo"></InsurantCard>
    <div class="btn-wrap insure-flexbox insure-flexbox-content-center btn-margin">
      <button type="button" class="sign-up-btn" @click="formValidate">立即办理</button>
    </div>
    <CarTypeSheetModal
      :list="carTypeList"
      :code="carInfo.JYModuleCode"
      @selected="handleCarTypeSelected($event)"
      v-show="state.showCarTypeSheetModal"
    ></CarTypeSheetModal>
    <IDModal :id="carInfo.IdCard" @complete="handleComplete" v-show="state.showIDConfirm"></IDModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IDModal from "./components/IDModal";
import InsurantCard from "./components/InsurantCard";
import validate from "@/utils/validate.config";
import SecretInput from "@/components/form/SecretInput";
import InsureSwitch from "@/components/form/InsureSwitch";
import InsureDate from "@/components/form/InsureDate";
import CarTypeSheetModal from "@/components/modal/CarTypeSheetModal";
import { date } from "@/utils/date";
import { storage } from "@/utils/browser";
import { credentials, insure } from "@/utils/insure";
export default {
  name: "Info",
  components: {
    IDModal,
    SecretInput,
    InsureDate,
    CarTypeSheetModal,
    InsurantCard,
    InsureSwitch
  },
  data() {
    return {
      carType: 1,
      credentials: [],
      state: {
        showIDConfirm: false, // 是否显示身份证验证框
        isTransferCar: false, // 是否为过户车
        showCarTypeSheetModal: false // 是否显示车型选择
      },
      loadedIdCardNo: "", // 接口初始化身份证号码
      carInfo: {
        // linceNo: this.$route.query.linceNo,
        BizStartDate: "", // 商业险起保日期（只能为当天日期之后的90天之内）
        CarOwnersName: "",
        CarVin: "",
        EngineNo: "",
        ForceStartDate: "", // 交强险起保日期
        IdCard: "",
        IdType: "1",
        JYModuleCode: "",
        JYModuleInfo: "",
        MobilePhone: "", // 车主手机号
        // cellphone: storage.getItem("USER_PHONE"), // 登录人手机号
        MoldName: "",
        RegisterDate: "",
        // is_check: '1',
        // purchasePrice: 0,
        TransferDate: "", //过户日期
        /* 被保人信息 */
        InsuredName: "",
        InsuredIdType: 1,
        InsuredIdCard: "",
        //业务参数（非必传）
        isDefaultInsurant: true
      },
      carTypeList: [],
      timer: null,
      carId: "",
      markId: ""
    };
  },
  computed: {
    ...mapGetters({
      markInfo: "MARK_INFO",
      carInfoCache: "CAR_INFO",
      insuredInfoCache: "INSURED_INFO",
      userId: "userId",
      userPhone: "userPhone",
      salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  watch: {
    // 监听过户车开关
    "state.isTransferCar"() {
      if (!this.state.isTransferCar) {
        this.carInfo.TransferDate = "";
      }
    },

    // // 被保人信息同步车主信息
    "carInfo.CarOwnersName"(val) {
      if (this.carInfo.isDefaultInsurant) {
        this.$set(this.carInfo, "InsuredName", val);
      }
    },
    "carInfo.IdType"(val) {
      if (this.carInfo.isDefaultInsurant) {
        this.$set(this.carInfo, "InsuredIdType", val);
      }
    },
    "carInfo.IdCard"(val) {
      if (this.carInfo.isDefaultInsurant) {
        this.$set(this.carInfo, "InsuredIdCard", val);
      }
    }
  },
  created() {
    this.displayCarCacheInfo();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  beforeRouteLeave(to, from, next) {
    this.cacheCarInfo();
    next();
  },
  methods: {
    // 初始化按钮开关状态
    initData(result) {
      result["isDefaultInsurant"] = true;
      this.carInfo = result;

      this.$store.commit("SET_CAR_INFO", result); // 同步一遍数据到缓存
      this.displayCarTypeByIdType();

      this.state.isTransferCar = this.carInfo.TransferDate ? true : false; // 过户车
    },
    // 回显缓存的信息数据
    displayCarCacheInfo() {
      // 该车辆信息在缓存中不存在
      if (this.$route.query.linceNo != this.markInfo.linceNo) {
        this.checkRenewal(); // 重新走流程
      } else {
        // 该车辆信息在缓存中存在
        this.initData(this.carInfoCache);
      }
    },
    /**
     * @description 缓存车辆信息
     */
    cacheCarInfo() {
      const { linceNo, regionCode } = this.$route.query;

      const markInfo = {
        linceNo: linceNo,
        regionCode: regionCode,
        carId: this.carId ? this.carId : this.markInfo.carId,
        cityAbbr: this.markInfo.cityAbbr
      };

      this.$store.commit("SET_CAR_INFO", this.carInfo); // 同步一遍数据到缓存
      this.$store.commit("SET_MARK_INFO", markInfo); // 存储车辆标志信息
    },
    /**
     * @description 查询车辆是否存在续期信息
     */
    checkRenewal() {
      let linceNo = this.$route.query.linceNo;
      if (linceNo) {
        let param = {
          linceNo: linceNo
        };
        this.$http.checkRenewal(param).then(res => {
          if (res.data) {
            // 结果未返回持续请求
            if (res.data.isWait == 1) {
              if (!this.timer) {
                this.$indicator.open('车辆信息拉取中...');
                this.timer = setInterval(() => {
                  this.checkRenewal();
                }, 5000);
              }
              return false;
            }
            // 结果已返回
            this.$indicator.close();
            this.timer && clearInterval(this.timer);
            if (!res.data.carId) {
              this.$toast("未搜索到车辆信息，请手动补全");
              this.displayCarTypeByIdType();
            } else {
              const { carId, id } = res.data;
              this.carId = carId; // 车辆ID
              this.markId = id;
              this.getCarInfo();
            }
          }
        });
      }
    },
    /**
     * @description 获取车辆续期信息
     * @param {String} markId 续期 id
     */
    getCarInfo() {
      const params = {
        linceNo: this.$route.query.linceNo,
        carId: this.carId,
        id: this.markId,
        state: 100
      };
      this.$http.getCarInfo(params).then(res => {
        const result = res.data;
        if (result) {
          if (!result.MobilePhone) {
            result.MobilePhone = this.userPhone;
          }

          if (result.IdCard && result.IdCard.includes("*")) {
            result.IdCard = null;
          }
          if (result.CarOwnersName && result.CarOwnersName.includes("*")) {
            result.CarOwnersName = null;
          }
          // 身份证类型不是 1、2、9 默认设为1
          if (![1, 2, 9].includes(result.IdType)) {
            result.IdType = 1;
          }

          // B端唔需要弹身份证确认框
          if (!this.salesPhone) {
            this.loadedIdCardNo = result.IdCard;
          }

          this.initData(result);
        }
      });
    },
    /**
     * @description 更改车辆类型（私家车、公司车）
     */
    handleSwitchCarType() {
      const carTypes = this.credentials.filter(
        item => item.type == this.carType
      );

      if (carTypes.length > 0) {
        this.carInfo.IdType = carTypes[0].id;
      }
    },
    /**
     * @description 根据证件类型回显车辆类型
     */
    displayCarTypeByIdType() {
      const IdType = this.carInfo.IdType;
      if (!IdType || IdType == 0) {
        this.carInfo.IdType = 1;
      }
      this.credentials = credentials;
      const idTypes = this.credentials.filter(
        item => item.id == this.carInfo.IdType
      );
      if (idTypes.length > 0) {
        this.carType = idTypes[0].type;
      }
    },
    /**
     * @description 选择车型
     * @param {Object} item 车型对象
     */
    handleCarTypeSelected(item) {
      this.state.showCarTypeSheetModal = false;
      // this.carInfo.JYModuleInfo = item.info;
      this.carInfo.JYModuleCode = item.vehicleNo;
      this.carInfo.JYModuleInfo = item.info;
      // if (item.info.indexOf("/") !== -1) {
      //   this.carInfo.MoldName = item.info
      //     .split("/")[0]
      //     .replace(/[\u4e00-\u9fa5]+w*$/, "");
      // } else {
      //   this.carInfo.MoldName = item.info;
      // }
      this.$store.commit("SET_CAR_INFO", this.carInfo);
    },

    /**
     * @description 通过品牌获取车辆类型
     * @param
     */
    getCarTypeListByBrand() {
      const {
        CarVin,
        EngineNo,
        MoldName,
        MobilePhone,
        RegisterDate
      } = this.carInfo;
      if (!CarVin || !EngineNo || !MoldName || !RegisterDate) {
        return this.formValidate();
      }
      const { linceNo, regionCode, source } = this.$route.query;
      const params = {
        linceNo: linceNo,
        CityCode: regionCode,
        frameNum: CarVin,
        moduleName: MoldName,
        engineNum: EngineNo,
        mobilePhone: MobilePhone,
        registerTime: RegisterDate,
        insure_company_code_ref: source
      };
      this.$http.getCarTypeInfoByCarBrand(params).then(res => {
        if (res.data.list) {
          this.carTypeList = res.data.list;
          this.getCarTypeInfoAfterClickSelected();
          // debugger
          // 没有车型编码默认使用查询到的第一个
          // if (!this.carInfo.JYModuleInfo && this.carTypeList.length > 0) {
          //   // this.carInfo.JYModuleInfo = this.carInfo.MoldName = this.carTypeList[0].info;
          //   this.$set(this.carInfo, "JYModuleInfo", this.carTypeList[0].info);
          // }
        } else {
          this.$toast("未查询到车型 ");
        }
      });
    },

    // 通过车架号获取车辆类型
    getVehicleInfoByCarVin() {
      const {
        CarVin,
        EngineNo,
        MoldName,
        MobilePhone,
        RegisterDate
      } = this.carInfo;
      if (!CarVin || !EngineNo || !MoldName || !RegisterDate) {
        return this.formValidate();
      }
      const { linceNo, regionCode, source } = this.$route.query;
      const params = {
        linceNo: linceNo,
        CityCode: regionCode,
        frameNum: CarVin,
        moduleName: MoldName,
        engineNum: EngineNo,
        mobilePhone: MobilePhone,
        registerTime: RegisterDate,
        insure_company_code_ref: source
      };
      this.$http.getVehicleInfoByCarVin(params).then(res => {
        const result = res.data.list;
        if (result && result.length > 0) {
          this.carTypeList = result;
          this.state.showCarTypeSheetModal = true;
          // 没有车型编码默认使用查询到的第一个
          // if (!this.carInfo.JYModuleCode) {
          //   // this.carInfo.JYModuleCode = result[0].vehicleNo;
          //   // this.carInfo.JYModuleInfo = this.carInfo.MoldName = result[0].info;
          //   // this.carInfo.JYModuleInfo = result[0].info;
          // }
        } else {
          this.$toast("未查询到车型 ");
        }
      });
    },
    getCarTypeInfoAfterClickSelected() {
      if (this.carTypeList.length === 0) {
        this.getVehicleInfoByCarVin();
      } else {
        this.state.showCarTypeSheetModal = true;
      }
    },

    /**
     * @before 跳转到自定义险种页面
     * @modify 处理表单验证成功后跳转到 报价页面
     *
     */
    handleComplete() {
      this.$router.push({
        name: "custom-insure",
        query: {
          autoQuote: this.salesPhone ? false : true
        }
      });
    },

    // 表单验证
    formValidate() {
      const {
        CarOwnersName,
        IdType,
        IdCard,
        MobilePhone,
        CarVin,
        EngineNo,
        MoldName,
        JYModuleCode,
        RegisterDate,
        BizStartDate,
        ForceStartDate,
        // ForceTax,
        TransferDate,
        InsuredName,
        InsuredIdCard,
        InsuredIdType
      } = this.carInfo;

      const nameValidate = validate.name;
      const idValidate = validate.idCard;
      const phoneValidate = validate.phone;
      const vinValidate = validate.VIN;
      const engineValite = validate.engineNum;

      const today = date.getSpecifiedDate(0);
      const maxDay = date.getSpecifiedDate(90);
      // debugger
      if (!CarOwnersName) {
        // 用户姓名
        return this.$toast("请输入车主姓名");
      } else {
        if (!nameValidate.pattern.test(CarOwnersName)) {
          return this.$toast("车主姓名格式不正确");
        }
      }

      if (!IdCard) {
        return this.$toast("请输入车主证件号");
      } else {
        // 证件号码
        const IdInvalidMsg = insure.validateId(IdType, IdCard);
        if (IdInvalidMsg) {
          return this.$toast("车主证件格式不正确");
        }
      }

      if (!MobilePhone) {
        // 手机号
        return this.$toast("请输入车主手机号");
      } else {
        if (!phoneValidate.pattern.test(MobilePhone)) {
          return this.$toast("车主手机号格式不正确");
        }
      }

      if (!CarVin) {
        // 车架号
        return this.$toast(vinValidate.requiredMsg);
      } else {
        if (!vinValidate.pattern.test(CarVin)) {
          return this.$toast(vinValidate.invalidMsg);
        }
      }

      if (!EngineNo) {
        // 引擎号
        return this.$toast(engineValite.requiredMsg);
      } else {
        if (!engineValite.pattern.test(EngineNo)) {
          // 引擎号
          return this.$toast(engineValite.invalidMsg);
        }
      }

      if (!MoldName) {
        // 品牌型号
        return this.$toast("请输入品牌型号");
      }

      if (this.state.isTransferCar) {
        if (!TransferDate) {
          return this.$toast("请选择过户日期");
        }
        if (TransferDate >= today) {
          return this.$toast("过户日期不能晚于今天");
        }
      }
      if (!RegisterDate) {
        return this.$toast("请选择注册日期");
      }
      if (RegisterDate > today) {
        return this.$toast("注册日期不能晚于今天");
      }
      if (!JYModuleCode) {
        return this.$toast("请选择车辆型号");
      }
      // 验证被保人信息
      if (!InsuredName) {
        return this.$toast("请输入被保人姓名");
      } else {
        if (!nameValidate.pattern.test(InsuredName)) {
          return this.$toast("被保人姓名格式不正确");
        }
      }

      if (!InsuredIdCard) {
        return this.$toast("请输入被保人证件号");
      } else {
        const insurantInvalidMsg = insure.validateId(
          InsuredIdType,
          InsuredIdCard
        );
        if (insurantInvalidMsg) {
          return this.$toast("被保人证件号格式不正确");
        }
      }

      if (
        this.loadedIdCardNo &&
        this.loadedIdCardNo == this.carInfo.IdCard &&
        this.businessParams.user != "IRB"
      ) {
        this.state.showIDConfirm = true;
      } else {
        this.handleComplete();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.information {
  padding: 30px 23px 0;
}
.icon-camera {
  @include icon(30, 26, "icon/camera.png");
  margin-right: 10px;
}
.card {
  background: #fff;
  border-radius: 15px;
  margin-bottom: 30px;

  box-shadow: 0 6px 29px 0 rgb(210, 210, 210);
  overflow: hidden;
  .info-title {
    height: 90px;
    line-height: 80px;
    padding: 0 20px;
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    background: url($baseUrl+"images/info_card_title.png") no-repeat center
      center/cover;
    a {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #fff;
    }
  }
}
.info-item /deep/ {
  .insure-date {
    position: static;
    flex: none;
  }
}
.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  height: 90px;
  margin: 0 20px;
  font-size: 26px;
  color: #666;
  border-bottom: 1px solid #efefef;
  &:last-of-type {
    border-bottom: none;
  }
  .iconfont {
    display: inline-block;
    margin-left: 20px;
    font-size: 20px;
  }
  label {
    color: #252525;
  }

  // label:first-of-type{
  //   flex: 1;
  // }
  // input {
  //   right: 0;
  // }
  &.car-type {
    .radio {
      display: flex;
      align-items: center;
      color: #666;
    }

    label {
      display: flex;
      align-items: center;
    }

    i {
      width: 26px;
      height: 26px;
      margin-right: 10px;
      border-radius: 50%;
      border: 2px solid #cccccc;
    }

    input:checked + label i {
      border-color: #0469ff;
      background-color: #0469ff;
    }
  }
  .icon-calendar {
    position: absolute;
    right: 25px;
    top: 26px;
    z-index: 1;
  }
  select {
    flex: 1;
  }
  select,
  input,
  p {
    display: block;
    font-size: 26px;
    color: #666;
  }
  input[type="text"],
  input[type="tel"] {
    flex: 1;
    margin-left: 30px;
    text-align: right;
  }
  input[type="date"] {
    background: #fff;
    font-size: 30px;
  }
}
.brand-txt {
  text-align: right;
  color: #666;
  @include text-overflow-ellipsis(400);
}
.btn-margin {
  margin-top: 40px;
  margin-bottom: 100px;
}
.insurance-date {
  h3 {
    font-size: 30px;
    padding: 0 20px;
    color: #0469ff;
    font-weight: bold;
    line-height: 90px;
  }
  .ins-ismandatory {
    padding: 0 20px;
    margin-bottom: 30px;
    text-align: end;
    font-size: 30px;
    color: #ff5301;
  }
}
.info-car {
  a::before {
    content: "";
    margin-right: 10px;
    @include icon(27, 27, "icon/wenhao.png");
  }
}
.info-title {
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #fff;
  }
}
</style>
