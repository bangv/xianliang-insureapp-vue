<template>
  <div class="invite-wrap">
    <div class="banner">
      <img :src="$baseUrl+'images/reservation/share.jpg'" alt class="banner">
      <div class="mask flex flex-ai-c">
        <i class="iconfont">&#xe7b3;</i>
        <transition class="invited-name-list" name="slide" mode="out-in">
          <p class :key="invitee.id">{{invitee.val}}完成邀请，获得50元现金奖励！</p>
        </transition>
      </div>
    </div>

    <div class="pannel-card">
      <div class="card-header flex flex-jc-b">
        <h2>邀请记录</h2>
        <p class="insure-btn ins-align" @click="state.showInviteGuideModal=true">
          <i class="iconfont">&#xe7fe;</i>
          <span>活动攻略</span>
        </p>
      </div>
      <div class="user-wrap">
        <ul class="user-list" v-if="userList.length>0">
          <li v-for="(item,index) in userList" :key="index" @click="getRewardProcess(item,index)">
            <img :src="item.headImgUrl" alt>
            <p class="text-ellipsis" :class="{'active':user.index===index}">{{item.nickname}}</p>
          </li>
        </ul>
        <div class="missing-data" v-else>
          <p>空空如也，还不赶紧去邀请~</p>
          <InviteProgress :car="{status:0}"></InviteProgress>
        </div>
      </div>

      <div class="car-list" v-if="carList.length>0">
        <div class="item" v-for="(item,index) in carList" :key="index">
          <p class="licenNo">{{item.licenNo | handleStr(2,2)}}</p>
          <InviteProgress :car="item" @receive="receiveGift($event)"></InviteProgress>
        </div>
      </div>

      <div class="tips">温馨提醒：好友服务生效后即可获得奖励</div>
    </div>

    <div class="btn-box">
      <button class="sign-up-btn" @click="handleInvite">立即邀请</button>
      <p>
        如您有任何疑问，请咨询客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>
    </div>
    <AliPayFormModal
      v-show="state.showAliPayFormModal"
      :orderId="car.orderId"
      @reload="getInvitedListByInviterId"
    ></AliPayFormModal>
    <InviteTipModal v-show="state.showInviteTipModal"></InviteTipModal>
    <InviteGuideModal v-show="state.showInviteGuideModal"></InviteGuideModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { wechat } from "@/utils/wechat";
import { ua, session } from "@/utils/browser";
import InviteProgress from "./components/InviteProgress";
import AliPayFormModal from "./components/AliPayFormModal";
import InviteTipModal from "./components/InviteTipModal";
import InviteGuideModal from "./components/InviteGuideModal";
import wx from "weixin-jsapi";

export default {
  components: {
    InviteProgress,
    AliPayFormModal,
    InviteTipModal,
    InviteGuideModal
  },
  computed: {
    ...mapGetters(["userId", "userInfo"]),
    isWeChat() {
      return ua.isWeChat;
    },
    invitee() {
      return {
        id: this.inviteeNo,
        val: this.invitedName[this.inviteeNo]
      };
    }
  },

  data() {
    return {
      userList: [],
      carList: [],
      user: {
        index: 0
      },
      car: {
        licenNo: "",
        status: "",
        orderId: ""
      },
      state: {
        showAliPayFormModal: false,
        showInviteTipModal: false,
        showInviteGuideModal: false
      },
      inviteeNo: 0,
      invitedName: [
        "郭大帅",
        "Sunshine",
        "Alice栗子~",
        "Ethan飞",
        "趙  伟",
        "方暗",
        "马小歌",
        "如也",
        "吴长建先生",
        "Betago",
        "lenka",
        "左沛源",
        "钊阳",
        "嗨,树先生",
        "蔚蓝色记忆。",
        "Shirley_li",
        "森先三",
        "钟鹏",
        "Coco",
        "Demon」斌",
        "冯宝宝BIBI",
        "It's raining.",
        "Mr_白马",
        "苏绿。",
        "Tedious。",
        "Kylo",
        "Wesley",
        "菲尔Baby",
        "Andrea琪",
        "深一大叔",
        "Edwin滨",
        "杉木成荫",
        "Derrick.",
        "慕桐呀",
        "Bobby",
        "A、铁打的汉子",
        "Missdouble L",
        "Moonぃ",
        "Owen๛亮",
        "布兰妮",
        "Scott~森",
        "Nicole",
        "拿铁昵"
      ]
    };
  },

  mounted() {
    if (!ua.isiOS) {
      wechat.configJsSdk(window.location.href.split("#")[0]);
    }
    wx.ready(() => {
      this.invite();
    });
    this.getInvitedListByInviterId();
    this.startMove();
  },
  methods: {
    handleInvite() {
      if (!ua.isWeChat) {
        this.$toast("请在微信浏览器完成分享");
      } else {
        this.state.showInviteTipModal = true;
      }
    },
    invite() {
      const opts = {
        title: `ta邀请你加入天天车保`,
        desc: "快来报名加入天天车保，开一天车付一天费，不开车不花钱",
        link: `${window.location.origin}${this.$baseUrl}reservation?inviterId=${
          this.userId
        }`,
        imgUrl: `${window.location.origin}/wxpage/img/yaoqingyouli01.jpg`
      };
      wechat.share(opts);
    },
    // 获取邀请记录
    getInvitedListByInviterId() {
      const params = {
        inviterId: this.userId
      };
      this.$http.getInvitedListByInviterId(params).then(res => {
        if (res.data.respcode == "00") {
          this.userList = res.data.datas;
          if (this.userList.length > 0) {
            this.getRewardProcess(this.userList[0], 0);
          }
        }
      });
    },
    // 获取进入信息
    getRewardProcess(item, index) {
      this.user.index = index;
      const params = {
        inviterId: this.userId,
        inviteeId: item.platUserId
      };
      this.$http.getRewardProcess(params).then(res => {
        const carList = res.data.datas;
        if (res.data.respcode == "00" && carList.length > 0) {
          this.car.licenNo = carList[0].licenNo;
          this.car.status = carList[0].status;
          this.carList = carList;
        }
      });
    },
    // 领取奖励
    receiveGift(orderId) {
      this.car.orderId = orderId;
      this.state.showAliPayFormModal = true;
    },
    // 字幕条滚动
    startMove() {
      let timer = setTimeout(() => {
        if (this.inviteeNo > 40) {
          this.inviteeNo = 0;
        } else {
          this.inviteeNo += 1;
        }
        this.startMove();
      }, 4000);
    }
  }
};
</script>

<style lang="scss" scoped>
.invite-wrap {
  padding-bottom: 80px;
  .banner {
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    .mask {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding-left: 30px;
      overflow: hidden;
      font-size: 20px;
      line-height: 60px;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      .iconfont {
        margin-right: 20px;
        font-size: 28px;
      }
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-leave-to {
    transform: translateY(-60px);
  }
  .slide-enter {
    transform: translateY(30px);
  }
  .pannel-card {
    margin: 30px;

    .card-header {
      position: relative;
      margin: 0;
      padding: 0 30px 0 40px;
      border-bottom: none;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 30px;
        margin: auto;
        content: "";
        width: 5px;
        height: 15px;
        background-color: #0886ff;
      }
      h2 {
        font-size: 24px;
      }
      p {
        font-size: 20px;
        /*color: #0886ff;*/
        .iconfont {
          font-size: 20px;
          padding-right: 10px;
        }
      }
      .insure-btn {
        margin-top: 20px;
        padding: 0 30px;
        border-radius: 25px;
        height: 50px;
        line-height: 50px;
        background: linear-gradient(to left, #007aff, #22aefe);
        color: #fff;
      }
    }

    .user-list {
      // width: 1000000%;
      overflow-x: auto;
      white-space: nowrap;
      padding: 0 30px;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        display: inline-block;
        width: 90px;
        margin-right: 30px;
        text-align: center;
        color: #858585;
        &:last-of-type {
          margin-right: 0;
        }
      }
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-color: #ccc;
      }
      p {
        display: block;
        width: 100%;
        font-size: 20px;
        &.active {
          color: #0886ff;
        }
      }
    }
    .car-list {
      .item {
        margin: 30px 0 50px 0;
        p {
          padding-left: 30px;
        }
      }
      .licenNo {
        margin-bottom: 20px;
        font-size: 24px;
      }
    }
    .tips {
      margin: 0 30px;
      padding: 30px 0;
      font-size: 20px;
      text-align: center;
      color: #858585;
      border-top: 1px solid #efeff4;
    }
  }
  .missing-data {
    padding-top: 100px;
    padding-bottom: 30px;
    text-align: center;
    font-size: 22px;
    color: #858585;
    p {
      padding-bottom: 100px;
    }
  }
  .btn-box {
    text-align: center;
    button {
      margin: 30px 0;
    }
    p {
      font-size: 20px;
      color: #b5b5b5;
    }
  }
}
</style>
