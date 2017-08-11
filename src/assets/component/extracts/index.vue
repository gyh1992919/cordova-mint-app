<template>
    <div class="extracts-page" :style="{height: this.buttonBottom - 80 + 'px'}">
        <mt-header fixed title="提现">
                <mt-button icon="back" @click.native="$router.push('/index/user')" slot="left"></mt-button>
            <router-link to="/trade-record" slot="right">
                <mt-button >提现明细</mt-button>
            </router-link>
        </mt-header>

        <div class="content">
            <mt-cell :title="bankValue ?  bankValue.bankTypeText : '请选择'" is-link   :label=" bankValue ?   bankValue.bankCode : ''"  :value="bankValue ?  bankValue.name : ''" class="selectBank" @click.native="bankPopupVisible = true">
            </mt-cell>
            <div style="background-color: #fff;padding: 20px 0;margin: 10px 0">
                <span style="padding: 0 15px">提现金额</span>
                <mt-field label="¥"   class="amount" type="number" v-model="extracts.amount"></mt-field>
                <mt-cell :title="'可用余额'+ finances.balance"   class="balance" >
                    <span @click=" extracts.amount = finances.balance">全部提现</span>
                </mt-cell>
                <p style="padding: 0 15px;font-size: 11px;color: #daa744">每笔提现银行收取2元通道费。提现后资金到账时间根据各银行到账时间为准！</p>
            </div>
            <div  class="next-btn">
                <mt-button size="large" :disabled="!extracts.amount  ||  parseInt(extracts.amount) > parseInt(finances.balance)" @click.native="nextPopupVisible = true">下一步</mt-button>
            </div>
        </div>

        <mt-popup v-model="bankPopupVisible" position="right" class="bankList-popup" :modal="false">
            <mt-header fixed title="提现">
                <mt-button icon="back" slot="left" @click.native="bankPopupVisible =false"></mt-button>
                <router-link to="" slot="right">
                    <mt-button icon="add">+</mt-button>
                </router-link>
            </mt-header>
            <div style="margin-top: 60px">
                <mt-radio  v-model="extracts.bankCardId" :options="options" align="right" @change="selectBank"></mt-radio>
            </div>
        </mt-popup>

        <mt-popup v-model="nextPopupVisible" position="right" class="next-popup" :modal="false" v-if=" bankValue">
            <mt-header fixed title="确认提现">
                <mt-button icon="back" slot="left" @click.native="nextPopupVisible = false"></mt-button>
            </mt-header>
            <div class="desc-wprapper" >
                <mt-cell title="姓名"  :value="bankValue['name']" ></mt-cell>
                <mt-cell title="银行卡号"  :value="bankValue.bankCode" ></mt-cell>
                <mt-cell title="提现金额"  :value="extracts.amount" ></mt-cell>
            </div>
            <div style="margin-top: 10px" >
                <mt-cell title="您还未设置安全密码！"  to="/set-extractsPassword" value="立即设置" is-link   v-show="code ===0" ></mt-cell>
                <mt-field  placeholder="请输入安全密码" style="margin-top: 10px" type="password" class="extpassword" v-show="code ===1"  v-model="extracts.extPassword"></mt-field>
            </div>
            <div  class="next-btn" >
                <mt-button size="large"  @click.native="confirmExtracts"  :disabled="!extracts.extPassword" >确认提现</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                buttonBottom: 0,
                Finances: {},
                finances: {},
                bankValue: null,
                BankList: [],
                bankPopupVisible: false,
                nextPopupVisible :false,
                options:[],
                code: null,
                codeshow: null,
                extracts: {
                    amount: null,
                    bankCardId: null,
                    extPassword: null
                }
            }
        },
        mounted () {
            this.getBankList()
            this.getExtpassword()
            this.getFinance ()
            this.buttonBottom =  window.screen.height;
            this.code = this.$store.getters.getCode
        },
        methods: {
            getBankList () {
                this.$http({method:'get',url:'/bank-cards',headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                   this.BankList = res.data;
                   let BankList = res.data
                   for(let i=0;i< BankList.length;i++){
                       this.options.push({"label":BankList[i].bankCode + '(' +BankList[i].bankTypeText + ')',"value":BankList[i].id.toString()})
                   }
                })
            },
            selectBank (value) {
              this.bankPopupVisible = false
              for(let i =0;i<this.BankList.length;i++) {
                  if( parseInt(value)=== this.BankList[i].id) {
                      this.bankValue = this.BankList[i]
                  }
              }
            },
            getFinance () {
                this.$http.get('/finances',{ headers: {
                    'X-Access-Token': this.$store.getters.getData.token}
                }).then( res => {
                    this.finances = res.data
                })
            },
            getExtpassword () {
                this.$http({url:'/users/ext-password',method:'get',headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                  this.code = res.data.code
              })
            },
            confirmExtracts () {
                this.$http.post('/extracts',this.extracts,{headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                    let instance = Toast(res.data.statusText);
                    this.nextPopupVisible = false
                    this.$router.push('/index/user')
                    setTimeout(() => {
                        instance.close();
                    },2000)
                }, error => {
                    let Instance = Toast(error.response.data.message);
                    setTimeout(() => {
                        Instance.close();
                    }, 2000)
                })
            }
        }
    }
</script>

<style>
.extracts-page{
    padding-top: 50px;
    background-color: #f5f5f5;
}
.extracts-page .content{
    margin-top: 10px;
}
.extracts-page .selectBank .mint-cell-wrapper{
    background-position: bottom center;
    padding: 15px;
}
.extracts-page .mint-cell-wrapper{
    background-position: bottom center;
    padding: 0 15px;
}
.extracts-page .amount .mint-cell-wrapper .mint-field-core{
     padding: 15px 0;
    font-size: 30px;
    margin-bottom: 1px;
}
.extracts-page .balance{
    min-height: 35px;
}
.extracts-page .balance .mint-cell-wrapper{
    padding: 0 15px;
    background-image: none;
}
.extracts-page .balance .mint-cell-text{
    font-size: 12px;
}
.extracts-page .balance .mint-cell-value{
    font-size: 12px;
}
.extracts-page .mint-field .mint-cell-title{
    width: 20px;
}
.extracts-page .next-btn{
    padding: 0 15px;
    margin-top: 40px;
}
.extracts-page .next-btn .mint-button{
    background-color: #fff;
}
.extracts-page .bankList-popup{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.extracts-page .bankList-popup .mint-cell-wrapper{
    padding: 0;
}
.extracts-page .next-popup{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.extracts-page .next-popup .desc-wprapper{
    margin-top: 60px;
}
.extracts-page .next-popup .extpassword{
    min-height: 60px;
}
.extracts-page .next-popup .extpassword .mint-field-core{
    background-color: #f8f8f8;
    padding: 5px ;
}
.mint-toast{
    z-index: 9999;
}
</style>
