import router from 'umi/router'
import * as userServices from '../services/user'

export default {
  namespace: "user",
  state: {
    username: null,
    userphone: null,
    veriftState: null,
  },
  effects: {
    // * login({ payload }, { call, put }) {
    //   localStorage.clear()
    //   sessionStorage.clear()
    //   const { code, data, message } = yield call(userServices.login, payload)
    //   yield put({ type: 'saveCurrentUser', payload: { currentUser: { name: data, account: data } } })
    //   return { code, data, message }
    // },
    * sendVerift({ payload }, { call, put }) {
      const veriftResponse = yield call(userServices.sendVerift, payload)
      yield put({ type: 'saveVeriftState', payload: { veriftState: veriftResponse.msg } })
      return { message: veriftResponse.msg }
    },
  },
  reducers: {
    saveUsername(state, { payload: { username } }) {
      return { ...state, username }
    },
    saveVeriftState(state, { payload: { veriftState } }) {
      return { ...state, veriftState }
    }
  }
}