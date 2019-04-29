<template>
  <div class="upload-photo-wrap">
    <div class="upload-photo">
      <h1>
        拍下
        <strong>【身份证】</strong>和
        <strong>【行驶证】</strong>正面，并上传
      </h1>

      <div class="id-card insure-card">
        <p>请上传身份证</p>
        <div class="photo" :class="{'id-default':!idPhoto.base64String}">
          <img :src="idPhoto.base64String" alt id="id-photo">
          <input
            id="id"
            class="input"
            type="file"
            accept="image/*"
            @change="photoHandle($event,'1')"
          >
        </div>
      </div>
      <div class="id-card insure-card">
        <p>请上传行驶证</p>
        <div class="photo" :class="{'driving-default':!drivingLicensephoto.base64String}">
          <img :src="drivingLicensephoto.base64String" alt id="id-photo">
          <input
            id="driving-license"
            class="input"
            accept="image/*"
            type="file"
            @change="photoHandle($event,'3')"
          >
        </div>
      </div>
      <button class="sign-up-btn" @click="uploadPhoto">提交</button>
    </div>
  </div>
</template>

<script>
import { image } from "@/utils/image";
import { mapGetters } from "vuex";

export default {
  name: "Upload",
  data() {
    return {
      // uploadState: false,
      idPhoto: {
        type: "3",
        base64String: ""
      },
      drivingLicensephoto: {
        type: "1",
        base64String: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      // user: 'AUTH',
      markInfo: "MARK_INFO",
      userId: "userId"
    })
  },
  created() {
    this.getPhotos();
  },
  methods: {
    getPhotos() {
      const params = {
        licenceNo: this.markInfo.linceNo,
        platUserId: this.userId
      };
      this.$http.getPhotos(params).then(res => {
        if (res.data && res.data.length > 0) {
          this.idPhoto.base64String = res.data[0].image_IDCard;
          this.drivingLicensephoto.base64String =
            res.data[0].image_drivinglicense;
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
        case "3":
          this.drivingLicensephoto.base64String = result;
          break;
        case "1":
          // 身份证正面
          this.idPhoto.base64String = result;
          break;
      }
    },
    /**
     * @param type : 图片类型
     * @param base64 : 图片的base64格式
     */
    uploadPhoto(type, base64) {
      const params = {
        typeAndBase64: JSON.stringify([this.idPhoto, this.drivingLicensephoto]),
        platUserId: this.userId,
        licenceNo: this.markInfo.linceNo
      };

      if (!this.idPhoto.base64String) {
        this.$toast("请先上传身份证照片");
      } else if (!this.drivingLicensephoto.base64String) {
        this.$toast("请先上传行驶证照片");
      } else {
        this.$http.uploadPhoto(params).then(res => {
          this.$router.push({
            name: "UploadState",
            query: {
              state: res.data.respcode == "00" ? true : false
            }
          });
        });
      }
    }
  }
};
// https://segmentfault.com/a/1190000011616874
// http://lucyhao.com/2017/10/24/%E5%88%A9%E7%94%A8JavaScript%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E7%9A%84Exif%E4%BF%A1%E6%81%AF/
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.upload-photo {
  padding: 30px 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 28px;
    text-align: center;
  }
  p {
    text-align: center;
  }
  .photo {
    position: relative;
    width: 100%;
    height: 400px;
    margin-top: 14px;

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    &.id-default {
      background: url($baseUrl+"images/shengfenzheng.jpg") no-repeat center
        center / contain;
    }
    &.driving-default {
      background: url($baseUrl+"images/driveing.jpg") no-repeat center center /
        contain;
    }
  }
  .sign-up-btn {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
}
</style>
