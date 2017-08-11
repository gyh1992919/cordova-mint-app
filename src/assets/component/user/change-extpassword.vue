<template>
    <!-- App -->
    <div class="set-Extpassword">
        <mt-header fixed title="更改提现密码">
            <router-link to="/user-setting" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <!--<mt-field  placeholder="请输入手机号"  type="number" v-model="user.phone"></mt-field>-->
            <mt-cell  title="手机号:" :value="user.phone"></mt-cell>
            <mt-field  placeholder="请输入验证码"  type="number" v-model="user.code">
                <mt-button size="small" style="background-color: #fff;border-radius: 20px" @click.native="getCode" :disabled="buttonDisabled">{{ buttonText}}</mt-button>
            </mt-field>
            <mt-field  placeholder="请输入密码"  type="password" v-model="user.rePassword"></mt-field>
            <mt-field  placeholder="请输入确认密码"  type="password" v-model="user.password"></mt-field>
        </div>
        <div style="margin-top: 40px;padding: 0 15px">
            <mt-button size="large" style="background-color: #fff;" :disabled="!user.rePassword || !user.password || !user.code" @click.native="setExtPassword">确认</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                buttonDisabled: false,
                buttonText: "获取验证码",
                time: null,
                user: {
                    phone: null,
                    code: null,
                    rePassword: null,
                    password: null
                }
            }
        },
        mounted () {
            this.user.phone = this.$store.state.Login.data.phone
        },
        methods: {
            getCode () {
                this.$http.post('/auth-codes/extpassword',{ phone: this.user.phone}).then(res => {
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
            setExtPassword () {
                this.$http.post('/users/extract-password',this.user,{ headers: {
                    'X-Access-Token': this.$store.getters.getData.token}
                }).then(res => {
                    if(res.data.code === 1) {
                        let instance = Toast(res.data.message);
                        setTimeout(() => {
                            this.$router.push('/index/user');
                            instance.close();
                        }, 2000)
                    } else {
                        Toast('更改失败');
                    }
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
    .set-Extpassword .content{
        margin-top: 60px;
    }
    .set-Extpassword .mint-field{
        min-height: 58px;
    }
</style>
