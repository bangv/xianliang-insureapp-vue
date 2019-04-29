<template>
  <div class="order-list">
    <mt-navbar v-model="currentTab">
      <mt-tab-item id="QuotationRecord" v-if="businessParams.channel_user_id">报价记录</mt-tab-item>
      <mt-tab-item id="UnCompletedOrder">待完成</mt-tab-item>
      <mt-tab-item id="CompletedOrder">已完成</mt-tab-item>
    </mt-navbar>
    <!-- <component :is="currentTab" :userId="userId"></component> -->
    <mt-tab-container v-model="currentTab">
      <mt-tab-container-item id="QuotationRecord" v-if="businessParams.channel_user_id">
        <QuotationRecord :userId="userId"></QuotationRecord>
      </mt-tab-container-item>
      <mt-tab-container-item id="UnCompletedOrder">
        <UnCompletedOrder :userId="userId"></UnCompletedOrder>
      </mt-tab-container-item>
      <mt-tab-container-item id="CompletedOrder">
        <CompletedOrder :userId="userId"></CompletedOrder>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import QuotationRecord from "./components/QuotationRecord";
import CompletedOrder from "./components/CompletedOrder";
import UnCompletedOrder from "./components/UnCompletedOrder";
import { mapGetters } from "vuex";
import { storage } from "@/utils/browser";
// import { insure } from "@/utils/insure";

export default {
  components: {
    QuotationRecord,
    CompletedOrder,
    UnCompletedOrder
  },
  data() {
    return {
      // businessUserId: insure.getBusinessParams("jobNo"),
      currentTab: ""
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  watch: {
    currentTab(val) {
      this.$router.push({
        name: "OrderList",
        query: {
          tab: val
        }
      });
    }
  },
  created() {
    this.currentTab = this.$route.query.tab;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.mint-navbar {
  margin-bottom: 30px;
  border-radius: 15px;
  overflow: hidden;
  .mint-tab-item {
    padding: 30px 0 20px 0;
    margin: 0 50px 10px;
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
