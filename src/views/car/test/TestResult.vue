<template>
  <div class="test-result" v-if="result.id">
    <div
      class="result-header good"
      :class="{'middle':90>result.score&&result.score>=60,'bad':result.score<60}"
    >
      <div class="header-right">{{result.score}}</div>
      <div class="header-left">
        <h3>{{state.showWarnPannel?'您好，您的爱车经检测存在异常,':'恭喜您，您的爱车经检测无异常，'}}</h3>
        <p>请查看详细数据!</p>
      </div>
    </div>

    <div class="result-content" v-if="!result.dataFlow">
      <div class="pannel" v-show="state.showWarnPannel">
        <h4 class="oranges">异常项</h4>
        <ul class="warn">
          <li class="line"></li>
          <li
            v-if="result.vehBatvol&&(result.vehBatvol!=-9999&&(result.vehBatvol<11.5||result.vehBatvol>15.0))"
          >
            <p>
              <i></i>
              <em>电瓶电压</em>
            </p>
            <span>{{result.vehBatvol}}</span>
          </li>
          <li
            v-if="result.engineSpeed&&(result.engineSpeed!=-9999&&(result.engineSpeed<0||result.engineSpeed>6000))"
          >
            <p>
              <i></i>
              <em>发动机转速(rpm)</em>
            </p>
            <span>{{result.engineSpeed}}</span>
          </li>
          <li
            v-if="result.carSpeed&&(result.carSpeed!=-9999&&(result.carSpeed<0||result.carSpeed>160))"
          >
            <p>
              <i></i>
              <em>车速</em>
            </p>
            <span>{{result.carSpeed}}</span>
          </li>
          <li
            v-if="result.intakeAirTemperature&&(result.intakeAirTemperature!=-9999&&(result.intakeAirTemperature<-40&&result.intakeAirTemperature>115))"
          >
            <p>
              <i></i>
              <em>进气口温度</em>
            </p>
            <span>{{result.intakeAirTemperature}}</span>
          </li>
          <li
            v-if="result.coolantTemperature&&(result.coolantTemperature!=-9999&&(result.coolantTemperature<-40&&result.coolantTemperature>115))"
          >
            <p>
              <i></i>
              <em>冷却液温度</em>
            </p>
            <span>{{result.coolantTemperature}}</span>
          </li>
          <li
            v-if="result.carEnvirnTemperature&&(result.carEnvirnTemperature!=-9999&&(result.carEnvirnTemperature<-40||result.carEnvirnTemperature>60))"
          >
            <p>
              <i></i>
              <em>车辆环境温度</em>
            </p>
            <span>{{result.carEnvirnTemperature}}</span>
          </li>
          <li
            v-if="result.atmosphericPressure&&(result.atmosphericPressure!=-9999&&(result.atmosphericPressure<50||result.atmosphericPressure>105))"
          >
            <p>
              <i></i>
              <em>大气压力(kPa)</em>
            </p>
            <span>{{result.atmosphericPressure}}</span>
          </li>
          <li
            v-if="result.fuelPressure&&(result.fuelPressure!=-9999&&(result.fuelPressure<0||result.fuelPressure>45))"
          >
            <p>
              <i></i>
              <em>燃油压力</em>
            </p>
            <span>{{result.fuelPressure}}</span>
          </li>
          <li
            v-if="result.airFlow&&(result.airFlow!=-9999&&(result.airFlow<0||result.airFlow>655))"
          >
            <p>
              <i></i>
              <em>空气流量(g/s)</em>
            </p>
            <span>{{result.airFlow}}</span>
          </li>
          <li
            v-if="result.throttlePositionSensor&&(result.throttlePositionSensor!=-9999&&(result.throttlePositionSensor<0||result.throttlePositionSensor>100))"
          >
            <p>
              <i></i>
              <em>节气门位置(%)</em>
            </p>
            <span>{{result.throttlePositionSensor}}</span>
          </li>
          <li
            v-if="result.pedalPositionSensors&&(result.pedalPositionSensors!=-9999&&(result.pedalPositionSensors<0||result.pedalPositionSensors>100))"
          >
            <p>
              <i></i>
              <em>油门踏板位置(%)</em>
            </p>
            <span>{{result.pedalPositionSensors}}</span>
          </li>
          <li
            v-if="result.engineLoad&&(result.engineLoad!=-9999&&(result.engineLoad<0||result.engineLoad>100))"
          >
            <p>
              <i></i>
              <em>发动机负荷(%)</em>
            </p>
            <span>{{result.engineLoad}}</span>
          </li>
          <!-- <li v-if="result.troubleCodeNum>0">
            <p>
              <i></i>
              <em>故障码个数</em>
            </p>
            <span> {{result.troubleCodeNum}}</span>
          </li>-->
        </ul>
      </div>
      <div class="pannel" v-show="state.showNormalPannel">
        <h4 class="blues">正常项</h4>
        <ul class="normal">
          <li class="line"></li>
          <li
            v-if="!result.vehBatvol||(result.vehBatvol!=-9999&&11.5<=result.vehBatvol&&result.vehBatvol<=15.0)"
          >
            <p>
              <i></i>
              <em>电瓶电压</em>
            </p>
            <span>{{result.vehBatvol}}</span>
          </li>

          <li
            v-if="!result.engineSpeed||(result.engineSpeed!=-9999&&0<=result.engineSpeed&&result.engineSpeed<=6000)"
          >
            <p>
              <i></i>
              <em>发动机转速(rpm)</em>
            </p>
            <span>{{result.engineSpeed}}</span>
          </li>

          <li
            v-if="!result.carSpeed||(result.carSpeed!=-9999&&0<=result.carSpeed&&result.carSpeed<=160)"
          >
            <p>
              <i></i>
              <em>车速</em>
            </p>
            <span>{{result.carSpeed}}</span>
          </li>

          <li
            v-if="!result.intakeAirTemperature||(result.intakeAirTemperature!=-9999&&-40<result.intakeAirTemperature&&result.intakeAirTemperature<115)"
          >
            <p>
              <i></i>
              <em>进气口温度</em>
            </p>
            <span>{{result.intakeAirTemperature}}</span>
          </li>

          <li
            v-if="!result.coolantTemperature||(result.coolantTemperature!=-9999&&-40<result.coolantTemperature&&result.coolantTemperature<115)"
          >
            <p>
              <i></i>
              <em>冷却液温度</em>
            </p>
            <span>{{result.coolantTemperature}}</span>
          </li>

          <li
            v-if="!result.carEnvirnTemperature||(result.carEnvirnTemperature!=-9999&&-40<result.carEnvirnTemperature&&result.carEnvirnTemperature<60)"
          >
            <p>
              <i></i>
              <em>车辆环境温度</em>
            </p>
            <span>{{result.carEnvirnTemperature}}</span>
          </li>

          <li
            v-if="!result.atmosphericPressure||(result.atmosphericPressure!=-9999&&50<result.atmosphericPressure&&result.atmosphericPressure<105)"
          >
            <p>
              <i></i>
              <em>大气压力(kPa)</em>
            </p>
            <span>{{result.atmosphericPressure}}</span>
          </li>

          <li
            v-if="!result.fuelPressure||(result.fuelPressure!=-9999&&0<result.fuelPressure&&result.fuelPressure<45)"
          >
            <p>
              <i></i>
              <em>燃油压力</em>
            </p>
            <span>{{result.fuelPressure}}</span>
          </li>

          <li v-if="!result.airFlow||(result.airFlow!=-9999&&0<result.airFlow&&result.airFlow<655)">
            <p>
              <i></i>
              <em>空气流量(g/s)</em>
            </p>
            <span>{{result.airFlow}}</span>
          </li>

          <li
            v-if="!result.throttlePositionSensor||(result.throttlePositionSensor!=-9999&&0<result.throttlePositionSensor&&result.throttlePositionSensor<100)"
          >
            <p>
              <i></i>
              <em>节气门位置(%)</em>
            </p>
            <span>{{result.throttlePositionSensor}}</span>
          </li>

          <li
            v-if="!result.pedalPositionSensors||(result.pedalPositionSensors!=-9999&&0<result.pedalPositionSensors&&result.pedalPositionSensors<100)"
          >
            <p>
              <i></i>
              <em>油门踏板位置(%)</em>
            </p>
            <span>{{result.pedalPositionSensors}}</span>
          </li>

          <li
            v-if="!result.engineLoad||(result.engineLoad!=-9999&&0<result.engineLoad&&result.engineLoad<100)"
          >
            <p>
              <i></i>
              <em>发动机负荷(%)</em>
            </p>
            <span>{{result.engineLoad}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="result-content new-box-content" v-if="result.dataFlow">
      <div class="pannel" v-show="state.showWarnPannel">
        <h4 class="oranges">异常项</h4>
        <ul class="warn">
          <li class="line"></li>
          <li v-for="(item,index) in result.dataFlow" :key="index">
            <p class="warn-item"  v-if="item.code">
              <i></i>
              <em>{{item.name}}</em>
              <span>{{item.code}}</span>
              <!-- <span class="toogle-icon iconfont" :class="{'slide-down':item.showWarnDetail}" @click="toggleWarnDetail(item)">&#xe649;</span> -->
            </p>
            <!-- <div class="warn-number-conent" v-if="item.showWarnDetail">
              <p>
                <b>故障码</b>
                <b>故障码说明</b>
              </p>
              <div class="warn-number" v-for="(dtc,index) in item.dtcs" :key="index">
                <em> {{dtc.slice(0,5) }}</em>
                <span> {{dtc.slice(5)|replaceAll('|','') }}</span>
              </div>
            </div>-->
          </li>
        </ul>
      </div>
      <div class="pannel" v-show="state.showNormalPannel">
        <h4 class="blues">正常项</h4>
        <ul class="normal">
          <li class="line"></li>
          <li v-for="(item,index) in result.dataFlow" :key="index">
            <p v-if="!item.code">
              <i></i>
              <em>{{item.name}}</em>
            </p>
            <!-- <span> {{item.system_type}}</span> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="result-footer">
      <p>温馨提示：车况检测仅供参考，如发现异常，</p>
      <p>请尽快进行检测和维修！</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      linceNo: this.$route.query.linceNo,
      result: {},
      state: {
        showWarnPannel: false,
        showNormalPannel: false
      }
    };
  },
  created() {
    this.getTestResultByTestId();
  },
  updated() {
    this.handlePannelDisplay();
  },
  methods: {
    toggleWarnDetail(item) {
      item.showWarnDetail = !item.showWarnDetail;
    },
    getTestResultByTestId() {
      const params = {
        testId: this.$route.query.testId
      };
      this.$http.getTestResultByTestId(params).then(res => {
        let result = res.data;
        if (result) {
          if (result.dataFlow) {
            result.dataFlow = JSON.parse(result.dataFlow);
            for (let item of result.dataFlow) {
              if (item.dtcs) {
                item.showWarnDetail = false;
              }
            }
          }
          this.result = result;
        }
      });
    },
    handlePannelDisplay() {
      let warn = document.querySelectorAll(".warn li");
      let normal = document.querySelectorAll(".normal li");
      this.state.showWarnPannel = warn.length > 1 ? true : false;
      this.state.showNormalPannel = normal.length > 1 ? true : false;
    }
  }
};
</script>
<style lang="scss" scoped>
.test-result {
  padding-bottom: 50px;
  .header-right {
    margin-right: 30px;
  }
  .good {
    background-image: linear-gradient(0deg, #35b4f8 0%, #3f3fdb 100%);
    .header-right {
      background: url($baseUrl+"images/good_s.png") no-repeat center
        center/contain;
    }
  }

  .middle {
    background-image: linear-gradient(0deg, #ffc733 0%, #ff8500 100%);
    .header-right {
      background: url($baseUrl+"images/middle_s.png") no-repeat center
        center/contain;
    }
  }
  .bad {
    background-image: linear-gradient(0deg, #fd913a 0%, #fa5b39 100%);
    .header-right {
      background: url($baseUrl+"images/bas_s.png") no-repeat center
        center/contain;
    }
  }
  .result-header {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    position: relative;
    width: 100%;
    // height: 272px;
    padding: 54px 58px 50px 42px;
    color: #fff;
    h3 {
      margin-bottom: 10px;
      font-size: 28px;
    }
    p {
      font-size: 28px;
    }
    .header-right {
      width: 93px;
      height: 107px;
      line-height: 107px;
      text-align: center;
      font-size: 45px;
    }
  }
  .new-box-content {
    ul {
      li {
        display: block !important;
      }
    }
    .warn-item {
      em {
        flex: 1;
        text-align: left;
      }
      span {
        &.slide-down {
          transform: rotate(180deg);
        }
      }
    }

    .warn-number-conent {
      p {
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        margin: 30px 0;
      }
    }
    .warn-number {
      display: flex;
      justify-content: space-between;
      padding-left: 30px;
      margin-bottom: 30px;
      font-size: 24px;
      color: #838383;
    }
  }
  .result-content {
    position: relative;
    margin: -30px 23px 0 23px;

    .pannel {
      margin-bottom: 20px;
      padding: 38px;
      border-radius: 9px;
      background-color: #fff;
      h4 {
        font-size: 30px;
      }
    }

    ul {
      position: relative;
      margin-top: 70px;
      font-size: 24px;
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 76px;
        &:last-of-type {
          margin-bottom: 0;
        }
        span {
          // max-width: 70%;
          text-align: right;
          color: #838383;
        }
      }
      .line {
        position: absolute;
        top: 0;
        left: 8px;
        bottom: 0;
        width: 1px;
        margin-bottom: 0;
        background-color: #ccc;
      }
      p {
        display: flex;
        align-items: center;
        flex: 1;
        em {
          max-width: 90%;
        }

        i {
          position: relative;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          border-radius: 50%;
          background-color: #0093ff;
        }
      }
    }
    .warn {
      i {
        background-color: #ff5e03;
      }
    }
  }
  .result-footer {
    margin-top: 30px;
    text-align: center;
    font-size: 24px;
    color: #838383;
  }
}
</style>
