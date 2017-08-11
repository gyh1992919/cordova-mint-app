<template>
    <!-- App -->
    <div class="order">
        <mt-header title="免单团" fixed>
            <router-link to="/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="" class="tab">
            <div class="item"> <router-link to="/order/">全部</router-link></div>
            <div  class="item"> <router-link to="/order/unconfirm">待验证</router-link></div>
            <div  class="item"> <router-link to="/order/verified">已验证</router-link></div>
            <div  class="item"> <router-link to="/order/overdue">已过期</router-link></div>
        </div>
        <transition name="fade">
            <keep-alive>
                <router-view class="order-view"></router-view>
            </keep-alive>
        </transition>
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>
 import { Actionsheet } from 'mint-ui';
 export default {
  data () {
     return {
        sheetVisible: false,
         actions: []
     }
  },
   methods: {
       toggleOrder () {
          this.sheetVisible = true
       },
       togglePay() {
         this.$router.push('/near-pay')
       }
   },
     mounted() {
         this.actions = [{
             name: '当面付',
             method: this.togglePay
         }]
     }
}
</script>

<style>
.order{
    padding-top: 90px;
}
.order .tab{
    display: flex;
    position: fixed;
    width: 100%;
    height:50px;
    line-height:50px;
    z-index: 2;
    top:50px;
    background-color: #fff;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position:bottom center;
    background-origin: content-box;
    box-sizing:border-box;
}

.order .tab .item {
    flex: 1;
    text-align: center;
    height:50px;
    line-height:50px;
}
.order .tab .item a{
    text-decoration: none;
    color: #333;
    display: block;
    height:98%;
    font-size: 12px;
    width: 100%;
}
.order-view{
    position: absolute;
    width: 100%;
    top:80px;
    left: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity  1s
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.order .tab .item a:focus{
    background-color: #fff;
}
.order .tab .item .router-link-exact-active{
    color: #508cee;
    position: relative;
}
.order .mint-cell-wrapper{
    background-image: none;
}
</style>
