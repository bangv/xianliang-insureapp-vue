<template>
  <div class="content">
    <div class="rocket">
      <img :src="`${baseUrl}/images/rocket.png`" alt="">
    </div>

    <div class="text">
      <h3>功能升级中</h3>
      <p>亲爱的用户：我们正在对平台功能进行升级。</p>
      <p>升级期间暂时无法访问。给您带来的不便，敬请谅解。</p>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.content {
  padding-top: 90px;
  .rocket {
    text-align: center;
    img {
      display: inline-block;
      width: 337px;
      height: 266px;
      margin-right: -50px;
    }
  }
  .text {
    text-align: center;
    h3 {
      margin-top: 54px;
      margin-bottom: 32px;
      font-size: 36px;
      color: #0e0e0e;
    }
    p {
      margin-bottom: 10px;
      font-size: 24px;
      color: #838383;
    }
  }
}
</style>
