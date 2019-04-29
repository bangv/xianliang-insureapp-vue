<template>
  <section class="express">
    <div class="item receiver">
      <div class="datetime">
        <p class="date">00-00</p>
        <p class="time">00:00</p>
      </div>
      <div class="text">
        <i class="icon">收</i> 【收货地址】{{receiver.receiver_Address}} &nbsp;{{receiver.receiver_Name}} &nbsp;{{receiver.receiver_Phone}}
      </div>
    </div>
    <div class="item company">
      <div class="datetime">
        <p class="date">00-00
          <i class="dot"></i>
        </p>
        <p class="time">00:00</p>
      </div>
      <div class="text">
        <p v-if="express.expressName">快递公司：{{express.expressName}} </p>
        <p v-if="express.mailno">快递单号：{{express.mailno}}</p>
        <p class="missing"  v-if="!express.data||express.data.length==0">暂无物流信息
          <!-- <button @click="reload">刷新试试</button> -->
        </p>
      </div>
    </div>
    <div class="list" v-if="list.length>0">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="datetime">
          <p class="date">{{item.date.substring(5,10)}}
            <i class="dot"></i>
          </p>
          <p class="time"> {{item.date.substring(11,16)}}</p>
        </div>
        <div class="text">
          <span class="state"></span>
          <div class="address">
            <p class="city">【{{item.city}}】</p>
            <p class="address">{{item.address}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="toggle" v-if="express.data&&express.data.length>0">
      <p class="more" :class="{'show-more':state.showMore}" @click="showMore">
        {{state.showMore?'收起':'点击查看更多物流详情'}}
        <i class="iconfont down">&#xe654;</i>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'OrderExpress',
  props: {
    receiver: Object,
    express: Object
  },

  data() {
    return {
      list: [],
      state: {
        showMore: false
      }
    }
  },
  created() {
    if (this.express.data) {
      this.list = this.express.data.splice(0, 1)
    }
  },
  methods: {
   
    showMore() {
      if (!this.state.showMore) {
        this.list = this.express.data
      } else {
        this.list = this.express.data.splice(0, 1)
      }
      this.state.showMore = !this.state.showMore
    }
  }
}
</script>
<style lang="scss" scoped>
// 物流
.express {
  position: relative;
  padding: 40px;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #fff;
  .list {
    .item {
      &:nth-child(n + 2) {
        color: #8f8f8f;
      }
    }
  }
  .item {
    display: flex;
    font-size: 24px;

    .datetime {
      position: relative;
      padding: 25px 25px 25px 0;
      text-align: center;
      border-right: 1px dotted #ccc;
      .date {
        font-size: 24px;
      }
      .time {
        font-size: 20px;
        color: #8f8f8f;
      }
      .dot {
        position: absolute;
        top: 40px;
        right: -7px;
        width: 14px;
        height: 14px;
        // margin-right: -42p;
        border-radius: 50%;
        background-color: #ff5e03;
      }
    }
    .text {
      flex: 1;
      line-height: 40px;
      padding: 25px 0 25px 25px;
      .address {
        padding-left: 10px;
      }
    }
  }
  .receiver {
    .datetime {
      padding-top: 0;
      padding-bottom: 0;
    }
    .date,
    .time {
      color: transparent !important;
    }
    .text {
      position: relative;
      padding-top: 0;
      padding-bottom: 0;
    }
    .icon {
      position: absolute;
      z-index: 1;
      left: -22px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      text-align: center;
      font-size: 24px;
      color: #fff;
      background-color: #ff5e03;
    }
  }
  .company {
    .text {
      padding-left: 44px;
    }
    .date,
    .time {
      color: transparent !important;
    }
  }
  .toggle {
    text-align: center;
    font-size: 24px;
    color: #979797;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .iconfont {
      font-size: 40px;
    }
    .show-more {
      .iconfont {
        transform: rotate(180deg);
      }
    }
  }
  .missing {
    font-size: 24px;

    color: #8f8f8f;
    button {
      float: right;
      height: 47px;
      border-radius: 23px;
      border: solid 1px #8f8f8f;
      color: #8f8f8f;
    }
  }
}
</style>
