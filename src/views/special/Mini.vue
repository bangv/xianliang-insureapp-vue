<template>
  <h2></h2>
</template>
<script>
export default {
  created() {
    // 小程序进来重定向到首页
    this.$router.push({
      name: "Home"
    });
  }
};
</script>
