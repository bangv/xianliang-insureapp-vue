<template>
  <transition  enter-active-class="animated fadeInUp">
    <Modal @hide="hideKeyboard" background="transparent">
      <div id="abbr-keyboard">
        <ul>
          <li v-for="(item,index) in abbrs" :key="index" @click="handleKeyboard(item)">{{item}}</li>
        </ul>
      </div>
    </Modal>
  </transition>
</template>

<script>
export default {
  name: 'AbbrKeyboard',
  data() {
    return {
      abbrs: [
        '粤',
        '沪',
        '鄂',
        '湘',
        '川',
        '渝',
        '京',
        '闽',
        '晋',
        '黑',
        '津',
        '浙',
        '豫',
        '赣',
        '贵',
        '青',
        '琼',
        '宁',
        '吉',
        '蒙',
        '冀',
        '苏',
        '皖',
        '桂',
        '云',
        '陕',
        '甘',
        '藏',
        '新',
        '辽',
        '鲁'
      ]
    }
  },
  methods: {
    handleKeyboard(value) {
      this.$emit('keyboard', value)
     
    },
    handleBackspace() {
      this.$emit('backspace')
    },
    hideKeyboard() {
      this.$parent.state.showAbbrKeyboard=false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
#abbr-keyboard {
  position: fixed;
  z-index: 30;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0.05% 20px;
  background-color: #dadee1;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      display: inline-block;
      width: 8%;
      height: 76px;
      max-height: 76px;
      margin: 1.5% 1%;
      text-align: center;
      line-height: 76px;
      border-radius: 6px;
      font-size: 38px;
      box-shadow: 0px 1px 0px #9d9d9d;
      background-color: #fff;
      &.special {
        width: 23%;
        font-size: 30px;
        background-color: #c0c3ca;
      }
    }
  }
}
</style>
