<template>
  <div class="product-wrap">
    <div class="product-banner">
      <div class="product-icon-wrap">
        <div class="product-icon insure-flexbox-column ins-align">
          <img :src="$baseUrl+'images/about/product_icon1.png'" alt="全年车险">
          <span>全年车险</span>
        </div>
        <div class="product-icon insure-flexbox-column ins-align">
          <img :src="$baseUrl+'images/about/product_icon2.png'" alt="车辆自检">
          <span>车辆自检</span>
        </div>
        <div class="product-icon insure-flexbox-column ins-align">
          <img :src="$baseUrl+'images/about/product_icon3.png'" alt="行程管理">
          <span>行程管理</span>
        </div>
        <div class="product-icon insure-flexbox-column ins-align">
          <img :src="$baseUrl+'images/about/product_icon4.png'" alt="车况监测">
          <span>车况监测</span>
        </div>
      </div>
    </div>
    <div class="product-text-wrap">
      <div class="product-describe ins-center">
        <img :src="$baseUrl+'images/about/letter_bg1.png'" alt="产品描述">
      </div>
      <div class="product_card">
        <div class="product-text">
          <div class="product-explain">
            <h3 class="ins-box">
              <em class="iconfont">&#xe679;</em>
              <span>省钱</span>
              <em class="iconfont">&#xe679;</em>
            </h3>
            <h4>按天计价，开车收费，不开车不收费</h4>
            <p>天天车保鼓励车主用户低碳出行，倡导绿色环保，平台仅在行车日收取服务费，停驶日免收服务费，开的越少越省钱。</p>
          </div>
        </div>
        <div class="product-text">
          <div class="product-explain">
            <h3 class="ins-box">
              <em class="iconfont">&#xe679;</em>
              <span>省力</span>
              <em class="iconfont">&#xe679;</em>
            </h3>
            <h4>全程手机报价办理，足不出户线上出单</h4>
            <p>每日服务费微信安全代扣，无需手动操作。</p>
          </div>
        </div>
        <div class="product-text">
          <div class="product-explain">
            <h3 class="ins-box">
              <em class="iconfont">&#xe679;</em>
              <span>省心</span>
              <em class="iconfont">&#xe679;</em>
            </h3>
            <h4>费用按天交，保障全年保</h4>
            <p>多家顶级保险公司为您提供全年不间断的保驾护航，支持速递理赔、极速理赔、全国通赔、电子理赔、7*24查勘服务；出险理赔更省心。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="product-text-wrap">
      <div class="product-describe ins-center">
        <img :src="$baseUrl+'images/about/letter_bg2.png'" alt="办理流程">
      </div>
      <div class="product_card">
        <div class="product-img ins-box">
          <div class="product-img-serial">
            <p class="serial-top">01</p>
            <p class="serial-bottom">填写信息</p>
          </div>
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content1.png'" alt="填写信息">
            </div>
          </div>
          <div class="product-img-bg'"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content2.png'" alt="选择方案">
            </div>
          </div>
          <div class="product-img-serial">
            <p class="serial-top">02</p>
            <p class="serial-bottom">选择方案</p>
          </div>
          <div class="product-img-bg-left"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-img-serial">
            <p class="serial-top">03</p>
            <p class="serial-bottom">方案签约</p>
          </div>
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content3.png'" alt="方案签约">
            </div>
          </div>
          <div class="product-img-bg'"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content4.png'" alt="确认订单">
            </div>
          </div>
          <div class="product-img-serial">
            <p class="serial-top">04</p>
            <p class="serial-bottom">确认订单</p>
          </div>
          <div class="product-img-bg-left"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-img-serial">
            <p class="serial-top">05</p>
            <p class="serial-bottom">开通代扣</p>
          </div>
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content5.png'" alt="开通代扣">
            </div>
          </div>
          <div class="product-img-bg'"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content6.png'" alt="邮寄设备">
            </div>
          </div>
          <div class="product-img-serial">
            <p class="serial-top">06</p>
            <p class="serial-bottom">邮寄设备</p>
          </div>
          <div class="product-img-bg-left"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-img-serial">
            <p class="serial-top">07</p>
            <p class="serial-bottom">设备激活</p>
          </div>
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content7.png'" alt="设备激活">
            </div>
          </div>
          <div class="product-img-bg'"></div>
        </div>

        <div class="product-img ins-box">
          <div class="product-flow">
            <div class="phone">
              <img class="content" :src="$baseUrl+'images/about/content8.png'" alt="服务生效">
            </div>
          </div>
          <div class="product-img-serial">
            <p class="serial-top">08</p>
            <p class="serial-bottom">服务生效</p>
          </div>
          <div class="product-img-bg-left"></div>
        </div>
      </div>
    </div>
    <p class="product-bottom">客服热线：
      <a href="tel:400-9898-988" class="blues">400-9898-988</a>
    </p>
  </div>
</template>
<style lang="scss" scoped>
.product-wrap {
  background: #fff;
  .product-banner {
    width: 100%;
    height: 660px;
    position: relative;
    background: url($baseUrl+"images/about/product_banner.png") no-repeat center
      center/contain;
    .product-icon-wrap {
      width: 100%;
      height: 240px;
      position: absolute;
      bottom: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 50px;
    }
    .product-icon {
      font-size: 30px;
      font-weight: bold;
      color: #15a438;
      img {
        width: 120px;
        height: 120px;
        margin: 40px 0 20px;
      }
    }
  }
  .product-text-wrap {
    padding: 0 35px;
    .product_card {
      background-color: #fff;
      padding: 25px 40px 10px;
      margin: 35px 0;
      box-shadow: 0 0 70px rgba(21, 164, 56, 0.4);
    }
    .product-describe {
      margin-top: 30px;
    }
  }
  .product-text {
    margin-bottom: 80px;
    .product-explain {
      span {
        font-size: 32px;
      }
    }
  }
  .product-img {
    margin: 40px 0 50px;
    position: relative;
    .product-flow {
      padding: 0 10px;
      .phone {
        width: 278px;
        height: 560px;
        position: relative;
        z-index: 6;
        background: url($baseUrl+"images/about/phone.png") no-repeat center
          center/contain;
      }
      .content {
        width: 245px;
        height: 445px;
        position: absolute;
        left: 18px;
        top: 44px;
        z-index: 9;
      }
    }
    .product-img-serial {
      height: 155px;
    }
    .serial-top {
      /*font-style:italic;*/
      font-style: oblique;
      font-weight: bold;
      font-size: 120px;
      line-height: 120px;
      color: #d2d2d2;
    }
    .serial-bottom {
      height: 23px;
      font-size: 30px;
      font-weight: bold;
      line-height: 30px;
      white-space: nowrap;
      letter-spacing: 12px;
      font-family: "黑体";
      color: #2f2f2f;
    }
  }
  .product-img-bg {
    position: absolute;
    top: 210px;
    right: -40px;
    width: 480px;
    height: 0;
    border-top: none;
    border-bottom: 155px #15a438 solid;
    border-left: transparent 30px solid;
    border-right: none;
    /*border-image: linear-gradient(#4caf50,#15a438) ;*/
    /*background: linear-gradient(to right, #4caf50, #15a438);*/
  }
  .product-img-bg-left {
    position: absolute;
    top: 210px;
    left: -40px;
    width: 480px;
    height: 0;
    border-top: 155px #15a438 solid;
    border-bottom: none;
    border-right: transparent 30px solid;
    border-left: none;
  }
  .product-bottom {
    padding: 50px 0;
    text-align: center;
    font-size: 24px;
    color: #9d9d9d;
  }
  img {
    width: 100%;
    vertical-align: middle;
  }

  h3 {
    width: 40%;
    margin: 30px auto;
  }
  h4 {
    width: 100%;
    margin: 30px 0;
    font-size: 28px;
    color: #15a438;
    font-weight: bold;
    text-align: center;
  }
  p {
    line-height: 50px;
    font-size: 24px;
    color: #9d9d9d;
  }
  .iconfont {
    font-size: 40px;
    color: #d6d6d6;
  }
}
</style>
