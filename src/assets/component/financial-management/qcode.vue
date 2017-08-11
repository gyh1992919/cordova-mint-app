<template>
    <div class="qcode">
        <mt-header fixed title="我的收款码">
            <router-link to="/index/user" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="content">
             <p class="title">时光购支持以下付款方式</p>
             <div  class="pay-img">
                 <div  class="alipay-img">
                     <img src="../../images/financial-management/alipay.png" alt="" width="80px">
                 </div>
                 <div  class="wei-img">
                     <img src="../../images/financial-management/weixinpay.png" alt="" width="100px">
                 </div>
             </div>

            <div  class="code-wrapper">
                <p  class="logo">
                    <img src="../../images/financial-management/logo-2.png" alt="" height="40">
                </p>
                <div  class="img">
                    <img  :src="'https://mihutime.com/site/qrcode?text=' + data"  alt=""  >
                    <span>打开手机扫一扫付款</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
      computed: mapState({
          data: state => state.Login.data.payUrl
      })
    }
</script>

<style>
.qcode{
    padding-top: 50px;
    background-color: #f9f9f9;
    height:100%;
}
.qcode .content{
    margin-top: 10px;
    display: table;
    text-align: center;
    width: 100%;
    background-color: #f9f9f9;
}
.qcode .content .title{
    color: #333;
    font-size: 13px;
}
.qcode .content .pay-img {
    text-align: center;
    display: flex;
    width: 100%;
    position: relative;
    margin: 10px 0 50px
}
.qcode .content .pay-img .alipay-img{
    flex: 1;text-align: right;padding-right: 20px
}
.qcode .content .pay-img .wei-img {
    flex: 1;
    text-align: left;
    padding-left: 20px
}
.qcode .code-wrapper {
    background-color: #538eef;
    position: absolute;
    top: 170px;
    width: 100%;
    bottom: 0;
    padding-top: 10px;
    box-shadow: 0 3px 12px rgba(47,50,56,0.26);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px
}
.qcode .code-wrapper .logo{
    text-align: center;
    margin: 30px 0;
}
.qcode .code-wrapper .img{
    height: 177px;
    width: 167px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding: 15px 15px 20px;
}
.qcode .code-wrapper .img img{
    max-width: 100%;
    display: block
}
</style>
