<template>
  <div id="guide">
    <div class="content">
      <img :src="$baseUrl+'images/xingshizheng.jpg'" alt>
    </div>
    <button @click="close">关闭</button>
  </div>
</template>

<script>
export default {
  name: "Guide",
  methods: {
    close() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
#guide {
  padding: 30px 20px 0 20px;
  .content {
    padding: 30px 40px;
    text-align: center;
    background-color: #fff;
  }
  button {
    width: 100%;
    height: 80px;
    margin-top: 80px;
    font-size: 36px;
    color: #fff;
    background-image: linear-gradient(0deg, #22aefe 0%, #007aff 100%);
    border-radius: 40px;
  }
}
</style>
