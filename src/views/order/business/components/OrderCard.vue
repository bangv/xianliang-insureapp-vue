<template>
  <div
    class="order-card"
    @click="goToOrderDetail"
  >
    <div
      class="item-top layout border-bottom-scaleY"
      v-if="type"
    >
      <p>{{order.creatTime | handleTimeStr}}</p>
      <p
        class="blues"
        v-if="order.status==4 || order.status==2"
      >已完成</p>
      <p
        class="blues"
        v-else
      >{{order.status==7?'已关闭':'待完成'}}</p>
    </div>

    <div class="order-owner-info ">

      <p class="layout">
        <span>{{order.linceNo}}</span>
        <span class="insure-btn ins-align" v-if="order.isRenewal == 1" @click.stop="goToRenewal">一键续期</span>
      </p>

      <div class=" layout ">
        <p>服务承保</p>
        <p class="insure-flexbox insure-flexbox-align-center">
          <span>{{order.source |companyName }}</span>
          <!-- <img :src="order.source|company('logo')" alt="" class="company-logo"> -->
        </p>
      </div>

      <div class=" layout ">
        <p>服务费用</p>
        <p>{{order.daily_price}}元/天</p>
      </div>

      <div class=" layout ">
        <p>封顶天数</p>
        <p>{{order.total_days}}天</p>
      </div>

      <OrderInsure :insure="order"></OrderInsure>

      <!--<p class="layout" v-if=" order.forceTotal > 0 || order.taxTotal > 0 "><span>交强险</span> <span>交强险、车船税</span></p>-->
      <div
        v-if="order.forceTotal > 0 || order.taxTotal > 0"
        class="insure-force"
      >
        <p>交强险</p>
        <p><em class="iconfont">&#xe69e;</em> <span>交强险/车船税</span></p>
      </div>

      <div class=" layout ">
        <p>服务期限</p>
        <p class="">{{order.quotation_startdate}}&nbsp;至&nbsp;{{order.quotation_enddate}}</p>
      </div>

      <!--<p class="layout" v-if=" order.forceTotal > 0 || order.taxTotal > 0 "><span>服务期限（交强险）</span> <span>{{order.quotation_startdate}}&nbsp;至&nbsp;{{order.quotation_enddate}}</span></p>-->

    </div>

    <div class=" layout ">
      <p>开通微信自动续费</p>
      <p>{{order.sign_status == 1 ? '已开通': '未开通'}}</p>
    </div>

    <div class=" layout ">
      <p>设备押金</p>
      <p>{{order.note ? '已支付': '未支付'}}</p>
      <!--:class="{oranges: order.Last_state==0}"-->
    </div>

    <div
      class=" layout "
      v-if="  (order.taxTotal && order.taxTotal != 0)  || (order.forceTotal && order.forceTotal != 0)"
    >
      <p class="ins-align">
        <span>交强险和车船税&nbsp;</span>
        <span class="oranges">({{(order.forceTotal + order.taxTotal )| numRound}}元)</span>
        <!--<span >{{order.force_status == 6 ? '(已支付)' : '(未支付)' }}</span>-->
        <!--:class="{oranges: order.force_status != 6 }"-->
        <!--1:报价失败 2:核保失败 3:等待人工审核结果 4:核保成功 ：已支付, 6:已支付-->
      </p>

      <p class="ins-align">
        <span>{{order.force_status == 6 ? '已支付' : '未支付' }}</span>
      </p>

    </div>
    <div
      class="layout "
      v-if="order.sim == 0"
    >
      <p>硬件激活</p>
      <p>未激活</p>
    </div>
    <div
      class="layout "
      v-if="order.sim != 0"
    >
      <p>硬件激活</p>
      <p>已激活</p>
    </div>

    <div class=" layout " v-if="order.status!=7">
      <p>上传资料</p>
      <p class="insure-btn ins-align" v-if="order.status != 2" @click.stop="uploadInfo">立即上传</p>
      <p  v-else>已上传</p>
    </div>

    <div class=" layout ">
      <p>服务保单</p>
      <p>{{order.status == 2 ? '已审核': '未审核'}}</p>
    </div>

    <div class=" layout ">
      <p class="block">物流状态（设备）</p>
      <p>{{order.trackingNumber? '已寄送': '未寄送'}}</p>
    </div>

    <div
      class=" layout "
      v-if="order.trackingNumber"
    >
      <p class="block">快递单号：{{order.trackingNumber}}</p>
      <!--<router-link class="blues default-info" :to="{name:'Address',query: {  saleman: $route.query.saleman } }">查看物流</router-link>-->
      <p class="blues">查看物流</p>
    </div>

    <div class=" layout border-top-scaleY">
      <p>订单编号</p>
      <p class="">{{order.order_id}}</p>
    </div>
    <div class="ins-detail"> <button class="ins-detail-btn">订单详情</button></div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import OrderInsure from "@/components/share/OrderInsure";
export default {
  name: "OrderCard",
  props: {
    order: Object, //  订单对象
    type: String // 订单类型
  },
  components: {
    OrderInsure
  },
  computed: {
    ...mapGetters(["userId", "openId"])
  },
  methods: {
    closeOrder(e) {
      e.stopPropagation();
      const order = this.order;
      this.$messageBox.confirm("确定要取消该订单吗？").then(value => {
        if (value === "confirm") {
          const params = {
            orderId: order.order_id
          };
          this.$http.closeOrder(params).then(res => {
            if (res.data.respcode == "00") {
              this.$emit("reload");
              this.$toast("取消成功");
            } else {
              this.$toast("取消失败");
            }
          });
        }
      });
    },

    // 业务员上传资料
    uploadInfo() {
      this.$store.commit('setBusinessParams', {platUserId:this.order.platUserId})
      this.$router.push({
        name: "UploadMultiple",
        query: {
          linceNo: this.order.linceNo
        }
      });
    },

    /**
     * @description 前往订单详情
     */
    goToOrderDetail() {
      this.$router.push({
        name: "BusinessOrderDetail",
        params: {
          id: this.order.order_id
        }
      });
    },
    goToRenewal () {
      this.$router.push({
        name: 'Renewal',
        query: {
          linceNo: this.order.linceNo,
          orderId: this.order.order_id,
          platUserId: this.order.platUserId
        }
      })
    }
  },

}
</script>


<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.order-card {
  padding: 20px 30px;
  margin-bottom: 30px;
  line-height: 80px;
  font-size: 28px;
  border-radius: 15px;
  background-color: #fff;
  .layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ins-info-right {
      //@include multi-line-exllipsis(1);
      width: 70%;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: right;
    }
    .ins-left {
      margin-right: 40px;
    }
  }
  .item-top {
    margin-bottom: 20px;
  }
  .insure-force {
    line-height: 50px;
    .iconfont {
      font-size: 28px;
      color: #4caf50;
    }
    /*p:last-child {*/
    /*color: #9d9d9d;*/
    /*}*/
  }
  .ins-detail {
    display: flex;
    justify-content: flex-end;
    .ins-detail-btn {
      margin: 10px 0;
      padding: 0 30px;
      border-radius: 28px;
      height: 56px;
      font-size: 28px;
      background: #fff;
      color: #9d9d9d;
      border: solid 1px #9d9d9d;
    }
  }
  .insure-btn {
    //width: 150px;
    padding: 0 20px;
    border-radius: 28px;
    height: 56px;
    font-size: 28px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;

    &[disabled] {
      background: #d5d5d5;
    }
    &.close-order-btn {
      background: #fff;
      border: solid 1px #9d9d9d;
      color: #9d9d9d;
    }
  }
  .border-bottom-scaleY {
    width: 100% !important;
  }
  #order-insure /deep/ {
    margin-bottom: 20px;
  }
}
</style>
