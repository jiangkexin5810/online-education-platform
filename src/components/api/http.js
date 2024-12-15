import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 响应拦截器
http.interceptors.response.use(
  response => response,
  error => {
    // 统一错误处理
    const errorMessage = getErrorMessage(error)
    console.error('请求错误:', errorMessage)
    return Promise.reject(error)
  }
)

// 错误信息处理函数
function getErrorMessage(error) {
  if (error.response) {
    // 服务器返回错误状态码
    switch (error.response.status) {
      case 400: return '请求参数错误'
      case 401: return '未授权，请登录'
      case 403: return '拒绝访问'
      case 404: return '请求的资源不存在'
      case 500: return '服务器内部错误'
      default: return `请求失败: ${error.response.status}`
    }
  } else if (error.request) {
    // 请求发送成功但没有收到响应
    return '网络错误，请检查您的网络连接'
  } else {
    // 请求配置发生错误
    return error.message
  }
}

export default http