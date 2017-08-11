/**
 * Created by Administrator on 2017/7/20.
 */
import * as types from '../mutation-types';
const state = {
  code: 0
}

const actions = {
  saveExtstatus ({commit}, code) {
      commit(types.SAVE_EXTSTATUS, code)
  }
}
const mutations = {
  [types.SAVE_EXTSTATUS] (state,code) {
    state.code = code
  }
}

const getters = {
  getCode (state) {
    return state.code
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
