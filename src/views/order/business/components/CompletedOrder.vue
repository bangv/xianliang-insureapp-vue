<template>
  <Scroll :data="orderList">
    <SearchInput ref="searchInput" @change="getOrderList($event)"></SearchInput>
    <OrderCard v-for="(item,index) in orderList" :key="index" :order="item" type="1"></OrderCard>
    <!--<DefaultImg v-show="orderList.length===0" text="暂无数据"></DefaultImg>-->
  </Scroll>
</template>

<script>
import OrderCard from './OrderCard'
import SearchInput from './SearchInput'
import Scroll from '@/components/share/Scroll'
// import DefaultImg from '@/components/share/DefaultImg'

export default {
  name: 'CompletedOrder',
  components: {
    Scroll,
    OrderCard,
    // DefaultImg,
    SearchInput
  },
  props: {
    phone: String
  },
  data() {
    return {
      orderList: [],
    }
  },

  created() {
    this.getOrderList()
  },
  methods: {
    // 获取 订单列表
    getOrderList(linceNo) {
      const params = {
        salesPhone: this.phone,
        linceNo: linceNo,
      }
      this.$http.getOrderList(params).then(res => {
        if (res.data.errCode == '00') {
          this.orderList = res.data.data
        }
        if (res.data.errCode == '02') {
          this.orderList = [];
        }
      })
    },

  }
}
</script>

<style lang="scss" scoped>

</style>
