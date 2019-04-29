<template>
  <div class="faq">
    <img :src="$baseUrl+'images/about/faq.jpg'" alt="">
    <div class="slot">
      <div class="slot-header">
        <p>
          <i></i>
          <i></i>
          <i></i>
        </p>
        <p>
          <i></i>
          <i></i>
          <i></i>
        </p>
      </div>
      <div class="slot-content"></div>
    </div>
    <section>
      <div class="item">
        <p class="question">
          <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>用户怎么交费？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span> 天天车保按天收取用户服务费，用户只需开通并绑定微信支付，即可在开车当日自动扣费，不开车不扣费。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span> 如何判定用户是否开车？</span>
        </p>
        <p class="answer"> <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>用户会收到平台邮寄的天天车保OBD智能终端（因数盒子），将盒子插在汽车的OBD接口上。汽车点火视为开车。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>办理成功后，获赠的车险时效性是多久？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>用户成功办理后，天天车保将会向保险公司购买一份汽车商业险赠送给用户，其保障时间与常规车险一致，保险时效为一年期。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>用户会收到哪些凭证？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>天天车保平台提供所赠送的汽车商业险保单的电子文件，该文件在报案和理赔的过程中与纸质文件享有同等效力，用户如需要纸质文件，可提供扫描件或复印件。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>出险以后，如何理赔？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>当用户出险后，可以直接拨打保单对应的保险公司的报案电话，报案和理赔与传统车险理赔流程一样。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>车辆停驶期间不用支付平台服务费，假如出险， 保险公司理赔吗？</span>
        </p>
        <p class="answer"> <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>因为平台赠送给注册用户的汽车商业险是一年期的常规汽车商业险，因此用户是否用车不影响正常理赔，出险后事故责任根据保险公司出险产品条款正常理赔。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>如何绑定激活天天车保OBD智能终端？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>办理天天车保服务后，进入天天车保设备激活页面，扫描天天车保OBD智能终端上的二维码完成绑定。然后按照设备激活指引，将设备插入车辆OBD接口并点火通电完成激活。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>天天车保OBD智能终端未绑定及未激活怎么扣费？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>赠送的汽车商业险生效后，未完成绑定和激活的用户，均视为设备状态异常，平台将按照相关服务规则进行扣费。请务必于保单生效前完成安装。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>收到异常提醒信息怎么处理？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span> OBD设备松动或无网络信息时，会收到异常提醒信息，为保障您的车辆服务，请及时检查您的设备连接情况或拨打客服热线：400-9898-988</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>OBD智能设备与平台通讯中断时，如何扣费？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>1、智能终端会保存通讯中断期间的车辆数据，待重新连接后会自动上传数据；平台将根据实际用车情况进行处理（用车扣费，不用车不扣费）。2、OBD智能终端松动等异常情况，视为设备拔出，将按照相关规则扣费。用户在收到此类扣费通知或OBD智能终端提醒通知时，务必及时确认天天车保OBD智能终端状态正常或拨打客服热线：400-9898-988</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>如果因用户原因不能实现扣费，会产生什么后果？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>如果因用户人为原因无法扣费（如绑定账户余额不足），天天车保客服会主动联系用户充值并补扣费用。如果多次联系无果，将以书面形式告知用户拒付后果，将终止为此用户提供平台服务，并不再继续向用户赠送汽车商业险。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span> 一个账号可以绑定多台车辆吗？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>可以的。一个天天车保的账号可以绑定八台车辆。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>使用天天车保OBD智能终端需要支付其他的费用吗？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>天天车保OBD智能终端采用支付押金，免费使用的方式获得。用户只需要支付200元押金即可终身免费使用。</span>
        </p>
      </div>
      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span> 押金随时可退吗？退货规定是怎样的？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>当用户不再使用天天车保的服务时，可以在指定的业务受理点办理业务终止手续，或将设备邮寄至指定地址。待确认收回的智能设备没有人为损坏并且可以正常使用后，天天车保将会在7个工作日内退还用户押金。如已损坏或无法正常使用押金将不予退还。</span>
        </p>
      </div>

      <div class="item">
        <p class="question"> <img :src="$baseUrl+'images/about/question.jpg'" alt="">
          <span>天天车保OBD智能终端是否会对车辆造成异常，会影响保修吗？</span>
        </p>
        <p class="answer">
          <img :src="$baseUrl+'images/about/answer.jpg'" alt="">
          <span>天天车保OBD智能终端属于车辆的外置设备，与导航、行车记录仪等设备性质相同，不会改变车辆状态，所以不会影响车辆保修。</span>
        </p>
      </div>
    </section>
    <footer>
      <div class="text">
        <p> 如您在使用过程中，有任何疑问或需要帮助</p>
        <p>可直接拨打客服热线：
          <a href="tel:400-9898-988">400-9898-988</a>
        </p>
      </div>
      <div class="img'">
        <img :src="$baseUrl+'images/about/footer.png'" alt="">
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.faq {
  position: relative;
  padding-bottom: 100px;
  background: -webkit-linear-gradient(top, #ffbe35, #ffb80b);
  img {
    width: 100%;
    vertical-align: middle;
  }
  .slot {
    position: relative;
    // height: 79px;
    padding: 10px 16px;
    margin: 0 20px;
    background: -webkit-linear-gradient(top, #ee4421, #f15a2b);
    border-radius: 24px;
    .slot-header {
      display: flex;
      justify-content: space-between;
      // padding-top: 10px;
      i {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgba(255, 223, 179, 0.6);
        opacity: 0.6;
      }
    }
    .slot-content {
      // position: absolute;
      // left: 0;
      // right: 0;
      // bottom: 0;
      // z-index: 9;
      margin-top: 5px;
      height: 30px;
      background-color: #b42909;
      border-radius: 11px;
    }
  }
  section {
    position: relative;
    margin: -34px 49px 0 49px;
    padding: 40px 30px 0 30px;
    box-shadow: 0 14px 6px 0 #999 inset;
    background-color: #fff;
    .item {
      padding: 30px 0;
      border-bottom: 1px dotted #ccc;
    }

    span {
      overflow: hidden;
      display: block;
      text-align: justify;
    }
    img {
      float: left;
      width: 43px;
      height: 43px;
      margin-right: 20px;
    }
    .question {
      margin-bottom: 32px;
      font-size: 24px;
      color: #f4592c;
    }
    .answer {
      font-size: 24px;
      line-height: 60px;
      color: #5c606d;
    }
  }
  footer {
    .text {
      padding: 50px 0;
      margin: 0 50px;
      font-size: 24px;
      line-height: 60px;
      text-align: center;
      color: #949494;
      background-color: #fff;
    }
    .img {
      margin: -25px 50px;
    }
  }
}
</style>
