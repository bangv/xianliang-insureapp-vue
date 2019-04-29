<template>
  <div class="service-content pannel-card">
    <div class="card-header">
      <h2 class="header-title ">{{title}}</h2>
    </div>
    <!--新增四个服务选项-->
    <ul class="additional-services-box card-content ">
      <li class="order-service" v-for="(item,index) in additlSer" :key="index">
        <div class="ins-box">
          <p class="service-left" @click="handleInsInfo(item, $event)">
            <em class="iconfont" v-html="item.serviceIcon"></em>
            <span>{{item.serviceName}}</span>
            <em :class="{'arrowTrans': item.showSerExp , 'iconfont':true, 'arrow':true }"> &#xe649; </em>
          </p>
          <em class="iconfont">&#xe69e;</em>
        </div>
        <p v-if="item.showSerExp" :class="[{'service-explain' : item.showSerExp}, 'service-bottom']" v-html="item.serviceExplain">{{item.serviceExplain}}</p>
      </li>
      <slot name="insure-service"></slot>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "服务内容"
    }
  },
  data() {
    return {
      // 附加服务
      additlSer: [
        {
          serviceName: "爱车综合检测服务",
          serviceExplain:
            "电瓶电压、冷却液温度、发动机转速、传动检测、传动负荷、进气门温度、电路检测等全面掌控。",
          serviceIcon: "&#xe61b;",
          showSerExp: false // 附加服务里的选项
        },
        {
          serviceName: "行车轨迹位置服务",
          serviceExplain:
            "随时随地查询车辆当前位置，回看以及管理车辆历史轨迹，点火分段轨迹。",
          serviceIcon: "&#xe655;",
          showSerExp: false
        },
        {
          serviceName: "驾驶习惯用户服务",
          serviceExplain:
            "详细记录里程，油耗等用车数据，急刹车、急转弯、急加速、急减速等驾驶行为全纪录。",
          serviceIcon: "&#xe683;",
          showSerExp: false
        },
        {
          serviceName: "车辆安防监控服务",
          serviceExplain:
            "汽车被非法点火、非法移位、碰撞、拖吊、设备插拔时，系统主动警示提醒。",
          serviceIcon: "&#xe640;",
          showSerExp: false
        }
      ]
    };
  },
  methods: {
    // 点击旋转箭头 内容显示或隐藏
    handleInsInfo(item) {
      item.showSerExp = !item.showSerExp;
    }
  }
};
</script>
<style lang="scss" scoped>
.service-content {
  margin-bottom: 34px;
}
.order-title {
  padding-bottom: 30px;
  font-size: 28px;
  line-height: 24px;
  color: #131313;
}
.additional-services-box {
  padding: 20px 30px;
  font-size: 26px;
  line-height: 80px;

  .order-service {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
    .service-left {
      display: flex;
      align-items: center;
    }
  }
  .service-left {
    position: relative;
    padding-right: 50px;
    span {
      width: 280px;
    }
  }
  .service-bottom {
    // padding-right: 100px;
    text-align: justify;
    font-size: 24px;
    color: #9d9d9d;
    line-height: 40px;

    .total {
      padding-top: 20px;
      border-top: 1px solid #efefef;
      p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        // &:last-of-type {
        //   margin-bottom: 0;
        // }
      }
    }
    .date {
      display: flex;
      justify-content: space-between;
      span {
        width: 45%;
      }
    }
  }
  .iconfont {
    margin-right: 30px;
    font-size: 40px;
    line-height: 60px;
    color: #007aff;
  }
  .arrow {
    margin-left: 30px;
    color: #9d9d9d;
  }
  .arrowTrans {
    transform: rotate(180deg);
    transition: transform 0.25s linear;
  }
}
</style>
