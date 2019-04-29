<template>
  <TipModal
    title="退款说明"
    @hide="hideModal"
  >
   <slot name="modal-content"></slot>
  </TipModal>
</template>
<script>
import TipModal from "@/components/modal/TipModal";
export default {
  components: {
    TipModal
  },
  methods: {
    hideModal() {
      this.$parent.state.showRefundDescriptionModal = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-content {
  padding: 30px;
  font-size: 22px;
  p{
    margin-top: 10px;
  }
}
</style>

