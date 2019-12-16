import request from '../utils/request'

export async function sendEmailVerift(params) {
  return request.post('/email/sendemail', { data: params, requestType: 'form' })
}