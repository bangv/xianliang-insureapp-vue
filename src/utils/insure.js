import { session, storage, cookie, ua } from './browser'
import { date } from './date'
import QRCode from 'qrcodejs2'
// import store from '@/store'
const baseUrl = process.env.BASE_URL

export const credentials = [
  // 证件类型
  // type: 1->个人  2->组织
  {
    id: 1,
    text: '身份证',
    type: '1',
    reg: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  },
  {
    id: 2,
    text: '组织机构代码证',
    type: '2',
    reg: /^[\s\S]*$/,
  },
  // {
  //   id: 5,
  //   text: '港澳居民来往内地通行证',
  //   type: '1',
  //   reg: /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
  // },
  {
    id: 9,
    text: '营业执照/统一社会信用代码',
    type: '2',
    reg: /(^(?:(?![IOZSV])[dA-Z]){2}d{6}(?:(?![IOZSV])[dA-Z]){10}$)|(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)/
  },
  // {
  //   id: 14,
  //   text: '港澳身份证',
  //   type: '1',
  //   reg: /[A-Z]{1,2}[0-9]{6}([0-9A])/, // 香港
  //   reg2: /^[1|5|7][0-9]{6}([0-9Aa])/ // 澳门
  // }
]
/**
 * @description 业务函数
 */

export const insure = {
  getBusinessParams(param) {
    const businessParams = session.getItem("INSURE_BUSINESS_PARAMS")
    return businessParams ? (param ? businessParams[param] : businessParams) : null
  },
  /**
   * @author AuYeung
   * @description 获取已选险种数目
   * @param {Object} insure 已选险种
   * @return {Number} 已选险种个数
   */
  getInsuredCount(insure) {
    return insure.filter(value => value > 0).length
  },
  /**
   * @description 验证证件号
   */
  validateId(IdType, IdNo) {
    const rule = credentials.filter(item => item.id == IdType)
    if (rule.length === 0) return
    // console.log(rule)
    if (!IdNo) {
      return '请输入' + rule[0].text
    }

    if (!rule[0].reg2) {
      if (!rule[0].reg.test(IdNo)) {
        return '请输入正确的' + rule[0].text
      }
    } else {
      if (
        !rule[0].reg.test(IdNo) &&
        !rule[0].reg2.test(IdNo)
      ) {
        return '请输入正确的' + rule[0].text
      }
    }
  },
  /**
   * @description 组装报价参数
   */
  assemblyCreateOrederParameter(params) {
    const {
      /* 车主 */
      MobilePhone,
      open_id, // 上年订单openid
      /* plan */
      platUserId,
      carId,
      id,
      jqinfo_id,
      businessstartdate,
      discount,
      total_days,
      source,
      /* 被保人 */
      insuredName,
      insuredIdCard,
      // InsuredMobile,

      /* 收件人 */
      receiver_Phone,
      receiver_Address,
      receiver_Name
    } = params;

    const channelUserId = this.getBusinessParams("channel_user_id"); // 渠道号
    // const userPhone = cookie.getItem("INSURE_USER_PHONE"); // 用户手机号
    const salesPhone = cookie.getItem("INSURE_SALES_PHONE"); // 业务员手机号
    // 创建者，优先选择业务员，( C 端,从公众号进入时，返回参数中会携带params.createUserName)
    const createUserName = salesPhone ? salesPhone : (params.createUserName ? params.createUserName : channelUserId);
    // const userCellPhone = MobilePhone ? MobilePhone : userPhone;

    return {
      id: id,
      open_id: open_id,
      platUserId: salesPhone ? platUserId : cookie.getItem("INSURE_USER_ID"),
      car_id: carId,
      // userCellPhone: userCellPhone,
      createUserName: createUserName,
      jqinfo_id: jqinfo_id,
      source: source,
      quotation_startdate: date.getHalfDate(businessstartdate),
      discount: discount,
      total_days: total_days,
      provinceText: '',
      cityText: '',
      areaText: '',
      Receiver_Name: receiver_Name,
      Receiver_Phone: receiver_Phone,
      Receiver_Address: receiver_Address,
      InsuredName: insuredName,
      InsuredIdType: 1,
      InsuredIdCard: insuredIdCard,
    }
  },
  //   /**
  // * @description 组装被保人信息
  // */
  //   assemblyInsurantInfo(insurantObj) {
  //     return {
  //       InsuredName: insurantObj.insuredName,
  //       InsuredIdType: insurantObj.insuredidtype ? insurantObj.insuredidtype : 1,
  //       InsuredIdCard: insurantObj.insuredIdCard
  //     }
  //   },
  /**
 * @description 组装车辆信息
 */
  assemblyCarInfo(carObj) {

    return {
      // 车主信息
      CarOwnersName: carObj.ownerName,
      MobilePhone: carObj.mobilePhone ? carObj.mobilePhone : cookie.getItem("INSURE_USER_PHONE"), // 车主手机号
      IdType: carObj.idType,
      IdCard: carObj.identity_id,
      // 车辆信息
      CarVin: carObj.carVin,
      MoldName: carObj.jymoduleinfo,
      EngineNo: carObj.engineNo,
      JYModuleCode: carObj.jy_Module_Code,
      JYModuleInfo: carObj.jymoduleinfo,
      // 日期
      RegisterDate: date.getHalfDate(carObj.registerDate),
      BizStartDate: date.getHalfDate(carObj.businessstartdate), // 商业险起保日期（只能为当天日期之后的90天之内）
      ForceStartDate: date.getHalfDate(carObj.force_startdate), // 交强险起保日期
      TransferDate: "", //过户日期

      // 被保人信息
      InsuredName: carObj.insuredName,
      InsuredIdType: carObj.insuredidtype ? carObj.insuredidtype : 1,
      InsuredIdCard: carObj.insuredIdCard
    }
  },
  /**
   * @description 组装险种信息
   */
  assemblyInsureInfo(insureObj) {
    return {
      linceNo: insureObj.linceNo,
      QuoteGroup: insureObj.source,
      Quote: insureObj.source,
      ForceTax: insureObj.forceTotal + insureObj.taxTotal > 0 ? 1 : 0,
      BuJiMianCheSun: insureObj.buJiMianCheSun_BaoE,
      CheSun: insureObj.cheSun_BaoE > 0 ? 1 : 0,
      BuJiMianSanZhe: insureObj.buJiMianSanZhe_BaoE,
      SanZhe: insureObj.sanZhe_BaoE,
      SanZheJieJiaRi: insureObj.sanZheJieJiaRi_BaoE > 0 ? 1 : 0,
      BuJiMianSiJi: insureObj.buJiMianSiJi_BaoE,
      SiJi: insureObj.siJi_BaoE,
      BuJiMianChengKe: insureObj.buJiMianChengKe_BaoE,
      ChengKe: insureObj.chengKe_BaoE,
      BuJiMianHuaHen: insureObj.buJiMianHuaHen_BaoE,
      HuaHen: insureObj.huaHen_BaoE,
      // HuaHen: insureObj.huaHen_BaoE < 2000 ? 0 : insureObj.huaHen_BaoE,
      BoLi: insureObj.boLi_BaoE,
      BuJiMianZiRan: insureObj.buJiMianZiRan_BaoE,
      ZiRan: insureObj.ziRan_BaoE,
      BuJiMianSheShui: insureObj.buJiMianSheShui_BaoE,
      SheShui: insureObj.sheShui_BaoE,
      HcSanFangTeYue: insureObj.hcSanFangTeYue_BaoE,
      BuJiMianDaoQiang: insureObj.buJiMianDaoQiang_BaoE,
      DaoQiang: insureObj.daoQiang_BaoE
    };
  },
  // 返回匹配城市
  matchCity(provinces, cityName) {

    return new Promise(resolve => {
      if (cityName) {
        provinces.map(province => {
          const citys = province.regionPlanListGroup
          citys.filter(city => {
            if (city.regionName.includes(cityName) || cityName.includes(city.regionName)) {
              resolve(city)
            }
          })
        })
      }
    })
  },
  /*生成二维码*/
  setQpCode(params) {
    new QRCode(document.getElementById(params.element), {
      // text: `https://www.meirichexian.com/insureapp/quote/confirm?salesPhone=${userId}&linceNo=${linceNo}&serialNo=${serialNo}`,
      text: params.url ? window.location.origin + baseUrl + params.url : params.shortUrl,
      width: params.width,
      height: params.height,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  },
  // 前往支付页面
  goToPayment(router, params) {
    if (ua.isWeChat && ua.isiOS) {
      const { orderId, type } = params
      window.location.href = `${window.location.origin}${
        baseUrl
        }pay?orderId=${orderId}&type=${type}`;
    } else {
      router.push({
        name: 'Pay',
        query: params
      })
    }
  }
}

