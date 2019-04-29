<template>
  <div class="refund-wrap">
    <div class="refund">
      <div class="refund-criteria insure-card">
        <p class="ins-box border-bottom-scaleY refund-title">
          <span>退还设备</span>
          <span>x1</span>
        </p>
        <div class="refund-device ins-box border-bottom-scaleY">
          <img class="divice-left" :src="`${baseUrl}images/reserve/reserve_device.png`" alt="天天车保设备">
          <div class="device-right">
            <p>设备ID：{{$route.query.deviceCode}}</p>
            <p>因数盒子车载智能终端 <br>
              车险专用智能硬件产品</p>
          </div>
        </div>

        <div class="refund-reason">
          <p class="reason-title">申请原因</p>
          <div class="reason-content" v-if="!refundInfo">
            <textarea
              rows="5"
              cols="35"
              placeholder="请根据实际情况填写原因"
              v-model="userRefundReason"
            ></textarea>
            <!--maxlength="160"-->
          </div>
          <p v-if="refundInfo&&refundInfo.refundReason" class="grays">{{refundInfo.refundReason}}</p>
        </div>
        <p class="refund-deposit ins-box">
          <span>退款金额</span>
          <span>￥200</span>
        </p>

      </div>

      <!--申请状态-->
      <div class="refund-status-wrap" v-if="refundInfo">
        <div class="refund-status insure-card" v-if="refundInfo.respcode == '03'">
          <p class="status-title border-bottom-scaleY red">
            <em class="iconfont">&#xe704;</em>
            <span>申请驳回</span>
          </p>
          <p class="status-info border-bottom-scaleY">{{refundInfo.rejectReason}}</p>
          <p class="status-tip">温馨提示：经审核不符合退押金要求，您可重新发起申请！</p>
        </div>
        <div class="refund-status insure-card" v-if="refundInfo.respcode == '04'">
          <p class="status-title border-bottom-scaleY green">
            <em class="iconfont">&#xe77d;</em>
            <span>申请成功</span>
          </p>
          <p class="status-tip">温馨提示：押金会尽快退还，请注意微信钱包或银行卡退款信息！</p>
        </div>
        <div class="refund-status padding-plus ins-center insure-card" v-if="refundInfo.respcode == '02'">
          <p class="oranges">
            <em class="iconfont">&#xe784;</em>
            <span>申请处理中</span>
          </p>
        </div>
      </div>

      <ConfirmButton v-if="!refundInfo" ref="confirmButton" @change="postRefund($event)" ></ConfirmButton>
    </div>
    <div class="customer-service ins-center">
      <p class="ins-align">
        如有疑问，请联系客服热线：<a href="tel:400-9898-988" class="blues"> 400-9898-988</a>
      </p>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from "vuex";
  import ConfirmButton from '@/components/share/ConfirmButton'

    export default {
      name: "Refund",
      components:{
        ConfirmButton,
      },
      computed: {
        ...mapGetters({
          userId: "userId"
        }),
      },
      data() {
        return {
          refundInfo: null, // 退款状态详情 Object
          userRefundReason: '', // 申请原因,用户填写
          // refundStatus: '', // 退款状态  00 已支付  02审核中 03退款失败
          // rejectReason: '', // 驳回原因
        }
      },
      created() {
        this.getRefundStatus();
      },
      methods: {
        // 查询退款申请状态
        getRefundStatus() {
          const params = {
            carId: this.$route.query.carId
          };
          this.$http.getRefundStatus(params).then(res => {
            if (res.data.respcode == '01' || res.data.respcode == '00') {
              return this.refundInfo = null;
            }
            this.refundInfo = res.data;
          });
        },
        // 退款提交
        postRefund() {
          const params = {
            platUserId: this.userId,
            orderId: this.$route.query.depositId,
            // orderId: 99,
            refundReason: this.userRefundReason,
            type: '2' // 退款类型 1为每日扣费退款 2 为押金退款
          };
          this.$http.postRefund(params).then(res => {
            console.log(res.data);
            if (res.data.respcode == '00') {
              this.$toast('申请提交成功');
              this.getRefundStatus();
            }
            if (res.data.respcode == '01' ) {
              this.$toast(res.data.refundReason?res.data.refundReason:'申请提交失败，请稍后重试');
            }

          });
        }
      }
    }
</script>

<style lang="scss" scoped>
  .refund-wrap {
    padding: 30px;
  }
  .refund {
    font-size: 26px;
    line-height: 60px;
    color: #333;

    .refund-title {
      padding-bottom: 10px;
    }
    .refund-device {
      color: #9d9d9d;
      padding: 20px 0;
      .divice-left {
        width: 220px;
        padding-top: 26px ;
      }
    }
    .refund-reason {
      .reason-title{
        line-height: 80px;
      }
      textarea {
        width: 100%;
        padding: 10px 20px;
        background: #f6f6f6;
        border-radius: 10px ;
        font-size: 26px;
        line-height: 50px;
      }
    }
    .refund-status {
      .status-title {
        text-align: center;
        line-height: 60px;
        padding-bottom: 20px;
        .iconfont {
          font-size: 36px;
        }
      }
      .status-info {
        padding: 16px 0;
      }
      .status-tip {
        font-size: 24px;
        color: #9d9d9d;
      }
    }
    .padding-plus {
      padding: 50px 0 ;
    }
    .red {
      color: red;
    }
    .green {
      color: #1aad19;
    }
  }
  .customer-service {
    margin-top: 80px;
    font-size: 24px;
    line-height: 40px;
  }



</style>
