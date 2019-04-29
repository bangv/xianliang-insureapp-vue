<template>
    <div class="service-content">
        <h2 class="order-title border-bottom-scaleY">服务内容</h2>
        <!--新增四个服务选项-->
        <ul class="additional-services-box ">
            <li class="order-service" v-for="(item,index) in additlSer" :key="index">
                <div class="ins-box">
                    <p class="service-left" @click="handleInsInfo(item, $event)">
                        <em class="iconfont" v-html="item.serviceIcon"></em>
                        <span class="service-name">{{item.serviceName}}</span>
                        <em :class="{'arrowTrans': item.showSerExp , 'iconfont':true, 'arrow':true }"> &#xe649; </em>
                    </p>
                    <em class="iconfont">&#xe69e;</em>
                </div>
                <p v-if="item.showSerExp" :class="[{'service-explain' : item.showSerExp}, 'service-bottom']" v-html="item.serviceExplain">{{item.serviceExplain}}</p>
            </li>

            <li class="order-service" >
              <div class="ins-box">
                <p class="service-left" @click="handleInsInfo(insSer, $event)">
                  <em class="iconfont" v-html="insSer.serviceIcon"></em>
                  <span class="service-name">{{confirmInfo.source|company('name')}}车险服务</span>
                  <em :class="{'arrowTrans': insSer.showSerExp , 'iconfont':true, 'arrow':true }"> &#xe649; </em>
                </p>
                <em class="iconfont">&#xe69e;</em>
              </div>
              <div v-if="insSer.showSerExp" :class="[{'service-explain' : insSer.showSerExp}, 'service-bottom', 'ins-service']">

                <SelectedInsure></SelectedInsure>
                <p v-if="confirmInfo.forcetotal > 0" class="ins-box">
                  <span>交强险</span>
                  <span>{{confirmInfo.forcetotal}}元</span>
                </p>
                <p v-if="confirmInfo.taxtotal > 0" class="ins-box">
                  <span>车船税</span>
                  <span>{{confirmInfo.taxtotal}}元</span>
                </p>
                <p class="ins-box service-item"><span>服务费用</span> <span>{{confirmInfo.dailytotal}}元/天</span> </p>

                <p class="ins-box"><span>封顶天数</span> <span>{{confirmInfo.total_days}}天</span> </p>

                <p class="ins-box"><span class="insure-f">服务期限</span> <span>{{confirmInfo.businessstartdate}} ~ {{confirmInfo.businessexpiredate}}</span> </p>

              </div>
            </li>
        </ul>
    </div>
</template>
<script>
  // import SelectedInsure from '@/components/order/SelectedInsure'
export default {
  components: {
    SelectedInsure:()=> import('@/components/order/SelectedInsure'),
  },
  props: {
    confirmInfo: Object, //  服务详情对象
  },
  data() {
    return {
      // 保险信息
      insSer:{
        serviceName: `保险车险服务`,
        serviceIcon: '&#xe611;',
        showSerExp: false
      },
      // 附加服务
      additlSer: [
        {
          serviceName: '爱车综合检测服务',
          serviceExplain:
            '电瓶电压、冷却液温度、发动机转速、传动检测、传动负荷、进气门温度、电路检测等全面掌控。',
          serviceIcon: '&#xe61b;',
          showSerExp: false // 附加服务里的选项
        },
        {
          serviceName: '行车轨迹位置服务',
          serviceExplain:
            '随时随地查询车辆当前位置，回看以及管理车辆历史轨迹，点火分段轨迹。',
          serviceIcon: '&#xe655;',
          showSerExp: false
        },
        {
          serviceName: '驾驶习惯用户服务',
          serviceExplain:
            '详细记录里程，油耗等用车数据，急刹车、急转弯、急加速、急减速等驾驶行为全纪录。',
          serviceIcon: '&#xe683;',
          showSerExp: false
        },
        {
          serviceName: '车辆安防监控服务',
          serviceExplain:
            '汽车被非法点火、非法移位、碰撞、拖吊、设备插拔时，系统主动警示提醒。',
          serviceIcon: '&#xe640;',
          showSerExp: false
        },
      ]
    }
  },
  methods: {
    // 点击旋转箭头 内容显示或隐藏
    handleInsInfo(item, e) {
      e.stopPropagation()
      item.showSerExp = !item.showSerExp
    }
  }
}
</script>
<style lang="scss" scoped>
.order-title {
  padding-bottom: 30px;
  font-size: 28px;
  line-height: 24px;
  color: #131313;
}
.additional-services-box {
  padding: 30px 0 0;
  font-size: 26px;
  line-height: 80px;

  .order-service {
    padding-bottom: 20px;
  }

  .service-left {
    position: relative;
    padding-right: 50px;
    .service-name {
      display: inline-block;
      width: 280px;
    }
  }
  .service-bottom {
    /*padding-right: 20px;*/
    font-size: 24px;
    color: #9d9d9d;
    line-height: 40px;
  }
  .ins-service {
    line-height: 60px;
  }
  .insure-f {
    text-wrap: none;
  }
  .service-item {
    margin-top: 30px;
  }
  .iconfont {
    margin-right: 30px;
    font-size: 40px;
    line-height: 60px;
    color: #007aff;
  }
  .arrow {
    color: #9d9d9d;
  }
  .arrowTrans {
    transform: rotate(180deg);
    transition: transform 0.25s linear;
  }
}
#insure-type /deep/ {
  .owner-name {
    font-size: 24px !important;
  }
  .iconfont {
    font-size: 28px !important;
  }
}

</style>
