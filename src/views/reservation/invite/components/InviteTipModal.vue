<template>
  <Modal @hide="hideModal">
    <div class="tip"></div>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal";
export default {
  components: {
    Modal
  },
  methods: {
    hideModal() {
      this.$parent.state.showInviteTipModal = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.tip {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 456px;
  height: 260px;
  background: url($baseUrl+"images/invite/share.png") no-repeat center
    center/cover;
}
</style>