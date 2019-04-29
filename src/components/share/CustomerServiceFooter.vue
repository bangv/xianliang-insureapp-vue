<template>
    <div class="customer-service ins-center">
        <a href="tel:400-9898-988" class="ins-align">
            <!-- <em class="icon-service "> </em> -->
          如您有疑问,请联系客服热线 <span class="blues">&nbsp;400-9898-988</span>
        </a>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.customer-service {
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  .icon-service {
    margin-right: 20px;
    @include icon(38, 40, 'icon/device/service.png');
  }
  a {
    color: #1c2135;
  }
}
</style>
