<template>
  <div id="upload-info-wrap">
    <div class="upload-content insure-card">
      <!--身份证正面上传样式-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe674;</em> 身份证
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl3)">
            <div class="photo">
              <img :src="samples.imgUrl3">
            </div>
            <p>身份证正面上传样式</p>
          </div>
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl4)">
            <div class="photo">
              <img :src="samples.imgUrl4">
            </div>
            <p>身份证反面上传样式</p>
          </div>
        </div>
      </div>
      <!--行驶证正本上传样式-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe636;</em> 行驶证
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl1)">
            <div class="photo">
              <img :src="samples.imgUrl1" alt>
            </div>
            <p>行驶证正本上传样式</p>
          </div>
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl2)">
            <div class="photo">
              <img :src="samples.imgUrl2" alt>
            </div>
            <p>行驶证副本上传样式</p>
          </div>
        </div>
      </div>
      <!--验车照右后上传样式-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe6c3;</em> 验车照
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl7)">
            <div class="photo">
              <img :src="samples.imgUrl7" alt>
            </div>
            <p>验车照左前上传样式</p>
          </div>
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl8)">
            <div class="photo">
              <img :src="samples.imgUrl8" alt>
            </div>
            <p>验车照左后上传样式</p>
          </div>
        </div>
        <div class="ins-box">
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl5)">
            <div class="photo">
              <img :src="samples.imgUrl5" alt>
            </div>
            <p>验车照右前上传样式</p>
          </div>
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl6)">
            <div class="photo">
              <img :src="samples.imgUrl6" alt>
            </div>
            <p>验车照右后上传样式</p>
          </div>
        </div>
        <div class>
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl9)">
            <div class="photo">
              <img :src="samples.imgUrl9" alt>
            </div>
            <p class="text-left">验车照车架号上传样式</p>
          </div>
        </div>

        <p class="hint">
          <strong>【验车照】</strong> 要求：45度角全车照片4张（左前，左后，右前，右后）+车架照片1张；需要与出单当天报纸报头一起拍摄（不遮挡到车身，报头需体现拍摄日期）
        </p>
      </div>

      <!--地标照上传样式-->
      <div class="upload-item border-bottom-scaleY">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe7ff;</em> 地标照
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-center">
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl10)">
            <div class="photo">
              <img :src="samples.imgUrl10" alt>
            </div>
            <p>地标照上传样式</p>
          </div>
        </div>
        <p class="hint">
          <strong>【地标照】</strong> 要求：异地车投保需验地标，需有当地标识的建筑物组合拍或用当地报纸验车
        </p>
      </div>
      <!--商业险上传样式-->
      <div class="upload-item">
        <h2>
          <em class="bar"></em>
          <span>
            <em class="iconfont">&#xe63a;</em> 上年保单
          </span>
          <em class="bar"></em>
        </h2>
        <div class="ins-box">
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl11)">
            <div class="photo">
              <img :src="samples.imgUrl11" alt>
            </div>
            <p>商业险上传样式</p>
          </div>
          <div class="photo-box" @click="showPhotoModal(samples.imgUrl12)">
            <div class="photo">
              <img :src="samples.imgUrl12" alt>
            </div>
            <p>交强险上传样式</p>
          </div>
        </div>
      </div>
    </div>

    <PhotoModal :src="currentImageSrc" v-if="state.showPhotoModal"></PhotoModal>
  </div>
</template>

<script>
import { image } from "@/utils/image";
import { mapGetters } from "vuex";
// import PhotoModal from '@/components/modal/PhotoModal'
export default {
  name: "UploadFaq",
  components: {
    PhotoModal: () => import("@/components/modal/PhotoModal")
  },
  data() {
    return {
      state: {
        showPhotoModal: false
      },
      currentImageSrc: "",
      /*
      1:行驶证正面 2:行驶证反面 3:身份证正面 4:身份证反面  5:验车照左前  6:验车照左后 7:验车照右前 8:验车照右后 9:车架号 10:地标照  11:上年商业险 12:上年交强险
      * */
      samples: {
        imgUrl1: this.$baseUrl + "images/upload/drive_a.png",
        imgUrl2: this.$baseUrl + "images/upload/drive_b.png",
        imgUrl3: this.$baseUrl + "images/upload/idcard_a.png",
        imgUrl4: this.$baseUrl + "images/upload/idcard_b.png",
        imgUrl5: this.$baseUrl + "images/upload/car_a.png",
        imgUrl6: this.$baseUrl + "images/upload/car_b.png",
        imgUrl7: this.$baseUrl + "images/upload/car_c.png",
        imgUrl8: this.$baseUrl + "images/upload/car_d.png",
        imgUrl9: this.$baseUrl + "images/upload/car_e.png",
        imgUrl10: this.$baseUrl + "images/upload/landmark.png",
        imgUrl11: this.$baseUrl + "images/upload/commercial_order.png",
        imgUrl12: this.$baseUrl + "images/upload/force_order.png"
      }
    };
  },
  computed: {
    ...mapGetters({
      markInfo: "MARK_INFO",
      userId: "userId"
    })
  },
  created() {
    // this.getPhotos()
  },
  methods: {
    showPhotoModal(str) {
      this.currentImageSrc = str;
      this.state.showPhotoModal = true;
      // this.$refs.photoModal.showModal(str);
    }
  }
};
// https://segmentfault.com/a/1190000011616874
// http://lucyhao.com/2017/10/24/%E5%88%A9%E7%94%A8JavaScript%E8%8E%B7%E5%8F%96%E5%9B%BE%E7%89%87%E7%9A%84Exif%E4%BF%A1%E6%81%AF/
</script>

<style lang="scss" scoped>
#upload-info-wrap {
  width: 100%;
  padding: 30px 0;
  .upload-content {
    margin: 0 20px;
    padding: 30px 25px;
    font-size: 28px;
    h2 {
      margin-bottom: 20px;
      font-size: 28px;
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
    .upload-item {
      padding-bottom: 20px;
      margin-bottom: 30px;
      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }
    .iconfont {
      font-size: 32px;
    }
  }
  .hint {
    font-size: 26px;
    line-height: 40px;
    text-align: left !important;
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
