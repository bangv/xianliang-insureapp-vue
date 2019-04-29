<template>
  <Scroll :data="reservationList">
    <SearchInput ref="searchInput" @change="getReservationList($event)"></SearchInput>
    <!--预约记录 列表-->
    <ul class="reservation-list">
      <li class="insure-card" v-for="(item,index) in reservationList" :key="index">
        <p class="item-title border-bottom-scaleY ">
          <span>{{item.linceNo}}</span>
        </p>
        <div class="border-bottom-scaleY">
          <p class="ins-box ">
            <span>起保日期 </span>
            <span>{{item.quotation_startdate }}</span>
          </p>
          <p class="ins-box" v-if="item.mobilePhone">
            <span>手机号码</span>
            <span>{{item.mobilePhone}}</span>
          </p>
        </div>

        <div class="item-info grays border-bottom-scaleY">
          <p class="ins-class ins-box">
            <span>微信免密代扣开通</span>
            <span> <em class="iconfont" v-if="item.sign_status == 1">&#xe69e;</em>
              <em class="iconfont icon-red" v-else>&#xe676;</em></span>
          </p>
          <p class="ins-class ins-box ">
            <span>收货地址信息</span>
            <span> <em class="iconfont" v-if="item.receiver_Address == 1">&#xe69e;</em>
              <em class="iconfont icon-red" v-else>&#xe676;</em></span>
          </p>
          <p class="ins-class ins-box ">
            <span>设备激活</span>
            <span> <em class="iconfont" v-if="item.sim == 1">&#xe69e;</em>
              <em class="iconfont icon-red" v-else>&#xe676;</em></span>
          </p>
        </div>
        <p class="grays creat-time">{{item.creatTime | handleTimeStr}}</p>
      </li>
    </ul>

    <!--<DefaultImg v-show="reservationList.length===0" text="暂无数据"></DefaultImg>-->
  </Scroll>
</template>

<script>
  import SearchInput from './SearchInput'
  import Scroll from '@/components/share/Scroll'
  // import DefaultImg from '@/components/share/DefaultImg'
    export default {
        name: "ReservationList",
      components: {
        Scroll,
        // DefaultImg,
        SearchInput
      },
      props: {
        phone: String
      },
      data () {
        return {
          reservationList: [],
          linceNo: ''
        }
      },
      created() {
        this.getReservationList();
      },
      methods: {
        // 获取 订单列表
        getReservationList(linceNo) {
          const params = {
            appointmentCode: this.phone,
            linceNo: linceNo,
          }
          this.$http.getReservationList(params).then(res => {
            if (res.data.errCode == '00') {
              this.reservationList = res.data.datas
            }
            if (res.data.errCode == '02') {
              this.reservationList = [];
            }
          })
        },

      }
    }
</script>

<style lang="scss" scoped>
  .reservation-list {
    font-size: 28px;
    line-height: 80px;
    .item-info {
      padding: 30px;
    }
    .ins-class {
      .iconfont {
        font-size: 32px;
        color: #4caf50;
      }
      .icon-red {
        color: red !important;
      }
    }

    .creat-time {
      text-align: right;
    }
  }

</style>
