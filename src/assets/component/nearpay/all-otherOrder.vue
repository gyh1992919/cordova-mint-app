<template>
    <div class="all-otherOrder" style="">
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <div class="item" v-for="(item,index) in  filterList" :key="index" >
                    <mt-cell :title="'订单号: '+ item.sn" :label="'支付时间: '+item.createdAt" :value="item.statusText"></mt-cell>
                    <div  class="container">
                        <img :src="item.orderProducts[0].productImage" alt="" class="img"  >
                        <div class="content" >
                            <h1 class="title" >{{item.orderProducts[0].productName}}</h1>
                            <div class="text">¥<span  class="amount">{{item.orderProducts[0].price}}</span> <div>{{item.orderProducts[0].quantity}}</div></div>
                        </div>
                    </div>
                    <div class="totalwrapper" >
                        <span class="quantity" >共两件{{item.quantity}}商品</span>合计:<span class="price">¥<span >{{item.totalAmount}}</span></span>
                    </div>
                    <div class="btn" style="background-color: #fff;padding: 10px ;display: flex;justify-content: flex-end" v-if="item.statusText === '待发货'">
                        <mt-button size="small" style="border-radius: 20px;background-color: #fff;height: 28px" @click="confirmSend(item.id)">确认发货</mt-button>
                    </div>
                </div>
            </div>
            <p v-show="loading" class="page-infinite-loading" >
                <mt-spinner type="fading-circle"></mt-spinner>
                <span class="title">正在加载中...</span>
            </p>
        </mt-loadmore>
    </div>
</template>


<script type="text/babel">
    import { Indicator } from 'mint-ui';
    export default {
        props: ['filter'],
        data() {
            return {
                otherOrderList: [],
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                    page:1
                }
            };
        },
        mounted() {
            this.$navigation.cleanRoutes()
            this.getOrder(true)
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },1500)
        },
        computed: {
            filterList() {
                let self = this;
                if(self.filter.length > 0) {
                    return self.otherOrderList.filter(function(item) {
                        return item.statusText.indexOf(self.filter)> -1
                    });
                } else {
                    return self.otherOrderList;
                }
            }
        },
        methods: {
            loadMore() {
                if(!this.haveMore){
                    setTimeout(() => {
                        this.getOrder(true)
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
            confirmSend (index) {
                this.$http({method:'put',url:'/orders/'+index+'/send',data: {expressId: 5,expressSn: 111111111111}, headers: {'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                    this.getOrder(true)
                })
            },
            getOrder(clear) {
                this.$http({method:'get',url:'/orders',params: this.params
                }).then( res => {
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
                        this.otherOrderList = data
                    } else {
                        this.otherOrderList = this.otherOrderList.concat(data)
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
.all-otherOrder{
    padding-top: 20px
}
.all-otherOrder .item .mint-cell-wrapper{
    background-position: bottom left;
}
.all-otherOrder .loadmore{
    background-color: #f5f5f5;
}
.all-otherOrder .loadmore .mint-cell-text{
    color: #999999;
    font-size: 12px;
}
.all-otherOrder .loadmore .mint-cell-label{
    font-size: 12px;
    color: #ccc;
}
.all-otherOrder .loadmore .mint-cell-value{
    font-size: 12px;
    color: #508cee;
}
.all-otherOrder .loadmore .item{
    margin-bottom: 10px
}
image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
.all-otherOrder .loadmore .item .totalwrapper {
    font-size: 12px;
    min-height: 45px;
    line-height: 45px;
    background: #fff;
    padding: 0 15px;
    text-align: right;
}
.all-otherOrder .item .totalwrapper .quantity{
    padding-right: 10px
}
.all-otherOrder .item .totalwrapper .price{
    font-size: 12px;color: #ff801a;padding-left: 5px
}
.all-otherOrder .item .totalwrapper .price>span{
    font-size: 15px
}
.all-otherOrder .container {
    display: flex;
    padding: 10px 15px;
    background-color: #fafafa;
}
.all-otherOrder .container .img{
    flex:0 0 80px;
    width: 80px;
    height:80px;
}
.all-otherOrder .container .content{
    margin-left: 10px;
    flex: 1;
}
.all-otherOrder .content .title{
    font-size: 13px;
    color: #000;
    font-weight: normal;
    margin: 0;
    line-height:18px;
    letter-spacing: 1px;
    display: -webkit-box;
    text-overflow:ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}
.all-otherOrder .content .subtitle {
    font-size: 12px;
    line-height:16px;
    margin: 8px 0 3px;
    color: #999;
}
.all-otherOrder .content .text{
    font-size: 11px;
    color: #ff801a;
}
.all-otherOrder .content .amount{
    font-size: 15px;
}
.all-otherOrder .content .btn {
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
