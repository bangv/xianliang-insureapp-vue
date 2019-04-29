<template>
  <div id="reservation-wrap">
    <!--收货地址-->
    <div class="address-form insure-card">
      <h2 class="card-title">Hi, {{$route.query.linceNo}}</h2>

      <div class="address-mark">
        <span class="lines"></span>
        <span class="txt">填写收货地址信息</span>
        <span class="lines"></span>
      </div>

      <AddressForm
        ref="form"
        @submit="postAppointmentAddress"
      ></AddressForm>

    </div>
    <!--预约服务-->
    <div class="reservation-ser insure-card">

      <div class="ins-box card-header">
        <h2 class="header-title">车载智能终端</h2>
        <span class="grays header-title">在线预约</span>
      </div>

      <div class="card-content border-bottom-scaleY">
        <div class="insure-flexbox insure-flexbox-content-between insure-flexbox-align-center">
          <img
            :src="`${baseUrl}images/reserve/reserve_device.png`"
            alt="因数盒子车载智能终端"
          >
          <div class="content-right">
            <p class="equ-info-text">
              <span class="oranges">￥200元</span>(押金可退)</p>
            <p class="equ-info-text grays">数量 x1</p>
          </div>
        </div>
      </div>

      <div class="card-bottom ">
        <p> 说明：在线预约需支付 200元押金，后续根据服务情况，押金可退还 </p>
      </div>
    </div>
    <!--服务项目-->
    <div class="reservation-project insure-card">
      <h2 class="card-title">服务项目</h2>
      
      <!-- <div class="project-wrap">
        <div
          class="project"
          v-for=" (item, index) in ServiceItems"
          :key="index"
        >
          <img :src="item.img">
          <p>{{item.name}}</p>
        </div>
      </div> -->
      <ServiceFooter></ServiceFooter>
    </div>

    <div class="btn-wrap insure-flexbox insure-flexbox-content-center">
      <button
        type="button"
        class="sign-up-btn"
        @click="formValidate"
      >提交</button>
    </div>

  </div>

</template>

<script>
import { storage, session, cookie, ua, platform } from "@/utils/browser";
import { mapGetters } from "vuex";
import AddressForm from "@/components/form/AddressForm";
import ServiceFooter from "@/components/share/ServiceFooter";
export default {
  name: "Reservation",
  components: {
    AddressForm,
    ServiceFooter
  },
  data() {
    return {
      // ServiceItems: [
      //   {
      //     name: "爱车综合检查服务",
      //     img: require("../../../../static/images/reserve/reserve_test.png")
      //   },
      //   {
      //     name: "行车轨迹位置服务",
      //     img: require("../../../../static/images/reserve/reserve_location.png")
      //   },
      //   {
      //     name: "车辆安防监控服务",
      //     img: require("../../../../static/images/reserve/reserve_safety.png")
      //   },
      //   {
      //     name: "驾驶习惯用户服务",
      //     img: require("../../../../static/images/reserve/reserve_user.png")
      //   }
      // ]
    };
  },
  computed: {
    ...mapGetters({
      receiver: "RECEIVER",
      userId: "userId",
      openId: "openId"
    })
  },
  created() {},
  methods: {
    formValidate() {
      this.$refs.form.formValidate();
    },
    /**
     * 更新收件人信息
     */
    postAppointmentAddress() {
      const {
        provinceText,
        cityText,
        areaText,
        detailAddress, // 详细地址(加上之前的省市区)
        Receiver_Name, // 收件人名字
        Receiver_Phone // 收件人手机号
      } = this.receiver;
      const appointmentId = this.$route.query.appointId;
      const params = {
        appointmentId: appointmentId, // 预约单号
        platUserId: this.userId,
        provinceText: provinceText,
        cityText: cityText,
        areaText: areaText,
        detailAddress: detailAddress,
        receiver_Name: Receiver_Name,
        receiver_Phone: Receiver_Phone
      };
      this.$http.postAppointmentAddress(params).then(res => {
        if (res.data.respcode == "00") {
          this.$toast("恭喜您预约成功");
          // this.$store.commit("SET_RECEIVER", res.data);
          this.h5Sign(appointmentId);
        }
      });
    },

    /**
     * @description H5 签约
     * @param {String} orderId 订单号
     */
    h5Sign(orderId) {
      if (!ua.isMobile) {
        this.$toast("请在手机完成签约");
      }
      const params = {
        orderId: orderId,
        type: platform.type(),
        platUserId: this.userId,
        openId: this.openId
      };
      this.$http.h5Sign(params).then(res => {
        if (res.data.respcode == "00") {
          if (res.data.signStatus == 1) {
            // this.$toast('您已开通免密签约')
            // 前往关注公众号页面
            this.$router.push({ name: "Follow" });
          } else {
            // storage.setItem("SIGN_ORDER", orderId);
            window.location.href = res.data.redirectUrl;
          }
        } else {
          this.$toast("签约失败");
          this.$router.push({ name: "Follow" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#reservation-wrap {
  width: 100%;
  padding: 30px;
  .address-form {
    width: 100%;
    font-size: 30px;
    color: #131313;
    // padding: 70px 50px 0;

    .form-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 75px;
      margin-bottom: 60px;
      .item-left {
        width: 120px;
        white-space: nowrap;
        margin-right: 40px;
      }
      .item-right {
        flex: 1;
        position: relative;
        input,
        textarea {
          background: #fff;
          font-size: 28px;
        }

        .error-tip {
          position: absolute;
          bottom: -40px;
          color: red;
        }
      }
    }
    .citys {
      display: flex;
      select {
        width: 100%;
        height: 100%;
      }
    }
    .citys li {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      margin-right: 10px;
      flex: 1;
      height: 70px;
      border-radius: 35px;
      border: 1px solid #dadada;
      text-indent: 22px;
      background: #fff;
      &:last-child {
        margin-right: 0;
      }
    }
    label {
      position: relative;
      margin-right: -50px;
    }
    input {
      width: 100%;
      height: 70px;
      border-radius: 35px;
      border: 1px solid #dadada;
      text-indent: 30px;
    }
    .item-address {
      height: auto;
      align-items: start;
    }
    textarea {
      width: 100%;
      height: 160px;
      padding: 10px;
      border-radius: 15px;
      border: 1px solid #dadada;
      text-indent: 10px;
      line-height: 36px;
      font-size: 30px;
      resize: none;
    }
    .btn-wrap {
      margin-top: 120px;
    }
    .sign-up-btn {
      width: 100%;
    }
  }
  .card-title {
    font-size: 30px;
  }
  .address-mark {
    margin: 25px 0;
    height: 60px;
    line-height: 60px;
    text-align: center;
    .lines {
      display: inline-block;
      vertical-align: middle;
      width: 160px;
      border-top: 1px solid #9d9d9d;
    }
    .txt {
      display: inline-block;
      font-size: 24px;
      color: #9d9d9d;
      vertical-align: middle;
    }
  }

  .continue-btn {
    width: 160px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid #007aff;
    background: #fff;
    text-align: center;
    color: #007aff;
  }

  .reservation-ser {
    .card-header {
      padding: 10px 0 30px;
      font-size: 30px;
      .header-title {
        font-size: 30px;
      }
    }
    .card-content {
      padding: 30px 0;
      img {
        width: 200px;
        margin-right: 60px;
      }
      .content-right {
        text-align: right;
        line-height: 60px;
        font-size: 24px;
      }
    }

    .card-bottom {
      padding-top: 20px;
      line-height: 40px;
      font-size: 24px;
      color: #9d9d9d;
    }
  }

  .reservation-project {
    .project-wrap {
      display: flex;
      flex-flow: nowrap;
      justify-content: space-around;
      width: 100%;
      padding: 20px 0;
      .project {
        display: flex;
        flex-flow: column;
        width: 120px;
        font-size: 24px;
        text-align: center;
      }
    }
  }

  .btn-wrap {
    padding: 50px 0 50px;
  }
}
</style>
