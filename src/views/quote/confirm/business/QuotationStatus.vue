<template>
  <div class="quotation-status-wrap">
    <div class="quotation-status" v-if="result == 400">

      <div class="quo-status-top">
        <img :src="`${baseUrl}images/quote/qeo_error_5.png`" alt="请求异常">
      </div>

      <div class="quo-status-center">
        <h2>抱歉，系统繁忙，请重试！</h2>

        <p class="txt-center">
          系统请求繁忙，请重试！
        </p>
        <p class="txt-center">或直接进行人工报价</p>

        <p class="txt-center">
          客服热线： <a href="tel:400-9898-988">400-9898-988</a>
        </p>
      </div>

      <div class="quo-status-bottom">
        <button class="sign-up-btn" @click="goToQuo">重试</button>
        <button class="sign-up-btn back-btn" @click="goToHome">返回首页</button>
      </div>

    </div>

    <div class="quotation-status" v-if="result == 401">

      <div class="quo-status-top">
        <img :src="`${baseUrl}images/quote/qeo_error_3.png`" alt="信息不准确">
      </div>

      <div class="quo-status-center">
        <h2 class="quo-prompt">车主/车辆信息有误，</h2>
        <h2 class="quo-prompt">报价不成功</h2>
        <p class="txt-center">
          请您上传行驶证和身份证照片，我们工作人员会审核和补充资料后电话联系您进行重新报价
        </p>
        <p class="txt-center">如有问题，请联系客服进行人工处理</p>

        <p class="txt-center">
          客服热线：<span class="blues">400-9898-988</span>
        </p>
      </div>

      <div class="quo-status-bottom">
        <button class="sign-up-btn">拍照/上传</button>
        <button class="sign-up-btn back-btn" @click="goToInfo">完善资料</button>
      </div>

    </div>

    <div class="quotation-status" v-if="result == '00'">

      <div class="quo-status-top quo-img">
        <img class="" :src="`${baseUrl}images/upload_success.png`" alt="提交成功" v-if="salesType == 2">
        <div id="qrcode" ref="qrcode" v-show="salesType != 2"></div>

      </div>

      <div class="quo-status-center">
        <h2>恭喜您，{{linceNo}} &nbsp; {{ownerName}}
          报价提交成功！</h2>
      </div>
      <div class="quo-hint-qrcode border-top-scaleY" v-if="salesType != 2">
        <p>
          温馨提示：请引导客户使用微信扫一扫，<br> 扫描上方二维码<br>
          进入相应页面完成剩下流程
        </p>
      </div>
      <div class="quo-status-bottom">
        <button class="sign-up-btn" @click="goToQuolist">报价单记录</button>
      </div>
      <div class="quo-hint ins-center">
        <p class="grays ">如有疑问，请联系天天车保客服热线：<a href="tel:400-9898-988" class="blues">400-9898-988</a></p>
      </div>

    </div>

    <div class="quotation-status" v-if="result == '01'">

      <div class="quo-status-top quo-img">
        <img class="" :src="`${baseUrl}images/upload_defeate.png`" alt="提交失败">
      </div>

      <div class="quo-status-center">
        <h2>抱歉，{{linceNo}} &nbsp; {{ownerName}}
          报价提交失败！</h2>
      </div>

      <div class="quo-status-bottom">
        <button class="sign-up-btn" @click="goToQuolist">报价单记录</button>
      </div>

      <div class="quo-hint ins-center">
        <p class="grays ">如有疑问，请联系天天车保客服热线：<a href="tel:400-9898-988" class="blues">400-9898-988</a></p>
      </div>

    </div>

  </div>

</template>

<script>
import { insure } from '@/utils/insure'

import { mapGetters } from "vuex";
export default {
  name: "QuotationStatus",
  computed: {
    ...mapGetters(["salesPhone"]),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      result: "00",
      insCount: null,
      linceNo: "",
      ownerName: "",
      salesType: "",
      shortUrl: "" // 二维码简化版 链接
    };
  },

  created() {
    this.result = this.$route.query.result;
    this.insCount = this.$route.query.insCount;
    this.linceNo = this.$route.query.linceNo;
    this.ownerName = this.$route.query.ownerName;
    this.getSalesPhone();
  },

  mounted() {
    /** 如果业务员类型为普通类型，则需生成二维码 */
    /*      if (this.salesType == 1) {
        this.getQpCode();
      }*/
  },
  methods: {
    goToHome() {
      // this.$router.push({ path: "/" });
      window.location.href = window.location.origin + this.$baseUrl
    },
    goToInfo() {
      this.$router.push({ name: "Info" });
    },
    goToQuo() {
      this.$router.push({
        name: "Proposal",
        query: {
          insCount: this.insCount // 已选险种数量
        }
      });
    },
    goToQuolist() {
      this.$router.push({
        name: "BusinessOrderList"
        // query: {
        //   insCount: this.insCount
        // }
      });
    },
    // 判断当前手机号是否为业务员 ,（仅业务员可登录）
    getSalesPhone() {
      const params = {
        salesPhone: this.salesPhone
      };
      // 判断接口返回是否存在 ID
      this.$http.getSalesPhone(params).then(res => {
        this.salesType = res.data.salesType;
        if (res.data && this.salesType != 2) {
          this.getShortUrl();
        }
      });
    },

    // 稀释 二维码密度，简化链接
    getShortUrl() {
      const userId = this.salesPhone;
      const linceNo = encodeURI(this.linceNo);
      const serialNo = this.businessParams.serialNo;
      const params = {
        url: window.location.origin+this.$baseUrl+`quote/confirm?salesPhone=${userId}&linceNo=${linceNo}&serialNo=${serialNo}`,
        // url: `https://www.meirichexian.com/insureapp/quote/confirm?salesPhone=${userId}&linceNo=${linceNo}&serialNo=${serialNo}`
      };
      this.$http.getShortUrl(params).then(res => {
        this.shortUrl = res.data.shorturl;

        const param = {
          element: `qrcode`, // 生成二维码的元素ID
          shortUrl: `${this.shortUrl}`, // 简化二维码链接
          width: 180, // 二维码宽
          height: 180 // 高度
        };
        insure.setQpCode(param);

      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.quotation-status-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  background: #f3f3f3;
}
.quotation-status {
  padding: 0 55px;
}

.quo-status-top {
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 60%;
  }
}

.quo-status-center {
  margin-top: -70px;
  font-size: 24px;
  line-height: 40px;
  .quo-prompt {
    margin: 20px 0;
    line-height: 45px;
  }
  h2 {
    margin: 20px 0;
    font-size: 40px;
    line-height: 80px;
    text-align: center;
  }

  .icon-dot {
    display: block;
    width: 22px;
    height: 22px;
    margin-right: 20px;
    border-radius: 50%;
    background: #9d9d9d;
  }
}
.quo-hint-qrcode {
  padding: 50px 0 0;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #9d9d9d;
}
.txt-center {
  color: #9d9d9d;
  text-align: center;
}
.quo-status-bottom {
  margin-top: 80px;
  button {
    margin-bottom: 50px;
  }
  .sign-up-btn {
    width: 100%;
  }
  .back-btn {
    background: #fff;
    border: 1px solid #007aff;
    color: #007aff;
  }
}
.quo-img {
  margin: 100px 0 60px;
}
.quo-hint {
  /*position: absolute;*/
  /*bottom: 30px;*/
  margin-top: 80px;
  font-size: 20px;
  text-align: center;
}
</style>
