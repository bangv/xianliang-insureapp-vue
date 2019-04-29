<template>
  <Modal @hide="hideModal">
    <div class="tip-modal">
      <h1 class="modal-heder" :class="{'line':line}">{{title}} </h1>
      <div class="modal-conent">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button class="insure-btn" @click="hideModal">{{btnText}}</button>
      </div>
    </div>
  </Modal>
</template>
<script>
export default {
  name: 'TipModal',
  props: {
    line: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    },
    btnText: {
      type: String,
      default: '我知道了'
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.tip-modal {
  width: 88%;
  margin: auto;
  border-radius: 8px;
  background-color: #fff;
}
.modal-heder {
  height: 88px;
  margin: 0 30px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 88px;
  &.line {
    border-bottom: 1px solid #95cdfe;
  }
}
.modal-conent {
  width: 100%;
  font-size: 20px;
  line-height: 36px;
  p {
    line-height: 50px;
    font-size: 24px;
  }
}
.modal-footer {
  margin: 60px 0;
  text-align: center;

  button {
    padding: 0 64px;
    height: 60px;
    border-radius: 30px;
    line-height: 60px;
    font-size: 30px;
    color: #fff;
    background: linear-gradient(to left, #007aff, #22aefe);
    // &[disabled] {
    //   background: #d5d5d5;
    // }
  }
}
</style>
