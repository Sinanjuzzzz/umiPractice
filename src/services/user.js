import request from '../utils/request'

export async function sendVerift(params) {
  return request.post('/user/verify', { data: params, requestType: 'form' })
}