<template>
  <Modal @hide="closeModal">
    <div id="hint-wrap">

      <div class="hint-conent insure-card">
        <h1 class="">提示 </h1>
        <!--<em class="icon-close"></em>-->
        <p>保险公司规定距离保险截止日的90天（部分地区60天）内出本年报价；您可设置到期提醒，我们的客服专员会提前跟您联络投保事宜。
        </p>
        <div class="insure-btn-wrap">
          <button class="insure-btn" @click="closeModal">我知道了</button>
        </div>
      </div>
    </div>

  </Modal>

</template>

<script>
import Modal from '@/components/modal/Modal'
export default {
  name: 'HintModal',
  components: {
    Modal
  },
  methods: {
    closeModal() {
      this.$parent.state.showHint=false
      // this.$emit('hide')
      // this.$store.commit('SET_MODAL_STATE', false);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
#hint-wrap {
  margin: auto;
  width: 80%;
}
.hint-conent {
  width: 100%;
  padding: 30px 20px 20px;
  font-size: 20px;
  line-height: 36px;
  background-color: #fff;
  box-shadow: none !important;
  h1 {
    border-bottom: solid 1px #95cdfe;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    /*position: relative;*/
  }
  p {
    line-height: 40px;
    font-size: 24px;
  }
  .icon-close {
    position: absolute;
    top: 0;
    right: 0;
    @include icon(30, 30, 'icon/close.png');
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
}
</style>
