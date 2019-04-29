<template>
  <div id="numeric-keyboard">
    <ul>
      <li v-for="(item,index) in numbers" :key="index" @click="handleKeyboard(item)" :class="{'special':item.type!=='number'}">{{item.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NumericKeyboard',
  props: ['show'],
  data() {
    return {
      numbers: [
        {
          text: 1,
          type: 'number'
        },
        {
          text: 2,
          type: 'number'
        },
        {
          text: 3,
          type: 'number'
        },
        {
          text: 4,
          type: 'number'
        },
        {
          text: 5,
          type: 'number'
        },
        {
          text: 6,
          type: 'number'
        },
        {
          text: 7,
          type: 'number'
        },
        {
          text: 8,
          type: 'number'
        },
        {
          text: 9,
          type: 'number'
        },
        {
          text: 'X',
          type: 'letter'
        },
        {
          text: 0,
          type: 'number'
        },
        {
          text: '删除',
          type: 'clear'
        }
      ]
    }
  },
  methods: {
    handleKeyboard(item) {
      if (item.type !== 'clear') {
        this.$emit('keyboard', item.text)
      } else {
        this.$emit('backspace')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
#numeric-keyboard {
  position: fixed;
  z-index: 30;
  bottom: 0;
  left: 0;
  right: 0;
  // padding: 20px 2%;
  background-color: #dadee1;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      display: inline-block;
      width: 33.1%;
      // width: 36px;
      height: 90px;
      // margin: 1%;
      text-align: center;
      line-height: 90px;
      font-size: 30px;
      border-radius: 2px;
      border-bottom: 1px solid #c0c3ca;
      border-right: 1px solid #c0c3ca;
      background-color: #ffffff;
      &.special {
        background-color: #c0c3ca;
      }
    }
  }
}
</style>
