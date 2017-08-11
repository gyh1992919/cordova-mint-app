<template>
    <div class="forgot-password">
        <mt-header fixed title="找回密码">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <mt-field  placeholder="请输入手机号" v-model="user.phone" type="number"></mt-field>
            <mt-field  placeholder="请输入验证码" v-model="user.authCode" type="number">
                <mt-button size="small" @click.native="getCode" :disabled="buttonDisabled" style="background-color: #fff;border-radius: 20px">{{buttonText}}</mt-button>
            </mt-field>
            <mt-field  placeholder="请输入密码" type="password" v-model="user.password"></mt-field>
            <mt-field  placeholder="请输入确认密码" type="password" v-model="user.confirmPassword"></mt-field>
        </div>
        <div class="reset-btn">
            <mt-button size="large" @click.native="resetPassword" :disabled="!user.phone || !user.authCode ||!user.password || !user.confirmPassword">立即找回</mt-button>
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
                    authCode:null,
                    confirmPassword: null
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
            resetPassword () {
                this.$http.post('/accounts/forget-password',this.user).then(res => {
                    let instance = Toast('重置成功');
                    setTimeout(() => {
                        instance.close();
                        this.$navigation.cleanRoutes()
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
.forgot-password {
    padding-top: 50px ;
}
.forgot-password .content{
    margin-top: 10px;
}
.forgot-password .mint-header{
    height:50px;
    font-size: 16px;
    background-color: #508cee;
}
.forgot-password .mint-cell .mint-cell-wrapper{
    background-position: bottom left;
    padding: 0 15px;
}
.forgot-password .reset-btn {
    margin-top: 40px;
    padding: 0 15px;
}
.forgot-password .reset-btn .mint-button{
    background-color: #508cee;
    color: #fff;
}
</style>
