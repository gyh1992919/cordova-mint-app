<template>
    <div class="extracts" >
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore" v-if="extractsList.length>0">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <div class="item" v-for="(item,index) in  extractsList">
                    <div  class="name">{{item.tradingTypeName}}</div>
                    <div  class="desc">
                        <div  class="order-sn">
                            <div >订单流水号: {{item.sn}}</div>
                            <div>交易时间: {{item.createdAt}}</div>
                        </div>
                        <div  class="amount">-{{item.amount}}</div>
                    </div>
                </div>
            </div>
            <p v-show="loading" class="page-infinite-loading" >
                <mt-spinner type="fading-circle"></mt-spinner>
                <span class="title">正在加载中...</span>
            </p>
        </mt-loadmore>
        <div v-else="extractsList.length>0"  class="empty-info">
            <img src="../../images/empty-content.png" alt="" height="100">
            <p style="" class="text">暂时没有相关的订单</p>
        </div>
    </div>
</template>


<script type="text/babel">
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                extractsList: [],
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                    page:1
                }
            };
        },
        mounted() {
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                this.getTradingRecord(true);
                Indicator.close();
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
                this.$http({method:'get',url:'/extracts',params: this.params}).then( res => {
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
                        this.extractsList = data
                    } else {
                        this.extractsList = this.extractsList.concat(data)
                    }
                })
            }
        }
    };
</script>

<style scoped>
.extracts .item{
    height:60px;
    padding: 0 15px;
    font-size: 12px;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position:bottom center;
    background-origin: content-box;
    box-sizing:border-box;
}
.extracts .item .name{
    font-size: 13px;padding-top: 10px;color: #333333
}
.extracts .item .desc{
    display: flex;margin-bottom: 10px;padding: 5px 0 10px;
}
.extracts .amount{
    flex: 0 0 100px;
    font-size: 18px;
    color: #ff801a;
    line-height:40px;
    text-align: center;
}
.extracts .item .order-sn{
    flex: 1;color: #999999;font-size: 12px
}
.extracts .empty-info{
    text-align: center;color: #ccc;padding: 30px
}
.extracts .empty-info .text{
    margin-top: 20px
}

</style>
