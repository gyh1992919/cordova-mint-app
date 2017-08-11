<template>
    <div class="trade-record" >
        <mt-header fixed title="交易记录">
            <mt-button icon="back" slot="left" @click.native="$router.back()"></mt-button>
            <mt-button slot="right" @click.native=" filterPopup = true">筛选</mt-button>
        </mt-header>
        <mt-navbar v-model="select">
            <mt-tab-item id="trade-record">全部</mt-tab-item>
            <mt-tab-item id="profit" >收益</mt-tab-item>
            <mt-tab-item id="extracts">提现</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="select">
            <mt-tab-container-item id="trade-record">
                <trade-record :filterValue="selectValue"></trade-record>
            </mt-tab-container-item>
            <mt-tab-container-item id="profit">
                <profit-view></profit-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="extracts">
                <extract-view></extract-view>
            </mt-tab-container-item>
        </mt-tab-container>

        <!--筛选popup-->
        <mt-popup v-model="filterPopup" position="right" class="mint-popup-filter" :modal="false">
            <mt-header fixed title="交易筛选">
                <mt-button icon="back" slot="left" @click.native="filterPopup =false"></mt-button>
            </mt-header>
            <div  class="filter-type">
                <div  class="content">
                    <div  class="title">选择分类</div>
                    <div>
                        <mt-button size="small"  @click.native="selectEvent('')">全部</mt-button>
                        <mt-button size="small"  @click.native="selectEvent('提现')">提现</mt-button>
                        <mt-button size="small"  @click.native="selectEvent('订单')">结算</mt-button>
                        <mt-button size="small"  @click.native="selectEvent('奖励')">奖励</mt-button>
                    </div>
                </div>
                <!--时间picker-->
                <mt-cell title="选择时间" style="" @click.native="openDate" class="date-wrapper">
                    <img src="../../images/financial-management/date.png" alt="" slot="icon" height="18px" >
                </mt-cell>
            </div>

            <mt-popup v-model="datePopup" popup-transition="popup-slide"  position="bottom" class="datePopup">
                <div class="dateConfirm" >
                    <span  class="btn" @click="datePopup = false">取消</span>
                    <span  class="btn" @click="confirmDate">确定</span>
                </div>
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </mt-popup>


        </mt-popup>

    </div>
</template>

<script>
    import TradeRecord from './all-trade.vue'
    import ExtractView from './extracts.vue'
    import ProfitView from './trading-records-earn.vue'
    export default {
        data () {
            return {
                selectValue:'',
                pickerValue: '',
                select: 'trade-record',
                datePopup: false,
                filterPopup: false , //筛选框
                slots: [
                    {
                        flex: 1,
                        values: ['2015', '2016', '2017','2018'],
                        className: 'slot1',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot2',
                        textAlign: 'center'
                    },
                    {
                        flex: 1,
                        values: ['01', '02', '03', '04', '05', '06','07','08','09','10','11','12'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ]
            }
        },
        components:{
            TradeRecord, ExtractView, ProfitView
        },
        methods:{
            confirmDate (){
                this.datePopup = false;
                this.filterPopup  = false;
                this.selectValue =  this.pickerValue
            },
            openDate() {
                this.datePopup = true
            },
            selectEvent (value) {
              this.filterPopup  = false;
              this.selectValue = value;

            },
            onValuesChange(picker, values) {
             this.pickerValue = values[0] +'-'+values[1]
            }
        }
    }
</script>

<style scoped>
.trade-record{
    padding-top: 100px;
}
.mint-navbar{
    position: fixed;
    top:50px;
    width: 100%;
    background-color: #fff;
    z-index: 2;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position:bottom center;
    background-origin: content-box;
    box-sizing:border-box;
}
.mint-navbar .mint-tab-item{
    position: relative;
}
.mint-navbar .mint-tab-item.is-selected{
    border: none;
    color: #508cee;
}
.mint-navbar .mint-tab-item.is-selected:after{
    transform: scale(1);
}
.mint-navbar .mint-tab-item:after{
   content: "";
    position: absolute;
    height:1px;
    background-color: #508cee;
    left: 50px;
    right:50px;
    bottom: 10px;
    transform: scale(0);
    transition: transform .5s;
}
.mint-popup-filter{
    width: 100%;
    height:100%;
    background-color: #f5f5f5;
}
.trade-record .filter-type{
    margin-top: 60px
}
.trade-record .filter-type .content{
    background-color: #fff;padding: 15px
}
.trade-record .filter-type .title{
    margin:0 0 15px 0;padding-left: 10px;color: #999
}
.trade-record .filter-type .mint-button {
    height: 25px;
    width: 65px;
    border-radius: 20px;
    background-color: #fff;
    margin-right: 8px;
    font-size: 12px;
}
.trade-record .date-wrapper{
    margin-top: 10px
}
.trade-record .date-wrapper img{
    padding-right: 5px
}
.trade-record .datePopup{
    width: 100%;
}
.trade-record .dateConfirm{
    text-align: center;background-color: #fff;margin-top: 20px
}
.trade-record .dateConfirm .btn{
    padding: 0 10px
}
</style>
