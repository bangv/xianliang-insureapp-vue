<template>
  <div class="content">
    <img :src="$baseUrl+'images/404.png'" alt>
    <h1 style="text-align:center;">Oops，该页面丢失！</h1>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding-top: 156px;
  text-align: center;
  color: #818181;
  h1 {
    font-size: 25px;
  }
  img {
    width: 329px;
  }
}
</style>
