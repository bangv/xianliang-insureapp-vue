<template>
  <Modal @hide="hideModal">
    <div class="confirm-date-wrap">
      <div id="qrcode-photo"  ></div>
    </div>

  </Modal>
</template>

<script>
  import { cookie } from '@/utils/browser'
  import { insure } from '@/utils/insure'
  import { mapGetters } from "vuex";
  export default {
    name: "QrCodePhotoModal",
    props:['linceNo'],
    computed: {
      ...mapGetters({
        salesPhone: "salesPhone"
      }),
      businessParams() {
        return this.$store.getters.businessParams;
      }
    },
    data() {
      return {
        shortUrl:'' // 压缩链接
      }
    },
    created() {
      this.getShortUrl();
    },
    methods: {
      // 稀释 二维码密度，更清晰
      getShortUrl() {
        const salesPhone = this.salesPhone;
        const linceNo = encodeURI(this.linceNo);
        const serialNo = this.businessParams.serialNo
        const params = {
          url:  window.location.origin+process.env.BASE_URL+`quote/confirm?salesPhone=${salesPhone}&linceNo=${linceNo}&serialNo=${serialNo}`,
          // url:`https://www.meirichexian.com/insureapp/quote/confirm?salesPhone=${userId}&linceNo=${linceNo}&serialNo=${serialNo}`,
        }
        this.$http.getShortUrl(params).then(res => {
          this.shortUrl = res.data.shorturl;

          const param = {
            element: `qrcode-photo`, // 生成二维码的元素ID
            shortUrl: `${this.shortUrl}`, // 二维码链接
            width: 300, // 二维码宽
            height: 300 // 高度
          };
          insure.setQpCode(param);

        })
      },
      hideModal() {
        this.$emit('hide')
      }
    }
  }
</script>

<style scoped>
  .confirm-date-wrap {
    width: 500px;
    height: 500px;
    padding: 15px;
    margin: auto;
    overflow: hidden;
    background-color: #fff;
  }

</style>
