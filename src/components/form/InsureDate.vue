<template>
  <!-- <div id="date" :class="{'placeholder':currentValue==''}">
    <input type="date" :placeholder="placeholder" v-model="currentValue" @change="handlePick">
  </div> -->

  <label :for="id" class="insure-date">
    <!-- <span :class="{'placeholder':!currentValue}"> {{currentValue?currentValue:placeholder}}</span> -->
    <span class="placeholder" v-show="!currentValue">{{placeholder}}</span>
    <input  :id="id" type="date" v-model="currentValue" @change="handlePick">
  </label>

</template>

<script>
export default {
  name: 'InsureDate',
  props: {
    id: String, // id
    value: String, // 值
    placeholder: String // 占位文本
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handlePick(e) {
      this.currentValue = e.target.value
    }
  }
}
</script>

<style lang="scss" >
@import '@/assets/style/variables.scss';

.insure-date {
   position: relative;
   flex: 1;
  span {
    color: #666;
  }
  .placeholder {
    text-align: right !important;
    color: #a9a9a9;
  }

  input {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 80px;

    margin: auto;
    // z-index: -1;
    text-align: right;
    // color: transparent;
    font-size: 26px;
    color: #666;
    background-color: transparent;
  }
}
// .placeholder {
//   input::after {
//     content: attr(placeholder);
//     font-size: 26px;
//     color: #a9a9a9;
//     background-color: #fff;
//   }
// }
</style>
