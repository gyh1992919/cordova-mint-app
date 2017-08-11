<template>
    <div class="register">
        <mt-header fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <div class="logo">
                <img src="../images/logo.png" alt="" width="80px">
                <h1 class="title">小店铺的大智慧</h1>
                <p class="subtitle">© 时光购</p>
            </div>
            <mt-field  placeholder="请输入手机号" v-model="user.phone"  :state="user.phone ? 'success' : 'warning'" type="number"></mt-field>
            <mt-field  placeholder="请输入验证码" type="number" v-model="user.authCode"  >
                <mt-button size="small" class="getcode" @click="getCode" :disabled="buttonDisabled">{{buttonText}}</mt-button>
            </mt-field>
            <mt-field  placeholder="请输入密码" v-model="user.password"  :state="user.password ? 'success' : 'warning'" type="password"></mt-field>
            <mt-field  placeholder="请输入确认密码" type="password" v-model="extpassword" :state="extpassword ? 'success' : 'warning'" ></mt-field>
            <mt-button type="primary" size="large" style="margin-top: 40px"  @click.native="regesiter" :disabled="!user.phone || !user.password || !user.authCode"> 确认注册</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
         data () {
             return {
                 buttonText: "获取验证码",
                 buttonDisabled: false,
                 extpassword: null,
                 user:{
                     phone:null,
                     password: null,
                     authCode:null
                 }
             }
         },
        methods: {
            getCode () {
                this.$http.post('/auth-codes',{ phone: this.user.phone}).then(res => {
                    this.time = 60;
                    let timer = setInterval(() => {
                        if( this.time === 0){
                            this.buttonText = '获取验证码';
                            this.buttonDisabled = false;
                            clearInterval(timer);
                        } else {
                            this.buttonText ='('+this.time+')'+ '重新获取';
                            this.time--;
                            this.buttonDisabled = true;
                        }
                    },1000)
                }, error => {
                    let instance = Toast(error.response.data.message);
                    setTimeout(() => {
                        instance.close();
                    }, 2000)
                })
            },
            regesiter () {
                this.$http.post('/employees',this.user).then(res => {
                    let instance = Toast('注册成功');
                    setTimeout(() => {
                        instance.close();
                        this.$router.push('/');
                    }, 2000)
                }, error => {
                    let instance = Toast(error.response.data.message);
                    setTimeout(() => {
                        instance.close();
                    }, 2000)
                })
            }
        }
    }
</script>

<style>
.register{
    display: table;
    width: 100%;
    height:100%;
    position: absolute;
    left: 0;
    top:0;
    background-color: #fff;
    padding-bottom: 40px;
}
.register .mint-header{
    background-color: transparent;
    color: #000;
}
.register .mint-cell .mint-cell-wrapper{
    background-position: bottom left;
}
.register .content{
    display: table-cell;
    vertical-align: middle;
    padding:10px 15px;
}
.register .content .logo{
    text-align: center;
}
.register .logo .title{
    font-size: 13px;
    color: #999;
    margin-top: 15px;
    font-weight: normal;
}
.register .logo .subtitle{
    font-size: 12px;
    color: #c6c5c5;
}
.register .mint-cell{
    margin:10px 0 ;
}
.register .getcode{
    border-radius: 20px;background-color: #fff;
}
</style>
