<template>
  <Modal @hide="hideModal">
    <div class="invite-guide-wrap">
      <em class="close-icon iconfont" @click="hideModal">&#xe627;</em>
      <div class="invite-guide-banner"></div>

      <div class="invite-guide-content">
        <ul class="border-bottom-scaleY">
          <li v-for="(step,index) in stepData" :key="index">
            <p class="step-top">step</p>
            <p class="step-explain ins-align">
              <em class="dot"></em>
              <strong>0{{index+1}}</strong>
              <span v-html="step.text"></span>
            </p>
            <p class="bar"></p>
          </li>
        </ul>

        <p class="invite-hint grays">本次活动奖品为50元现金，支持地区：
          <br>
          <router-link class="blues ins-center" :to="{name:'city',query: {referer:$route.name}}">
            <span>查看详情</span>
            <em class="iconfont">&#xe6dd;</em>
          </router-link>
        </p>
      </div>
    </div>
  </Modal>
</template>

<script>
import { ua } from "@/utils/browser";
import Modal from "@/components/modal/Modal";

export default {
  components: {
    Modal
  },
  computed: {
    isWeChat() {
      return ua.isWeChat;
    }
  },
  data() {
    return {
      stepData: [
        {
          text: `分享活动链接至朋友圈或微信好友`
        },
        { text: "好友点击分享链接，预约注册" },
        { text: "客服报价，服务办理，完成签约" },
        { text: "服务生效，获得奖励" }
      ]
    };
  },

  methods: {
    hideModal() {
      this.$parent.state.showInviteGuideModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 7.5%;
  right: 7.5%;
  padding: 20px;
  font-size: 36px;
  color: #9d9d9d;
}
.invite-guide-wrap {
  width: 90%;
  height: 85%;
  border-radius: 20px;
  overflow-y: auto;
  background: #fff;
  .invite-guide-banner {
    width: 100%;
    height: 800px;
    background: url($baseUrl+"images/invite/invite_guide.png") no-repeat center
      center/cover;
    /*margin-bottom: -80px;*/
  }
  .invite-guide-content {
    padding: 50px;
    ul li {
      line-height: 60px;
      font-size: 26px;
      color: #0f0f0f;
      .step-top {
        font-size: 20px;
        margin-left: 25px;
      }
      .step-explain {
        strong {
          font-size: 30px;
          color: #c7c7c7;
          margin-right: 15px;
        }
        b {
          color: #a26337;
        }
      }
      .bar {
        margin-left: 44px;
        display: block;
        width: 1px;
        height: 60px;
        background: #007aff;
      }
    }
    li:last-child .bar {
      display: none;
    }
    ul {
      padding-bottom: 50px;
    }
  }

  .dot {
    margin-right: 15px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff4949;
  }
  .invite-hint {
    margin-top: 30px;
    text-align: center;
    font-size: 24px;
    line-height: 40px;
    em {
      margin-left: 10px;
      font-size: 28px;
    }
  }
}
</style>
