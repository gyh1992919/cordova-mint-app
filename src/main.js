import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui';
import router from './router';
import store from './store/index';
import Axios from 'axios'
import Navigation from 'vue-navigation';
import VueAMap from 'vue-amap';
Vue.use(Navigation, {router})

import 'mint-ui/lib/style.css'
import './assets/fonts/style.css'
Vue.use(Mint);
Vue.use(VueAMap)

Vue.prototype.$http = Axios.create({
  baseURL: 'http://test.mihutime.com/employee/v2',
  headers: {'X-Access-Token': store.state.Login.data.token}
});

VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'd8fc9d51b96c16a102a74fd6bc6856bb',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation']
});


function init() {
  new Vue({
    el: '#app',
    router,
    store,
    render:h=>h(App)
  })
  window.plugins.nativepagetransitions.globalOptions.duration = 300;
  window.plugins.nativepagetransitions.globalOptions.iosdelay = 10;
  window.plugins.nativepagetransitions.globalOptions.androiddelay = 100;
  window.plugins.nativepagetransitions.globalOptions.winphonedelay = 175;
  window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 1;
  // these are used for slide left/right only currently
  window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
  window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
}
document.addEventListener("deviceready", init, false);
