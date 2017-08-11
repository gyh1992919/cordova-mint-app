/**
 * Created by Administrator on 2017/7/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import * as actions from './actions'
import Login from './module/login'
import UpdateProduct from './module/updateProduct'
import saveCode from './module/savaCode'

Vue.use(Vuex)
const vuex = new Vuex.Store({
  actions,
  modules: {
    Login,
    UpdateProduct,
    saveCode
  }
})

export default vuex
