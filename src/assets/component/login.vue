<template>
   <div class="login">
       <div class="content">
           <div class="logo">
               <img src="../images/logo.png" alt="" width="80px">
               <h1 class="title">小店铺的大智慧</h1>
               <p class="subtitle">© 时光购</p>
           </div>
           <mt-field  placeholder="请输入手机号" v-model="user.username"  :state="user.username ? 'success' : ' '"></mt-field>
           <mt-field  placeholder="请输入密码" type="password" v-model="user.password" :state="user.password ? 'success' : ''" ></mt-field>
           <mt-button type="primary" size="large" style="margin-top: 40px"  @click.native="login" :disabled="!user.username || !user.password">登录</mt-button>
           <div  class="register-btn">
               <router-link to="/regesiter">注册账号 </router-link> | <router-link to="/forgot-password">忘记密码</router-link>
           </div>
       </div>
   </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
     data () {
         return {
             user: {
                 username: '',
                 password: ''
             }
         }
      },
      methods: {
          login () {
              this.$http.post('/accounts/login',this.user).then(res => {
                  this.$store.dispatch('setLogin',res.data)
                  this.$router.replace('/index')
              }, error => {
                  MessageBox.alert(error.response.data.message,"提示!")
              })
          }
      }
    }
</script>

<style>
.login{
  display: table;
  width: 100%;
  height:100%;
  position: absolute;
  left: 0;
  top:0;
  background-color: #fff;
    padding-bottom: 40px;
}
.login .content{
    display: table-cell;
    vertical-align: middle;
    padding:10px 15px;
}
.login .content .logo{
    text-align: center;
}
.login .logo .title{
    font-size: 13px;
    color: #999;
    margin-top: 15px;
    font-weight: normal;
}
.login .logo .subtitle{
    font-size: 12px;
    color: #c6c5c5;
}
.login .mint-cell{
    margin:10px 0 ;
}
.login .mint-cell .mint-cell-wrapper{
    background-position: bottom left;
}
.login .register-btn {
    text-align: center;
    padding-top: 80px;
    position: relative;
    top: 50px;
    color: #999999;
    font-size: 12px;
}
.login .register-btn a{
    text-decoration: none;
    color: #999999;
    font-size: 14px;
    padding: 0 10px;
}
</style>
