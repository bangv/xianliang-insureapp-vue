<template>
  <Scroll :data="orderList">
    <OrderItem v-for="(item,index) in orderList" :key="index" :order="item" type="0" @reload="UnCompletedOrder"></OrderItem>
  </Scroll>
</template>
<script>
import Scroll from '@/components/share/Scroll'
import OrderItem from './OrderItem'
import { session } from '@/utils/browser'
export default {
  name: 'CompletedOrder',
  components: {
    Scroll,
    OrderItem
  },
  props: {
    userId: String
  },
  data() {
    return {
      orderList: [],
      payTimer: null,
      loopCount: 0
    }
  },
  created() {
    this.UnCompletedOrder()
    this.loopQuerySpecialCompanyOrderPayResultByOrderId()
  },
  destroyed() {
    if (this.payTimer) {
      clearInterval(this.payTimer)
      session.removeItem('INSURE_PAYING_ORDER')
    }
  },
  methods: {
    UnCompletedOrder() {
      const params = {
        platUserId: this.userId,
        orderType: '0',
        pageIndex: 1,
        pageSize: 100
      }
      this.$http.getMyOrderList(params).then(res => {
        if (res.data.respcode == '00') {
          this.orderList = res.data.insureOrderlist.list
        }
      })
    },
    // 查询大地保险订单交强险支付结果
    loopQuerySpecialCompanyOrderPayResultByOrderId() {
      let orderId = session.getItem('INSURE_PAYING_ORDER')
      if (orderId) {
        if (!this.payTimer) {
          this.payTimer = setInterval(() => {
            if (this.loopCount >= 3) {
              clearInterval(this.payTimer)
              session.removeItem('INSURE_PAYING_ORDER')
            }
            this.loopCount++
            this.getPayResultByOrderId(orderId)
          }, 2000)
        }
      }
    },
    // 查询相应订单支付结果
    getPayResultByOrderId(orderId) {
      const params = {
        orderId: orderId
      }
      this.$http.getMyOrderList(params).then(res => {
        const order = res.data.insureOrderlist[0]
        if (res.data.respcode == '00') {
          if (order.force_status == 6) {
            this.$toast('支付成功')
            this.UnCompletedOrder()
            clearInterval(this.payTimer)
            session.removeItem('INSURE_PAYING_ORDER')
          }
        }
      })
    }
  }
}
</script>
