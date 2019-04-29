<template>
  <Modal @hide="closeModal">
    <div id="car-type-wrap">
      <div class="car-type insure-card" v-if="carInfoList.length > 0">
        <h1 class="">选择车型</h1>
        <div class="choose-box">
          <mt-radio class="choose-box" v-model="carInfo.JYModuleCode" :options="carInfoList">
          </mt-radio>
        </div>
        <div class="insure-flexbox insure-flexbox-content-center">
          <button class="modal-btn" @click="confirmCarInfo">确定</button>
        </div>
      </div>

      <div class="car-type insure-card" v-if="!carInfoList.length">
        <p class="grays reminder-txt">抱歉，未找到车型！</p>
      </div>
    </div>
  </Modal>
</template>
<script>
import Modal from '@/components/modal/Modal'

import { mapGetters } from 'vuex'
// import { Radio } from 'mint-ui'
export default {
  components: {
    Modal,
    // 'mt-radio': Radio
  },
  props: ['code', 'currentCarInfo'],
  data() {
    return {
      carTypeList: [],
      carInfoList: [],
      changedCarInfo: this.currentCarInfo
    }
  },
  computed: {
    ...mapGetters({
      carInfo: 'CAR_INFO',
      markInfo: 'MARK_INFO'
    })
  },
  created() {
    this.getCarTypeListByBrand()
    // console.log(this.$parent.quotationParams.QuoteGroup);
  },
  watch: {
    'carInfo.JYModuleCode'(val, oldVal) {
      // console.log(val);  //监听车型选择
      this.changedCarInfo = val
    }
  },
  methods: {
    // 通过品牌获取车辆类型
    getCarTypeListByBrand() {
      const { linceNo, regionCode } = this.markInfo
      const {
        CarVin,
        EngineNo,
        MoldName,
        MobilePhone,
        RegisterDate
      } = this.carInfo
      const params = {
        linceNo: linceNo,
        CityCode: regionCode,
        frameNum: CarVin, //	(必填)
        moduleName: MoldName, //	(必填)
        engineNum: EngineNo, //(必填)
        mobilePhone: MobilePhone,
        registerTime: RegisterDate, //	(必填)
        insure_company_code_ref: this.code
      }
      this.$http.getCarTypeInfoByCarBrand(params).then(res => {
        if (res.data.result == '00') {
          const results = res.data.list;
          for (let i = 0; i < results.length; i++) {
            let item = {
              label: results[i].info,
              value: results[i].vehicleNo,
              disabled: false
            };
            this.carInfoList.push(item)
          }
        }

      })
    },

    // 关闭modal
    closeModal() {
      // this.$store.commit('SET_MODAL_STATE', false);
      this.$emit('hide')
    },
    // 更换新的车型后重新请求
    confirmCarInfo() {
      if (this.changedCarInfo == this.currentCarInfo) {
        this.$emit('hide')
      } else {
        this.$emit('complete')
      }
    }
    // handleCarTypeSelected(type) {
    //   const { info, vehicleNo } = type
    //   const result = {
    //     JYModuleInfo: info,
    //     JYModuleCode: vehicleNo
    //   }
    //   this.$store.commit('UPDATE_CAR_TYPE', result)
    //   this.$store.commit('SET_MODAL_STATE', false)
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

#car-type-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  .mint-cell {
    font-size: 24px !important;
    line-height: 30px !important;
  }
  .mint-radiolist {
    span.mint-radio-label {
      font-size: 24px !important;
      line-height: 30px !important;
      white-space: nowrap;
      margin: 10px 0;
    }
  }
  .mint-cell-wrapper {
    font-size: 24px !important;
    line-height: 30px !important;
  }
}
.car-type {
  width: 90%;
  padding: 30px 20px 40px;
  background-color: #fff;
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    line-height: 30px;
    padding-bottom: 20px;
    border-bottom: solid 1px #95cdfe;
  }
  .reminder-txt {
    text-align: center;
    font-size: 28px;
  }
  /*  .mint-cell-wrapper{
    font-size: 20px !important;
    margin: 20px 0 !important;
  }*/
}
.choose-box {
  overflow-y: scroll;
  max-height: 700px;
}
.cars-box {
  width: 100%;
  padding: 0 20px;
  margin-top: 30px;
  font-size: 20px;
  line-height: 36px;
}
.modal-btn {
  width: 220px;
  height: 56px;
  margin-top: 30px;
  border-radius: 28px;
  background: linear-gradient(to left, #007aff, #22aefe);
  color: #fff;
  font-size: 30px;
  line-height: 56px;
}
</style>
