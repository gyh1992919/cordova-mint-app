<template>
    <div >
        <home-view v-if="this.store.storeId"></home-view>
        <openStore-view v-else="!this.store.storeId"></openStore-view>
    </div>
</template>

<script>
   import homeView from './index.vue'
   import openStoreView from './open-store.vue'
   import {mapState} from  'vuex'
    export default {
        components: {
            homeView, openStoreView
        },
        computed: mapState({
           store: state => state.Login.data
        })
    }
</script>
<style>

</style>
