<template>
    <div id="confirm-button">
      <div class="protocol">
        <div class="checkbox">
          <input
            type="checkbox"
            id="protocol-checkbox"
            :disabled="disabled"
            v-model="state.isAgreeProtocol"
          />
          <label for="protocol-checkbox"></label>
        </div>
        我已阅读并同意
        <router-link
          class="blues"
          :to="{name:'Protocol'}"
        >《天天车保用户服务协议》</router-link>
      </div>

      <div class="btn-box">
        <button
          class="sign-up-btn"
          :disabled="!state.isAgreeProtocol"
          @click="formValidate"
        >{{text}}</button>
      </div>

    </div>
</template>

<script>
    export default {
      name: "ConfirmButton",
      props: {
        text: {
          type: String,
          default: "提交"
        },
        disabled: false,
      },
      data() {
          return  {
            state: {
              isAgreeProtocol:false
            }
          }
      },
      methods: {
        /**
         * @description 触发父组件传来的方法
         * @params
         * */
        formValidate(){
          this.$emit('change');    //触发$emit绑定的change方法
        },

      }
    }
</script>

<style lang="scss" scoped>
#confirm-button {
  /*协议*/
  .protocol {
    display: flex;
    align-items: center;
    margin: 50px 0;
    .checkbox {
      position: relative;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
      border: solid 1px #007aff;
    }
    label {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
    input {
      appearance: none;
      background-color: transparent;
    }
    input:checked + label {
      background: #007aff;
    }
  }

  .btn-box {
    text-align: center;
  }
  .confirm-btn {
    width: 90%;
    border-radius: 40px;
    height: 80px;
    margin-top: 20px;
    font-size: 28px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;
    &[disabled] {
      background: #d2d2d2;
    }
  }
}

</style>
