<template>
  <div id="device-active" class="">
    <div class="step">
      <p class="line"></p>
      <ul class="insure-flexbox insure-flexbox-content-between">
        <li class="active">
          <i :class="{'active':currentStep=='BindDevice'}">1</i>
          <span>硬件绑定</span>
        </li>
        <li>
          <i :class="{'active':currentStep=='ConnectDevice'}">2</i>
          <span>安装调试</span>
        </li>
        <li>
          <i :class="{'active':currentStep=='Step3'}">3</i>
          <span>激活完成</span>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentStep: 'BindDevice'
    }
  },
  created() {
    this.currentStep = this.$route.name
  }
}
</script>
<style lang="scss" scoped>
#device-active {
  padding-top: 74px;
  padding-bottom:120px;
  .step {
    position: relative;
    margin: 0 15%;

    .line {
      position: absolute;
      left: 0;
      right: 0;
      top: 31px;
      border: 1px dotted #c2c2c2;
    }
    li {
      position: relative;
      text-align: center;
      background-color: #f5f5f5;
      i {
        display: inline-block;
        width: 62px;
        height: 62px;
        line-height: 62px;
        font-size: 30px;
        border-radius: 50%;

        color: #c2c2c2;
        background-color: #e8e8e8;
      }
      .active {
        color: #fff;
        background-image: linear-gradient(0deg, #0079ff 0%, #00afff 100%);
      }
      span {
        display: block;
        margin-top: 28px;
        font-size: 24px;
      }
    }
  }
}
</style>
