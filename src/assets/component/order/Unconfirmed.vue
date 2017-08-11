<template>
    <div class="all-order" style="">
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore" v-if="orderList.length>0">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <div class="item" v-for="(item,index) in orderList" :key="index" >
                    <mt-cell :title="'订单号: '+ item.sn" :label="'支付时间: '+item.createdAt" :value="item.status"></mt-cell>
                    <div  class="container">
                        <img :src="item.productImage" alt="" class="img">
                        <div class="content" >
                            <h1 class="title" >{{item.productName}}</h1>
                            <p class="subtitle" >规格: 无 <span style="float: right;">x{{item.quantity}}</span></p>
                            <div class="text">¥<span  class="amount">{{item.price}}</span> <div class="btn" >{{item.isGiving}}</div></div>
                        </div>
                    </div>
                    <div class="totalwrapper" >
                        <span class="quantity" >共两件{{item.quantity}}商品</span>合计:<span class="price">¥<span >{{item.totalAmount}}</span></span>
                    </div>
                </div>
            </div>
            <p v-show="loading" class="page-infinite-loading" >
                <mt-spinner type="fading-circle"></mt-spinner>
                <span class="title">正在加载中...</span>
            </p>
        </mt-loadmore>
        <p v-else style="text-align: center;">暂时没有相关订单</p>
    </div>
</template>

<style>

</style>

<script type="text/babel">
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                orderList: [],
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                    page:1,
                    status: 3
                }
            };
        },
        mounted() {
            this.getOrder(true)
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },1500)
        },
        methods: {
            loadMore() {
                if(!this.haveMore){
                    setTimeout(() => {
                        this.getOrder()
                    }, 2500)
                    this.haveMore = true
                }
            },
            loadTop() {
                setTimeout(() => {
                    this.params.page =1;
                    this.getOrder(true);
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            getOrder(clear) {
                this.$http({method:'get',url:'/diy-orders',params: this.params,headers: {'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                    const data = res.data
                    console.log(res)
                    if (data.length === this.params['per-page']) {
                        this.params.page += 1
                        this.haveMore = false;
                        this.loading = true;
                    } else {
                        this.haveMore = true
                        this.loading = false
                    }

                    if (clear) {
                        this.orderList = data
                    } else {
                        this.orderList = this.orderList.concat(data)
                    }
                })
            }
        }
    };
</script>

<style>
    .page-infinite-loading{
        display: flex;justify-content: center;
    }
    .page-infinite-loading .title{
        padding-left: 15px
    }
    .all-order{
        padding-top: 20px
    }
    .all-order .loadmore{
        background-color: #f5f5f5;
    }
    .all-order .loadmore .mint-cell-text{
        color: #999999;
        font-size: 12px;
    }
    .all-order .loadmore .mint-cell-label{
        font-size: 12px;
        color: #ccc;
    }
    .all-order .loadmore .mint-cell-value{
        font-size: 12px;
        color: #508cee;
    }
    .all-order .loadmore .item{
        margin-bottom: 10px
    }
    .all-order .loadmore .item .totalwrapper {
        font-size: 12px;
        min-height: 45px;
        line-height: 45px;
        background: #fff;
        padding: 0 15px;
        text-align: right;
    }
    .all-order .item .totalwrapper .quantity{
        padding-right: 10px
    }
    .all-order .item .totalwrapper .price{
        font-size: 12px;color: #ff801a;padding-left: 5px
    }
    .all-order .item .totalwrapper .price>span{
        font-size: 15px
    }
    .all-order .container {
        display: flex;
        padding: 10px 15px;
        background-color: #fafafa;
    }
    .all-order .container .img{
        flex:0 0 80px;
        width: 80px;
        height:80px;
    }
    .all-order .container .content{
        margin-left: 10px;
        flex: 1;
    }
    .all-order .content .title{
        font-size: 13px;
        color: #000;
        font-weight: normal;
        margin: 0;
        line-height:18px;
        min-height: 30px;
        letter-spacing: 1px;
        display: -webkit-box;
        text-overflow:ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
    }
    .all-order .content .subtitle {
        font-size: 12px;
        line-height:16px;
        margin: 8px 0 3px;
        color: #999;
    }
    .all-order .content .text{
        font-size: 11px;
        color: #ff801a;
    }
    .all-order .content .amount{
        font-size: 15px;
    }
    .all-order .content .btn {
        width: 45px;
        height: 15px;
        line-height: 15px;
        font-size: 10px;
        border: 1px solid rgba(254,27,94,.55);
        float: right;
        border-radius: 20px;
        text-align: center;
        color: #fe1b5e;
        margin-top:3px;
    }
</style>
