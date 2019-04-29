<template>
  <div id='bottom-nav'>
    <router-link
      :to="{name:'Home'}"
      class="home"
      exact-active-class="active"
      v-if="salesPhone||businessParams.channel_user_id"
    >
      <i></i>
      <span>首页</span>
    </router-link>
    <template v-if="salesPhone">
      <router-link
        :to="{name:'BusinessOrderList'}"
         class="order"
        active-class="active"
      >
        <i></i>
        <span>订单</span>
      </router-link>
    </template>
    <template v-if="!salesPhone">
      <router-link
        :to="{name:'OrderList',query: {tab: 'UnCompletedOrder'}}"
           class="order"
        active-class="active"
      >
        <i></i>
        <span>订单</span>
      </router-link>
      <router-link
        :to="{name:'mine'}"
           class="mine"
        exact-active-class="active"
      >
        <i></i>
        <span>我的</span>
      </router-link>
    </template>

  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["salesPhone"]),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      // businessUserId: insure.getBusinessParams("jobNo"),
      // referer: insure.getBusinessParams("referer"),
      // showHomepage: false
    };
  },
  created() {
    // this.env=env.NODE_ENV
  
    // this.handleSpeicalProince()
  },
  methods: {
    // handleSpeicalProince() {
    //   this.$store.watch((state, getter) => {
    //     if (this.referer == 'wechat' && getter.province == '山东省') {
    //       this.showHomepage = false
    //     } else {
    //       this.showHomepage = true
    //     }
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
#bottom-nav {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 29;
  display: flex;
  width: 100%;
  padding: 12px 0;
  box-shadow: 0px 4px 16px 0px rgba(3, 49, 105, 0.23);
  background-color: #fff;
  span {
    display: block;
  }
  a {
    display: block;
    flex: 1;
    text-align: center;
    font-size: 28px;
    color: #676767;
    &.home i {
      @include icon(60, 60, "icon/home_uncheck.png");
    }
    &.order i {
      @include icon(60, 60, "icon/order_uncheck.png");
    }
    &.mine i {
      @include icon(60, 60, "icon/mine_uncheck.png");
    }
    &.active {
      color: #0b8aff;
      &.home i {
        @include icon(60, 60, "icon/home_check.png");
      }
       &.order i {
        @include icon(60, 60, "icon/order_check.png");
      }
       &.mine i {
        @include icon(60, 60, "icon/mine_check.png");
      }
    }
  }
}
</style>
