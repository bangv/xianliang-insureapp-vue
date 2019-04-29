<template>
  <div id="search-input">
    <div class="order-search ins-box">
      <input
        class="insure-flexbox-item "
        type="text"
        maxlength="7"
        v-model="linceNo"
        placeholder="请输入车牌号"
      >
      <em class="iconfont search-icon">&#xe635;</em>
      <em
        class="iconfont log-out"
        @click="logout"
      >&#xe613;</em>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { storage, cookie, session } from "@/utils/browser";
export default {
  name: "SearchInput",
  data() {
    return {
      linceNo: "",
      searchType: 0 // 搜索框为7位数时，状态为 1（点击按钮请求数据）；当状态为1 后，新值清空 则状态改为2（已监听，请求）
    };
  },
  computed: {
    ...mapGetters(["salesPhone", "userInfo", "userPhone"]),
    // 续期到期时间
    expireDate() {
      const expireDate = this.userInfo.expireDate;
      if (expireDate) {
        const [year, month, day] = expireDate.split("-");
        return `${year}年${month}月${day}日`;
      }
    }
  },
  watch: {
    linceNo(val) {
      if (val) {
        this.linceNo = this.linceNo.toUpperCase();
      }
      if (val.length === 7) {
        this.searchOrder();
        this.searchType = 1;
      }
      if (this.searchType === 1) {
        if (val == "") {
          this.searchType = 2;
          this.requestOrderList();
        }
      }
    }
  },
  methods: {
    /**
     * @description 重新请求接口
     * @params linceNo 车牌号
     * */
    requestOrderList() {
      this.$emit("change", this.linceNo); //触发$emit绑定的change方法
    },

    // 按照搜索框输入车牌 筛选数据
    searchOrder() {
      const reg2 = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1})[-]?|([wW][Jj][京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/;
      const reg = /^[\u4e00-\u9fa5][A-Z]/; // 首字母为中文，第二个字母为大写英文
      if (!reg.test(this.linceNo) || !reg2.test(this.linceNo)) {
        // 返回true,代表在字符串中找到了非数字。
        return this.$toast("请输入正确车牌号");
      }

      this.requestOrderList();
    },
    /**
     * @description 退出登录
     */
    logout() {
      this.$messageBox.confirm("确定要退出登录？").then(value => {
        // debugger
        if (value === "confirm") {
          this.$store.commit("logout");
          if (!this.salesPhone) {
            this.$router.replace({
              name: "SignIn"
            });
          } else {
            this.$toast("退出失败");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#search-input {
  padding: 20px 0 50px;
  font-size: 26px;
  color: #9d9d9d;
  line-height: 60px;
  .order-search {
    position: relative;
  }
  input {
    margin-left: 20px;
    text-indent: 50px;
    line-height: 50px;
    border-bottom: 1px solid #bfb1b1;
  }
  .search-icon {
    position: absolute;
    top: 1px;
    left: 15px;
    font-size: 32px;
  }
  .log-out {
    padding: 0 15px;
    margin-left: 160px;
    font-size: 36px;
  }
}
</style>
