<template>
  <div class="vipcn-wrap">
    <div class="vipcn-top">
      <img
        :src="$baseUrl+'images/reserve/QR_Code.jpg'"
        alt="天天车保二维码"
      >
      <h2>如您想查看更多信息或服务，<br>
        请长按识别图中二维码 <br>
        关注“天天车保”微信公众号
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vipcn-wrap {
  width: 100%;
}
.vipcn-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 300px 0 60px;
  img {
    width: 360px;
    height: 360px;
  }
  h2 {
    margin-top: 60px;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
  }
}
</style>
