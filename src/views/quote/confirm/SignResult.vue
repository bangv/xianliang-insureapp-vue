<template>
  <div class="sign-state-wrap">
    <div class="sign-state">

      <div class="state-msg">
        <img :src="`${baseUrl}images/upload_success.png`" alt="上传成功">
        <h2>恭喜，您已签约成功！</h2>
        <div class="btn-wrap">
          <router-link :to="{name:'OrderList', query: {tab: 'UnCompletedOrder'}}" class="sign-up-btn">查看订单</router-link>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'SignResult'
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.sign-state-wrap {
  width: 100%;
}
.sign-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    width: 50%;
    margin: 200px 0 60px;
  }
  h2 {
    font-size: 36px;
    margin: 40px 0;
  }
  p {
    font-size: 24px;
    line-height: 48px;
    color: #9d9d9d;
  }
  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .sign-up-btn {
      display: block;
      width: 70%;
    }
  }
}
.state-msg {
  width: 100%;
  .re-sign-btn {
    display: block;
    width: 80%;
    height: 94px;
    margin-top: 90px;
    border-radius: 57px;
    line-height: 94px;
    background: linear-gradient(to left, #007aff, #22aefe);
    color: #fff;
    font-size: 40px;
  }
}
</style>
