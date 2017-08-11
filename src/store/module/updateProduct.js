/**
 * Created by Administrator on 2017/8/1.
 */
import * as types from '../mutation-types';
const state = {
   data: {}
}

const actions = {
   updateProductData ({commit}, product) {
      if(product) {
        commit(types.UPDATE_PRODUCT, product)
      }
   }
}
const mutations = {
  [types.UPDATE_PRODUCT] (state, product) {
    state.data = product
  }
}

const getters = {
  getProduct (state) {
    return state.data
   }
}

export default {
  state,
  actions,
  mutations,
  getters
}
