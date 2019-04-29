<template>
  <section class="home-content">
    <div class="home-car-info">
      <div class="car-number insure-flexbox">
        <div class="number-left rig">
          <em class="icon-type icon-star"></em>
          <label for>车牌号码</label>
        </div>
        <div class="number-center insure-flexbox insure-flexbox-item">
          <span class="car-city car-input first-input" @click="state.showAbbrKeyboard=true">
            {{license.prefix}}
            <i class="iconfont">&#xe615;</i>
          </span>
          <span
            class="license-postfix"
            v-if="isMobile"
            @click="state.showAlphabetKeyboard=true"
          >{{license.postfix?license.postfix:'请输入完整车牌'}}</span>
          <input
            type="text"
            placeholder="请输入完整车牌"
            class="license-postfix"
            v-model="license.postfix"
            maxlength="7"
            v-else
          >
        </div>
      </div>
      <div class="ins-city insure-flexbox">
        <div class="rig">
          <em class="icon-type icon-star"></em>
          <label for>选择城市</label>
        </div>

        <div class="insure-flexbox-item car-input" @click="goToSelectCtiyPage()">
          <span class="car-city car-input">{{city.regionName?city.regionName:'请选择城市'}}</span>
        </div>
      </div>
      <!-- <p class="rec">
        我们将根据您选择的地区进行服务内容推荐。
      </p>-->
    </div>
    <div class="btn-wrap insure-flexbox insure-flexbox-content-center">
      <button
        type="button"
        class="sign-up-btn"
        @click="fromValidate"
        :disabled="btnDisabled"
      >{{btnText}}</button>
    </div>
    <AbbrKeyboard @keyboard="handleLicensePrefixInput($event)" v-show="state.showAbbrKeyboard"></AbbrKeyboard>
    <AlphabetKeyboard
      v-show="state.showAlphabetKeyboard"
      @keyboard="handleLicensePostfixInput($event)"
      @backspace="handleLicensePostfixDelete"
    ></AlphabetKeyboard>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import AbbrKeyboard from "@/components/keyboard/AbbrKeyboard";
import AlphabetKeyboard from "@/components/keyboard/AlphabetKeyboard";
import { ua } from "@/utils/browser";
import { wechat } from "@/utils/wechat";
import wx from "weixin-jsapi";

export default {
  props: {
    btnText: String,
    btnDisabled: Boolean
  },
  components: {
    AbbrKeyboard,
    AlphabetKeyboard
  },
  data() {
    return {
      license: {
        prefix: "",
        postfix: ""
      },
      state: {
        inServiceTime: true, // 是否在服务时间
        showAbbrKeyboard: false, // 省份简称键盘
        showAlphabetKeyboard: false // 数字英文键盘
      },
      cityArr: [
        "粤",
        "沪",
        "鄂",
        "湘",
        "川",
        "渝",
        "京",
        "闽",
        "晋",
        "黑",
        "津",
        "浙",
        "豫",
        "赣",
        "贵",
        "青",
        "琼",
        "宁",
        "吉",
        "蒙",
        "冀",
        "苏",
        "皖",
        "桂",
        "云",
        "陕",
        "甘",
        "藏",
        "新",
        "辽",
        "鲁"
      ]
    };
  },
  computed: {
    ...mapGetters({
      licenseInfo: "licenseInfo",
      city: "CITY"
    }),
    isMobile() {
      return ua.isMobile;
    }
  },
  watch: {
    "license.prefix"(val) {
      this.licenseInfo.license = val + this.license.postfix;
    },
    "license.postfix"(val) {
      // 处理复制
      if (this.isMobile) {
        this.license.postfix = val;
      } else {
        this.handleLicensePaste(val);
      }
      this.licenseInfo.license = this.license.prefix + this.license.postfix;
    }
  },
  created() {
    // this.$store.dispatch("getCityList");
    this.handleLicensePaste(this.licenseInfo.license);
  },
  mounted() {
    // if (!ua.isiOS) {
    //   wechat.configJsSdk(window.location.href.split("#")[0]);
    // }
    this.$store.dispatch("getLocation");
  },
  methods: {
    /**
     * @description 处理省份简称键盘输入
     * @param {String} value 输入值
     */
    handleLicensePrefixInput(value) {
      this.license.prefix = value;
      this.state.showAbbrKeyboard = false;
      if (this.license.postfix.length != 6) {
        this.state.showAlphabetKeyboard = true;
      }
    },
    /**
     * @description 处理字母模拟键盘输入
     * @param {Object} obj 输入值对象
     */
    handleLicensePostfixInput(obj) {
      if (this.license.postfix.length < 6) {
        this.license.postfix += obj.value;
      }
    },

    // 处理车牌后缀删除（模拟键盘）
    handleLicensePostfixDelete() {
      const postfix = this.license.postfix;
      if (postfix.length > 0) {
        this.license.postfix = postfix.substring(0, postfix.length - 1);
      }
    },

    // 处理车牌复制输入
    handleLicensePaste(license) {
      // 前缀
      const prefix = license.match(/[\u4e00-\u9fa5]/);
      if (prefix && this.cityArr.includes(prefix[0])) {
        this.license.prefix = prefix[0];
      }
      // 后缀
      this.license.postfix = license.replace(/[^a-zA-Z0-9]/, "").toUpperCase();
    },
    // 前往城市选择页面
    goToSelectCtiyPage() {
      this.$router.push({
        name: "city",
        query: {
          referer: this.$route.name
        }
      });
    },
    // 表单检验
    fromValidate() {
      if (this.licenseInfo.license.length != 7) {
        return this.$toast("请输入正确的车牌");
      }
      if (!this.city.regionCode) {
        return this.$toast("请选择投保城市");
      }
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.home {
  padding-bottom: 180px;
}
.home-banner {
  width: 100%;
  height: 380px;
  margin-bottom: 40px;
  background: url($baseUrl+"images/home_banner.png") no-repeat center
    center/cover;
  &.irb {
    background: url($baseUrl+"images/home_banner_02.png") no-repeat center center/cover;
  }
}

.home-content {
  font-size: 30px;
  color: #666;
  padding: 0 22px;
  mt-switch {
    height: 50px;
  }
  .msg-tip {
    width: 100%;
    height: 36px;
    margin: 10px 0 20px;
    border-radius: 18px;
    line-height: 36px;
    text-align: center;
    font-size: 22px;
    color: #fe6007;
    background: #fadf86;
  }
  .home-car-info {
    background-color: #fff;
    margin-top: 20px;
    padding: 40px 25px 30px;
    border-radius: 8px;
    box-shadow: 0 6px 29px 0 rgb(210, 210, 210);
    line-height: 60px;
    .switch-group {
      &.beautify label {
        right: 300px;
      }
    }
  }
  .car-input,
  .license-postfix {
    background: #f6f6f6;
    height: 60px;
    line-height: 60px;
    color: #666;
    border-radius: 30px;
    text-indent: 30px;
  }
  .license-postfix {
    display: flex;
    align-items: center;
    flex: 1;
    line-height: normal;
    font-size: 28px;
    margin-left: 20px;
  }
  .car-city {
    width: 120px;
    position: relative;
  }
  .first-input {
    position: relative;
    margin-left: 0 !important;
  }
  .choose-city {
    display: block;
    width: 100%;
  }
  .iconfont {
    position: absolute;
    top: 0;
    right: 18px;
  }
  .number-center {
    span {
      margin-left: 20px;
    }
  }
  .car-number {
    margin-bottom: 58px;
  }
  .ins-city {
    margin-bottom: 40px;
  }
  .rig {
    margin-right: 20px;
  }
}

.car-status {
  margin-bottom: 35px;
  .status-name {
    display: block;
    line-height: 50px;
    margin: 0 50px 0 30px;
  }
}
.btn-wrap {
  width: 100%;
  margin: 80px 0 30px 0;
}
.hotline {
  text-align: center;
}
.disbg {
  background: #d9d9d9;
}

.icon-star {
  background: url($baseUrl+"icon/star.png") no-repeat center center/contain;
}
.rec {
  margin-top: 25px;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  color: #aeaeae;
}
</style>
