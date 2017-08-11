<template>
    <div class="empty-page">
        <div class="header-empty">
            <div class="content">
                <div class="right-wrapper" >
                    <p class="title" >让再小的店铺，也能实现移动电商化</p>
                    <div class="subtitle">联盟商家专属的客户端</div>
                     <div class="mint" @click="$router.replace('/store')">马上开通店铺</div>
                </div>
            </div>
        </div>
        <mt-loadmore :top-method="loadTop"  ref="loadmore" >
            <mt-cell title="销售额"></mt-cell>
            <div class="grid amount-grid">
                <div  class="item">
                    <img src="../../images/home/amount.png" alt="" height="22px">
                    <div class="amount">0</div>
                    <div class="title">昨日销售额(元)</div>
                </div>
                <div  class="item">
                    <img src="../../images/home/amount-1.png" alt="" height="22px">
                    <div class="amount">0</div>
                    <div class="title">累计销售额(元)</div>
                </div>
            </div>
            <div  class="account">
                <mt-cell title="我的账户" ></mt-cell>
                <mt-cell title="待结算"  value="0" class="normalItem"></mt-cell>
                <mt-cell title="奖励金额"  value="0" class="normalItem"></mt-cell>
                <mt-cell title="可提现余额"  value="0" class="normalItem"></mt-cell>
                <mt-cell>
                    <p slot="title" style="text-align: center;color: #508cee;font-size: 12px">查看更多账户信息</p>
                </mt-cell>
            </div>
            <div  class="diy-order">
                <mt-cell   is-link @click.native="openStoreMessage">
                    <div slot="title">免单团订单 <span style="font-size: 12px;color: #999">(待验证1000)</span></div>
                </mt-cell>
                <div class="grid">
                    <div class="item">
                        <img src="../../images/home/deliv.png" alt="" height="20px">
                        <div class="title">待验证</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/order-verifi.png" alt="" height="20px">
                        <div class="title">已验证</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/fail.png" alt="" height="20px">
                        <div class="title">已过期</div>
                    </div>
                </div>
            </div>
            <div  class="diy-order">
                <mt-cell  is-link @click.native="openStoreMessage">
                    <div slot="title">自营订单 <span style="font-size: 12px;color: #999">(待验证1000)</span></div>
                </mt-cell>
                <div class="grid">
                    <div class="item">
                        <img src="../../images/home/deliv.png" alt="" height="20px">
                        <div class="title">待支付</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/order-verifi.png" alt="" height="20px">
                        <div class="title">待发货</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/fail.png" alt="" height="20px">
                        <div class="title">已发货</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/fail.png" alt="" height="20px">
                        <div class="title">已完成</div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { MessageBox } from 'mint-ui';
    export default {
        mounted () {
            this.$navigation.cleanRoutes()
        },
        methods: {
            loadTop() {
                setTimeout(() => {
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            openStoreMessage () {
                let self  = this
                function onConfirm(buttonIndex) {
                 if(buttonIndex ===1){
                     self.$router.replace('/store')
                 }
                }
                navigator.notification.confirm(
                    '开通店铺后，才能访问！', // message
                    onConfirm,            // callback to invoke with index of button pressed
                    '提示',           // title
                    ['立即开通','暂不开通']     // buttonLabels
                );
            }
        },
    }
</script>
<style>
.empty-page{
    padding-bottom: 50px;
    background-color: #f5f5f5;
}
.empty-page .mint-cell-wrapper{
    padding: 0 15px;
    font-size: 14px;
}
.empty-page .content{
    width: 100%;
    height: 150px;
    background-image: -webkit-linear-gradient(left, #508cee, #77a3fc);
}
.empty-page .header .mint-cell-wrapper{
    background-image: none;
}
.empty-page .content .mint-cell{
    background-color: transparent;
    color: #fff;
    font-size: 14px;
}
.empty-page .content .mint-cell:last-child{
    background-image: none;
}
.empty-page  .content .mint-cell-wrapper{
    padding-top: 10px;
}
.empty-page .grid{
    display: flex;padding-top: 20px
}
.empty-page .grid .grid-item{
    flex: 1;text-align: center;
}
.empty-page .grid-item .title{
    color: #fff;
    font-size: 13px;
    margin-top: 10px;
}
.empty-page  .amount-grid{
    padding: 0 10px 15px 10px;
    margin-bottom: 10px;
    background-color: #fff;
}
.empty-page  .amount-grid .item{
    flex: 1;
    text-align: center;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    margin: 0 5px;
    padding: 20px 0;
}
.empty-page .amount-grid .amount{
    font-size: 19px;
    color: #ff801a;
    margin: 10px 0 5px 0;
}
.empty-page .amount-grid .title{
    font-size: 12px;
    color: #999;
}
.empty-page .normalItem{
    font-size: 12px;
}
.empty-page .account{
    margin-bottom: 10px
}
.empty-page .mint-cell-wrapper{
    background-image: linear-gradient(180deg, #f7f7f7, #f7f7f7 50%, transparent 50%)
}
.empty-page .normalItem .mint-cell-title{
    flex: 0 0 82px;
    font-size: 12px;
    border-right: 1px solid #f7f7f7;
    margin-right: 10px;
}
.empty-page .normalItem .mint-cell-value{
    color: #ff801a;
    font-size: 18px;
    line-height:1.5;
}
.empty-page .diy-order .grid{
    background-color: #fff;
    padding: 20px 0;
    margin-bottom: 10px;
}
.empty-page .diy-order .item{
    flex: 1;
    text-align: center;
    border-right: 1px solid #f7f7f7;
}
.empty-page .diy-order .item .title{
    font-size: 12px;
    color: #666666;
    margin-top: 10px;
}
.empty-page .header-empty{
    background:#fff;
    height:124px;
    padding:29px 15px 15px 15px;
    margin-bottom: 10px;
    overflow: hidden;
}
.empty-page .header-empty .content{
    background: url(../../images/home/header_bg.png) no-repeat top center;
    -webkit-background-size:contain;
    background-size: contain;
}
.empty-page .header-empty .right-wrapper{
    float: right;
}
.empty-page .header-empty .title{
    color: #333;font-size: 13px;font-weight: 700;margin:13px 0 5px 0
}
.empty-page .header-empty .subtitle{
    font-size: 12px;color: #999;
}

.empty-page .header-empty .mint{
    line-height:45px;
    height:50px;
    width: 125px;
    color: #fff;
    padding: 0;
    text-align: center;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    background: url(../../images/home/btn-bg.png) top center;
    -webkit-background-size:100% 50px;
    background-size:100% 50px;
}
</style>
