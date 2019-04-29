<template>
  <div class="quotation-status-wrap">
    <div class="quotation-status">
      <div class="img-wrap">
        <img :src="$baseUrl+'images/upload_success.png'" alt>
      </div>
      <div class="quo-status-center">
        <h2>恭喜您，预约信息提交成功</h2>
      </div>

      <div class="vipcn-wrap">
        <img :src="$baseUrl+'images/reserve/QR_Code.jpg'" alt="天天车保二维码">
        <h2>如您想查看更多信息或服务，
          <br>请长按识别图中二维码
          <br>关注“天天车保”微信公众号
        </h2>
      </div>
    </div>

    <div class="quo-hint ins-center">
      <p class="grays">如有疑问，请联系天天车保客服热线：
        <a href="tel:400-9898-988" class="blues">400-9898-988</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

.quotation-status-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  background: #f3f3f3;
  .img-wrap {
    padding: 150px 0;
    text-align: center;
    img {
      width: 60%;
    }
  }

  .vipcn-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0 60px;
    img {
      width: 260px;
      height: 260px;
    }
    h2 {
      margin-top: 40px;
      font-size: 24px;
      line-height: 45px;
      text-align: center;
      /*font-weight: bold;*/
    }
  }
}
.quotation-status {
  padding: 0 55px;
}

.quo-status-top {
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quo-status-center {
  margin-top: -70px;
  font-size: 24px;
  line-height: 40px;
  .quo-prompt {
    margin: 20px 0;
    line-height: 45px;
  }
  h2 {
    margin: 20px 0;
    font-size: 40px;
    line-height: 80px;
    text-align: center;
  }

  .icon-dot {
    display: block;
    width: 22px;
    height: 22px;
    margin-right: 20px;
    border-radius: 50%;
    background: #9d9d9d;
  }
}

.txt-center {
  color: #9d9d9d;
  text-align: center;
}
.quo-status-bottom {
  margin-top: 80px;
  button {
    margin-bottom: 50px;
  }
  .sign-up-btn {
    width: 100%;
  }
  .back-btn {
    background: #fff;
    border: 1px solid #007aff;
    color: #007aff;
  }
}
.quo-img {
  margin: 100px 0 60px;
}

.quo-hint {
  padding: 50px 0 0;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  color: #9d9d9d;
}
</style>
