<template>
    <div class="change-phone"  :style="{height: this.buttonBottom - 80 + 'px'}">
        <mt-header fixed title="交易规则">
            <router-link to="/user-setting" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" @click.native="savePayRule">保存</mt-button>
        </mt-header>
        <div style="margin-top: 10px">
            <mt-field label="起送价" placeholder="0元" v-model="user.minAmount"></mt-field>
            <mt-field label="当面折扣" placeholder="九折输入90" v-model="user.payDiscount"></mt-field>
            <div style="padding: 10px;background-color: #fff;">当面付规则:</div>
            <mt-field  placeholder="请输入当面付规则" v-model="user.payRule"  rows="5" type="textarea"></mt-field>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                buttonBottom: 0,
                user: {
                    minAmount: null,
                    payRule: null,
                    payDiscount: null
                }
            }
        },
        methods: {
            savePayRule () {
                this.$http({url:'/stores/update-rules/' +this.storeId, method: 'put', data:{
                    minAmount: this.user.minAmount,
                    payRule: this.user.payRule,
                    payDiscount: this.user.payDiscount,
                    id: this.storeId
                }}).then(res =>{
                    let instance = Toast('更新成功');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                    this.$router.back();
                })
            },
            getRule () {
                this.$http({url:'/stores/' +this.storeId, headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then(res =>{
                    this.user = res.data;
                })
            }
        },
        computed: mapState({
            storeId: state => state.Login.data.storeId
        }),
        mounted () {
            this.buttonBottom =  window.screen.height;
            this.getRule ()
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
.change-phone .mint-cell-wrapper{
    background-position: bottom center;
}
</style>
