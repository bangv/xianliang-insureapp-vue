<template>
  <Modal @hide="hideModal">
    <div class="photo ins-center">
      <img :src="$baseUrl+'images/invite/invite_modal.png'">
      <p class="invite-btn insure-btn" @click="goToReservationInvite">查看详情</p>
      <em class="iconfont close-btn" @click="hideModal">&#xe627;</em>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "@/components/modal/Modal";

export default {
  name: "InviteModal",
  components: {
    Modal
  },
  computed: {
    ...mapGetters({
      inviteStatus: "INVITE_INFO"
    })
  },

  methods: {
    // 关闭modal
    hideModal() {
      this.$store.commit("SET_INVITE_STATUS", { inviteStatus: false });
    },
    goToReservationInvite() {
      this.hideModal();
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.photo {
  width: 100%;
  position: relative;
  img {
    width: 550px;
  }
}
.close-btn {
  display: inline-block;
  padding: 10px;
  position: absolute;
  bottom: -80px;
  font-size: 60px;
  color: #fff;
}
.invite-btn {
  position: absolute;
  bottom: 60px;
  z-index: 9;
  padding: 0 80px;
  height: 60px;
  border-radius: 30px;
  line-height: 60px;
  font-size: 30px;
  color: #fff;
  background: linear-gradient(to left, #007aff, #22aefe);
}
</style>
