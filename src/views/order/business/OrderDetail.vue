<template>

  <div class="order-detail">

    <div class="order-card">
      <div class="content-item">
        <div class=" layout ">
          <em>车牌号</em>
          <p class="">{{order.linceNo}}</p>
        </div>
        <div class=" layout ">
          <em>服务承保</em>
          <p class="insure-flexbox insure-flexbox-align-center">
            <span>{{order.source |companyName }}</span>
          </p>
        </div>
        <div class=" layout ">
          <em>服务费用</em>
          <p>{{order.daily_price}}元/天</p>
        </div>

        <div class=" layout ">
          <em>封顶天数</em>
          <p >{{order.total_days}}天</p>
        </div>
        <OrderInsure :insure="order"></OrderInsure>

        <div class=" layout ">
          <em>服务时间</em>
        </div>
        <p class="">{{order.quotation_startdate}}&nbsp;至&nbsp;{{order.quotation_enddate}}</p>

        <div class=" layout " v-if="order.forceTotal > 0 || order.taxTotal > 0">
          <em class="ins-left">交强险</em>
          <p class="ins-info-right insure-flexbox-item">
            交强险、车船税
          </p>
        </div>
<!--
        <div class="" v-if=" order.force_startdate && (order.forceTotal > 0 || order.taxTotal > 0) ">
          <em>服务期限（交强险）</em>
          <p v-if="order.force_startdate">{{order.force_startdate}}&nbsp;至&nbsp;{{order.force_enddate}}</p>
        </div>
-->

      </div>

      <div class="content-item order-status">
        <div class="column-item" v-if="order.taxTotal > 0 || order.forceTotal > 0">
          <!-- 1:报价失败 2:核保失败 3:等待人工审核结果 4:核保成功 ：5:已支付, 6:已支付 -->
          <div class=" layout " >
            <p class="block" >交强险、车船税({{order.forceTotal | operation(order.taxTotal,'+')}}元)</p>
            <p >{{order.force_status == 6 ? '已支付': '未支付'}}</p>
          </div>

          <time v-if=" order.force_status == 6 && order.force_statusStr ">支付时间：{{order.force_statusStr|handleTimeStr}}</time>
        </div>

        <div class=" column-item ">
          <div class=" layout ">
            <p class="block">开通微信自动续费</p>
            <p >{{order.sign_status == 1 ? '已开通': '未开通'}}</p>
          </div>
          <time v-if=" order.sign_status == 1 && order.checkTime ">开通时间：{{order.checkTime}}</time>
        </div>

        <div class="column-item">
          <p>
            <em>盒子押金（{{order.deposit?order.deposit:200}}元）</em>
            <i>{{order.note?'已支付':'未支付'}}</i>
          </p>
          <time v-if="order.note">支付时间：{{order.note|handleTimeStr}}</time>
        </div>

      </div>
    </div>

    <div class="insure-card receiver-info">
      <p class="ins-box">
        <em>收货人</em>
        <span>{{order.receiver_Name}}</span>
      </p>
      <p class="ins-box">
        <em>联系电话</em>
        <span>{{order.receiver_Phone}}</span>
      </p>
      <div class="receiver-location">
        <em class="receiver-info-left">收件地址</em>
        <p class="insure-flexbox-item  receiver-info-right">
          <span >{{order.receiver_Address}}</span>
        </p>
      </div>
    </div>
    <!--快递详情-->
    <OrderExpress v-if="order.trackingNumber" :express="express" :receiver="order"></OrderExpress>

    <div class="insure-card receiver-info device-status">
      <h3>硬件激活</h3>
      <p class="ins-box ">
        <span class="step">1.硬件绑定</span>
        <span class="">{{DevDebug.bindStatus == 1 ? '已绑定': '未绑定'}}</span>
      </p>
      <p class="ins-box">
        <span class="step">2.安装调试</span>
        <span class="">{{DevDebug.linkStatus == 1 ? '已连接': '未连接'}}</span>
      </p>
    </div>

    <div class="insure-card ">
      <p class="ins-box">
        <em>服务保单</em>
        <span>{{order.status == 2 ? '已审核': '未审核'}}</span>
      </p>
    </div>

    <div class="order-info">
      <p>
        订单编号：{{order.order_id}}
      </p>
      <p>
        更新时间：{{order.creatTime | handleTimeStr }}
      </p>
    </div>
    <CustomerServiceFooter></CustomerServiceFooter>
  </div>

</template>
<script>
// import OrderCard from './components/OrderCard'
// import OrderInsure from '@/components/share/OrderInsure'

import OrderExpress from '../components/OrderExpress'
import CustomerServiceFooter from "@/components/share/CustomerServiceFooter";
export default {
  components: {
    // OrderCard,
    OrderInsure:()=>import('@/components/share/OrderInsure'),
    OrderExpress,
    CustomerServiceFooter
  },
  data() {
    return {
      DevDebug: {},
      order: {},
      express: {},
    }
  },
  created() {
    this.getOrderDetailByOrderId()
  },
  methods: {
    /**
     *@description 通过订单id查询订单详情
     */
    getOrderDetailByOrderId() {
      const params = {
        orderId: this.$route.params.id
      }
      this.$http.getOrderDetailByOrderId(params).then(res => {
        if (res.data.respcode == '00') {
          this.order = res.data.insureOrderlist[0]
          this.debugDevice(this.order.car_id);

          if(this.order.trackingNumber) {
            this.getExpressInfo()
          }
        }
      })
    },
    /**
     *@description 查询物流信息
     */
    getExpressInfo() {
      const params = {
        trackingNumber: this.order.trackingNumber
      }
      this.$http.getExpressInfo(params).then(res => {
        if (res.data.respcode == '00') {
          this.express = res.data
        }
      })
    },
    // 查询设备绑定信息与设备调试信息
    debugDevice(carId) {
      this.$http.debugDevice({ carId: carId }).then(res => {
        this.DevDebug = res.data ;
      })
    },

  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/style/variables.scss';
.order-detail {
  padding: 33px 36px;
  font-size: 28px;

  .order-card {
    padding: 20px 30px;
    margin-bottom: 30px;
    line-height: 80px;
    font-size: 28px;
    border-radius: 15px;
    color: #8f8f8f;
    background-color: #fff;
    em {
      color: #141414;
    }
    .block {
      color: #000;
    }

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
    .item-top {
      border-bottom: solid 1px #e4e4e4;
    }
    .content-item {
      overflow: hidden;
      &.order-status {
        padding: 30px 0;
        border-top: solid 1px #e4e4e4;
      }
      .close-order-btn {
        margin: 20px 0;

        float: right;
      }
    }
    .card-footer {
      overflow: hidden;
      padding-top: 30px;
      border-top: solid 1px #e4e4e4;
      button {
        float: right;
      }
    }
    // 服务保单
    .policy-item {
      overflow: hidden;
      span {
        float: right;
      }
    }

    .column-item {
      margin-bottom: 40px;
      line-height: 40px;
      &:last-of-type {
        margin-bottom: 0;
      }
      time {
        font-size: 20px;
      }
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .receiver-info {
    font-size: 28px;
    line-height: 60px;
    .receiver-info-left {
      width: 160px;
    }
    .receiver-info-right{
      display: flex;
      justify-content: flex-end;
    }
    .receiver-location {
      display: flex;
      justify-content: space-between;
    }
  }
  .order-info {
    margin-top: 40px;
    color: #b2b2b2;
    p {
      margin-bottom: 30px;
    }
  }
  .customer-service {
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 70px;*/
    /*margin: auto;*/
    margin-top: 50px;
    text-align: center;
    font-size: 20px;
    .icon-service{
      margin-right: 20px;
      @include icon(38, 40, 'icon/device/service.png');
    }
    a {
      color: #1c2135;
    }
  }
  .device-status{
    h3{
      font-size: 28px;
      line-height: 50px;
    }
    p{
      line-height: 90px;
    }
  }
  .device-btn {
    width: 150px;
    height: 52px;
    border-radius: 26px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;
    font-size: 24px;
    line-height: 52px;
    &[disabled] {
      background: #d5d5d5;
    }
  }
}
</style>
