<template>
    <div class="user"  :style="{height: this.buttonBottom - 80 + 'px'}">
        <mt-header fixed title="设置" >
            <router-link to="/index/user" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <mt-cell title="店铺信息" is-link  @click.native="saveRouter('update-user')"></mt-cell>
            <mt-cell title="交易规则设置"  is-link  @click.native="saveRouter('change-rule')"></mt-cell>
            <mt-cell title="登录密码修改" to="/change-password" is-link ></mt-cell>
            <mt-cell title="安全密码修改"   is-link  @click.native="saveRouter('change-extpassword')"></mt-cell>
            <!--<mt-cell title="修改绑定手机号" to="/change-phone" is-link value="默认注册手机"></mt-cell>-->
        </div>
        <mt-button size="large" style="background-color: #fff;" @click="exitApp">注销登录</mt-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data () {
           return {
               buttonBottom: 0
           }
        },
        computed: mapState({
            storeId: state => state.Login.data.storeId
        }),
         mounted () {
              this.$navigation.cleanRoutes()
              this.buttonBottom =  window.screen.height;
         },
        methods: {
            exitApp () {
                this.$store.dispatch('clearToken')
                this.$navigation.cleanRoutes()
                this.$router.replace('/')
            },
            saveRouter(value) {
                if(this.storeId) {
                    this.$router.push('/'+value)
                } else {
                    let self = this;
                    function onConfirm(buttonIndex) {
                        if(buttonIndex ===1){
                            self.$router.replace('/store')
                        }
                    }
                    navigator.notification.confirm(
                        '开通店铺后，才能访问！', // message
                        onConfirm,            // callback to invoke with index of button pressed
                        '提示',           // title
                        ['立即开通','暂不开通']     // buttonLabels
                    );
                }
            }
        }
    }
</script>
<style>
.user{
    padding-top: 50px;
    background-color: #f5f5f5;

}
.user .container{
    margin: 15px 0 40px 0;
}
.user .container .mint-cell-wrapper{
    padding: 0 15px;
}
.user .mint-button{
    box-shadow: none;
}
</style>
