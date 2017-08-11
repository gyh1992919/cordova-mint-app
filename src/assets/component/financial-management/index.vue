<template>
    <div class="financial-manage"  :style="{height: this.buttonBottom - 80 + 'px'}">
        <mt-header fixed title="财务管理" ></mt-header>
        <div class="container">
            <mt-cell title="待结算"  is-link  to='/trade-record'>
                <img slot="icon" src="../../images/financial-management/unFinance.png" alt="" height="24px" class="icon">
                <span > <span  class="tag">¥</span>{{Finances.unFinance}}</span>
            </mt-cell>
            <mt-cell title="可提现"  is-link to="/extracts">
                <img slot="icon" src="../../images/financial-management/balance.png" alt="" height="24px" class="icon">
                <span> <span class="tag">¥</span>{{Finances.balance}} <span style="color: #999;font-size: 14px">(去提现)</span></span>
            </mt-cell>
            <mt-cell title="奖励金额"  is-link to='/trade-record'>
                <img slot="icon" src="../../images/financial-management/awardFinance.png" alt="" height="24px" class="icon">
                <span > <span class="tag">¥</span>{{Finances.awardFinance}}</span>
            </mt-cell>
            <mt-cell title="银行卡管理" is-link  @click.native="saveRouter('bank')">
                <img slot="icon" src="../../images/financial-management/bankcard.png" alt="" height="22px" class="icon">
            </mt-cell>
            <mt-cell title="交易查询"  is-link  @click.native="saveRouter('trade-record')">
                <img slot="icon" src="../../images/financial-management/trade-record.png" alt="" height="24px" class="icon">
            </mt-cell>
            <mt-cell title="我的收款码" is-link   @click.native="saveRouter('q-code')">
                <img slot="icon" src="../../images/financial-management/barCode.png" alt="" height="24px" class="icon">
            </mt-cell>
            <mt-cell title="设置"  is-link  @click.native="saveRouter('user-setting')"  >
                <img slot="icon" src="../../images/financial-management/set.png" alt="" height="24px" class="icon">
            </mt-cell>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                buttonBottom: 0,
                Finances: {},
                code: null
            }
        },
        computed: mapState({
            store: state => state.Login.data,
        }),
        mounted () {
            this.buttonBottom =  window.screen.height;
            this.getFinancial()
            this.getCode();
//            安全密码登录 二期
//            let self = this
//            function onPrompt(results) {
//                alert(results.input1);
//                if(results.buttonIndex ===2){
//                    self.$router.push('/index')
//                }else if(results.buttonIndex ===1){
//
//                }
//            }
//
//            navigator.notification.prompt(
//                '请输入您的安全密码',  // message
//                onPrompt,                  // callback to invoke
//                '警告！',            // title
//                ['确认','取消'],             // buttonLabels
//                'Jane Doe'                 // defaultText
//            );
        },
        methods: {
            getFinancial () {
                this.$http.get('/finances',{ headers: {
                    'X-Access-Token': this.store.token}
                }).then( res => {
                    this.Finances = res.data
                })
            },
            getCode () {
                this.$http.get('/users/ext-password',{ headers: {
                    'X-Access-Token': this.store.token}
                }).then( res => {
                    this.code = res.data.code
                })
            },
            saveRouter(value) {
              if(this.store.storeId) {
                  if(this.code === 0) {
                      let self = this;
                      function onConfirm(buttonIndex) {
                          if(buttonIndex ===1){
                              self.$router.push('/set-extractsPassword')
                          }
                      }
                      navigator.notification.confirm(
                          '还未设置安全密码！', // message
                          onConfirm,            // callback to invoke with index of button pressed
                          '提示',           // title
                          ['立即设置','暂不设置']     // buttonLabels
                      );
                  } else {

                      this.$router.push('/'+value)
                  }
              } else if (!this.store.storeId) {
                  let self = this;
                  function onConfirm(buttonIndex) {
                      if(buttonIndex ===1){
                          self.$router.push('/store')
                      }
                  }
                  navigator.notification.confirm(
                      '开通店铺后，才能访问！', // message
                      onConfirm,            // callback to invoke with index of button pressed
                      '提示',           // title
                      ['立即开通','暂不开通']     // buttonLabels
                  );
              }
            }
        }
    }
</script>
<style>
.financial-manage{
    padding-top: 50px;
    background-color: #f5f5f5;

}
.financial-manage .container{
    margin: 15px 0 40px 0;
}
.financial-manage .container .mint-cell-wrapper{
    padding: 0 15px;
}
.financial-manage .mint-button{
    box-shadow: none;
}
.financial-manage .mint-cell{
    margin-top: 10px;
}
.financial-manage .mint-cell .mint-cell-wrapper{
    background-image: none;
}
.financial-manage .mint-cell .mint-cell-text{
    font-size: 14px;
}
.financial-manage .mint-cell .mint-cell-value{
    font-size: 17px;
    color: #ff801a;
}
.financial-manage .mint-cell .tag{
    font-size: 13px;padding-right: 3px
}
.financial-manage .mint-cell .icon{
    margin-right: 15px;
}
</style>
