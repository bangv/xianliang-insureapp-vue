<template>
  <div class="import-car-wrap">

    <div class="import-banner"></div>

    <div class="import-content">
      <div class="import-licence">
        <p class="hint">尊敬的车主，请输入车牌号完成订单</p>
        <p class="ins-align">
          <span class="licence-left">车牌号</span>
          <!--            <input type="text" placeholder="请输入车牌号" required class="licence-right insure-flexbox-item"
                   v-model="linceNo" @click="handleKeyboard(linceNo)"/>-->
          <span
            class="licence-right insure-flexbox-item car-input"
            @click="handleKeyboard"
          >{{linceNo?linceNo:'请输入车牌'}}</span>
        </p>
      </div>

      <div class="btn-wrap ins-center">
        <button
          type="button"
          class="sign-up-btn"
          @click="fromValidate"
        >确认</button>
      </div>
    </div>
    <AbbrKeyboard
      @keyboard="handleAbbrKeyboard($event)"
      v-show="state.showAbbrKeyboard"
      @hide="hideKeyboard('abbr')"
    ></AbbrKeyboard>
    <AlphabetKeyboard
      @keyboard="handleAlphabetKeyboard($event)"
      @complete="hideKeyboard('alphabet')"
      @backspace="handleSpace"
      v-show="state.showAlphabetKeyboard"
    ></AlphabetKeyboard>
  </div>
</template>

<script>
import { ua } from "@/utils/browser";
// import AlphabetKeyboard from "@/components/keyboard/AlphabetKeyboard";
// import AbbrKeyboard from "@/components/keyboard/AbbrKeyboard";

export default {
  name: "ImportCarNum",
  data() {
    return {
      linceNo: "",
      saleman: this.$route.query.saleman, // 营业员工号
      salesPhone: null, // 营业员手机号
      insInfo: null, // 确认订单信息
      state: {
        showAbbrKeyboard: false, // 省份简称键盘
        showAlphabetKeyboard: false // 字母键盘
      }
    };
  },
  components: {
    AbbrKeyboard:()=>import("@/components/keyboard/AbbrKeyboard"),
    AlphabetKeyboard:()=>import("@/components/keyboard/AlphabetKeyboard")
  },
  beforeRouteLeave(to, from, next){
    to.meta.requiresAuth=false
    next()
  },
  created() {
    this.getSalesPhone();
  },

  methods: {
    /**
     * @description 显示键盘
     * @param {String} type 键盘类型
     */
    showKeyboard(type) {
      switch (type) {
        case "abbr":
          this.state.showAbbrKeyboard = true;
          break;
        case "alphabet":
          this.state.showAlphabetKeyboard = true;
      }
    },
    /**
     * @description 隐藏键盘
     * @param {String} type 键盘类型
     */
    hideKeyboard(type) {
      switch (type) {
        case "abbr":
          this.state.showAbbrKeyboard = false;
          break;
        case "alphabet":
          this.state.showAlphabetKeyboard = false;
      }
    },

    handleKeyboard() {
      // console.log(this.linceNo);
      if (this.linceNo.length < 2) {
        this.state.showAbbrKeyboard = true;
        this.state.showAlphabetKeyboard = false;
      } else if (this.linceNo.length >= 2) {
        this.state.showAbbrKeyboard = false;
        this.state.showAlphabetKeyboard = true;
      }
    },
    /**
     * @description 处理省份简称键盘输入
     * @param {String} value 输入值
     */
    handleAbbrKeyboard(value) {
      this.hideKeyboard("abbr");
      this.showKeyboard("alphabet");
      this.linceNo = value;
    },
    /**
     * @description 处理字母模拟键盘输入
     * @param {Object} obj 输入值对象
     */
    handleAlphabetKeyboard(obj) {
      // 处理车牌前缀输入 如：粤B
      const value = obj.value;
      if (this.linceNo.length <= 6) {
        this.linceNo = this.linceNo + value;
      }
    },
    // 处理字母模拟键盘删除
    handleSpace() {
      // 有车牌后缀时删除直接删除车牌后缀
      if (this.linceNo) {
        this.linceNo = this.linceNo.substring(0, this.linceNo.length - 1);
        if (this.linceNo < 2) {
          this.showKeyboard("abbr");
          this.hideKeyboard("alphabet");
        }
        if (this.linceNo >= 2) {
          this.showKeyboard("alphabet");
          this.hideKeyboard("abbr");
        }
      }
    },

    // 判断当前业务员工号对应的手机号是多少
    getSalesPhone() {
      const saleman = this.saleman;
      if (saleman) {
        const params = {
          workNumber: saleman,
          salesPhone: ""
        };
        // 判断接口返回是否存在 ID
        this.$http.getSalesPhone(params).then(res => {
          this.salesPhone = res.data.salesPhone;
        });
      }
    },

    // 表单检验
    fromValidate() {
      if (!this.saleman || !this.salesPhone) {
        return this.$toast("请复制正确链接地址");
      }
      if (!this.linceNo) {
        return this.$toast("请先输入车牌");
      }
      if (this.linceNo.length != 7) {
        return this.$toast("请输入完整车牌");
      }
      if (!isNaN(this.linceNo[1])) {
        return this.$toast("请输入正确车牌");
      }
      this.getQuotationSheet();
    },
    /**
     * 通过车牌 获取业务员已报价好的 订单 （需检测url中是否携带 saleman 参数
     * */
    getQuotationSheet() {
      const params = {
        linceNo: this.linceNo,
        salesPhone: this.salesPhone
      };
      this.$http.getQuotationSheet(params).then(res => {
        if (res.data.errCode == "02") {
          return this.$toast(
            "该车牌号未经此电销人员报价，请输入已报价的车牌号"
          );
        }
        if (res.data.errCode == "00") {
          // 前往 确认订单 页面 （无需登录，需要有saleman 参数）
          this.$router.push({
            name: "OrderConfirm",
            query: {
              salesPhone: this.salesPhone,
              linceNo: this.linceNo
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.import-banner {
  width: 100%;
  height: 310px;
  margin-bottom: 60px;
  background: url($baseUrl+"images/quote/import-banner.png")
    no-repeat center center/cover;
}
.import-content {
  width: 100%;
  padding: 0 50px;
  font-size: 28px;
  line-height: 90px;
}
.licence-left {
  width: 120px;
}
.car-input {
  width: 100%;
  height: 70px;
  line-height: 70px;
  border-radius: 35px;
  border: 1px solid #dadada;
  text-indent: 30px;
}
.btn-wrap {
  margin-top: 130px;
}
</style>
