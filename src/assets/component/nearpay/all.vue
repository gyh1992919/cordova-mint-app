<template>
    <div class="near-allorder">
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore" v-if="orderList.length>0">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <div class="item-near" v-for="(item,index) in  filterList" :key="index" >
                    <mt-cell :title="item.statusText" class="near-status">
                        <span style="color: #ff801a"><span style="font-size: 11px">¥</span>{{item.totalAmount}}</span>
                    </mt-cell>
                    <mt-cell title="订单号" :value="item.sn" class="near-sn"></mt-cell>
                    <mt-cell title="下单时间" :value="item.createdAt" class="near-time"></mt-cell>
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
        props:['filter'],
        data() {
            return {
                orderList: [],
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                    page:1
                }
            };
        },
        computed: {
           filterList() {
                   let self = this;
                   if(self.filter.length > 0) {
                       return self.orderList.filter(function(item) {
                           for(let i=0;i<self.filter.length;i++){
                               return item.statusText.indexOf(self.filter[i])> -1
                           }
                       });
                   } else {
                       return self.orderList;
                   }
            }
        },
        mounted() {
            this.getOrder(true);
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
                this.$http({method:'get',url:'/faces',params: this.params}).then( res => {
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
                        this.orderList = data
                    } else {
                        this.orderList = this.orderList.concat(data)
                    }
                })
            }
        }
    };
</script>

<style >
.near-allorder{
   background-color: #f9f9f9;
}
.near-allorder .item-near{
    margin-bottom: 10px;
}

.near-allorder .item-near .mint-cell-wrapper{
    background-image: none;
    padding: 0 15px;
}
.near-allorder .status .mint-cell-text{
     color: #333;
    font-size: 13px;
}
.near-allorder .mint-cell{
    min-height: 40px;
}
.near-allorder .mint-cell-title{
    font-size: 12px;
}
.near-allorder .order .mint-cell-text,.near-allorder .order .mint-cell-value{
    color: #999;
    font-size: 13px;
}
</style>
