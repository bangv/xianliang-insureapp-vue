<template>
  <TipModal @hide="closeModal" title="说明">
    <div class="deduction-explain-wrap">
      <div class="modal-explain">
        <p>按照天天车保业务规则，以下事件，均属扣费:</p>
        <p>1. 车辆点火</p>
        <p>2. 车辆熄火（车辆跨天熄火）</p>
        <p>3. 设备异常拔出</p>
        <p>4. 车辆换车（设备插入车辆与行驶证车辆不符）</p>
        <p>5. 设备失联（信号不稳定，无法查找到设备）</p>
        <p>
         说明：系统每天最多发起1次扣款，如有疑问可联系天天车保客服热线:
          <a class="blues" href="tel:400-9898-988">400-9898-988</a>
        </p>
      </div>
    </div>
  </TipModal>

</template>

<script>

import TipModal from '@/components/modal/TipModal'
export default {
  name: 'DeductionExplainModal',
  components: {
    TipModal
  },
  methods: {
    // 关闭modal
    closeModal() {
      this.$parent.state.showDeductionExplainModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.deduction-explain-wrap {
  padding: 30px 50px 0 50px;
}
.modal-explain {
  font-size: 24px;
  line-height: 48px;
  p:nth-of-type(1) {
    font-weight: bold;
  }
}
</style>
