<template>
  <div
    id="owner-info-card"
    class="pannel-card "
  >
    <div class="card-header header-title ">车主信息</div>
    <ul class="card-content">
      <li>
        <em>车牌号</em>
        <span>{{ salesPhone? confirmInfo.linceNo : markInfo.linceNo}}</span>
      </li>
      <li>
        <em>姓名</em>
        <span>{{ salesPhone? confirmInfo.ownerName : carInfo.CarOwnersName }}</span>
      </li>
      <li>
        <em>手机号</em>
        <span>{{ salesPhone? confirmInfo.phone :carInfo.MobilePhone }}</span>
      </li>
      <li>
        <em>证件号</em>
        <span>{{ salesPhone? confirmInfo.identityId :carInfo.IdCard }}</span>
      </li>
    </ul>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    confirmInfo: Object
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO",
      markInfo: "MARK_INFO"
    }),
    salesPhone() {
      return this.$store.getters.businessParams.salesPhone;
    }
  }
};
</script>
<style lang="scss" scoped>
#owner-info-card {
  margin-bottom: 34px;
}
.card-header {
  max-height: 95px;
  line-height: 95px;
  margin: 0 30px;
  font-size: 28px;
  font-weight: bold;
  border-bottom: 1px solid #e4e4e4;

  .header-title {
    font-weight: bold;
    color: #131313;
  }
}
.card-content {
  padding: 30px;
  line-height: 50px;
  li {
    display: flex;
    justify-content: space-between;
  }
  span {
    color: #838383;
  }
}
</style>
