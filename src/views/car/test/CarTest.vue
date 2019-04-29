<template>
  <div class="car-exam" v-if="carList.length>0">
    <div v-show="!state.isTesting">
      <div
        class="exam-header good"
        :class="{'middle':90>result.score&&result.score>=60,'bad':result.score<60}"
      >
        <div class="car-list">
          <select v-model="currentCar.deviceCode" @change="getLastTestTime">
            <option
              v-for="car in carList"
              :key="car.deviceCode"
              :value="car.deviceCode"
            >{{car.linceNo}}</option>
          </select>
          <i class="iconfont" v-show="carList.length>1">&#xe649;</i>
        </div>
        <span class="score">{{result.score>=0?result.score:100}}</span>
        <p class="car-type">{{result.jymoduleinfo}}</p>
      </div>
      <div class="exam-content" v-if="!state.isFirstTest">
        <span v-if="result.examinationTime">温馨提示：上次体检时间{{result.examinationTime|date}}</span>
        <span v-if="result.score>=90&&result.riskNumber==0">恭喜！您的私车车况正常，请继续期持~</span>
        <span v-else>
          您的爱车存在
          <i
            class="blues"
            :class="{'m':90>result.score&&result.score>=60,'b':result.score<60}"
          >{{result.riskNumber?result.riskNumber:0}}项</i> 风险，建议及时保养提升驾驶安全
        </span>
        <p class="blues" tag="p" @click="lookTestResult">查看检测报告></p>
      </div>
      <div class="btn-box">
        <button class="sign-up-btn" @click="detectionCar">{{state.isFirstTest?'开始检测':'重新检测'}}</button>
      </div>
    </div>
    <div v-show="state.isTesting" class="car-testing">
      <div class="testing-header">
        <img :src="$baseUrl+'images/testing.gif'" alt>
      </div>

      <ul class="testing-content">
        <li v-for="(item,index) in testStore" :key="index">
          <em class="testing"></em>
          <p class="insure-flexbox-item ins-box test-info">
            <span>{{item}}</span>
            <span v-if="index === 0">检测中</span>
            <span v-if="index !== 0">等待中</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
  <DefaultImg v-else text="暂无数据"></DefaultImg>
</template>
<script>
import DefaultImg from "@/components/share/DefaultImg";
import { mapGetters } from "vuex";
export default {
  components: {
    DefaultImg
  },
  data() {
    return {
      carList: [], // 所有车辆列表
      // currentCar: null, // 当前车辆
      currentCar: {
        deviceCode: "",
        linceNo: ""
      },
      result: {}, // 体检结果
      state: {
        isFirstTest: true,
        isTesting: false // 测试中
      },
      testStore: [],
      timer: null
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  created() {
    this.getUserCarList();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    lookTestResult() {
      if (!this.result.id) {
        this.$toast("该车不存在体检报告");
      } else {
        this.$router.push({
          name: "TestResult",
          query: {
            linceNo: this.currentCar.linceNo,
            testId: this.result.id
          }
        });
      }
    },
    getUserCarList() {
      const params = {
        // platformId: '186'
        platformId: this.userId
      };
      this.$http.getUserCarState(params).then(res => {
        if (res.data && res.data.length > 0) {
          this.carList = res.data;
          this.currentCar.deviceCode = res.data[0].deviceCode;

          this.getLastTestTime();
        }
      });
    },
    /**
     * @description 获取上一次体检信息
     */
    getLastTestTime() {
      const params = {
        deviceCode: this.currentCar.deviceCode
        // deviceCode: '978390000530'
      };
      this.initCurrentCarlinceNo(params.deviceCode);

      this.$http.getLastTestTime(params).then(res => {
        if (res.data) {
          // res.data.score = 59
          // res.data.riskNumber = 1
          this.result = res.data;
          this.state.isFirstTest = false;
        }
      });
    },
    /**@author AuYeung
     * @description 初始化当前车辆车牌
     * @param  {String} code 设备号
     */
    initCurrentCarlinceNo(code) {
      const carList = this.carList;
      const isCurrentCar = ({ deviceCode }) => deviceCode == code;
      this.currentCar.linceNo = carList.filter(isCurrentCar)[0].linceNo;
    },
    /**
     * @description 检测车辆
     */
    detectionCar() {
      this.handleTesting();
      const params = {
        deviceCode: this.currentCar.deviceCode
        // deviceCode: '972290000132'
      };
      this.$http.detectionCar(params).then(res => {
        if (res.data.vehicleTest) {
          this.result = res.data.vehicleTest;
        }
      });
    },

    // 车况检测，重新检测和第一次检测
    handleTesting() {
      this.testStore = [
        "电瓶电压",
        "发动机转速(rpm)",
        "车速",
        "进气口温度",
        "冷却液温度",
        "车辆环境温度",
        "大气压力",
        "燃油压力",
        "空气流量",
        "节气门位置",
        "油门踏板位置",
        "发动机负荷"
      ];

      this.state.isTesting = true;

      this.timer = setInterval(() => {
        this.testStore.splice(0, 1);
        if (this.testStore.length < 4) {
          clearInterval(this.timer);
          this.state.isTesting = false;
          this.state.isFirstTest = false;
          this.lookTestResult();
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.car-exam {
  .good {
    background: url($baseUrl+"images/good_b.jpg") no-repeat center
      center/contain;
  }
  .middle {
    background: url($baseUrl+"images/middle_b.jpg") no-repeat center
      center/contain;
  }
  .bad {
    background: url($baseUrl+"images/bad_b.jpg") no-repeat center center/contain;
  }
  .exam-header {
    position: relative;
    width: 100%;
    height: 645px;
    font-size: 150px;
    text-align: center;
    color: #fff;

    .car-list {
      position: absolute;
      left: 30px;
      top: -90px;
      color: #fff;
      select {
        color: #fff;
        font-family: PingFang-SC-Medium;
      }
      i {
        margin-left: -35px;
      }
    }
    .score {
      display: inline-block;
      padding-top: 26%;
    }
    .car-type {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 75px;
      font-size: 30px;
    }
  }
  .exam-content {
    padding: 113px 30px 0 30px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    span {
      display: block;
      margin-bottom: 10px;
      color: #838383;
    }
    i {
      color: #007aff;
    }
    .m {
      color: #ffc734;
    }
    .b {
      color: #f82928;
    }
  }
  .btn-box {
    margin-top: 152px;
    text-align: center;
  }
}
.car-testing {
  .testing-header {
    // background-image: linear-gradient(30deg, #35b4f8 0%, #3f3fdb 100%);

    img {
      width: 100%;
    }
  }
  .testing-content {
    background-color: #fff;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 110px;
      line-height: 110px;
      padding: 0 55px;
      font-size: 32px;
      color: #949494;
      position: relative;
    }
    .test-info {
      padding-left: 30px;
    }
    li:nth-of-type(1) em {
      @include icon(30, 30, "images/test.gif");
      transition: transform 0.25s linear;
    }
    em {
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #3e97eb;
    }
  }
}
</style>
