<template>
     <div class="product">
             <mt-header fixed title="商品管理"></mt-header>
             <div style="position: absolute;width: 100%;height: 90%;left: 0;background-color: #f5f5f5;top:50px">
                 <mt-cell title="自营商品管理"  @click.native="saveRouter('self-manage')" isLink style="margin-top: 10px"></mt-cell>
                 <mt-cell title="平台商品管理"  @click.native="saveRouter('diy-manage')" isLink style="margin-top: 10px"></mt-cell>
             </div>
     </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: mapState({
            storeId: state => state.Login.data.storeId
        }),
        methods: {
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
.product{
    background-color: #f5f5f5;
    height: 600px;
    width: 100%;
    position: relative;
}
.product .mint-cell-wrapper{
    background-image:  none;
}
.product .mint-cell:last-child{
    background-image: none;
}
</style>
