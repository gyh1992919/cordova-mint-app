<template>
    <div class="diy-manage">
        <mt-header title="商品管理" fixed>
            <router-link to="/index/product" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <div  class="seach-wrapper">
            <div class="statusText"  @click="sheetVisible_2 = true">类型<span class="caret"></span></div>
            <mt-search   placeholder="商品名称" v-model="seachValue"></mt-search>
            <div class="addProduct" style="text-align: center;" @click="sheetVisible = true">状态 <span class="caret"></span></div>
        </div>
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60" distanceIndex="0">
                <router-link class="item" v-for="(product,index,key) in  filterList" :key="index" :to="{ path:'/diy-manage/'+product.id}" >
                    <mt-cell :title="product.statusText"  class="status"></mt-cell>
                    <div class="content" >
                        <img  v-lazy="product.image"  class="img">
                        <div class="desc">
                            <div class="title" >{{product.name}}</div>
                            <div class="subtitle" >类目：{{product.categoryName}}</div>
                            <div class="text" >库存数：{{product.quantity}} <span class="label" >{{product.isGiving}}</span></div>
                        </div>
                    </div>
                    <div class="price">结算价：<span class="mark">¥</span><span class="number">{{product.costPrice}}</span></div>
                    <div class="edit-btn">
                        <mt-button size="small" >查看</mt-button>
                    </div>
                </router-link>
            </div>
            <p v-show="loading" class="page-infinite-loading" >
                <mt-spinner type="fading-circle"></mt-spinner>
                <span class="title">正在加载中...</span>
            </p>
        </mt-loadmore>
        <mt-actionsheet :actions="actions_1" v-model="sheetVisible"></mt-actionsheet>
        <mt-actionsheet :actions="actions_2" v-model="sheetVisible_2"></mt-actionsheet>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    export default {
        data () {
            return {
                sheetVisible: false,
                sheetVisible_2: false,
                DiyProductList: [],
                seachValue: '',
                filterValue: '',
                filterValue_2: null,
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                     page:1,
                     status: null
                },
                actions_2: [{
                    name: '全部',
                    method: this.sheetVisible_2 = false
                 },
                    {
                        name: '免单团',
                        method: this.filterCategoryName
                    },
                    {
                        name: '特价团',
                        method: this.filterCategoryName
                    }
                ],
                actions_1: [{
                    name: '全部类型',
                    method:  this.allfilter
                },
                 {
                    name: '进行中',
                    method: this.filter
                },
                 {
                     name: '下架',
                    method: this.filter_1
                 }
                ]
            }
        },
        mounted() {
            this.getProduct(true);
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },1500)
        },
        computed: {
             filterList () {
                 var self = this;
                 if (self.seachValue.length > 0 ) {
                     return self.DiyProductList.filter(function(item) {
                         for(let i=0;i<self.seachValue.length;i++){
                             return item.name.indexOf(self.seachValue[i])> -1
                         }
                     });
                 }else if(self.filterValue_2){
                     return self.DiyProductList.filter(function(item) {
                         return self.filterValue_2.indexOf(item.isGiving)> -1
                     });
                 }else if(self.filterValue){
                     return self.DiyProductList.filter(function(item) {
                         return self.filterValue.indexOf(item.statusText)> -1
                     });
                 }else {
                     return self.DiyProductList;
                 }
             }
        },
        methods: {
            filterCategoryName (value) {
                this.filterValue_2 = value.name
            },
            allfilter () {
                this.params.status = ''
                this.getProduct(true);
            },
            filter () {
                this.params.status = 1
                this.getProduct(true);
            },
            filter_1 () {
                this.params.status = 2
                this.getProduct(true);
            },
            loadMore() {
                if(!this.haveMore){
                    setTimeout(() => {
                        this.getProduct()
                    }, 2500)
                    this.haveMore = true
                }
            },
            loadTop() {
                setTimeout(() => {
                    this.params.page =1;
                    this.getProduct(true);
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            getProduct(clear,status) {
                this.$http({method:'get',url:'/diy-products',params: this.params, headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
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
                        this.DiyProductList = data
                    } else {
                        this.DiyProductList = this.DiyProductList.concat(data)
                    }
                })
            }
        }

    }
</script>
<style>
.diy-manage{
    background-color: #f9f9f9;
    padding-top: 95px;
}
.diy-manage .mint-search{
    flex: 1;
    height: 40px;
}
.diy-manage .mint-searchbar{
    padding: 0;
    background-color: #f8f8f8;
    border-radius: 20px;
}
.diy-manage .mint-search .mint-searchbar-inner{
    background-color: #f8f8f8;
    border-radius: 20px;
}
.diy-manage .mint-search .mint-searchbar-core{
    background-color: #f8f8f8;
    padding: 0 5px;
}
.diy-manage .mint-search .mint-searchbar-cancel{
    color: #888;
    font-size: 12px;
}
.diy-manage .seach-wrapper {
    display: flex;
    padding: 8px 15px 4px 15px;
    background-color: #fff;
    position: fixed;
    top: 50px;
    width: 100%;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.diy-manage .seach-wrapper .statusText {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    flex: 0 0 50px
}
.diy-manage .seach-wrapper .addProduct {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    flex: 0 0 80px;
    margin-left: 10px;
    width: 80px;
    text-align: left;
    color: #508cee
}
.diy-manage .loadmore{
    margin-top: 10px;
}
.diy-manage .item{
    margin-top: 10px;
    background-color: #fff;
    display: block;
    text-decoration: none;

}
.diy-manage .page-infinite-list a.item:nth-of-type(1){
    margin-top: 0;
}
.diy-manage .item .status .mint-cell-title{
    font-size: 12px;
    color: #333;
    font-weight: 700;
}
.diy-manage .item .status .mint-cell-wrapper{
    padding-left: 15px;
    background-image: linear-gradient(180deg, #f7f7f7, #f7f7f7 50%, transparent 50%);
}
.diy-manage .item .content {
    display: flex;
    padding: 10px 15px;
    background-color: #fafafa;
}
.diy-manage .item .content .img{
    height: 80px;
    flex: 0 0 80px;
    width: 80px;
}
.diy-manage .item .content .desc{
    margin-left: 10px;flex: 1
}
.diy-manage .item .content .title{
    font-size: 13px;
    color: #333;
    line-height:18px;
    font-weight: 700;
    margin-top: 5px;
}
.diy-manage .item .content .subtitle {
    font-size: 12px;
    color: #999999;
    margin: 10px 0;
}
.diy-manage .item .content .text {
    color: #999999;
    font-size: 12px
}
.diy-manage .item .content .label {
    float: right;
    border: 1px solid #fe1b5e;
    border-radius: 15px;
    color: #fe1b5e;
    font-size: 11px;
    padding: 1px 3px
}
.diy-manage .item .price {
    background-image: linear-gradient(180deg, #f4f4f4, #f4f4f4 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: bottom center;
    text-align: right;
    height: 44px;
    line-height: 44px;
    padding-right: 15px;
    font-size: 12px;
    color: #999;
}
.diy-manage .item .price .mark{
    font-size: 11px;
    color: #ff801a;
}
.diy-manage .item .price .number{
    font-size: 15px;
    color: #ff801a;
}
.diy-manage .item .edit-btn{
    display: flex;padding:15px;
    justify-content: flex-end;
}
.diy-manage .item .edit-btn .mint-button{
    flex: 0 0 100px;font-size: 12px;margin: 0 10px;
}
.diy-manage .item .edit-btn .mint-button--small{
    padding: 0;
    border-radius: 20px;
    height:25px;
    line-height:25px;
    background-color: #fff;
    color: #333333;
    box-shadow: none;
    border: 1px solid #a0a0a0;
}
.diy-manage .mint-searchbar-inner .mintui-search{
    font-size: 16px;
}
.diy-manage .mint-search .mint-searchbar-cancel{
    padding-right: 15px;
}
.mintui{
    font-size: 20px;
}
</style>
