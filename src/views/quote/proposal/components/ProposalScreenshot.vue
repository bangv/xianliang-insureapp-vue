<template>
  <div class="screenshot-wrap">
    <div class="screenshot-content" ref="screenshot">
      <div class="content-header">
        <h2>
          <b>{{markInfo.linceNo}} {{carInfo.CarOwnersName}}</b>
        </h2>

        <span class="mold-name">{{carInfo.MoldName}}</span>

        <p class="flex flex-jc-b">
          <em>服务时间</em>
          <span>{{carInfo.BizStartDate}}至{{carInfo.BizStartDate|handleDeadline}}</span>
        </p>
      </div>
      <div class="list">
        <div class="item" v-for="(item,index) in companys" :key="index">
          <b>{{item.insure_company_code|companyName}}</b>
          <!--隐藏内容-->
          <InsureTable :insure="item.detail" v-if="item.detail"></InsureTable>
          <div class="item-footer">
            <p>
              <em>每日价格</em>
              <span v-if="item.planList">{{item.planList[0].dailytotal}}元/天</span>
            </p>
            <p>
              <em>封顶天数</em>
              <span v-if="item.planList">{{item.planList[0].total_days}}天</span>
            </p>
          </div>
        </div>
        <p class="tips">以上价格仅供参考，价格可能受您的历史理赔情况等原因影响，最终价格以出单为准</p>
      </div>
    </div>

    <PhotoModal :src="photoSrc" v-if="state.showPhotoModal" :download="true"></PhotoModal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import PhotoModal from "@/components/modal/PhotoModal";
import InsureTable from "./InsureTable";
import { image } from "@/utils/image";
export default {
  components: {
    PhotoModal,
    InsureTable
  },
  props: {
    shot: Boolean,
    companys: Array
  },
  computed: {
    ...mapGetters({
      carInfo: "CAR_INFO",
      markInfo: "MARK_INFO",
      insuranceInfo: "INSURED_INFO",
      // insurant: "insurant",
      userId: "userId",
      salesPhone: "salesPhone"
    }),
    businessParams() {
      return this.$store.getters.businessParams;
    }
  },
  data() {
    return {
      photoSrc: "",
      state: {
        showPhotoModal: false
      }
    };
  },
  mounted() {
    this.html2Image();
  },
  methods: {
    /**
     * @description 将整个页面转化为图片
     * @param {Object} company 保司对象
     * */
    html2Image() {
      // this.$refs.screenshot
      image.html2Image(this.$refs.screenshot).then(result => {
        if (result) {
          this.photoSrc = result;
          this.state.showPhotoModal = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.screenshot-wrap {
  margin: 0 20px;
  //  /deep/ .photo{
  //    border-radius:8px;
  //    img{
  //    border-radius:8px;

  //    }
  // background-color:#fff;

  //  }
  /deep/ {
    #insure-table {
      padding-bottom: 30px;
      border-bottom: 1px solid #efefef;
    }
  }
  .tips {
    padding: 30px 0;
    margin: auto;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    color: #9b9b9b;
  }
}
.screenshot-content {
  position: absolute;
  z-index: -1;
  top: 0;
  padding: 0 30px;
  border-radius: 8px;
  background-color: #fff;
  .content-header {
    padding: 30px 0;
    font-size: 24px;
    border-bottom: 1px solid #efefef;
    h2 {
      margin-bottom: 20px;
      font-size: 28px;
    }
    p {
      margin-top: 30px;
    }
    .mold-name {
      color: #9d9d9d;
    }
  }
  .item {
    border-bottom: 1px solid #efefef;
    b {
      display: block;
      padding-top: 30px;
      font-size: 28px;
      /*line-height: 100px;*/
    }
    .item-footer {
      padding: 20px 0;
      font-size: 24px;
      line-height: 60px;
      p {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
a {
  background-color: #fff;
}
</style>
