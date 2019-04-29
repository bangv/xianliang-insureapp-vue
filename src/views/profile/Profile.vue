<template>
  <div class="mine">
    <div class="user-card-container">
      <div class="card-content">
        <p class="avatar-container">
          <img :src="userInfo.headImgUrl||defaultAvatar" alt class="avatar">
        </p>
        <div class="nick">
          <span>{{userInfo.nickName?userInfo.nickName:userPhone|secret(3,4)}}</span>
          <router-link class="bill-entry" :to="{name:'CarCost'}">
            <i class="iconfont">&#xe650;</i>费用明细
          </router-link>
        </div>
        <!--C 端 续保服务入口，-->
        <div class="renewal" v-if="expireDate">
          <router-link :to="{name:'Renewal'}">赶紧续期啦！>></router-link>
          <time>到期日期：{{expireDate}}</time>
        </div>
        <i class="email iconfont" @click="logout">&#xe6ce;</i>
      </div>
    </div>

    <div class="menu-invite ins-box insure-card">
      <span class="mark">NEW</span>
      <p class="menu-invite-left" @click="goToReservationInvite">
        <span class="invite-top">邀请有礼</span>
        <span class="invite-bottom grays">邀请朋友赢取现金奖励！</span>
      </p>
      <span class="icon-arrow"></span>
      <p class="red-packet" @click="goToReservationInvite">
        <img :src="$baseUrl+'images/invite/red_packet.png'">
      </p>
    </div>

    <div class="menu-container">
      <ul>
        <li class="entry">
          <router-link class="entry-left" :to="{name:'Policy'}" tag="p">
            <img :src="$baseUrl+'icon/profile/service.jpg'"> 我的服务
          </router-link>
          <span class="icon-arrow"></span>
        </li>
        <li class="entry">
          <router-link class="entry-left" :to="{name:'CarList'}" tag="p">
            <img :src="$baseUrl+'icon/cheliang.png'"> 我的车辆
          </router-link>

          <span class="icon-arrow"></span>
        </li>
        <li class="entry">
          <router-link
            class="entry-left insure-flexbox insure-flexbox-content-between"
            :to="{name:'DeviceMy'}"
            tag="p"
          >
            <span class="insure-flexbox insure-flexbox-align-center">
              <img :src="$baseUrl+'icon/box.png'" alt> 我的盒子
            </span>
            <!-- <em class="blues" v-show="!isAllBind">未绑定</em> -->
          </router-link>
          <span class="icon-arrow"></span>
        </li>
        <li class="entry">
          <router-link class="entry-left" :to="{name:'TrackList'}" tag="p">
            <img :src="$baseUrl+'icon/trip.png'" alt> 行车轨迹
          </router-link>
          <span class="icon-arrow"></span>
        </li>

        <li class="entry">
          <router-link class="entry-left" :to="{name:'CarTest'}" tag="p">
            <img :src="$baseUrl+'icon/check.png'" alt>车况检测
          </router-link>
          <span class="icon-arrow"></span>
        </li>
        <li class="entry">
          <router-link class="entry-left" :to="{name:'CarLocation'}" tag="p">
            <img :src="$baseUrl+'icon/location.png'" alt>实时位置
          </router-link>
          <span class="icon-arrow"></span>
        </li>

        <li class="entry">
          <router-link class="entry-left" :to="{name:'Setting'}" tag="p">
            <img :src="$baseUrl+'icon/setting.png'" alt>设置
          </router-link>
          <span class="icon-arrow"></span>
        </li>
      </ul>
    </div>
    <!-- <div class="btn-box" v-if="userInfo.headImgUrl">
      <button class="sign-up-btn" @click="unBind">解绑微信</button>
    </div>-->
    <InviteModal v-if="inviteInfo.inviteStatus" @onClick="goToReservationInvite"></InviteModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InviteModal from "../reservation/invite/components/InviteModal";
import { storage, session, cookie } from "@/utils/browser";
export default {
  components: {
    InviteModal
  },
  computed: {
    ...mapGetters(["userId", "userInfo", "userPhone"]),
    ...mapGetters({
      inviteInfo: "INVITE_INFO"
    }),
    // 续期到期时间
    expireDate() {
      const expireDate = this.userInfo.expireDate;
      if (expireDate) {
        const [year, month, day] = expireDate.split("-");
        return `${year}年${month}月${day}日`;
      }
    },
    defaultAvatar() {
      return this.$baseUrl + "icon/default_avatar.png";
    }
  },

  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      const params = {
        platUserId: this.userId
      };
      this.$http.getUserInfo(params).then(res => {
        if (res.data.respcode == "00") {
          this.$store.commit("setUserInfo", res.data);
        } else {
          this.$store.commit("setUserInfo", {});
        }
      });
    },
    /**
     * @description 退出登录
     */
    logout() {
      this.$messageBox.confirm("确定要退出登录？").then(value => {
        if (value === "confirm") {
          this.$store.commit("logout");
          if (!this.userId) {
            this.$router.replace({
              name: "Transfer"
            });
          } else {
            this.$toast("退出失败");
          }
        }
      });
    },
    goToReservationInvite() {
      window.location.href = `${window.location.origin}${
        this.$baseUrl
      }reservation/invite`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.mine {
  padding-bottom: 180px;
  background-color: #f5f5f5;
  .btn-box {
    margin-top: 100px;
    text-align: center;
  }
}
.user-card-container {
  padding-top: 55px;
  padding-bottom: 78px;
  text-align: center;
  color: #fff;
  background: url($baseUrl+"images/bj.png") no-repeat center center/cover;
  .card-content {
    position: relative;
  }

  .avatar {
    width: 106px;
    height: 106px;
    margin-bottom: 14px;
    border-radius: 50%;
  }
  .email {
    position: absolute;
    top: 39px;
    right: 33px;
    font-size: 40px;
  }
  .nick {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    .bill-entry {
      position: absolute;
      right: 0;
      // height: 49px;
      padding: 12px 8px;
      font-size: 24px;
      color: #ff9346;
      background-color: #fff577;
      border-radius: 30px 0px 0px 30px;
    }
    .iconfont {
      margin-right: 4px;
      font-size: 30px;
    }
  }
  .renewal {
    a {
      display: inline-block;
      font-size: 24px;
      color: #fff577;
      margin: 20px;
      border-radius: 45px;
    }
    time {
      display: block;
      /*font-size: 24px;*/
      color: #fff577;
      font-size: 21px;
    }
  }
}
.menu-invite {
  margin: -34px 20px 30px;
  height: 135px;
  padding: 0;
  position: relative;
  .mark {
    padding: 0 50px;
    position: absolute;
    top: 22px;
    left: -42px;
    transform: rotate(-45deg);
    background: linear-gradient(90deg, #fe896e 0%, #ff4849 100%);
    font-size: 18px;
    text-align: center;
    color: #fff;
    line-height: 30px;
  }
  .red-packet {
    width: 166px;
    height: 93px;
    position: absolute;
    bottom: 0;
    right: 110px;
  }
  .menu-invite-left {
    display: flex;
    flex-flow: column;
    flex-grow: 1;
    margin-left: 85px;
  }
  .invite-top {
    line-height: 60px;
  }
  .invite-bottom {
    font-size: 20px;
    line-height: 30px;
  }
}

.menu-container {
  /* margin-top: -34px; */
  padding: 0 20px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 18px;
  }
  ul {
    border-radius: 8px;
    background-color: #fff;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        width: 100%;
        height: 130px;
        padding: 0 25px;
      }
      .entry-left {
        display: flex;
        align-items: center;
        & em {
          margin-right: 30px;
        }
      }
    }
  }
}
.icon-arrow {
  margin-right: 47px;
  @include icon(15, 28, "icon/you2.png");
}
</style>
