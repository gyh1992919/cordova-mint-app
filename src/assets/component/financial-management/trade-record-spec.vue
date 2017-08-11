<template>
    <div class="diy-spec">
        <mt-header fixed title="商品详情">
            <router-link to="/trade-record" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <div>
                <mt-cell title="活动类型" :value="extractsSpec.isGiving"></mt-cell>
                <mt-cell title="商品标题" class="title">
                    <span>{{extractsSpec.name}}</span>
                </mt-cell>
                <mt-cell title="简要描述" :value="extractsSpec.describe"></mt-cell>
                <mt-cell title="店铺名称" value="带链接"></mt-cell>
                <mt-cell title="成本价" :value="extractsSpec.costPrice"></mt-cell>
                <mt-cell title="状态" :value="extractsSpec.statusText"></mt-cell>
                <mt-cell title="上架时间" :value="extractsSpec.onlineAt"></mt-cell>
                <mt-cell title="开始时间" :value="extractsSpec.startedAt"></mt-cell>
                <mt-cell title="结束时间" :value="extractsSpec.endedAt"></mt-cell>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                extractsSpec: {}
            }
        },
        mounted () {
            this.getProductSpec()
        },
        methods: {
            getProductSpec() {
                this.$http({url:'/extracts/'+ this.$route.params.id, method: 'get',id: this.$route.params.id }).then(res =>{
                    this.extractsSpec = res.data
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

