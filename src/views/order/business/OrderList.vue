<template>
  <div class="order-list">
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="ReservationList">预约记录</mt-tab-item>
      <mt-tab-item id="QuotationRecord">报价单记录</mt-tab-item>
      <mt-tab-item id="CompletedOrder">订单记录</mt-tab-item>
    </mt-navbar>
    <component :is="currentTab" :phone="salesPhone"></component>
  </div>
</template>

<script>
import ReservationList from './components/ReservationList'
import QuotationRecord from './components/QuotationRecord'
import CompletedOrder from './components/CompletedOrder'
import { mapGetters } from 'vuex'
import { Navbar } from 'mint-ui'

export default {
  components: {
    'mt-navbar': Navbar,
    QuotationRecord,
    CompletedOrder,
    ReservationList
  },
  data() {
    return {
      currentTab: '',
    }
  },
  computed: {
    ...mapGetters(['salesPhone'])
  },
  created() {
    this.currentTab = this.$route.query.tab ? this.$route.query.tab : 'QuotationRecord';
  }

}
</script>

<style lang="scss" scoped>

.mint-navbar {
  margin-bottom: 30px;
  border-radius: 15px;
  overflow: hidden;
  .mint-tab-item {
    padding: 30px 0 20px 0;
    margin: 0 40px 10px;
  }
}

.order-list {
  width: 100%;
  font-size: 30px;
  color: #131313;
  padding: 30px 25px 120px;
  background-color: #f5f5f5;
  .order-card {
    margin-bottom: 30px;
  }
}


</style>
