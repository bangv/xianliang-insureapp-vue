<template>
  <div id="device-active">
    <img :src="$baseUrl+'images/quote/thumb-up.png'" alt class="thumb-up">
    <p>大功告成，还差最后一步</p>
    <img :src="$baseUrl+'images/active-guide.png'" alt>
    <router-link class="sign-up-btn" :to="{name:'BindDevice'}">GO</router-link>
  </div>
</template>
<script>
export default {
  methods: {
    goToActivePage() {
      this.$router.push({
        name: "DeviceActive"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#device-active {
  padding-top: 90px;
  padding-bottom: 106px;

  text-align: center;
  .thumb-up {
    width: 285px;
    height: 239px;
  }
  p {
    margin-top: 36px;
    margin-bottom: 80px;
    font-size: 36px;
    color: #1b1b1b;
  }
  .sign-up-btn {
    display: inline-block;
    margin-top: 120px;
  }
}
</style>
