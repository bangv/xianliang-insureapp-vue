<template>
  <div id="setting">
    <!-- <div class="pannel">
      <h3 class="title blues">事件推送设置</h3>
      <ul>
        <li>
          <span>点火信息</span>
          <InsureSwitch v-model="config.fireon"> </InsureSwitch>
        </li>
        <li>
          <span>熄火信息</span>
          <InsureSwitch v-model="config.fireoff"></InsureSwitch>
        </li>
        <li>
          <span>设备插入</span>
          <InsureSwitch v-model="config.devicepull"></InsureSwitch>
        </li>
      </ul>
      <p>温馨提示：打开事件推送设置开关后，会接收到公众号消息推送</p>
    </div> -->
    <div class="pannel">
      <h3 class="title blues">功能设置</h3>
      <ul>
        <li>
          <span>GPS及行程功能</span>
          <InsureSwitch v-model="config.gps"></InsureSwitch>
        </li>
      </ul>
      <p>温馨提示：关闭GPS及行程开关后，会影响行车轨迹和实时位置功能的使用</p>
    </div>
    <div class="pannel  special-pannel">
      <ul>
        <li>
          <span>车辆碰撞报警</span>
          <InsureSwitch v-model="config.collision"></InsureSwitch>
        </li>
        <li>
          <span>行驶故障报警</span>
          <InsureSwitch v-model="config.breakdown"></InsureSwitch>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import InsureSwitch from '@/components/form/InsureSwitch'

export default {
  name: 'Setting',
  components: {
    InsureSwitch
  },
  data() {
    return {
      config: {},
      state: {
        ischanged: false // 避免第一次进来显示“保存成功”提示
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted() {
    this.getConfig()
    window.getCode = this.getCode // 挂载方法
  },
  watch: {
    /**
     * @author AuYeung
     * @description 配置改变后自动保存
     */
    config: {
      deep: true,
      handler(config) {
        if (this.state.ischanged) {
          this.$http.updateUserSettingConfig(this.config).then(res => {
            if (res.data) {
              this.$toast({
                message: '保存成功',
                duration: 1000
              })
            }
          })
        }
        this.state.ischanged = true
      }
    }
  },
  methods: {
    /**
     * @author AuYeung
     * @description 查询用户设置配置
     */
    getConfig() {
      const params = {
        userId: this.userId
      }
      this.$http.getUserSettingConfig(params).then(res => {
        if (res.data) {
          this.config = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#setting {
  padding: 33px 37px 50px 37px;
  .pannel {
    margin-bottom: 32px;
    padding: 36px 25px;
    border-radius: 9px;
    background-color: #fff;
    .title {
      font-size: 30px;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 76px;
      &:first-of-type {
        margin-top: 70px;
      }
    }
    p {
      margin-top: 30px;
      font-size: 24px;
      color: #9d9d9d;
    }
  }
  .special-pannel {
    li {
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  .btn-box {
    margin-top: 80px;
    text-align: center;
    button {
      width: 100%;
    }
  }
}
</style>
