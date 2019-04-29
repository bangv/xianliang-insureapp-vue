<template>
  <div class="progress-wrap" v-if="car">
    <ul class="flex">
      <li v-for="(opt,index) in statusOpts" :key="index" :class="{'successed':index+1<=car.status}">
        <p>
          <i class="iconfont" v-html="opt.unicode"></i>
        </p>
        <span>{{opt.text}}</span>
      </li>

      <li :class="{'successed':car.status==6}" v-if="car.status==6">
        <p>
          <i class="iconfont">&#xe644;</i>
        </p>
        <span>已领取</span>
      </li>
      <li @click="receiveGift()" v-else>
        <img :src="$baseUrl+'images/reservation/gift.png'" alt v-if="car.status==4">
        <img :src="$baseUrl+'images/reservation/gift_02.png'" alt v-else>
        <span>领奖励</span>
      </li>
    </ul>
  </div>
</template>

<script>
import LicenseCityForm from "@/components/form/LicenseCityForm";

export default {
  props: {
    car: Object
  },
  data() {
    return {
      statusOpts: [
        {
          unicode: "&#xe62c;",
          text: "填写信息"
        },
        {
          unicode: "&#xe6fb;",
          text: "成功签约"
        },
        {
          unicode: "&#xe77d;",
          text: "出单完成"
        },
        {
          unicode: "&#xe629;",
          text: "服务生效"
        }
      ]
    };
  },
  methods: {
    receiveGift() {
      // 1填写信息  2成功签约  3出单完成  4服务开始(可领取奖励) 6奖励领取完毕
      if (this.car.status == 4) {
        this.$emit("receive", this.car.orderId);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.progress-wrap {
  li {
    width: 20%;
    text-align: center;
    &:last-of-type p {
      &::after {
        content: none;
      }
    }
    &.successed {
      .iconfont {
        color: #fff;
      }
      p {
        background-image: linear-gradient(0deg, #007bff 0%, #21aefe 100%);
        &::after {
          background-color: #0886ff;
        }
      }
      // img {
      //   // -webkit-filter: grayscale(0);
      // }
    }
    img {
      position: relative;
      width: 65px;
      display: block;
      margin: auto;
      // -webkit-filter: grayscale(100%);
    }
  }
  p {
    position: relative;
    width: 48px;
    height: 48px;
    line-height: 48px;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: #f0f0f0;
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 100%;
      margin: auto;
      content: "";
      width: 200%;
      height: 8px;
      background-color: #f0f0f0;
    }
  }
  span {
    color: #b3b3b3;
    font-size: 20px;
  }
  .iconfont {
    color: #a5a5a5;
    font-size: 28px;
    text-align: center;
  }
}
</style>
