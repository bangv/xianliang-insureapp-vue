<template>
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

      <AbbrKeyboard @keyboard="handleLicensePrefixInput($event)" v-show="state.showAbbrKeyboard"></AbbrKeyboard>
      <AlphabetKeyboard
              v-show="state.showAlphabetKeyboard"
              @keyboard="handleLicensePostfixInput($event)"
              @backspace="handleLicensePostfixDelete"
      ></AlphabetKeyboard>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import AbbrKeyboard from "@/components/keyboard/AbbrKeyboard";
import AlphabetKeyboard from "@/components/keyboard/AlphabetKeyboard";
import { ua } from "@/utils/browser";
import { wechat } from "@/utils/wechat";
// import wx from "weixin-jsapi";

export default {

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

    // 表单检验
    fromValidate() {
      if (this.licenseInfo.license.length != 7) {
        return this.$toast("请输入正确的车牌");
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.home-car-info {
  background-color: #fff;
  margin-top: 20px;
  /*padding: 40px 25px 30px;*/
  /*border-radius: 8px;*/
  /*box-shadow: 0 6px 29px 0 rgb(210, 210, 210);*/
  line-height: 60px;
  font-size: 30px;
  color: #666;
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


.icon-star {
  background: url($baseUrl+"icon/star.png") no-repeat center center/contain;
}

</style>
