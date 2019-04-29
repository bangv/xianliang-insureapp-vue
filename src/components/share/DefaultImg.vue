<template>
  <div class="ins-default-img insure-flexbox insure-flexbox-column insure-flexbox-align-center">
    <!--<div class="default-img" :style="{ background: 'url('+url+')' }"></div>-->
    <img :src="$baseUrl+'images/default.png'" alt="暂无数据">
    <div class="ins-default-txt">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "DefaultImg",
  props: {
    // url: String,
    text: String
  },
  data() {
    return {};
  },
  methods: {
    // 设置 默认图
    // handleDefault() {
    //   if (!this.url) {
    //     return this.url= '../../../static/images/default.png';
    //   }
    // }
  },
  mounted() {
    // this.handleDefault();
  }
};
</script>

<style lang="scss" scoped>
.ins-default-img {
  width: 100%;
  text-align: center;
  padding-top: 150px;
  padding-bottom: 50px;
  img {
    width: 40%;
  }
  .default-img {
    width: 210px;
    height: 210px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
  .ins-default-txt {
    font-size: 32px;
    color: #9d9d9d;
    padding-top: 100px;
  }
}
</style>
