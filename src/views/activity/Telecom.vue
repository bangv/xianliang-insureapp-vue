<template>
  <div id="telecom">
    <header>
      <img :src="$baseUrl+'images/activity/telecom/top.png'" alt>
    </header>
    <section class="pannel pannel1">
      <div class="slot">
        <div class="slot-content"></div>
      </div>
      <div class="paper">
        <img :src="$baseUrl+'images/activity/telecom/shadow.png'" alt class="shadow">
        <div class="item item1">
          <div class="title">
            <img :src="$baseUrl+'images/activity/telecom/h1.png'" alt>
          </div>
          <ul>
            <li>
              <p>
                <img :src="$baseUrl+'images/activity/telecom/cup.png'" alt class="cup">
              </p>保温杯1个
            </li>
            <li>
              <p>
                <img :src="$baseUrl+'images/activity/telecom/money.png'" alt class="money">
              </p>
              <span>100元</span>现金补贴
            </li>
            <li>
              <p>
                <img :src="$baseUrl+'images/activity/telecom/card.png'" alt class="card">
              </p>
              <span>100元</span>汽车保养卡一张
            </li>
          </ul>
        </div>
        <div class="item item2">
          <div class="title">
            <img :src="$baseUrl+'images/activity/telecom/h2.png'" alt>
          </div>
          <div class="form">
            <div class="input-item" @click="showKeyboard">
              <label for>车牌号</label>
              <p type="text">{{formData.licenseNo}}</p>
            </div>
            <div class="input-item">
              <label for>姓名</label>
              <input
                type="text"
                v-model="formData.name"
                v-gate="'required|name'"
                oninput="if(value.length>12)value=value.slice(0,12)"
              >
            </div>
            <div class="input-item">
              <label for>电话</label>
              <input
                type="text"
                v-model="formData.cellphone"
                v-gate="'required|phone'"
                oninput="if(value.length>11)value=value.slice(0,11)"
              >
            </div>
          </div>
          <div class="btn-box" @click="formValidate">提交</div>
        </div>
      </div>
    </section>
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
import AlphabetKeyboard from "@/components/keyboard/AlphabetKeyboard";
import AbbrKeyboard from "@/components/keyboard/AbbrKeyboard";
export default {
  components: {
    AbbrKeyboard,
    AlphabetKeyboard
  },
  data() {
    return {
      formData: {
        name: "",
        cellphone: "",
        licenseNo: ""
      },
      state: {
        showAbbrKeyboard: false, // 省份简称键盘
        showAlphabetKeyboard: false // 字母键盘
      }
    };
  },
  watch: {
    "formData.licenseNo"(value) {
      this.formData.licenseNo = value.toUpperCase();
    }
  },
  methods: {
    formValidate() {
      const licenseNo = this.formData.licenseNo;
      if (!licenseNo) {
        return this.$toast("请输入车牌");
      }

      if (licenseNo.length != 7) {
        return this.$toast("车牌格式输入不正确");
      }

      this.$gate.validateAll().then(results => {
        for (let i = 0; i < results.length; i++) {
          if (results[i].message) {
            return this.$toast(results[i].message);
          }
        }
        this.insertOrUpdate();
      });
    },
    insertOrUpdate() {
      this.$http.insertOrUpdate(this.formData).then(res => {
        if (res.data.respcode == "00") {
          this.$toast("保存成功");
        }
      });
    },
    /**
     * @description 显示键盘
     * @param {String} type 键盘类型
     */
    showKeyboard() {
      const licenseNo = this.formData.licenseNo;
      if (licenseNo.length > 0) {
        this.state.showAlphabetKeyboard = true;
        this.state.showAbbrKeyboard = false;
      } else {
        this.state.showAlphabetKeyboard = false;
        this.state.showAbbrKeyboard = true;
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
    /**
     * @description 处理省份简称键盘输入
     * @param {String} value 输入值
     */
    handleAbbrKeyboard(value) {
      this.formData.licenseNo += value;
      this.state.showAbbrKeyboard = false;
      this.state.showAlphabetKeyboard = true;
    },
    /**
     * @description 处理字母模拟键盘输入
     * @param {Object} obj 输入值对象
     */
    handleAlphabetKeyboard(obj) {
      if (this.formData.licenseNo.length < 7) {
        // 车牌号第二个字母不能是数字
        if (this.formData.licenseNo.length === 1 && obj.type == "number")
          return;
        this.formData.licenseNo += obj.value;
      }
    },
    // 处理字母模拟键盘删除
    handleSpace() {
      // 有车牌后缀时删除直接删除车牌后缀
      const licenseNo = this.formData.licenseNo;
      this.formData.licenseNo = licenseNo.substring(0, licenseNo.length - 1);

      if (this.formData.licenseNo.length === 0) {
        this.state.showAbbrKeyboard = true;
        this.state.showAlphabetKeyboard = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  img {
    width: 100%;
  }
}
#telecom {
  padding-bottom: 70px;
  background: linear-gradient(to bottom, #4f3ebc, #755add);
  .slot {
    position: relative;
    padding: 10px 16px;
    margin: 0 20px;
    background: #f6b874;
    border-radius: 24px;
    .slot-header {
      display: flex;
      justify-content: space-between;
      i {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 223, 179, 0.6);
        opacity: 0.6;
      }
    }
    .slot-content {
      margin-top: 5px;
      height: 30px;
      background-image: linear-gradient(
        0deg,
        #cf9456 0%,
        rgba(207, 148, 86, 0.8) 100%
      );
      border-radius: 11px;
    }
  }
}

.paper {
  position: relative;
  margin: -30px 49px 0 49px;
  padding: 40px 30px 0 30px;

  // box-shadow: 0 14px 6px 0 #f6b874 inset;
  background-color: #fff;

  span {
    overflow: hidden;
    display: block;
    text-align: justify;
  }

  .question {
    margin-bottom: 32px;
    font-size: 24px;
    color: #f4592c;
  }
  .answer {
    font-size: 24px;
    line-height: 60px;
    color: #5c606d;
  }
}
.paper {
  .title {
    margin-top: 50px;
  }
  .shadow {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.pannel1 {
  margin-top: -380px;
  margin-bottom: 30px;
  .paper {
    .title {
      text-align: center;
    }
    .item1 {
      .title {
        padding: 0 140px;
      }
      ul {
        display: flex;
        justify-content: space-between;
        margin-top: 73px;
        font-size: 24px;
        color: #61568b;
      }
      li {
        max-width: 164px;
        text-align: center;
      }
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 156px;
        height: 156px;
        margin-bottom: 26px;
        background: url($baseUrl+"images/activity/telecom/circle.jpg") no-repeat
          center center/contain;
      }
      span {
        display: block;
        text-align: center;
      }
      .cup {
        width: 84px;
        height: 136px;
      }
      .money {
        width: 121px;
        height: 59px;
      }
      .card {
        width: 111px;
        height: 64px;
      }
    }
    .item2 {
      padding-bottom: 60px;
      .title {
        padding: 0 180px;
      }
      .form {
        margin-top: 60px;
        padding: 50px 20px;
        background-color: rgba(81, 62, 189, 0.1);
        border-radius: 12px;
        .input-item {
          overflow: hidden;
          display: flex;
          align-items: center;

          height: 80px;
          margin-bottom: 38px;
          font-size: 24px;
          border-radius: 4px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 117px;
          height: 100%;

          text-align: center;
          color: #fff;
          background-color: #624bcc;
        }
        input,
        p {
          flex: 1;
          height: 100%;
          line-height: 80px;
          width: 100%;
          padding-left: 20px;
          font-size: 24px;
          background-color: #fff;
        }
      }
      .btn-box {
        width: 50%;
        padding: 20px 70px;
        margin: 60px auto 0 auto;
        text-align: center;
        color: #fff;
        background-color: #f6b874;
        border-radius: 40px;
      }
    }
  }
}
</style>

