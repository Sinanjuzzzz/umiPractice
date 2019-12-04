/* eslint-disable consistent-return */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { message } from 'antd'
import router from 'umi/router'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

// 异常处理程序
const errorHandler = error => {
  const { response = {} } = error
  if (response.status === 401) { // 未登录，或者token过期跳转到登录页
    message.destroy()
    message.error('尚未认证或认证已过期', 2)
    router.push('/login')
    return
  }
  const errortext = response.message || codeMessage[response.status] || response.statusText || '未知错误'
  message.destroy()
  message.error(errortext, 2)
  throw error
}

// 配置request请求时的默认参数
const request = extend({
  errorHandler,
  prefix: '/api', // 配置所有请求的前缀
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
})

// 相应前的拦截器,添加jwt需要的token
request.interceptors.request.use((url, options) => (
  {
    options: {
      ...options,
      headers: {
        ...options.headers,
        token: `${localStorage.getItem('rx178-token')}`,
      },
    },
  }
))

class ResponseError extends Error {
  constructor(response, text, data) {
    super(text || response.statusText)
    this.name = 'ResponseError'
    this.data = data
    this.response = response
  }
}

// 响应后拦截器
request.interceptors.response.use(async response => {
  if (response.status >= 200 && response.status < 300) {
    const token = response.headers.get('token')
    if (token) localStorage.setItem('rx178-token', token)
  } else {
    throw new ResponseError(response)
  }

  // if (response.url.includes('/export/patients') || response.url.includes('/log/exportpatients/download')) { // 登录接口错误信息另外处理
  //   let filename = response.headers.get('content-disposition')
  //   filename = filename.split('filename=') ? filename.split('filename=')[1] : `病例数据导出_${new Date().getIme()}.zip`
  //   const blob = await response.clone().blob()
  //   const blobUrl = window.URL.createObjectURL(blob)
  //   forceDownload(blobUrl, filename)
  //   return
  // }

  const resData = await response.clone().json()
  if (resData && resData.code === 200) { // 对code===200的进行返回， code===500进行统一处理
    return response
  }
  if (response.url.includes('/admin/login/')) { // 登录接口错误信息另外处理
    return response
  }
  response.message = resData.message
  throw new ResponseError(response, resData.message)
})

/**
 * 流文件下载
 */
// function forceDownload(blob, fileName) {
//   const a = document.createElement('a')
//   a.style.display = 'none'
//   a.download = fileName
//   a.href = blob
//   a.click()
//   document.body.removeChild(a)
// }

export default request
