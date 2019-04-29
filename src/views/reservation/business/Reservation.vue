<template>
  <div class="reservation-wrap">
    <div class="reservation-banner"></div>

    <div class="reservation-content">
      <div class="ser-formdata insure-card">
        <!--车牌号码-->
        <div class="ins-align car-number">
          <p class="number-left">车牌号</p>

          <p
            class="licence-right insure-flexbox-item car-input"
            @click="handleKeyboard"
          >{{linceNo?linceNo:'请输入车牌'}}</p>
        </div>

        <!--起保日期-->
        <div class="reserve-item ins-box">
          <p class="item-left">起保日期</p>
          <div class="start-date insure-flexbox-item car-input">
            <InsureDate
              v-model="reservation.startDate"
              placeholder="请选择起保日期"
              id="BizStartDate"
            ></InsureDate>
          </div>
        </div>

        <div class="reserve-item ins-box">
          <p class="item-left">行驶证上传</p>
          <div class="car-input insure-flexbox-item ins-box">
            <p class="file-name ">{{ reserveFile? reserveFile : '请上传行驶证正面照' | handleStr(10,6) }}</p>
            <div class="camera">
              <p class="iconfont">&#xe67c;</p>
              <input
                class="photo-input"
                accept="image/*"
                type="file"
                @change="photoHandle($event)"
              />
            </div>
          </div>

        </div>

        <!--预约码（业务员手机号）-->
        <div class="reserve-item ins-box">
          <p class="item-left">预约码</p>
          <div class="reserve-code insure-flexbox-item car-input">
            <SecretInput
              v-model="reservation.code"
              placeholder="输入业务员手机号，没有可不填"
              :max="11"
              secret="3,4"
            />
          </div>

        </div>

      </div>

      <div class="btn-wrap insure-flexbox insure-flexbox-content-center">
        <button
          type="button"
          class="sign-up-btn"
          @click="formValidate"
        >提交</button>
        <!--:disabled="!reserveFile" -->
      </div>

    </div>

    <AbbrKeyboard
      @keyboard="handleAbbrKeyboard($event)"
      v-show="state.showAbbrKeyboard"
      @hide="hideKeyboard('abbr')"
    ></AbbrKeyboard>
    <AlphabetKeyboard
      @keyboard="handleAlphabetKeyboard($event)"
      @complete="hideKeyboard('alphabet')"
      @backspace="handleSpace"
      v-show="state.showAlphabetKeyboard"
    ></AlphabetKeyboard>
  </div>
</template>

<script>
import { date } from "@/utils/date";
import { image } from "@/utils/image";
import { mapGetters } from "vuex";
import SecretInput from "@/components/form/SecretInput";
import InsureDate from "@/components/form/InsureDate";
import AlphabetKeyboard from "@/components/keyboard/AlphabetKeyboard";
import AbbrKeyboard from "@/components/keyboard/AbbrKeyboard";
export default {
  name: "Reservation",
  components: {
    InsureDate,
    SecretInput,
    AbbrKeyboard,
    AlphabetKeyboard
  },
  data() {
    return {
      linceNo: "",
      drivingLicensephoto: "", // 上传行驶证图片转 base64 string格式
      reserveFile: "", // 上传文件名称
      state: {
        showAbbrKeyboard: false, // 省份简称键盘
        showAlphabetKeyboard: false // 字母键盘
      },
      reservation: {
        startDate: null, // 起保日期
        code: null // 预约码
      }
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    handleKeyboard() {
      if (this.linceNo.length < 2) {
        this.state.showAbbrKeyboard = true;
        this.state.showAlphabetKeyboard = false;
      } else if (this.linceNo.length >= 2) {
        this.state.showAbbrKeyboard = false;
        this.state.showAlphabetKeyboard = true;
      }
    },
    /**
     * @description 创建预约单
     * @param {String} type
     */
    postCreateReservation() {
      const params = {
        businessstartdate: this.reservation.startDate,
        linceNo: this.linceNo,
        appointmentCode: this.reservation.code
      };
      this.$http.postCreateReservation(params).then(res => {
        if (res.data.respcode == "00") {
          this.$router.push({
            name: "ReservationResult",
            query: {
              result: res.data.respcode,
              linceNo: this.linceNo,
              appointId: res.data.appointId
            }
          });
          return this.$toast("预约单创建成功");
        } else {
          return this.$toast(res.data.errMsg);
        }
      });
    },
    //图片处理
    photoHandle(event) {
      const currentFile = event.currentTarget;
      const file = currentFile.files[0];
      if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
        return this.$toast("不支持该格式文件");
      }
      // console.log(file);
      // if (file.size < 50000 ) {
      //   return this.$toast('您上传图片太大，请重新上传')
      // }
      /*存储上传证件文件名称*/
      // this.$store.commit('SET_RESERVE_FILE', file.name )
      this.reserveFile = file.name;
      const reader = new FileReader();
      const _this = this;
      const maxSize = 200 * 1024;
      reader.onload = function() {
        const result = this.result;
        // 合格尺寸
        if (result.length <= maxSize) {
          _this.drivingLicensephoto = result; //预览
          return;
        }
        // 不合格尺寸
        let photo = new Image();
        photo.src = result;

        photo.onload = function() {
          const compressedResult = image.compressImage(photo, file.type); // 压缩
          _this.drivingLicensephoto = compressedResult;
        };
      };
      reader.readAsDataURL(file);
    },

    /**
     * @param type : 图片类型
     * @param base64 : 图片的base64格式
     */
    uploadPhoto(type, base64) {
      const params = {
        imageDrivingLicense: this.drivingLicensephoto,
        licenceNo: this.linceNo
      };
      this.$http.businessUploadPhoto(params).then(res => {
        if (res.data.respcode == "00") {
          this.postCreateReservation();
        }
      });
    },

    //表单验证
    formValidate() {
      const startDate = this.reservation.startDate;
      const today = date.getSpecifiedDate(0);
      const maxDay = date.getSpecifiedDate(90);
      // 按照搜索框输入车牌 筛选数据
      const reg2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-HJ-N-P-Z]{1}[A-HJ-N-P-Z0-9]{5}$/;
      if (!this.linceNo) {
        return this.$toast("请先输入车牌");
      }
      if (this.linceNo < 7) {
        return this.$toast("请输入完整车牌");
      }
      if (!reg2.test(this.linceNo)) {
        return this.$toast("请输入正确车牌");
      }

      if (!startDate) {
        return this.$toast("请选择起保日期");
      }
      if (startDate <= today) {
        return this.$toast("商业险起保日期不能小于当前日期");
      }
      if (startDate > maxDay) {
        return this.$toast("商业险日期距今不能超过90天");
      }

      if (!this.drivingLicensephoto) {
        this.$toast("请先上传行驶证照片");
      }
      this.uploadPhoto();
    },

    /**
     * @description 显示键盘
     * @param {String} type 键盘类型
     */
    showKeyboard(type) {
      switch (type) {
        case "abbr":
          this.state.showAbbrKeyboard = true;
          break;
        case "alphabet":
          this.state.showAlphabetKeyboard = true;
      }
    },
    /**
     * @description 隐藏键盘
     * @param {String} type 键盘类型
     */
    hideKeyboard(type) {
      switch (type) {
        case "abbr":
          this.state.showAbbrKeyboard = false;
          break;
        case "alphabet":
          this.state.showAlphabetKeyboard = false;
      }
    },

    handleKeyboard() {
      // console.log(this.linceNo);
      if (this.linceNo.length < 2) {
        this.state.showAbbrKeyboard = true;
        this.state.showAlphabetKeyboard = false;
      } else if (this.linceNo.length >= 2) {
        this.state.showAbbrKeyboard = false;
        this.state.showAlphabetKeyboard = true;
      }
    },
    /**
     * @description 处理省份简称键盘输入
     * @param {String} value 输入值
     */
    handleAbbrKeyboard(value) {
      this.hideKeyboard("abbr");
      this.showKeyboard("alphabet");
      this.linceNo = value;
    },
    /**
     * @description 处理字母模拟键盘输入
     * @param {Object} obj 输入值对象
     */
    handleAlphabetKeyboard(obj) {
      // 处理车牌前缀输入 如：粤B
      const value = obj.value;
      if (this.linceNo.length <= 6) {
        this.linceNo = this.linceNo + value;
      }
    },
    // 处理字母模拟键盘删除
    handleSpace() {
      // 有车牌后缀时删除直接删除车牌后缀
      if (this.linceNo) {
        this.linceNo = this.linceNo.substring(0, this.linceNo.length - 1);
        if (this.linceNo < 2) {
          this.showKeyboard("abbr");
          this.hideKeyboard("alphabet");
        }
        if (this.linceNo >= 2) {
          this.showKeyboard("alphabet");
          this.hideKeyboard("abbr");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.reservation-wrap {
  width: 100%;

  .reservation-banner {
    width: 100%;
    height: 380px;
    background: url($baseUrl+"images/reserve/reserve_banner.jpg")
      no-repeat center center/cover;
    margin-bottom: -80px;
  }
  .reservation-content {
    width: 100%;
    padding: 30px;
    font-size: 28px;
    .reserve-item {
      line-height: 90px;
      font-size: 26px;
    }
    // 上传行驶证
    .camera {
      position: relative;
      .iconfont {
        font-size: 30px;
        padding: 0 30px;
      }
      .photo-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    // 车牌号
    .car-number {
      margin: 20px 0;
      .number-left {
        width: 180px;
        line-height: 70px;
        font-size: 28px;
      }
    }
    .item-left {
      width: 180px;
    }
    .car-input {
      background: #f6f6f6;
      height: 60px;
      line-height: 60px;
      color: #666;
      border-radius: 30px;
      text-indent: 30px;
    }
    .reserve-code {
      input {
        width: 90%;
        text-align: left;
      }
    }

    .car-city {
      width: 120px;
      margin-right: 30px;
      position: relative;
      .iconfont {
        position: absolute;
        top: 2px;
        right: 12px;
      }
    }

    .first-input {
      margin-left: 0 !important;
    }
    .file-name {
      min-width: 300px;
    }
  }
  .start-date {
    position: relative;
    align-items: center;
    .insure-date /deep/ {
      position: static;
      flex: none;
      width: 400px;
      input[type="date"] {
        width: 400px !important;
        font-size: 26px;
      }
      .placeholder {
        color: #666;
      }
    }
  }

  .photo-input {
    width: 100px;
    height: 100px;
    background: #007aff;
  }

  .rig {
    margin-right: 20px;
  }
  .btn-wrap {
    width: 100%;
    margin: 80px 0 30px 0;
  }
}
</style>
