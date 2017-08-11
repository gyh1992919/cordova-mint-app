<template>
    <!-- App -->
    <div class="number-code">
        <mt-header fixed title="输入验证码">
            <router-link to="/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <div class="ipt">
                <mt-field   type="number" class="barCode" placeholder="请输入兑换码" v-model="code">
                    <div @click="$router.replace('/code')"><img src="../../images/code/code.png" alt="" height="25"></div>
                </mt-field>
                <mt-button size="large"  class="confirmBtn" @click.native="confirmCodeInfo"  :class="codeInfo.product ? 'hide': '' ">验证号码</mt-button>
            </div>
            <div v-if="codeInfo.product">
                <div class="item"  >
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
                    <mt-button size="large"  class="confirmBtn" @click="confirmBtn" > 确认验证</mt-button>
                </div>
            </div>
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
    import { Toast } from 'mint-ui'
    export default {
       data () {
          return {
              codePopupVisible: false,
              code: null,
              codeInfo: {}
          }
       },
       methods: {
           confirmCodeInfo () {
               this.$http({url:'/checks/check',method:'post',data:{code:this.code},headers: {
                   'X-Access-Token': this.$store.getters.getData.token}
               }).then( res => {
                   if(res.data.code ===0 ){
                       Toast({
                           message: '号码不存在或验证错误，请确认后重新输入',
                           position: 'middle',
                           duration: 1500
                       });
                   } else {
                       this.codeInfo = res.data
                   }
               },error => {
                   Toast({
                       message: '号码不存在或验证错误，请确认后重新输入',
                       position: 'middle',
                       duration: 1500
                   });
               })
           },
           next () {
               this.codePopupVisible  = false
               this.codeInfo = {}
               this.code = null
           },
           returnMain () {
               this.codePopupVisible  = false
               this.codeInfo = {}
               this.code = null
               this.$router.push('/index')
           },
           confirmBtn () {
               this.$http({url:'/checks/code',method:'post',data:{code:this.code} ,headers: {
                   'X-Access-Token': this.$store.getters.getData.token}
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
           }
       }
    }
</script>

<style>
.number-code .mint-cell-wrapper{
    background-color: #f8f8f8;
}
.number-code .mint-cell-wrapper .mint-field-core{
    background-color: #f8f8f8;
}
.number-code .hide{
    display: none;
}
.number-code{
    padding-top: 50px;
}
.number-code .content{
    margin-top: 10px;
}
.number-code .ipt{
    padding: 16px 15px
}
.number-code .ipt .barCode{
    background-color: #fff;
}
.number-code .confirmBtn {
    margin-top: 20px;
    min-height: 45px;
    background-color: #508cee;
    color: #fff;
    font-size: 13px;
}
.number-code .item{
    display: flex;background-color: #fafafa;padding: 10px 15px
}
.number-code .item .desc{
    flex: 1;padding-left: 10px
}
.number-code .item .title {
    font-size: 12px;
    color: #333333;
    min-height: 30px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.number-code .item .quanlity{
    margin: 5px 0;font-size: 12px;color: #999999
}
.number-code .item .costPrice{
    color: #999999;font-size: 12px;width: 100%
}
.number-code .item .cosText{
    float: left;display: inline-block
}
.number-code .item .mask {
    float: right;
    display: inline-block;
    margin-right: 5px;
    border: 1px solid #fe1b5e;
    border-radius: 15px;
    color: #fe1b5e;
    font-size: 10px;
    padding: 1px 4px
}
.number-code .code-popup-status{
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: table;
}
.number-code .code-popup-status .content{
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
.number-code .code-popup-status .btn-groups{
    margin-top: 60px
}
.number-code .code-popup-status .btn-groups .return{
    margin: 0 10px;font-size: 13px;border-color: #ccc;color: #888
}
.number-code .code-popup-status .btn-groups .next{
    margin: 0 10px;border-color: #508cee;color: #508cee;font-size: 13px
}
</style>
