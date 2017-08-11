<template>
    <div class="change-phone"  :style="{height: this.buttonBottom - 80 + 'px'}">
        <mt-header fixed title="修改密码">
            <router-link to="/user-setting" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div style="margin-top: 10px">
            <mt-field  placeholder="请输入原始密码" v-model="user.oldPassword" type="password"></mt-field>
            <mt-field  placeholder="请输入新的密码" v-model="user.password" type="password"></mt-field>
        </div>
        <div style="margin-top: 40px;padding: 0 15px">
            <mt-button type="default" size="large" @click="saveChangePassword" :disabled="!user.oldPassword || !user.password">确认修改</mt-button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                buttonBottom: 0,
                user: {
                    password: null,
                    oldPassword: null
                }
            }
        },
        computed: mapState({
            store: state => state.Login.data,
        }),
        mounted () {
            this.buttonBottom =  window.screen.height;
        },
        methods: {
            saveChangePassword () {
                this.$http({method:'post',url:'/users/change-password',data: this.user,headers: {
                    'X-Access-Token': this.store.token}}).then( res => {
                    Toast({
                        message: '修改成功',
                        position: 'middle',
                        duration: 1500
                    });
                    this.$router.push('/user-setting')
                },error => {
                    Toast({
                        message: error.response.data.message,
                        position: 'middle',
                        duration: 1500
                    });
                })
            }
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
