<template>
  <div class="step3">
    <div class="device-status">
      <div class="img-wrap">
        <img :src="`${baseUrl}images/upload_success.png`" alt="">
      </div>
      <h2>恭喜您，硬件激活成功，<br> 您可以无忧享受天天车保的服务了！
      </h2>
      <button type="button" class="sign-up-btn" @click="goToDevice">我的盒子</button>
      <button type="button" class="sign-up-btn back-btn" @click="goToHome">返回个人中心</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step3',
  components: {},
  data() {
    return {
      state: {}
    }
  },
  methods: {
    // 跳转至 设备绑定页面
    goToDevice() {
      this.$router.push({ name: 'DeviceMy' })
    },
    // 跳转至 首页
    goToHome() {
      this.$router.push({ name: 'mine' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.device-status {
  text-align: center;
  .img-wrap {
    padding: 100px 0 20px;
    img {
      width: 50%;
    }
  }
}

button {
  margin-top: 60px;
}
.back-btn {
  background: #fff;
  border: 1px solid #007aff;
  color: #007aff;
}
h2 {
  margin: 60px 0;
  font-size: 36px;
  line-height: 60px;
}
p {
  font-size: 22px;
  line-height: 36px;
}
</style>
