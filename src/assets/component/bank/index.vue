<template>
    <div class="bank" >
        <mt-header fixed title="银行卡">
            <router-link to="/index/user" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/bank-new" slot="right">
                <mt-button >添加银行卡</mt-button>
            </router-link>
        </mt-header>
        <mt-loadmore :top-method="loadTop" ref="loadmore" class="loadmore"  style="margin-top: 10px">
            <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="haveMore" infinite-scroll-distance="60">
                <mt-cell-swipe :title="item.bankTypeText"  v-for="(item,index) in BankList" :label="item.bankCode"  :key="index"   :right="[
                    {
                        content: '删除',
                        style: { background: 'red', color: '#fff' },
                        handler() {
                            pass(item.id)
                        }
                    }
                ]" @click.native="chasnge">
                    <span>{{item.name}}</span>
                </mt-cell-swipe>
            </div>
            <p v-show="loading" class="page-infinite-loading" >
                <mt-spinner type="fading-circle"></mt-spinner>
                <span class="title">正在加载中...</span>
            </p>
        </mt-loadmore>
        <div v-show="BankList.length = 0"  class="empty-info">
            <img src="../../images/empty-content.png" alt="" height="100">
            <p style="" class="text">暂时没有相关的卡号</p>
        </div>
    </div>
</template>


<script type="text/babel">
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                BankList: [],
                haveMore: true,
                loading: false,
                params: {
                    "per-page": 10,
                    page:1
                }
            };
        },
        mounted() {
          this.getTradingRecord(true);
        },
        methods: {
            pass (value) {
                this.$http({method:'delete',url:'/bank-cards/'+ value ,params: {id: value }, headers: {'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
                    this.getTradingRecord(true);
                })
            },
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
                this.$http({method:'get',url:'/bank-cards',params: this.params, headers: {'X-Access-Token': this.$store.getters.getData.token}}).then( res => {
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
                        this.BankList = data
                    } else {
                        this.BankList = this.BankList.concat(data)
                    }
                })
            }
        }
    };
</script>

<style scoped>
.bank{
    padding-top: 50px;
}
.bank .item{
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
}
.bank .mint-cell{
    min-height: 62px;
}
.bank  a.mint-cell-swipe-button{
    line-height:62px;
}
.bank .item .name{
    font-size: 13px;padding-top: 10px;color: #333333
}
.bank .item .desc{
    display: flex;margin-bottom: 10px;padding: 5px 0 10px;
}
.bank .amount{
    flex: 0 0 100px;
    font-size: 18px;
    color: #ff801a;
    text-align: center;
}
.bank .item .order-sn{
    flex: 1;color: #999999;font-size: 12px
}
.bank .empty-info{
    text-align: center;color: #ccc;padding: 30px
}
.bank .empty-info .text{
    margin-top: 20px
}

</style>
