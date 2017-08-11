<template>
    <div class="home-page"  >
        <div class="content" style="position: fixed;height: 150px;width: 100%;z-index: 22">

            <div v-if="finances.storeCategories.length> 0">
                <mt-cell :title=" finances.storeName +'('+ finances.storeCategories[0].name +')'" class="header" to="/update-user">
                    <img slot="icon" :src="storeInfo.avatar" width="37" height="37" style="border-radius: 50%">
                </mt-cell>
            </div>
            <div v-else="finances.storeCategories.length <= 0">
                <mt-cell :title="finances.storeName" class="header" to="/update-user">
                    <img slot="icon" :src="storeInfo.avatar" width="37" height="37" style="border-radius: 50%">
                </mt-cell>
            </div>
             <div  class="grid">
                <div  class="grid-item" @click="$router.push('/code')">
                    <img src="../../images/home/home-code.png" alt="" height="30px">
                    <div  class="title">扫码验证</div>
                </div>
                 <div class="grid-item" @click="$router.push('/number-code')">
                     <img src="../../images/home/key.png" alt="" height="30px">
                     <div   class="title">数字验证</div>
                 </div>
             </div>
        </div>
        <mt-loadmore :top-method="loadTop"  ref="loadmore" style="padding-top: 150px" >
            <mt-cell title="销售额"></mt-cell>
            <div class="grid amount-grid">
                <div  class="item">
                    <img src="../../images/home/amount.png" alt="" height="22px">
                    <div class="amount">{{finances.yesterdayAmount}}</div>
                    <div class="title">昨日销售额(元)</div>
                </div>
                <div  class="item">
                    <img src="../../images/home/amount-1.png" alt="" height="22px">
                    <div class="amount">{{finances.totalAmount}}</div>
                    <div class="title">累计销售额(元)</div>
                </div>
            </div>
            <div  class="account">
                <mt-cell title="我的账户" ></mt-cell>
                <mt-cell title="待结算"  :value="finances.unFinance" class="normalItem"></mt-cell>
                <mt-cell title="奖励金额"  :value="finances.awardFinance" class="normalItem"></mt-cell>
                <mt-cell title="可提现余额"  :value="finances.balance" class="normalItem"></mt-cell>
                <mt-cell to="/trade-record">
                    <p slot="title" style="text-align: center;color: #508cee;font-size: 12px">查看更多账户信息</p>
                </mt-cell>
            </div>
            <div  class="diy-order">
                <mt-cell  to="/order"  is-link>
                    <div slot="title">免单团订单 <span style="font-size: 12px;color: #999">(待验证{{ DiyTotalCount}})</span></div>
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
                <mt-cell to="/other-order"  is-link>
                    <div slot="title">自营订单 <span style="font-size: 12px;color: #999">(待验证{{totalCount}})</span></div>
                </mt-cell>
                <div class="grid">
                    <div class="item">
                        <img src="../../images/home/no-pay.png" alt="" height="20px">
                        <div class="title">待支付</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/wait-delivery.png" alt="" height="20px">
                        <div class="title">待发货</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/delivery.png" alt="" height="20px">
                        <div class="title">已发货</div>
                    </div>
                    <div class="item">
                        <img src="../../images/home/complete.png" alt="" height="20px">
                        <div class="title">已完成</div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
          return {
              finances: {},
              storeInfo: {},
              totalCount: null,
              DiyTotalCount:null,
              params: {
                  "per-page": 10,
                  page:1,
                  status: 20
              },
              params_2: {
                  "per-page": 10,
                  page:1,
                  status: 3
              }
          }
        },
        mounted() {
            this.getFinance();
            this.getStore();
            this.getOrder()
            this.getDiyOrder()
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },1500)
        },
        computed: mapState({
            store: state => state.Login.data,
        }),
        methods: {
            getFinance () {
                this.$http.get('/finances',{ headers: {
                    'X-Access-Token': this.store.token}
                }).then( res => {
                    this.finances = res.data
                })
            },
            getOrder() {
                this.$http({method:'get',url:'/orders',headers: {
                    'X-Access-Token': this.store.token},params: this.params
                }).then( res => {
                    this.totalCount = res.headers['x-pagination-total-count']
                })
            },
            getDiyOrder() {
                this.$http({method:'get',url:'/diy-orders',headers: {
                    'X-Access-Token': this.store.token}, params: this.params_2
                }).then( res => {
                    this.DiyTotalCount= res.headers['x-pagination-total-count']
                })
            },
            getStore () {
                if(this.store.storeId) {
                    this.$http.get('/stores/'+ this.store.storeId,{ headers: {
                        'X-Access-Token': this.store.token}
                    }).then( res => {
                        this.storeInfo = res.data
                    })
                }
            },
            loadTop() {
                setTimeout(() => {
                    this.getFinance()
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            openBarcode () {
                this.$router.push('/code')
            }
        }
    }
</script>
<style>
.home-page{
    padding-bottom: 50px;
    background-color: #f5f5f5;
}
.home-page .mint-cell-wrapper{
    padding: 0 15px;
    font-size: 14px;
}
.home-page .content{
    width: 100%;
    height: 150px;
    background-image: -webkit-linear-gradient(left, #508cee, #77a3fc);
}
.home-page .header .mint-cell-wrapper{
    background-image: none;
}
.home-page .content .mint-cell{
    background-color: transparent;
    color: #fff;
    font-size: 14px;
}
.home-page .content .mint-cell:last-child{
    background-image: none;
}
.home-page  .content .mint-cell-wrapper{
 padding-top: 10px;
}
.home-page .grid{
    display: flex;padding-top: 20px
}
.home-page .grid .grid-item{
    flex: 1;text-align: center;
}
.home-page .grid-item .title{
    color: #fff;
    font-size: 13px;
    margin-top: 10px;
}
.home-page  .amount-grid{
  padding: 0 10px 15px 10px;
   margin-bottom: 10px;
    background-color: #fff;
}
.home-page  .amount-grid .item{
    flex: 1;
    text-align: center;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    margin: 0 5px;
    padding: 20px 0;
}
.home-page .amount-grid .amount{
    font-size: 19px;
    color: #ff801a;
    margin: 10px 0 5px 0;
}
.home-page .amount-grid .title{
    font-size: 12px;
    color: #999;
}
.home-page .normalItem{
    font-size: 12px;
}
.home-page .account{
    margin-bottom: 10px
}
.home-page .mint-cell-wrapper{
    background-image: linear-gradient(180deg, #f7f7f7, #f7f7f7 50%, transparent 50%)
}
.home-page .normalItem .mint-cell-title{
    flex: 0 0 82px;
    font-size: 12px;
    border-right: 1px solid #f7f7f7;
    margin-right: 10px;
}
.home-page .normalItem .mint-cell-value{
    color: #ff801a;
    font-size: 18px;
    line-height:1.5;
}
.home-page .diy-order .grid{
    background-color: #fff;
    padding: 20px 0;
    margin-bottom: 10px;
}
.home-page .diy-order .item{
    flex: 1;
    text-align: center;
    border-right: 1px solid #f7f7f7;
}
.home-page .diy-order .item .title{
    font-size: 12px;
    color: #666666;
    margin-top: 10px;
}
</style>
