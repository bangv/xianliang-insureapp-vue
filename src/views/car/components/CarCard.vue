<template>
  <div class="car-card">
    <div class="card-header">
      <div class="header-left">
        <em>{{car.linceNo}}</em>
        <!-- <span>设备号：{{car.deviceCode?car.deviceCode:'无'}}</span> -->
      </div>
      <div class="header-right">
        <p class="blues" v-if="car.car_change_state==1&&car.device_pullinout_state == 1">
          <img :src="$baseUrl+'icon/zhengchang.png'" alt=""> 设备正常
        </p>
        <p class="oranges" v-else>
          <img :src="$baseUrl+'icon/yichang.png'" alt="">设备异常
        </p>
      </div>
    </div>
    <ul class="card-content" v-if="car.deviceCode">
      <li>
        <img :src="$baseUrl+'icon/charu.png'" alt="">
        <span v-if="car.device_pullinout_state==1">盒子插入</span>
        <span v-else class="oranges">盒子拔出</span>
      </li>
      <!-- <li>
        <img :src="$baseUrl+'icon/connect.png'" alt="">
        <span v-if="car.car_datalink_state==1">连接成功</span>
        <span v-else class="oranges">连接失败</span>
      </li> -->
      <li>
        <img :src="$baseUrl+'icon/huanche.png'" alt="">
        <span v-if="car.car_change_state==1">未换车</span>
        <span v-else class="oranges">已换车</span>
      </li>
    </ul>
    <p v-else class="tip">暂无设备数据</p>
  </div>
</template>
<script>
export default {
  props: {
    car: Object
  }
}
</script>
<style lang="scss" scoped>
.car-card {
  padding: 0 35px;
  border-radius: 10px;
  font-size: 24px;
  background-color: #fff;
  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 38px 0;
    border-bottom: 1px solid #e5e5e5;
    em {
      margin-right: 30px;
    }
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    p {
      display: flex;
      align-items: center;
    }
  }
  .card-content {
    display: flex;
    padding: 43px 0;
    li {
      width: 50%;
      text-align: center;
      img {
        width: 63px;
        height: 39px;
      }
      span {
        display: block;
        margin-top: 20px;
      }
    }
  }
  .tip {
    padding: 50px 0;
    text-align: center;
    font-size: 24px;
    color: #bcbcbc;
  }
}
</style>
