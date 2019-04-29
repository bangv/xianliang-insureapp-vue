<template>
  <div id="policy-wrap">
    <div class="policy-box" v-if="carList.length>0">
      <div class="policy-owner-info">
        <span>Hi，尊敬的</span>
        <select class="brand-txt " v-model="orderId" @click="reRotate">
          <option v-for="(car,index) in carList " :key="index" :value="car.orderId == '' ? carList[0].orderId : car.orderId">
            {{car.lincenNo == '' ? carList[0].lincenNo : car.lincenNo}}
          </option>
        </select>
        <em class="arrows" :class="{ 'arrowTrans': showCarList }" v-show="carList.length>1"></em>
      </div>
      <div class="policy-no insure-card">
        <p class="ins-box">
          <span>服务承保</span>
          <span>{{orderSource.sourceName}}</span>
          <!--<span class="red">{{orderSource.policyStatus==1?'生效中': '未生效'}}</span>-->
        </p>
        <p class=" ins-box">
          <!--policy-accept-->
          <span>理赔电话</span>
          <a :href="'tel:'+ orderSource.sourcePhone" class="blues">{{orderSource.sourcePhone}}</a>
        </p>
      </div>

      <div class="insure-card policy-info">
        <h3 class="policy-title border-bottom-scaleY">保障内容</h3>

        <OrderInsure :insure="order"></OrderInsure>

        <p class="ins-box " v-if="order.forceTotal>0 || order.taxTotal>0">
          <em>交强险</em>
          <span>交强险、车船险</span>
        </p>
        <p class="ins-box ">
          <em>投保状态</em>
          <span>{{order.status==2? '已投保': '未投保'}}</span>
        </p>
        <p class="ins-box ">
          <em>生效时间</em>
          <span>{{order.quotation_startdate}}</span>
        </p>
        <p class="ins-box ">
          <em>终止时间</em>
          <span>{{order.quotation_enddate}}</span>
        </p>
      </div>

      <div class="insure-card policy-info">
        <h3 class="policy-title ins-box border-bottom-scaleY">
          <strong>被保人</strong>
          <span class="policy-owner">{{order.insuredName}}</span>
        </h3>
        <p class="ins-box ">
          <em>身份证号码</em>
          <span>{{order.insuredIdCard}}</span>
        </p>
        <p class="ins-box ">
          <em>手机号码</em>
          <span>{{order.insuredMobile}}</span>
        </p>

      </div>
      <p>
        <span class="">查看 &nbsp;</span>
        <router-link class="blues" :to="{name:'Protocol'}">用户服务协议</router-link>
        <a v-if="order.elecUrl" class="blues" :href="policyUrl">
          <em> |&nbsp; </em>电子保单</a>
      </p>
    </div>

    <DefaultImg v-show="carList.length===0" text="暂无数据"></DefaultImg>

  </div>
</template>
<script>

import { mapGetters } from 'vuex'
// import OrderInsure from '@/components/share/OrderInsure'
import DefaultImg from '@/components/share/DefaultImg'
export default {
  components: {
    OrderInsure:()=>import('@/components/share/OrderInsure'),
    DefaultImg
  },
  data() {
    return {
      order: {},
      orderSource: {
        sourceName: '',
        sourcePhone: '',
        policyStatus: '' // 保单是否生效中
      },
      policyUrl: '', // 电子保单页面url
      carList: [],
      orderId: null,
      showCarList: false // icon 倒三角旋转
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userId'
    })
  },
  watch: {
    orderId(val, oldVal) {
      if (val) {
        this.getPolicyInfo(val)
      }
    }
  },
  created() {
    this.getOwnerCar()
  },

  methods: {
    /**
     *@description 获取当前用户拥有的车辆
     * */
    getOwnerCar() {
      const params = {
        platUserId: this.userId,
        type: '1'
      }
      this.$http.chooseOwnerCar(params).then(res => {
        if (res.data.respcode == '00') {
          this.carList = res.data.cars
          this.orderId = this.carList[0].orderId
          // this.getPolicyInfo(this.orderId);
        }
      })
    },
    /** 获取保单信息
     *@description 通过订单id查询订单详情
     */
    getPolicyInfo(orderId) {
      this.$http.getPolicyInfo({ orderId: orderId }).then(res => {
        if (res.data.respcode == '00') {
          this.order = res.data.orderInfo
          this.orderSource.sourceName = res.data.sourceName
          this.orderSource.sourcePhone = res.data.sourcePhone
          this.orderSource.policyStatus = res.data.policyStatus
          this.handlePolicyUrl()
        }
      })
    },

    /**
     * @description 保单预览
     */
    handlePolicyUrl() {
      let origin = this.$env.includes('production')
        ? 'https://www.meirichexian.com'
        : 'https://test1.meirichexian.com'
      if (this.order.elecUrl) {
        this.policyUrl = `${origin}/pdf/${this.order.elecUrl.replace(
          '\\',
          '/'
        )}`
      }
    },
    /** 点击下拉，旋转倒三角*/
    reRotate() {
      this.showCarList = !this.showCarList
    }
  }
}
</script>

<style lang="scss" scoped>
#policy-wrap {
  width: 100%;
  padding: 50px 20px;
}
p {
  line-height: 90px;
  font-size: 26px;
}
.policy-owner-info {
  margin-bottom: 20px;
  position: relative;
  font-size: 32px;
  line-height: 60px;
  text-indent: 20px;
}
.policy-no {
  p {
    line-height: 60px;
  }
  .policy-accept {
    font-size: 24px;
    color: #9d9d9d;
  }
  .red {
    color: #ff5e03;
  }
}
.policy-info {
  .policy-title {
    font-size: 30px;
    line-height: 60px;
    font-weight: bold;
    padding-bottom: 15px;
  }
  .policy-owner {
    font-weight: normal;
  }
  em {
    color: #9d9d9d;
  }
  span {
    color: #3a3a3a;
  }
}
.brand-txt {
  font-size: 32px;
}
select {
  width: 210px;
}
.arrows {
  position: absolute;
  top: 20px;
  left: 360px;
}
#order-insure /deep/ {
  margin-top: 30px;
  font-size: 26px;
  .insure-left {
    color: #9d9d9d;
  }
  .insure-type {
    color: #3a3a3a;
    text-align: right;
  }
}
</style>
