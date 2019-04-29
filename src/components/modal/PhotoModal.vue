<template>
  <div class="photo-wrap">
    <Modal @hide="hideModal">
      <div class="photo-content">
        <div class="photo">
          <i class="iconfont close-btn" @click="hideModal" v-if="close">&#xe627;</i>
          <img :src="src">
        </div>
      </div>
      <a :href="src" v-if="download">
        <!-- <i class="iconfont">&#xe712;</i> -->
        <span>提示：长按或右键图片进行保存</span>
      </a>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "PhotoModal",
  props: {
    src: String,
    download: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭modal
    hideModal() {
      this.$parent.state.showPhotoModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-wrap {
  width: 100%;
  /*height: 500px;*/
  margin: auto;
  // overflow: hidden;
  text-align: center;
  /deep/ #modal {
    flex-direction: column;
  }
  .photo-content {
    max-width: 90%;
    max-height: 80%;
    overflow: hidden;
    overflow-y: scroll;
    // border-radius: 4px;
    // height: 80%;
    // display: flex;
    // align-items: center;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .photo {
    position: relative;
  }
  img {
    vertical-align: middle;
  }
  .close-btn {
    position: fixed;

    right: 80px;
    margin-top: 30px;
    z-index: 11;
    font-size: 40px;
    color: #ccc;
  }
  a {
    display: inline-block;
    margin-top: 20px;
    line-height: 50px;
    text-align: center;
    color: #ccc;
    .iconfont {
      font-size: 40px;
    }
    span {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
