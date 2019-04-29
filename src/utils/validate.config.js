export default {
  phone: {
    requiredMsg: '请输入手机号',
    invalidMsg: '手机号格式不正确',
    pattern: /^1\d{10}$/
  },
  SMSCode: {
    requiredMsg: '请输入6位数验证码',
    invalidMsg: '验证码格式不正确',
    pattern: /\d{6}/
  },
  // 身份证
  idCard: {
    requiredMsg: '请输入身份证号码',
    invalidMsg: '身份证号码不正确',
    pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  },
  // 中文姓名
  name: {
    requiredMsg: '请输入姓名',
    invalidMsg: '姓名格式不正确',
    pattern: /^(?!_)(?!.*?_$)[a-zA-Z_\u4e00-\u9fa5_\s]+$/
  },
  // 中文地址
  address: {
    requiredMsg: '请输入详细地址',
    invalidMsg: '详细地址格式不正确',
    pattern: /^(?=.*?[\u4E00-\u9FA5])[\d\u4E00-\u9FA5]+/
  },
  // 车辆识别号
  VIN: {
    requiredMsg: '请输入车辆识别号',
    invalidMsg: '车辆识别号格式不正确',
    pattern: /^[A-HJ-N-P-Z0-9]{17}$/
  },
  // 发动机识别号
  engineNum: {
    requiredMsg: '发动机识别号',
    invalidMsg: '发动机识别号格式不正确',
    pattern: /^[A-HJ-N-P-Z0-9]+$/
  },
  moldName: {
    requiredMsg: '请输入品牌型号',
    invalidMsg: '品牌型号格式不正确',
    pattern: /^[\u4e00-\u9fa5_A-Z0-9]+$/
  },
  // 车排号
  licenseNo: {
    requiredMsg: '请输入车牌号',
    invalidMsg: '车牌号格式不正确',
    pattern: /^(([\u4e00-\u9fa5][a-zA-Z]|[\u4e00-\u9fa5]{2}\d{2}|[\u4e00-\u9fa5]{2}[a-zA-Z])[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/
  },
  bankCard: {
    requiredMsg: '请输入银行卡号',
    invalidMsg: '银行卡号格式不正确',
    pattern: /^\d{16,}$/
  },
}
