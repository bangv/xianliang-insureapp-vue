<template>
  <TipModal @hide="closeModal" title="设备说明">
    <div class="serve-protocol-wrap">
      <div class="serve-protocol ">
        <p>
          因数盒子车载智能终端 是天天车保专用设备，配合按天计费使用，车主使用盒子需支付盒子押金，押金扣款成功后，会将盒子寄出。
        </p>
        <p>
          车主收到盒子后，请扫描盒子上的二维码根据指引完成激活绑定操作，以便完成出保，服务到期后押金会如数退回。
        </p>
        <p>
          如有其它疑问，请咨询客服热线：
          <a href="tel:400-9898-988" class="blues">400-9898-988</a>
        </p>
      </div>
    </div>
  </TipModal>
</template>

<script>
import TipModal from '@/components/modal/TipModal'
export default {
  name: 'DeviceIntroModal',
  components: {
    TipModal
  },
  methods: {
    // 关闭modal
    closeModal() {
      this.$parent.showOrderRule = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.serve-protocol-wrap {
  // margin: auto 25px;
  padding: 20px;
  background-color: #fff;
}
.protocol-border {
  line-height: 60px;
  border-bottom: solid 1px #95cdfe;
  margin-bottom: 20px;
}
.serve-protocol {
  width: 100%;
  padding: 0 10px;
  font-size: 26px;
  line-height: 45px;
  text-align: justify;
  h2 {
    font-weight: bold;
    font-size: 32px;
    text-align: center;
  }
  h3 {
    font-weight: bold;
  }
  p {
  }
}
.insure-btn-wrap {
  display: flex;
  justify-content: center;
  padding: 30px 0 10px;
}
.insure-btn {
  width: 50%;
  border-radius: 28px;
  height: 56px;
  background: linear-gradient(to left, #007aff, #22aefe);
  color: #fff;
  font-size: 30px;
  &[disabled] {
    background: #d5d5d5;
  }
}
</style>
