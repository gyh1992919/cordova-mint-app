<template>
    <!-- App -->
    <div class="near-order">
        <mt-header title="当面付" fixed>
            <router-link to="/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button @click.native="toggleOrder" slot="right">切换订单</mt-button>
        </mt-header>
        <mt-navbar v-model="selected" class="order-navbar">
            <mt-tab-item id="all" @click.native="setValue('')">全部</mt-tab-item>
            <mt-tab-item id="wait-pay"  @click.native="setValue('待支付')">待支付</mt-tab-item>
            <mt-tab-item id="complete" @click.native="setValue('完成')">已完成</mt-tab-item>
            <mt-tab-item id="close"  @click.native="setValue('关闭')">已关闭</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" >
            <mt-tab-container-item id="all">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="wait-pay">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="complete">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="close">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
    import { Actionsheet } from 'mint-ui';
    import allOrderView from './all.vue'
    export default {
        data () {
            return {
                selected: 'all',
                sheetVisible: false,
                propsValue: '',
                actions: []
            }
        },
        methods: {
            toggleOrder () {
                this.sheetVisible = true
            },
            toggleOther() {
                this.$router.push('/other-order')
            },
            setValue (value) {
                this.propsValue = value
            }
        },
        mounted() {
            this.actions = [{
                name: '普通订单',
                method: this.toggleOther
            }]
        },
        components: {
            allOrderView
        }
    }
</script>

<style>
.near-order{
    padding-top: 100px;
}
.near-order .order-navbar{
    position: fixed;
    z-index: 2;
    top:50px;
    width: 100%;
    left: 0;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position:bottom center;
    background-origin: content-box;
    box-sizing:border-box;
}
.near-order  .mint-navbar .mint-tab-item{
    position: relative;
}
.near-order  .mint-navbar .mint-tab-item:after{
    content: "";
    position: absolute;
    left: 30px;
    right:30px;
    height:1px;
    background-color: #508cee;
    bottom: 8px;
    transform: scale(0);
    -webkit-transform: scale(0);
    transition: transform .3s ;
    -webkit-transition: transform .3s ;
}
.near-order  .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0;
    border: none;
    color: #508cee;
}
.near-order  .mint-navbar .mint-tab-item.is-selected:after{
    transform: scale(1);
}
</style>
