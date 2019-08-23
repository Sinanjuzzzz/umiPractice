import * as todosServices from '@/services/todos'

export default {
  namespace: 'todos',
  state: {
    list: [],
    total: null,
    page: null,
    size: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page, size } }) {
      return { ...state, list, total, page, size };
    },
  },
  effects: {
    *fetchToDosList({ payload: { page, size } }, { call, put }) {
      const { data, headers } = yield call(todosServices.queryToDosList, { page, size })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
          size,
        }
      })
    },
    *queryToDo({ payload: { queryMode, queryValue, page, size } }, { call, put }) {
      const { data, headers } = yield call(todosServices.queryToDo, { queryMode, queryValue })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
          size,
        }
      })
    }
  }
}