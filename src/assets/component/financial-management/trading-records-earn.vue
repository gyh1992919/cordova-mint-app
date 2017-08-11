<template>
    <div class="trade-records-earn" style="">
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore" v-if="tradingRecordList.length>0">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <div class="item" v-for="(item,index) in  tradingRecordList" >
                    <div class="desc">
                        <div class="order-sn">
                            <div class="name">订单流水号: {{item.sn}}</div>
                            <div>交易时间: {{item.createdAt}}</div>
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

        },
        mounted() {
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                this.getTradingRecord(true);
                Indicator.close()
            },1500)
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
                this.$http({method:'get',url:'/trading-records/earning',params: this.params}).then( res => {
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
.trade-records-earn .item{
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
.trade-records-earn .item .name{
        font-size: 13px;padding-top: 10px;color: #333333;
        margin: 10px 0;
    }
.trade-records-earn .item .desc{
        display: flex;margin-bottom: 10px;padding: 5px 0 10px;align-items: center;
    }
.trade-records-earn .item .amount{
        flex: 0 0 80px;
    }
.trade-records-earn .item .price{
        font-size: 18px;
        color: #ff801a;
        text-align: center;
    }
.trade-records-earn .item .order-sn {
        flex: 1;color: #999999;font-size: 12px
    }
.trade-records-earn .item .empty-info{
        text-align: center;color: #ccc;padding: 30px
    }
.trade-records-earn .item .empty-info .text{
        margin-top: 20px
    }
.trade-records-earn .item .page-infinite-loading{
        display: flex;
        justify-content: center;
    }
.trade-records-earn .item .page-infinite-loading .title{
        padding-left: 15px
    }
</style>
