import request from '../utils/request'

export function queryToDosList(params) {
  const { page, size } = params
  return request(`/api/todos?_page=${page}&_limit=${size}`);
}

export function queryToDo(params){
  const { queryMode, queryValue } = params
  return request(`/api/todos?${queryMode}=${queryValue}`);
}