<template>
  <TipModal @hide="closeModal" title="说明">
    <div class="content-text">
      交强险、车船税是国家法律规定实行的强制保险制度，和商业险按天扣费有所不同，为一次性支付，如有疑问，请联系客服：
      <a class="blues" href="tel:400-9898-988">400-9898-988</a>
    </div>
  </TipModal>
</template>

<script>
import TipModal from '@/components/modal/TipModal'
export default {
  name: 'DeductionModal',
  components: {
    TipModal
  },
  methods: {
    // 关闭modal
    closeModal() {
      // this.$emit('hide')
      this.$parent.showDeductionModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.content-text {
  padding: 38px 44px 0 44px;
  line-height: 50px;
  font-size: 24px;
  // text-align: center;
}
</style>
