/**
 * Created by Administrator on 2017/7/20.
 */
import * as types from '../mutation-types';
import * as func from '../local'
const state = func.local.get() || {
    data: {}
}

const mutations = {
  [types.SET_LOGIN] (state, userInfo) {
    state.data = userInfo
    func.local.set(state)
  },
  [types.UPDATE_STOREID] (state, store){
     state.data = store
  },
  [types.CLEAR_TOKEN] (state) {
    func.local.clear(state)
  }
}

const getters = {
  getData (state) {
    return state.data
  }
}
export default {
  state,
  mutations,
  getters
}
