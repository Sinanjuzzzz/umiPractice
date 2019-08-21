import router from 'umi/router'

export default {
  namespace: "user",
  state: {
    username: null,
  },
  effects: {
    *signIn({ payload }, { call, put }) {
      const { username } = payload
      yield call(delay, 1000);
      yield put({ type: "saveUsername", payload: { username } })
      router.push("/index")
    },
  },
  reducers: {
    saveUsername(state, { payload: { username } }) {
      return { ...state, username }
    },
  }
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}