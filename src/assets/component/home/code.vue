<template>
    <!-- App -->
    <div class="code">
        <mt-header title="确认兑换" fixed>
            <router-link to="/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
         <div class="ipt">
             <mt-field  v-model="barCode.text"  type="number" class="barCode">
                 <div @click="open"><img src="../../images/code/code.png" alt="" height="25"></div>
             </mt-field>
         </div>
        <div class="item"  v-if="codeInfo.product">
            <img :src="codeInfo.product.image" alt="" width="80" height="80">
            <div class="desc" >
                <div class="title">{{codeInfo.product.name}}</div>
                <div class="quanlity" >数量:1</div>
                <div class="costPrice" >
                    <span  class="cosText">供应价: <span style="color: #ff801a;font-size: 15px"><span style="font-size: 12px;padding-right: 1px">¥</span>{{codeInfo.product.costPrice}}</span> </span>
                    <span class="mask">{{codeInfo.product.isGiving}}</span>
                </div>
            </div>
        </div>
        <div style="padding: 0 15px">
            <mt-button type="primary" size="large"  class="confirmbtn" @click.native="confirmVerify">确认兑换</mt-button>
        </div>
        <mt-popup v-model="codePopupVisible" position="right" class="code-popup-status" :modal="false">
            <div class="content">
                <img src="../../images/code/success.png" alt="" height="60px">
                <p>兑换成功</p>
                <div  class="btn-groups">
                    <mt-button plain  class="return" @click.native="returnMain">返回首页</mt-button>   <mt-button plain  class="next" @click.native="next">继续兑换</mt-button>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { Toast } from 'mint-ui'
    export default {
        data () {
            return {
                codePopupVisible: false,
                barCode: {
                    text: null
                },
                code: '',
                codeInfo: {}
            }
        },
        computed: mapState({
            store: state => state.Login.data
        }),
        created () {
            this.$navigation.cleanRoutes()
           this.open()
        },
        methods: {
            confirmCodeInfo () {
              this.$http({url:'/checks/check',method:'post',data:{code:this.barCode.text},headers: {
                    'X-Access-Token': this.store.token}
                }).then( res => {
                    this.codeInfo = res.data
                })
            },
            next () {
              this.codePopupVisible  = false
              this.open()
            },
            returnMain () {
                this.codePopupVisible  = false
                this.codeInfo = {}
                this.barCode.text = null
                this.$router.push('/index')
            },
            confirmVerify() {
                this.$http({url:'/checks/code',method:'post',data:{code:this.barCode.text} ,headers: {
                    'X-Access-Token': this.store.token}
                }).then( res => {
                    Toast({
                        message: res.data.code,
                        position: 'middle',
                        duration: 1500
                    });
                    setTimeout(()=>{
                        if(res.data.code ==="验证成功") {
                            this.codePopupVisible = true
                        }
                    })
                },error => {
                    Toast({
                        message: '号码不存在或验证错误，请确认后重新输入',
                        position: 'middle',
                        duration: 1500
                    });
                })
            },
            open() {
                let self = this
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        self.barCode.text = result.text;
                        self.confirmCodeInfo()
                     if(result.cancelled) {
                            self.$router.push('/index')
                      }
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    },
                    {
                        preferFrontCamera : false, // iOS and Android
                        showFlipCameraButton : true, // iOS and Android
                        showTorchButton : true, // iOS and Android
                        torchOn: false, // Android, launch with the torch switched on (if available)
                        saveHistory: true, // Android, save scan history (default false)
                        prompt : "请将二维码放在中间", // Android
                        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                        disableAnimations : true, // iOS
                        disableSuccessBeep: false // iOS
                    }
                );
            }
        }
    }
</script>
<style>
.code{
    padding-top: 50px;
    background-color: transparent;
    position: relative;
    height:100%;
}
.code .mint-cell-wrapper{
    background-color: #f8f8f8;
}
.code .mint-cell-wrapper .mint-field-core{
    background-color: #f8f8f8;
}
.mint-button{
    height:30px;
}
.code .ipt{
    padding: 16px 15px
}
.code .ipt .barCode{
    background-color: #fff;
}
.code .item{
    display: flex;background-color: #fafafa;padding: 10px 15px
}
.code .item .desc{
    flex: 1;padding-left: 10px
}
.code .item .title {
    font-size: 12px;
    color: #333333;
    min-height: 30px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.code .item .quanlity{
    margin: 5px 0;font-size: 12px;color: #999999
}
.code .item .costPrice{
    color: #999999;font-size: 12px;width: 100%
}
.code .item .cosText{
    float: left;display: inline-block
}
.code .item .mask {
    float: right;
    display: inline-block;
    margin-right: 5px;
    border: 1px solid #fe1b5e;
    border-radius: 15px;
    color: #fe1b5e;
    font-size: 10px;
    padding: 1px 4px
}
.code .confirmbtn {
    margin-top: 10px;
    height: 41px;
    background-color: #508cee;
}
.code .code-popup-status{
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: table;
}
.code .code-popup-status .content{
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
.code .code-popup-status .btn-groups{
    margin-top: 60px
}
.code .code-popup-status .btn-groups .return{
    margin: 0 10px;font-size: 13px;border-color: #ccc;color: #888
}
.code .code-popup-status .btn-groups .next{
    margin: 0 10px;border-color: #508cee;color: #508cee;font-size: 13px
}
</style>
