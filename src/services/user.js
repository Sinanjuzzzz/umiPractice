import request from '../utils/request'

export async function sendVerift(params) {
  return request.post('/api/user/verify', { data: params, requestType: 'form' })
}