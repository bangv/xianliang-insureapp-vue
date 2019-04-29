<template>
  <div class="reservation-wrap">
    <div class="banner"></div>
    <div class="insure-card insure-intro">
      <div class="intro-wrap">
        <p class="intro-title"><img :src="$baseUrl +'images/reserve/embed_title_a.png'" alt=""></p>
        <ul class="insure-flexbox " >
          <li class="intro-box" v-for=" (item, index) in introData" :key="index">
            <p class="ins-center intro-item">
              <i class="iconfont " v-html="item.icon"></i>
            </p>
            <strong><b class="bar">-</b>&nbsp; {{item.title}} &nbsp;<b class="bar">-</b></strong>
            <span v-html="item.text"></span>
          </li>

        </ul>

      </div>

      <div class="reserve-step">
        <p class="intro-title"><img :src="$baseUrl +'images/reserve/embed_title_b.png'" alt=""></p>
        <ul class="insure-flexbox">
          <li class="intro-box" v-for="(item, index) in stepInfo" :key="index">
            <img class="step-img" :src="$baseUrl+item.imgUrl" alt="">
            <span>{{item.title}}</span>
          </li>
          <li class="bg-line"></li>
        </ul>

      </div>

      <div class="reserve-info">
        <LicenseForm></LicenseForm>
        <!--（填写手机号）-->
        <div class="reserve-item ins-align">
          <p class="item-left">手机号码</p>
          <div class="reserve-code insure-flexbox-item car-input">
            <SecretInput
                    v-model="reserveCode"
                    placeholder="请输入手机号码"
                    :max="11"
                    secret="3,4"
            />
          </div>
        </div>

      </div>

    </div>

    <div class="btn-wrap insure-flexbox insure-flexbox-content-center">
      <button
              type="button"
              class="sign-up-btn"
              @click="submitForm"
      >提交</button>

    </div>



  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LicenseForm from "@/components/form/LicenseForm";
import SecretInput from "@/components/form/SecretInput";

export default {
  components: {
      LicenseForm,
      SecretInput
  },
  computed: {
    ...mapGetters({
      licenseInfo: "licenseInfo",
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
      return {
          reserveCode:'',
          introData: [
              {
                  title: '省钱',
                  icon: `&#xe602;`,
                  text: `按天计价&nbsp;开车收费 <br> 不开车不收费`
              },
              {
                  title: '省力',
                  icon: `&#xe61e;`,
                  text: `全程手机报价办理 <br> 足不出户线上出单`
              },
              {
                  title: '省心',
                  icon: `&#xe631;`,
                  text: `费用按天保障全年享 <br> 支持速递理赔 <br> 全国通赔电子理赔`
              }
          ],
          stepInfo: [
              {
                  title:'预约提交',
                  imgUrl: `images/reserve/embed_icon_a.png`
              },
              {
                  title:'客服报价',
                  imgUrl: `images/reserve/embed_icon_b.png`
              },
              {
                  title:'微信签约',
                  imgUrl: `images/reserve/embed_icon_c.png`
              },
              {
                  title:'服务生效',
                  imgUrl: `images/reserve/embed_icon_d.png`
              }
          ]
      }
  },

  methods: {
    submitForm() {
      const params = {
        channelUserId: this.$route.query.channel_user_id,
        licenseNo: this.licenseInfo.license,
        cellPhone: this.reserveCode
      };
      this.$http.postCreateReserve(params).then(res => {
        if (res.data.respcode == "01") {
          this.$toast(res.data.errMsg);
        } else {
          this.$router.push({
            name: "ReservationResult"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.reservation-wrap {
  width: 100%;
  background: #e8dcfd;
  .banner {
    width: 100%;
    height: 610px;
    background: url($baseUrl+"images/reserve/embed_baner.png") no-repeat
  center center/cover;
    margin-bottom: -140px;
  }
  .insure-intro {
    margin: 0 20px 30px;
    .intro-wrap {
      margin-bottom: 60px;
    }
    ul {
      align-items: flex-start;
    }
    .reserve-step {
      padding-bottom: 50px;
      margin-bottom: 30px;
      border-bottom: 1px solid #e6e6e6;
      ul {
        position: relative;
        li{
          z-index: 9;
        }
      }
      .bg-line {
        display: block;
        width: 80%;
        margin-left: 10%;
        height: 1px;
        position: absolute;
        top: 43px;
        border-bottom: 1px dashed #e6e6e6;
        z-index: 0;
      }
    }
    .intro-title {
      /*background:red;*/
      margin: 30px 0;
      line-height: 40px;
      text-align: center;
      img {
        height: 40px;
      }
    }
    .intro-box {
      width: 33.333%;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      line-height: 40px;
      span {
        font-size: 20px;
        color: #7c7d7d;
      }
      .bar {
        color: #6726ee;
        font-weight: bold;
      }
      strong {
        margin: 10px 0;
      }
      .step-img {
        width: 126px;
        height: 82px;
        padding: 0 25px;
        margin-bottom: 15px;
        background: #ffffff;

      }
    }
    .intro-item {
      width: 80px;
      height: 80px;
      color: #fff;
      text-align: center;
      background: #6726ee;
      border-radius: 50%;
      border: 6px solid #e1d7fa;
      i {
        line-height: 60px;
        font-size: 40px;
      }
    }
  }
  .tips-title {
    position: relative;
    margin-top: 80px;
    font-size: 24px;
    text-align: center;
    color: #5f5f5f;
    &::before {
      content: "";
      position: absolute;
      left: 10%;
      right: 10%;
      top: 0;
      bottom: 0;
      height: 1px;
      margin: auto;
      background-color: #ddd;
    }
    p {
      display: inline-block;
      position: relative;
      padding: 0 30px;
      background-color: #f5f5f5;
    }
  }
}
.reserve-info {
  padding: 0 30px;
}
.reserve-item {
  margin: 60px 0;
  font-size: 30px;
  line-height: 60px;
  .item-left {
    margin-right: 20px;
    color: #666;
  }
  .car-input{
    background: #e8dcfd;
    height: 60px;
    color: #666;
    border-radius: 30px;
    text-indent: 30px;
  }
  input {
    width: 90%;
    text-align: left;
    font-size: 28px;
  }
}

.home-car-info /deep/ {
  margin-top: 80px;
  .icon-star {
    display: none;
  }
  .car-input, .license-postfix {
    background: #e1d7fa;
  }
}
.btn-wrap /deep/ {
  padding: 100px 30px 160px;
  .sign-up-btn {
    width: 93%;
    background: #6726ee;
  }
}

</style>