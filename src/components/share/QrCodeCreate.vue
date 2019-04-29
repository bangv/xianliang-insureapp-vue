<template>
    <div class="qr-code">
      <div :id="'qrcode'+index"  ></div>
    </div>
</template>

<script>
  import { cookie } from '@/utils/browser'
  import { insure } from "@/utils/insure";
  import { mapGetters } from "vuex";

    export default {
      name: "QrCodeCreate",
      props:['linceNo','index'],
      mounted () {
        this.getQpCode();
      },
      computed: {
        ...mapGetters({
          salesPhone: "salesPhone"
        }),
        businessParams() {
          return this.$store.getters.businessParams;
        }
      },
      methods: {
        /*生成二维码*/
        getQpCode () {
          const salesPhone = this.salesPhone
          const linceNo = encodeURI(this.linceNo);
          const serialNo = this.businessParams.serialNo;
          let params = {
            element: `qrcode${this.index}`, // 生成二维码的元素ID
            url: `quote/confirm?salesPhone=${salesPhone}&linceNo=${linceNo}&serialNo=${serialNo}`, // 二维码链接
            width: 80, // 二维码宽
            height: 80 // 高度
          }
          insure.setQpCode(params);

        }
      }
    }
</script>

<style scoped>

</style>
