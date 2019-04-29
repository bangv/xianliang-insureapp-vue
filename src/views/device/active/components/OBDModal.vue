<template>
  <div class="obd-modal">
    <TipModal
      @hide="hideModal"
      title="OBD接口位置指引"
      :line="false"
    >
      <img
        :src="`${baseUrl}images/obd-guide.jpg`"
        alt=""
      >
      <div class="content-text">
        <p> 一般在方向盘下面,刹车踏板上方。有些车有个盖子，需要打开；有些车需要向外拖拉接口才可看到。</p>
        <p>
          <b>A区域：</b>通用、大众、福特、丰田、现代、雪铁龙、宝马等品牌的大部分车型。</p>
        <p>
          <b>B区域：</b>本田、大众途安、进口雷克萨斯等车型。</p>
        <p>
          <b>C区域：</b>东风雪铁龙、东风标致等少量车型。</p>
        <p>
          <b>D区域：</b>东风雪铁龙等少量车型。</p>
      </div>
    </TipModal>
  </div>
</template>
<script>
import TipModal from "@/components/modal/TipModal";
export default {
  name: "OBDModal",
  components: {
    TipModal
  },
  methods: {
    hideModal() {
      this.$parent.state.showOBDModal = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.obd-modal {
  width: 100%;
  text-align: justify;
  img {
    margin-bottom: 10px;
  }
  .content-text {
    padding: 0 30px;
    line-height: 50px;
  }
}
</style>
