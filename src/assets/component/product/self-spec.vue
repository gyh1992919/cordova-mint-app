<template>
    <div class="self-spec">
        <mt-header fixed title="商品详情">
            <router-link to="/self-manage" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="content">
            <mt-swipe >
                <mt-swipe-item :class="'slide-'+ index" v-for="(item,index) in productSpec.images" :key="index">
                    <img  :src="item.url" alt="" style="max-width: 100%">
                </mt-swipe-item>
            </mt-swipe>
            <div style="padding: 0 15px">
                <div style="color: #ff496c">¥{{productSpec.price}}</div>
                <div>{{productSpec.name}}</div>
                <div>{{productSpec.content}}</div>
            </div>
            <div style="padding: 0 13px">
                <div class="">描述图片</div>
                <div v-for="contentImages in productSpec.contentImages">
                    <img :src="contentImages.url" alt="" style="max-width: 100%;margin-top: 10px" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
           return {
               productSpec: ''
           }
        },
        mounted () {
           this.getProductSpec()
        },
        methods: {
            getProductSpec() {
                this.$http({url:'/products/'+ this.$route.params.id, method: 'get',id: this.$route.params.id, headers: {
                    'X-Access-Token': this.$store.getters.getData.token}}).then(res =>{
                  this.productSpec = res.data
                })
            }
        }
    }
</script>
<style>
.self-spec{
    padding-top: 50px;
    background-color: #f5f5f5;
}
.self-spec .content{
    width: 100%;
}
.mint-swipe {
    height: 170px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}
.mint-swipe-item {
    overflow: hidden;
}
.slide1 {
    background-color: #0089dc;
    color: #fff;
}
.slide2 {
    background-color: #ffd705;
    color: #000;
}
.slide3 {
    background-color: #ff2d4b;
    color: #fff;
}
</style>

