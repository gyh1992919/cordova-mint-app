<template>
<div class="trade-records" style="">
    <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore" v-if="tradingRecordList.length>0">
        <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
            <div class="item" v-for="(item,index) in  filterTradingRecordList " >
                 <div class="name" >{{item.tradingTypeName}}</div>
                 <div class="desc">
                    <div class="order-sn">
                        <div class="sn">订单流水号: {{item.sn}}</div>
                         <div class="time">交易时间: {{item.createdAt}}</div>
                    </div>
                    <div class="amount">
                       <span class="price">{{item.amount}}</span>
                    </div>
                </div>
            </div>
        </div>
        <p v-show="loading" class="page-infinite-loading" >
            <mt-spinner type="fading-circle"></mt-spinner>
            <span class="title">正在加载中...</span>
        </p>

    </mt-loadmore>

    <div v-else="tradingRecordList.length < 0" class="empty-info">
        <img src="../../images/empty-content.png" alt="" height="100">
        <p class="text">暂时没有相关的订单</p>
    </div>
</div>
</template>


<script type="text/babel">
    import { Indicator } from 'mint-ui';
    export default {
        props: ['filterValue'],
        data() {
            return {
                tradingRecordList: [],
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                    page:1
                }
            };
        },
        computed:{
           filterTradingRecordList () {
                   let self = this;
                   if(self.filterValue.indexOf('-')>-1 && self.filterValue.length > 0) {
                       return self.tradingRecordList.filter(function(item) {
                            return item.createdAt.indexOf(self.filterValue)> -1
                       });
                   } else if (self.filterValue.length > 0 && self.filterValue.indexOf('-')<0 ) {
                       return self.tradingRecordList.filter(function(item) {
                           for(let i=0;i<self.filterValue.length;i++){
                               return item.name.indexOf(self.filterValue[i])> -1
                           }
                       });
                   } else {
                       return self.tradingRecordList;
                   }
            }
        },
        mounted() {
            this.getTradingRecord(true);
        },
        methods: {
            loadMore() {
                if(!this.haveMore){
                    setTimeout(() => {
                        this.getTradingRecord()
                    }, 2500)
                    this.haveMore = true
                }
            },
            loadTop() {
                setTimeout(() => {
                    this.params.page =1;
                    this.getTradingRecord(true);
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            getTradingRecord(clear) {
                this.$http({method:'get',url:'/trading-records',params: this.params,headers: {'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                    const data = res.data
                    if (data.length === this.params['per-page']) {
                        this.params.page += 1
                        this.haveMore = false;
                        this.loading = true;
                    } else {
                        this.haveMore = true
                        this.loading = false
                    }

                    if (clear) {
                        this.tradingRecordList = data
                    } else {
                        this.tradingRecordList = this.tradingRecordList.concat(data)
                    }
                })
            }
        }
    };
</script>

<style scoped>
 .item{
    height:86px;
    padding: 0 15px;
    font-size: 12px;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position:bottom center;
    background-origin: content-box;
    box-sizing:border-box;
     display: block;
     text-decoration: none;
}
 .item .name{
     font-size: 13px;padding-top: 10px;color: #333333
 }
 .item .desc{
     display: flex;margin-bottom: 10px;padding: 5px 0 10px
 }
 .item .amount{
     flex: 0 0 80px;
 }
 .item .price{
     font-size: 18px;
     color: #ff801a;
     text-align: center;
 }
 .item .order-sn {
     flex: 1;color: #999999;font-size: 12px
 }
 .item .order-sn .sn{
     margin: 10px 0;
 }
 .empty-info{
     text-align: center;color: #ccc;padding: 30px
 }
 .empty-info .text{
     margin-top: 20px
 }
 .page-infinite-loading{
     display: flex;
     justify-content: center;
 }
 .page-infinite-loading .title{
     padding-left: 15px
 }
</style>
