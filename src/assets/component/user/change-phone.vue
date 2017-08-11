<template>
    <div class="change-phone"  :style="{height: this.buttonBottom - 80 + 'px'}">
        <mt-header fixed title="更换手机号">
            <router-link to="/user-setting" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="margin: 10px 0 44px 0">
            <mt-field  placeholder="请输入手机号" type="email"></mt-field>
            <mt-field  placeholder="请输入验证码" type="email">
                <mt-button type="default" size="small" style="border-radius: 20px;background: #fff;min-height: 30px">确认更换</mt-button>
            </mt-field>
            <mt-field  placeholder="请输入新的手机号" type="email"></mt-field>
            <mt-field  placeholder="请输入验证码" type="email">
                <mt-button type="default" size="small"  style="border-radius: 20px;background: #fff;min-height: 30px">确认更换</mt-button>
            </mt-field>
        </div>
        <div style="padding:0 15px">
            <mt-button type="default" size="large" style="">确认更换</mt-button>
        </div>
    </div>
</template>

<script>
     export default {
         data () {
             return {
                 buttonBottom: 0
             }
         },
         mounted () {
             this.buttonBottom =  window.screen.height;
         }
     }
</script>

<style>
.change-phone{
   padding-top: 50px;
    background-color: #f5f5f5;
}
.change-phone .mint-cell{
   min-height: 59px;
}
</style>
