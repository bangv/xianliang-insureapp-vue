<template>
  <div class="quotation-status-wrap">

    <div class="quotation-status" v-if="result == '00'" >

      <div class="quo-status-top quo-img" >
        <div id="qrcode" ref="qrcode" ></div>
      </div>

      <div class="quo-status-center">
        <h2 >恭喜您，{{linceNo}} &nbsp;
          预约成功！</h2>
      </div>
      <div class="quo-hint-qrcode border-top-scaleY" >
        <p>
          温馨提示：请引导客户使用微信扫一扫，<br> 扫描上方二维码<br>
          进入相应页面完成剩下流程
        </p>
      </div>

      <div class="quo-hint ins-center">
        <p class="grays ">如有疑问，请联系天天车保客服热线：<a href="tel:400-9898-988" class="blues">400-9898-988</a></p>
      </div>

    </div>

    <div class="quotation-status" v-else >

      <div class="quo-status-top quo-img" >
        <img class="" :src="`${baseUrl}images/upload_defeate.png`" alt="提交失败" >
      </div>

      <div class="quo-status-center">
        <h2 >抱歉，{{linceNo}}
          报价提交失败！</h2>
      </div>

      <div class="quo-status-bottom" >
        <button class="sign-up-btn" @click="goToReservation">重新预约</button>
      </div>

      <div class="quo-hint ins-center">
        <p class="grays ">如有疑问，请联系天天车保客服热线：<a href="tel:400-9898-988" class="blues">400-9898-988</a></p>
      </div>

    </div>

  </div>

</template>

<script>
  import { insure } from '@/utils/insure'

  export default {
    name: "QuotationStatus",
    data() {
      return {
        result: null,
        linceNo: '',
        shortUrl: '' // 二维码简化版 链接
      }
    },

    created() {
      this.result= this.$route.query.result;
      this.linceNo= this.$route.query.linceNo;
      if (this.linceNo) {
        this.getShortUrl()
      }
    },

    methods: {

      goToReservation() {
        this.$router.push({
          name: 'Reservation',
        })
      },

      // 稀释 二维码密度，简化链接
      getShortUrl() {
        const appointId = this.$route.query.appointId;
        const linceNo = encodeURI(this.linceNo);
        const params = {
          // url:`https://test1.meirichexian.com/insureapp/quote/reservation/address?appointId=${appointId}&linceNo=${linceNo}`,
          url: window.location.origin+this.$baseUrl+`reservation/address?appointId=${appointId}&linceNo=${linceNo}`,
        }
        this.$http.getShortUrl(params).then(res => {
          this.shortUrl = res.data.shorturl;

          const param = {
            element: `qrcode`, // 生成二维码的元素ID
            shortUrl: `${this.shortUrl}`, // 简化二维码链接
            width: 180, // 二维码宽
            height: 180 // 高度
          };
          insure.setQpCode(param);
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/style/variables.scss';
  .quotation-status-wrap{
    width: 100%;
    height: 100%;
    position: fixed;
    overflow-y: scroll;
    background: #f3f3f3;
  }
  .quotation-status{
    padding: 0 55px;
  }

  .quo-status-top{
    width: 100%;
    height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      display: block;
      width: 60%;
    }
  }

  .quo-status-center{
    margin-top: -70px;
    font-size: 24px;
    line-height: 40px;
    .quo-prompt{
      margin: 20px 0;
      line-height: 45px;
    }
    h2{
      margin: 20px 0;
      font-size: 40px;
      line-height: 80px;
      text-align: center;
    }

    .icon-dot{
      display: block;
      width: 22px;
      height: 22px;
      margin-right: 20px;
      border-radius: 50%;
      background: #9d9d9d;
    }

  }
  .quo-hint-qrcode {
    padding: 50px 0 0;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    color: #9d9d9d;
  }
  .txt-center{
    color: #9d9d9d;
    text-align: center;
  }
  .quo-status-bottom{
    margin-top: 80px;
    button{
      margin-bottom: 50px;
    }
    .sign-up-btn{
      width: 100%;
    }
    .back-btn{
      background: #fff;
      border: 1px solid #007aff;
      color: #007aff;
    }

  }
  .quo-img {
    margin: 100px 0 60px;
  }
  .quo-hint {
    position: absolute;
    bottom: 30px;
    font-size: 20px;
    text-align: center;
  }

</style>
