<template>
    <div class="diy-spec">
        <mt-header fixed title="商品详情">
            <router-link to="/diy-manage" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <div>
                <mt-cell title="活动类型" :value="productSpec.isGiving"></mt-cell>
                <mt-cell title="商品标题"  :value="productSpec.name"></mt-cell>
                <mt-cell title="简要描述" :value="productSpec.describe"></mt-cell>
                <mt-cell title="成本价" :value="productSpec.costPrice"></mt-cell>
                <mt-cell title="状态" :value="productSpec.statusText"></mt-cell>
                <mt-cell title="上架时间" :value="productSpec.onlineAt"></mt-cell>
                <mt-cell title="开始时间" :value="productSpec.startedAt"></mt-cell>
                <mt-cell title="结束时间" :value="productSpec.endedAt"></mt-cell>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                productSpec: {}
            }
        },
        mounted () {
            this.getProductSpec()
        },
        methods: {
            getProductSpec() {
                this.$http({url:'/products/'+ this.$route.params.id, method: 'get',id: this.$route.params.id ,headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then(res =>{
                    this.productSpec = res.data
                })
            }
        }
    }
</script>
<style>
.diy-spec{
    padding-top: 50px;
    background-color: #f5f5f5;
}
.diy-spec .content{
    width: 100%;
}
.diy-spec .title .mint-cell-title{
  flex: 0 0 80px;
}
.diy-spec .title .mint-cell-value{
    font-size: 13px;
}
</style>

