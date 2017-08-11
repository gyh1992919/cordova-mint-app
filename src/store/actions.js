/**
 * Created by Administrator on 2017/7/20.
 */
import * as types from './mutation-types'

export const setLogin = ({ commit }, userInfo) => {
    commit(types.SET_LOGIN, userInfo)
}

export const clearToken = ({ commit }) => {
  commit(types.CLEAR_TOKEN)
}

