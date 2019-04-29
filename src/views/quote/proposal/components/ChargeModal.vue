<template>
  <Modal @hide="closeModal">
    <div id="charge-info-wrap">
      <div class="charge-info insure-card">
        <h1 class=" ">费用说明
          <!-- <em class="icon-close" @click="closeModal"></em> -->
        </h1>
        <div class="charge-content insure-flexbox insure-flexbox-column ">
          <p class="ins-box">
            <span>封顶天数</span>
            <span>{{plan.total_days}}天</span>
          </p>

          <p class="ins-box">
            <span>服务费</span>
            <span>{{plan.dailytotal}}元/天</span>
          </p>

          <!-- <p class="ins-box">
            <span>年最多扣款</span>
            <span>{{plan.dailytotal|operation(plan.total_days,'*')}}元</span>
          </p> -->
          <p class="ins-box">
            <span>年最多省</span>
            <span>{{plan.boztotal}}元</span>
          </p>
        </div>
        <div class="charge-explain">
          <p>
            <strong>温馨提示：</strong>
            开车越少，花费越低
            <!-- 开车越少，花费越低 如一年未开车可省：{{plan.boztotal}}元 -->

          </p>
        </div>
        <!--<p class=" cars-box" v-for="(type,index) of carTypeList" :key="index">-->
        <!--&lt;!&ndash; <input type="radio" id="type" v-model="carInfo.JYModuleInfo" :value="type.info"/> &ndash;&gt;-->
        <!--<input type="radio" id="type" class="ins-radio" v-model="carInfo.JYModuleCode" :value="type.vehicleNo" />-->
        <!--<label for="type"> {{ type.info}}</label>-->
        <!--</p>-->
        <p class="charge-hint grays">
          如有疑问请联系客服电话，
          <a href="tel:400-9898-988">400-9898-988</a>
        </p>
      </div>

    </div>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal";

export default {
  name: "ChargeModal",
  props: ["plan"],
  data() {
    return {
      // plan:null,
    };
  },
  components: {
    Modal
  },
  methods: {
    closeModal() {
      // this.$emit('hide')
      this.$parent.state.showCharge = false;
    }
  },
  created() {
    // console.log(this.plan);
    // console.log(this.plan.id);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

#charge-info-wrap {
  margin: auto;
  width: 80%;
}
.charge-info {
  width: 100%;
  padding: 30px 20px 20px;
  background-color: #fff;
  box-shadow: none !important;
  h1 {
    border-bottom: solid 1px #95cdfe;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    padding-bottom: 20px;

    position: relative;
    .icon-close {
      @include icon(40, 40, "icon/close.png");
      position: absolute;
      top: -5px;
      right: 0;
    }
  }
}
.charge-content {
  width: 100%;
  padding: 0 20px;
  /*margin-top: 30px;*/

  font-size: 24px;
  line-height: 96px;
  p {
    border-bottom: solid 1px #efefef;
  }
}
.charge-explain {
  line-height: 36px;
  font-size: 24px;
  margin: 20px 0 30px;
  p {
    color: #7d7d7d;
  }
}
.charge-hint {
  margin-top: 10px;
  font-size: 22px;
  text-align: center;
  color: #a5a5a5;
}
</style>
