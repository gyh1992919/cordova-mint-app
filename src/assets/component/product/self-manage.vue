<template>
    <div class="self-manage">
        <mt-header title="自营商品管理" fixed>
            <router-link to="/index/product" slot="left">
                <mt-button icon="back" ></mt-button>
            </router-link>
        </mt-header>
        <div  class="seach-wrapper">
            <div class="statusText" @click="sheetVisible = true">状态<span class="caret"></span></div>
            <mt-search   placeholder="商品名称" v-model="seachValue"></mt-search>
            <div class="addProduct" @click="$router.push('/add-product')">添加商品</div>
        </div>
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <router-link class="item" v-for="(product,index,key) in listView" :key="index" :to="{ path:'/self-manage/'+product.id}" >
                    <mt-cell :title="product.statusText"  class="status"></mt-cell>
                    <div class="content" >
                        <img   v-lazy="product.image"  class="img">
                        <div class="desc">
                            <div class="title" >{{product.name}}</div>
                            <div class="subtitle" >类目：{{product.categoryName}}</div>
                            <div class="text" >库存数：{{product.quantity}} <span class="label" >自营商品</span></div>
                        </div>
                    </div>
                    <div class="price">销售价：<span class="mark">¥</span><span class="number">{{product.price}}</span></div>
                    <div class="edit-btn">
                        <!--<mt-button size="small" >设置库存</mt-button>-->
                        <!--<mt-button size="small" >下架</mt-button>-->
                        <mt-button size="small" @click.native="updateProduct(product,$event)">编辑</mt-button>
                        <mt-button size="small" >查看</mt-button>
                    </div>
                </router-link>
            </div>
            <p v-show="loading" class="page-infinite-loading" >
                <mt-spinner type="fading-circle"></mt-spinner>
                <span class="title">正在加载中...</span>
            </p>
        </mt-loadmore>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    export default {
        data () {
          return {
              productList: [],
              sheetVisible: false,
              seachValue:'',
              filterValue: null,
              haveMore: true,
              loading: false,
              actions: [{
                  name: '全部',
                  method: this.sheetVisible = false
                },
                  {
                   name: '进行中',
                   method: this.takePhoto
                  },
                  {
                    name: '下架',
                    method: this.takePhoto
                  }
               ],
              params: {
                  "per-page": 10,
                  page:1
              }
          }
        },
        mounted() {
            this.getProduct(true)
            Indicator.open({
                text: '正在更新数据....',
                spinnerType: 'fading-circle'
            });
            setTimeout(()=>{
                Indicator.close();
            },1500)
        },
        computed: {
            listView: function () {
                var self = this;
                if (self.seachValue.length > 0 ) {
                    return self.productList.filter(function(item) {
                        for(let i=0;i<item.name.length;i++){
                           return self.seachValue.indexOf(item.name[i])> -1
                        }
                    });
                }else if(self.filterValue){
                    return self.productList.filter(function(item) {
                            return self.filterValue.indexOf(item.statusText)> -1
                    });
                }else {
                    return self.productList;
                }
            }
          },
        methods: {
            takePhoto (value){
               this.filterValue = value.name
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
            getProduct(clear) {
                this.$http({method:'get',url:'/products',params: this.params,headers: {
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
                        this.productList = data
                    } else {
                        this.productList = this.productList.concat(data)
                    }
                })
            },
            updateProduct (product,event) {
                event.preventDefault()
                this.$store.dispatch('updateProductData',product)
                this.$router.push('/update-product')
            }
        }

    }
</script>
<style>
.page-infinite-loading{
    display: flex;justify-content: center;
}
.page-infinite-loading .title{
    padding-left: 15px
}
.self-manage{
     background-color: #f9f9f9;
     padding-top: 95px;
}
.caret{
    display:inline-block;
    width:0;
    height:0;
    margin-left:2px;
    vertical-align: middle;
    border-top:4px dashed;
    border-right: 4px solid transparent;
    border-left:4px solid transparent
}
.mint-header{
    height:50px;
    background-color: #508cee;
    font-size: 15px;
}
.self-manage .mint-search{
    flex: 1;
    height: 40px;
}
.self-manage .mint-searchbar{
    padding: 0;
    background-color: #f8f8f8;
    border-radius: 20px;
}
.self-manage .mint-search .mint-searchbar-inner{
    background-color: #f8f8f8;
    border-radius: 20px;
}
.self-manage .mint-search .mint-searchbar-core{
    background-color: #f8f8f8;
    padding: 0 5px;
}
.self-manage .mint-search .mint-searchbar-cancel{
    color: #888;
    font-size: 12px;
}
.self-manage .seach-wrapper {
    display: flex;
    padding: 8px 15px 4px 15px;
    background-color: #fff;
    position: fixed;
    top: 50px;
    width: 100%;
    z-index: 2;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.self-manage .seach-wrapper .statusText {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    flex: 0 0 50px
}
.self-manage .seach-wrapper .addProduct {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    flex: 0 0 80px;
    margin-left: 10px;
    width: 80px;
    text-align: left;
    color: #508cee
}
.self-manage .loadmore{
    margin-top: 10px;
}
.self-manage .item{
    margin-top: 10px;
    background-color: #fff;
    display: block;
    text-decoration: none;
}
.self-manage .page-infinite-list a.item:nth-of-type(1){
    margin-top: 0;
}
.self-manage .item .status .mint-cell-title{
    font-size: 12px;
    color: #333;
    font-weight: 700;
}
.self-manage .item .status .mint-cell-wrapper{
    padding-left: 15px;
    background-image: linear-gradient(180deg, #f7f7f7, #f7f7f7 50%, transparent 50%);
}
.self-manage .item .content {
    display: flex;
    padding: 10px 15px;
    background-color: #fafafa;
}
.self-manage .item .content .img{
    height: 80px;flex: 0 0 80px
}
.self-manage .item .content .desc{
    margin-left: 10px;flex: 1
}
.self-manage .item .content .title{
    font-size: 13px;
    color: #333;
    line-height:18px;
    font-weight: 700;
    margin-top: 5px;
}
.self-manage .item .content .subtitle {
    font-size: 12px;
    color: #999999;
    margin: 10px 0;
}
.self-manage .item .content .text {
    color: #999999;
    font-size: 12px
}
.self-manage .item .content .label {
    float: right;
    border: 1px solid #fe1b5e;
    border-radius: 15px;
    color: #fe1b5e;
    font-size: 11px;
    padding: 1px 3px
}
.self-manage .item .price {
    background-image: linear-gradient(180deg, #f7f7f7, #f7f7f7 50%, transparent 50%);
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
.self-manage .item .price .mark{
    font-size: 11px;
    color: #ff801a;
}
.self-manage .item .price .number{
    font-size: 15px;
    color: #ff801a;
}
.self-manage .item .edit-btn{
    display: flex;padding:15px
}
.self-manage .item .edit-btn .mint-button{
    flex: 1;font-size: 12px;margin: 0 10px;
}
.self-manage .item .edit-btn .mint-button--small{
    padding: 0;
    border-radius: 20px;
    height:25px;
    line-height:25px;
    background-color: #fff;
    color: #333333;
    box-shadow: none;
    border: 1px solid #a0a0a0;
}
.self-manage .mint-searchbar-inner .mintui-search{
    font-size: 16px;
}
.self-manage .mint-search .mint-searchbar-cancel{
    padding-right: 15px;
}
.mintui{
    font-size: 20px;
}
</style>
