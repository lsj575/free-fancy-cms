import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { FancyRequestIntercepetors, FancyRequestConfig } from './type'
import store from '@/store'

import { ElLoading, ILoadingInstance } from 'element-plus'

class FancyRequest {
  instance: AxiosInstance
  interceptors?: FancyRequestIntercepetors
  showLoading: boolean
  loadingInstance?: ILoadingInstance

  // 从config中取出对应实例的拦截器
  constructor(config: FancyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? false

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        if (data.code === 123) {
          store.dispatch('loginModule/accountLogoutAction')
        } else if (data.code === 1111) {
          store.dispatch('loginModule/refreshTokenAction')
        }
        return res.data
      },
      (err) => {
        if (err.response.status === 404) {
          console.log('not found')
        }
        return err
      }
    )
  }

  request<T = any>(config: FancyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (this.showLoading) {
        this.loadingInstance = ElLoading.service()
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.loadingInstance?.close()
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          this.loadingInstance?.close()
          reject(err)
        })
    })
  }

  get<T>(config: FancyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: FancyRequestConfig<T>): Promise<T> {
    console.log(config)
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: FancyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: FancyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  put<T>(config: FancyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default FancyRequest
