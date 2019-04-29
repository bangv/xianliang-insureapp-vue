<template>
  <Scroll :data="orderList">
    <OrderItem v-for="(item,index) in orderList" :key="index" :order="item" type="1"></OrderItem>
  </Scroll>
</template>
<script>
import Scroll from '@/components/share/Scroll'
import OrderItem from './OrderItem'

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
      orderList: []
    }
  },
  created() {
    this.getCompletedOrder()
  },
  methods: {
    getCompletedOrder() {
      //   let currentPage = this.pageCount[2]
      const params = {
        platUserId: this.userId,
        orderType: '1',
        pageIndex: 1,
        pageSize: 100
      }
      this.$http.getMyOrderList(params).then(res => {
        // this.pageCount[2]++
        if (res.data.respcode == '00') {
          this.orderList = res.data.insureOrderlist.list
          if (!res.data.insureOrderlist.hasNextPage) {
            // this.loadOver = true
          }
        }
      })
    }
  }
}
</script>
