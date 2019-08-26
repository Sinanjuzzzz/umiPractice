import request from '../utils/request'

export function queryToDosList(params) {
  const { page, size } = params
  return request(`/api/todos?_page=${page}&_limit=${size}`);
}

export function queryToDo(params) {
  const { userId, id, completed, page, size } = params
  const paramsUrl =  (userId ? "userId="+userId : "") + (id ? "&id="+id : "")+ (completed ? "&completed="+completed : "")
  return request(`/api/todos?${paramsUrl}&_page=${page}&_limit=${size}`);
}