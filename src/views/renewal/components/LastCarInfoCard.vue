<template>
  <div class="pannel-card last-car-info-card">
    <div class="card-header ins-box">
      <div class="car-number" v-if="!salesPhone&& !businessParams.modifiable&& carList.length>0">
        <select id="car-type" v-model="order.order_id" @change="selectedCarType">
          <option v-for="(car,index) in carList" :key="index" :value="car.orderId">{{car.linceNo}}</option>
        </select>
        <label for="car-type" class="iconfont">&#xe649;</label>
      </div>
      <p class="car-number" v-else>{{businessParams.linceNo?businessParams.linceNo:plan.linceNo}}</p>
      <p class="insure-flexbox-item car-module">{{order.jymoduleinfo}}</p>
      <i
        class="iconfont blues edit-icon"
        v-if="!businessParams.modifiable"
        @click="goToEditInfo"
      >&#xe610;</i>
    </div>

    <div class="insure-card renewal-hint" v-if="plan&&plan.respcode == '01'">
      <p>
        <em class="iconfont red">&#xe676;</em>由于保司规则限制，无法进行在线报价，请联系我们工作人员，客服热线:
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>
    </div>

    <div class="loading insure-card" v-else-if="!plan"></div>
    <template v-else>
      <div class="card-content">
        <p>
          服务承保
          <em>{{order.source |companyName}}</em>
        </p>
        <p>
          每日费用
          <em>{{plan.dailytotal}}元/天</em>
        </p>
        <p>
          封顶天数
          <em>{{plan.total_days}}天</em>
        </p>
        <p v-if="plan.forcetotal>0">
          交强险
          <em>{{plan.forcetotal}}元</em>
        </p>
        <p v-if="plan.taxtotal>0">
          车船税
          <em>{{plan.taxtotal}}元</em>
        </p>
        <p>
          服务时间
          <em>
            <time>{{plan.businessstartdate}}</time>
            <time>至{{plan.businessexpiredate}}</time>
          </em>
        </p>
      </div>

      <div class="card-footer">
        <div class="item">被保人
          <p>
            <em>{{order.insuredName}}</em>
            <i
              class="iconfont blues edit-icon"
              v-if="!businessParams.modifiable"
              @click="goToEditInfo"
            >&#xe610;</i>
          </p>
        </div>
        <div class="item">被保人证件号
          <em>{{order.insuredIdCard}}</em>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  // props: {
  //   carList: Array,
  //   plan: Object,
  //   order: Object
  // },
  props: ["carList", "plan", "order"],
  computed: {
    ...mapGetters({
      salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  created() {
    console.log(this.order.order_id);
  },
  methods: {
    goToEditInfo() {
      this.$emit("href");
      // this.$router.push({
      //   name: "Info",
      //   query: {
      //     linceNo: this.order.linceNo,
      //     regionCode: this.order.cityCode
      //   }
      // });
    },
    selectedCarType() {
      console.log(this.order.order_id);
      this.$emit("selected", this.order.order_id);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.last-car-info-card {
  .loading {
    width: 100%;
    height: 300px;
    background: url($baseUrl+"images/loadings.gif") no-repeat center
      center/cover;
  }
  .edit-icon {
    font-size: 30px;
  }
  .card-header {
    display: flex;
    p {
      /*flex-grow: 1;*/
      margin-left: 10px;
      font-size: 24px;
      color: #a6a5a5;
    }
    .iconfont {
      font-size: 30px;
    }
    .car-number {
      margin-right: 30px;
      font-size: 28px;
      color: #000;
    }
    .car-module {
      @include text-overflow-percent-ellipsis(85%);
    }
  }
  .renewal-hint {
    line-height: 60px;
    font-size: 24px;
    color: #9d9d9d;
    .red {
      color: #ff5e03;
      margin-right: 20px;
      font-size: 30px;
    }
  }
  .card-content {
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 70px;
      font-size: 24px;
      color: #121212;
      &:nth-child(n + 3) {
        em {
          color: #a6a5a5;
        }
      }
    }
  }
  .loading {
    width: 100%;
    height: 300px;
    background: url($baseUrl+"images/loadings.gif") no-repeat center
      center/cover;
  }
  .card-footer {
    margin: 0 30px;
    border-top: 1px solid #e4e4e4;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      line-height: 70px;

      em {
        color: #a6a5a5;
      }
    }
    em {
      color: #a6a5a5;
    }
  }
}
</style>
