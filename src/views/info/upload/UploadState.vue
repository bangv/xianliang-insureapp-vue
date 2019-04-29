<template>
  <div class="upload-state-wrap">
    <div class="upload-state">

      <div class="state-msg" v-if="$route.query.state">
        <img :src="`${baseUrl}images/upload_success.png`" alt="上传成功">
        <h2>您好，上传成功</h2>
        <p>请耐心等待工作人员联系，如您有疑问</p>
        <p>请拨打客服电话：<a href="tel:400-9898-988" class="blues">400-9898-988</a></p>
        <p class="insure-flexbox insure-flexbox-content-center" v-if="$route.query.type == 1">
          <router-link  class="re-upload-btn" :to="businessParams.platUserId? {name:'BusinessOrderList',query:{tab:'CompletedOrder'} }: {name:'OrderList',query:{tab:'UnCompletedOrder'} }">查看订单列表</router-link>
        </p>
        <!--<p class="insure-flexbox insure-flexbox-content-center" v-else >-->
          <!--<router-link  class="re-upload-btn" :to="{name:'Info',query:{ linceNo: $route.query.linceNo, regionCode: $route.query.regionCode} }">返回完善信息</router-link>-->
        <!--</p>-->
      </div>

      <div class="state-msg " v-if="!$route.query.state">
        <img :src="`${baseUrl}images/upload_defeate.png`" alt="上传失败">
        <h2>抱歉，上传失败！</h2>
        <p class="insure-flexbox insure-flexbox-content-center">
          <router-link v-if="$route.query.type == 1" class="re-upload-btn" :to="{name:'UploadMultiple'}">重新上传</router-link>
          <router-link v-else class="re-upload-btn" :to="{name:'Upload'}">重新上传</router-link>
        </p>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'UploadState',
  computed: {
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.upload-state-wrap {
  width: 100%;
}
.upload-state {
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
    margin-bottom: 40px;
  }
  p {
    font-size: 24px;
    line-height: 48px;
    color: #9d9d9d;
  }
}
.state-msg {
  width: 100%;
  .re-upload-btn {
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
