<template>
    <div class="page-tabbar">
        <div class="nav-toobar">
            <router-link to='/index' class="link" >
                <div class="icon">
                    <span class="icon-main icon"></span>
                </div>
                <div class="title">首页</div>
            </router-link>
            <router-link to="/index/message" class="link">
                <div class="icon">
                    <span class="icon-message icon"></span>
                </div>
                <div class="title">消息</div>
            </router-link>
            <router-link to="/index/product" class="link">
                <div class="top-icon">
                    <span class="icon-add icon"></span>
                </div>
                <div class="title product-title">商品</div>
            </router-link>
            <router-link to="/index/marke" class="link">
                <div class="icon">
                    <span class="icon-tool icon"></span>
                </div>
                <div class="title">吆喝</div>
            </router-link>
            <router-link to="/index/user" class="link">
                <div class="icon">
                    <span class="icon-use icon"></span>
                </div>
                <div class="title">我的</div>
            </router-link>
        </div>
         <router-view></router-view>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        methods:{
            table (e) {
               console.log(this.selected)
            }
        },
        mounted () {
            this.$navigation.cleanRoutes()
        },
        data() {
            return {
                selected: 'tab-container1'
            };
        },
        computed: mapState({
            storeId: state => state.Login.data.storeId
        })
    }
</script>
<style>
.page-tabbar .nav-toobar{
    position: fixed;
    z-index: 1;
    left: 0;
    bottom: 0;
    right:0;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0,0,0,0.2);
    display: flex;
}
.page-tabbar .nav-toobar .link{
    display: block;
    flex: 1;
    text-align: center;
    text-decoration: none;
    color:  #b8bdc7;
    padding: 5px 0;
    font-size: 12px;
    position: relative;
}
.page-tabbar .nav-toobar a.link:active,.page-tabbar .nav-toobar a.link:hover{
    background-color: #fff;
}
.page-tabbar .nav-toobar .link .icon{
    font-size: 18px;
}
.page-tabbar .nav-toobar .link .title{
   margin-top: 2px;
}
.page-tabbar .link .top-icon{
    width: 35px;
    height: 35px;
    left: 22%;
    padding: 3px;
    line-height: 45px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
    top: -15px;
    box-shadow: 2px 0 8px rgba(0,0,0,0.2);
}
.page-tabbar .link .product-title{
    position: relative;
    top:21px
}
.page-tabbar .link .icon-add{
    background-color: #508cee;
    height: 100%;
    width: 100%;
    display: inline-block;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    line-height: 36px;
    position: relative;
    bottom: 1px;
}
.page-tabbar .nav-toobar .link.router-link-exact-active{
    background-color: transparent;
    color: #508cee;
}
.page-tabbar .nav-toobar .link.router-link-exact-active .icon{
    animation: rubberBand  1s;
    transform-origin: center bottom;
}
.page-tabbar .nav-toobar .link.router-link-exact-active .icon-add{
    animation: bounce 1s;
    transform-origin: center bottom;
}

@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, .95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
@keyframes bounce {
    from, 20%, 53%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0,0,0);
    }
    40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -30px, 0);
    }
    70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -15px, 0);
    }
    90% {
        transform: translate3d(0,-4px,0);
    }
}
.mint-header{
    height:50px;
    background-color: #508cee;
}
</style>
