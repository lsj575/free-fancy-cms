// service 统一出口
import { AxiosRequestHeaders } from 'axios'
import FancyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const fancyRequest = new FancyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json'
  },
  // 拦截器
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        ;(config.headers as AxiosRequestHeaders).Authorization = token
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default fancyRequest
