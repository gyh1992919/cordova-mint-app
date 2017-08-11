<template>
    <!-- App -->
    <div class="other-order">
        <mt-header title="自营订单" fixed>
            <router-link to="/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button @click.native="toggleOrder" slot="right">切换订单</mt-button>
        </mt-header>
        <mt-navbar v-model="selected" class="order-navbar">
            <mt-tab-item id="other-all" @click.native="setValue('')">全部</mt-tab-item>
            <mt-tab-item id="other-wait-pay"  @click.native="setValue('待支付')">待支付</mt-tab-item>
            <mt-tab-item id="delivery" @click.native="setValue('待发货')">待发货</mt-tab-item>
            <mt-tab-item id="deliveries"  @click.native="setValue('已发货')">已发货</mt-tab-item>
            <mt-tab-item id="other-complete"  @click.native="setValue('完成')">已完成</mt-tab-item>
            <mt-tab-item id="other-close"  @click.native="setValue('关闭')">已关闭</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" >
            <mt-tab-container-item id="other-all">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="other-wait-pay">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="delivery">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="deliveries">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="other-complete">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
            <mt-tab-container-item id="other-close">
                <allOrder-view :filter="propsValue"></allOrder-view>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    </div>
</template>

<script>
    import { Actionsheet } from 'mint-ui';
    import allOrderView from './all-otherOrder.vue'
    export default {
        data () {
            return {
                selected: 'other-all',
                sheetVisible: false,
                propsValue: '',
                actions:[{
                    name: '当面付',
                    method: this.toggleOther
                }]
            }
        },
        methods: {
            toggleOrder () {
                this.sheetVisible = true
            },
            toggleOther() {
                this.$router.push('/near-pay')
            },
            setValue (value) {
                this.propsValue = value
            }
        },
        mounted() {
            this.getOrder(true)
        },
        components: {
            allOrderView
        }
    }
</script>

<style>
    .other-order{
        padding-top: 75px;
    }
    .other-order .order-navbar{
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
    .other-order  .mint-navbar .mint-tab-item{
        position: relative;
    }
    .other-order  .mint-navbar .mint-tab-item:after{
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
    .other-order  .mint-navbar .mint-tab-item.is-selected{
        margin-bottom: 0;
        border: none;
        color: #508cee;
    }
    .other-order  .mint-navbar .mint-tab-item.is-selected:after{
        transform: scale(1);
    }
</style>
