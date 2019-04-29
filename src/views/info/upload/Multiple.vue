<template>
  <div id="upload-info-wrap">
    <div class="upload-banner"></div>
    <div class="upload-content insure-card">
      <router-link class="how-upload blues" :to="{name:'UploadRule'}">如何上传
        <em class="iconfont">&#xe6dd;</em>
      </router-link>
      <!--身份证-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe674;</em> 身份证
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[0].base64String}">
              <img :src="Information[0].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'1')">
            </div>
            <p>身份证正面照</p>
          </div>
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[1].base64String}">
              <img :src="Information[1].base64String">
              <input class="input" accept="image/*" type="file" @change="photoHandle($event,'2')">
            </div>
            <p>身份证反面照</p>
          </div>
        </div>
      </div>
      <!--行驶证-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe636;</em> 行驶证
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[2].base64String}">
              <img :src="Information[2].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'3')">
            </div>
            <p>行驶证正本照</p>
          </div>
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[3].base64String}">
              <img :src="Information[3].base64String">
              <input class="input" accept="image/*" type="file" @change="photoHandle($event,'4')">
            </div>
            <p>行驶证副本照</p>
          </div>
        </div>
      </div>
      <!--验车照-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe6c3;</em> 验车照
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[4].base64String}">
              <img :src="Information[4].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'5')">
            </div>
            <p>左前方验车照</p>
          </div>
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[5].base64String}">
              <img :src="Information[5].base64String">
              <input class="input" accept="image/*" type="file" @change="photoHandle($event,'6')">
            </div>
            <p>左后方验车照</p>
          </div>
        </div>
        <div class="ins-box">
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[6].base64String}">
              <img :src="Information[6].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'7')">
            </div>
            <p>右前方验车照</p>
          </div>
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[7].base64String}">
              <img :src="Information[7].base64String">
              <input class="input" accept="image/*" type="file" @change="photoHandle($event,'8')">
            </div>
            <p>右后方验车照</p>
          </div>
        </div>
        <div class>
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[8].base64String}">
              <img :src="Information[8].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'9')">
            </div>
            <p class="text-left">车架号验车照</p>
          </div>
        </div>
      </div>
      <!--地标照-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe7ff;</em> 地标照
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-center">
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[9].base64String}">
              <img :src="Information[9].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'10')">
            </div>
            <p>地标照</p>
          </div>
        </div>
      </div>
      <!--上年保单-->
      <div class="upload-item">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe63a;</em> 上年保单
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[10].base64String}">
              <img :src="Information[10].base64String">
              <input class="input" type="file" accept="image/*" @change="photoHandle($event,'11')">
            </div>
            <p>商业险照</p>
          </div>
          <div class="photo-box">
            <div class="photo" :class="{'img-default':!Information[11].base64String}">
              <img :src="Information[11].base64String">
              <input class="input" accept="image/*" type="file" @change="photoHandle($event,'12')">
            </div>
            <p>交强险照</p>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-wrap ins-center">
      <button type="button" class="sign-up-btn" @click="uploadPhoto">提交</button>
      <!--:disabled="!reserveFile" -->
    </div>
  </div>
</template>

<script>
import { image } from "@/utils/image";
import { mapGetters } from "vuex";
export default {
  name: "UploadMultiple",
  data() {
    return {
      Information: [
        {
          type: "1",
          base64String: ""
        },
        {
          type: "2",
          base64String: ""
        },
        {
          type: "3",
          base64String: ""
        },
        {
          type: "4",
          base64String: ""
        },
        {
          type: "5",
          base64String: ""
        },
        {
          type: "6",
          base64String: ""
        },
        {
          type: "7",
          base64String: ""
        },
        {
          type: "8",
          base64String: ""
        },
        {
          type: "9",
          base64String: ""
        },
        {
          type: "10",
          base64String: ""
        },
        {
          type: "11",
          base64String: ""
        },
        {
          type: "12",
          base64String: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      // user: 'AUTH',
      markInfo: "MARK_INFO",
      userId: "userId"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },

  created() {
    this.getPhotos();
  },
  methods: {
    getPhotos() {
      const params = {
        licenceNo: this.$route.query.linceNo,
        platUserId: this.businessParams.platUserId
          ? this.businessParams.platUserId
          : this.userId
      };
      this.$http.getPhotos(params).then(res => {
        if (res.data && res.data.length > 0) {
          const vehicldata = res.data[0];
          /** 1:行驶证正面 2:行驶证反面 3:身份证正面 4:身份证反面 5:验车照左前  6:验车照左后 7:验车照右前 8:验车照右后 9:车架号 10:地标照  11:上年商业险 12:上年交强险 */
          const arr = [
            vehicldata.image_IDCard, // 车主身份证正面
            vehicldata.image_IDCardContrary, // 车主身份证背面
            vehicldata.image_drivinglicense, // 车辆驾驶证正面
            vehicldata.image_drivinglicensecontrary, // 车辆驾驶证背面
            vehicldata.LFCarPhoto, // 车主验车照证左前面
            vehicldata.LRCarPhoto, // 车主验车照证左后面
            vehicldata.RFCarPhoto, // 车主验车照证右前面
            vehicldata.RRCarPhoto, // 车主验车照证右后面
            vehicldata.VINPhoto, // 车主车架号照片
            vehicldata.landmarkPhoto, // 地标照
            vehicldata.bizInsurancePhoto, // 车主上传的商业险照片
            vehicldata.SALIPhoto
          ]; // 车主上传的交强险照片

          for (let i = 0; i < 12; i++) {
            this.Information[i].base64String = arr[i];
          }
        }
      });
    },
    //图片处理
    photoHandle(event, type) {
      const currentFile = event.currentTarget;
      const file = currentFile.files[0];
      if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
        return this.$toast("不支持该格式文件");
      }
      const reader = new FileReader();
      const _this = this;
      const maxSize = 200 * 1024;
      reader.onload = function() {
        const result = this.result;
        // 合格尺寸
        if (result.length <= maxSize) {
          _this.photoPreview(type, result); //预览
          return;
        }
        // 不合格尺寸
        let photo = new Image();
        photo.src = result;

        photo.onload = function() {
          const compressedResult = image.compressImage(photo, file.type); //压缩
          _this.photoPreview(type, compressedResult); //预览
          // photo = null
        };
      };
      reader.readAsDataURL(file);
    },
    //图片预览
    photoPreview(type, result) {
      switch (type) {
        // 行驶证正面
        case type:
          this.Information[type - 1].base64String = result;
          break;
      }
    },
    /**
     * @param type : 图片类型
     * @param base64 : 图片的base64格式
     */
    uploadPhoto() {
      const params = {
        typeAndBase64: JSON.stringify(this.Information),
        platUserId: this.businessParams.platUserId
          ? this.businessParams.platUserId
          : this.userId,
        // licenceNo: '粤B88888',
        licenceNo: this.$route.query.linceNo
      };
      for (let i = 0; i < 12; i++) {
        if (!this.Information[i].base64String) {
          /** 1:行驶证正面 2:行驶证反面 3:身份证正面 4:身份证反面  5:验车照左前  6:验车照左后 7:验车照右前 8:验车照右后 9:车架号 10:地标照  11:上年商业险 12:上年交强险 **/
          switch (i + 1) {
            case 1:
              return this.$toast("请先上传身份证正面照片");
              break;
            case 2:
              return this.$toast("请先上传身份证反面照片");
              break;
            case 3:
              return this.$toast("请先上传行驶证正本照片");
              break;
            case 4:
              return this.$toast("请先上传行驶证副本照片");
              break;
            case 5:
              return this.$toast("请先上传验车照左前照片");
              break;
            case 6:
              return this.$toast("请先上传验车照左后照片");
              break;
            case 7:
              return this.$toast("请先上传验车照右前照片");
              break;
            case 8:
              return this.$toast("请先上传验车照右后照片");
              break;
            case 9:
              return this.$toast("请先上传车架号照片");
              break;
            case 10:
              return this.$toast("请先上传地标照照片");
              break;
            case 11:
              return this.$toast("请先上传上年商业险照片");
              break;
            case 12:
              return this.$toast("请先上传上年交强险照片");
              break;
          }
        }
        if (i == 11 && this.Information[11].base64String) {
          this.$http.uploadPhoto(params).then(res => {
            this.$router.push({
              name: "UploadState",
              query: {
                state: res.data.respcode == "00" ? true : false,
                type: 1
              }
            });
          });
        }
      }
    }
  }
};
// https://segmentfault.com/a/1190000011616874
// http://lucyhao.com/2017/10/24/%E5%88%A9%E7%94%A8JavaScript%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E7%9A%84Exif%E4%BF%A1%E6%81%AF/
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
#upload-info-wrap {
  width: 100%;
  .upload-banner {
    width: 100%;
    height: 437px;
    background: url($baseUrl+"images/upload/upload_banner.jpg") no-repeat center
      center/cover;
    margin-bottom: -80px;
  }
  .upload-content {
    margin: 0 20px;
    padding: 30px 25px;
    font-size: 28px;
    position: relative;
    h2 {
      margin-bottom: 20px;
      font-size: 30px;
      line-height: 60px;
      text-align: center;
    }

    em {
      color: #007aff;
    }

    p {
      text-align: center;
    }
    .bar {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      border-top: 2px solid #007aff;
    }
    .how-upload {
      position: absolute;
      right: 0;
      top: 20px;
      padding: 20px;
      z-index: 10;
      font-size: 24px;
      .iconfont {
        font-size: 32px;
      }
    }
    .upload-item {
      padding-bottom: 20px;
      margin-bottom: 30px;
      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }
    .iconfont {
      font-size: 34px;
    }
  }

  .photo-box {
    margin-bottom: 20px;
    p {
      line-height: 60px;
    }
    .text-left {
      width: 312px;
    }
  }
  .photo {
    position: relative;
    width: 312px;
    height: 182px;
    border: 1px dashed #9d9d9d;
    border-radius: 20px;
    overflow: hidden;

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    &.img-default {
      background: url($baseUrl+"images/upload/camera.png") no-repeat center
        center / 40%;
    }
  }
  .btn-wrap {
    width: 100%;
    margin: 80px 0 60px 0;
  }
}
.ins-center /deep/ {
  padding: 0;
}
</style>
