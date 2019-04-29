<template>
  <Modal @hide="hideModal">
    <div id="ID-confirm">
      <div class="confirm-container">
        <h3 class="title"> 请输入车主身份证后6位进行验证</h3>
        <div class="confirm-content">
          <div class="input-area">
            <label for="ID">{{numbers[0]}}</label>
            <label for="ID">{{numbers[1]}}</label>
            <label for="ID">{{numbers[2]}}</label>
            <label for="ID">{{numbers[3]}}</label>
            <label for="ID">{{numbers[4]}}</label>
            <label for="ID">{{numbers[5]}}</label>
          </div>
          <p class="error-tip" :class="{'show':isError}" v-show="isError">{{numbers.length>0?'验证失败，请输入正确的身份证后6位':'请输入身份证后6位'}}</p>
        </div>
        <div class="confirm-footer">
          <button class="btn forget" @click="hideModal">不记得了</button>
          <button class="btn next" @click="handleComplete">提交</button>
        </div>
      </div>
    </div>
    <NumericKeyboard @keyboard="handleKeyboard($event)" @backspace="handleBackspace"></NumericKeyboard>
  </Modal>
</template>

<script>
import Modal from '@/components/modal/Modal'
import NumericKeyboard from '@/components/keyboard/NumericKeyboard'
export default {
  components: {
    Modal,
    NumericKeyboard
  },
  props: {
    id: String
  },
  data() {
    return {
      numbers: '',
      defaultNum: '888888',
      isError: false,
      isNull: false
    }
  },
  methods: {
    handleKeyboard(value) {
      let numbersLength = this.numbers.length
      if (numbersLength < 6) {
        if (numbersLength < 5 && value === 'X') return // 处理字母 X
        this.numbers += value
      }
    },
    // 删除
    handleBackspace() {
      let numbers = this.numbers
      if (numbers) {
        this.numbers = numbers.substring(0, numbers.length - 1)
      }
    },
    // 验证成功进入下一步
    handleComplete() {
      // 输完后验证身份证
      const idCard = this.id
      if (this.numbers.length === 0) {
        this.isError = true
      }
      if (this.numbers.length === 6) {
        if (
          idCard.substr(-6) === this.numbers ||
          this.numbers === this.defaultNum
        ) {
          this.$emit('complete')
        } else {
          this.isError = true
        }
      }
    },
    // 隐藏
    hideModal() {
      this.numbers = ''
      this.$parent.state.showIDConfirm = false
      // this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

#ID-confirm {
  width: 750px;
  padding: 0 20px;
  margin-top: -20%;
  .modal-content {
    width: 750px;
    margin: auto;
    padding: 0 2%;
  }
  .title {
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 24px;
  }
  .confirm-container {
    border-radius: 23px;
    background-color: #fff;
  }
  .confirm-content {
    padding-top: 50px;
    margin: 0 30px 30px 30px;
    text-align: center;
    border-top: 1px solid #cecece;

    .tip {
      margin-right: 14px;
    }
    .input-area {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 30px;
    }
    label {
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin: 0 6px;
      text-align: center;
      font-size: 24px;
      border: 1px solid #ccc;
    }
    .error-tip {
      // margin-top: 30px;
      visibility: hidden;
      margin-bottom: 30px;
      text-align: center;
      font-size: 20px;
      color: #ff5400;
      &.show {
        visibility: visible;
      }
    }
  }
  .confirm-footer {
    padding-bottom: 40px;
    text-align: center;
    .btn {
      margin: 0 32px;
      padding: 16px 50px;
      border-radius: 30px;
      font-size: 24px;
      color: #fff;
    }
    .forget {
      background: linear-gradient(to left, #bbbbbb, #d0d0d0);
    }
    .next {
      background: linear-gradient(to left, #007aff, #22aefe);
    }
  }
}
</style>
