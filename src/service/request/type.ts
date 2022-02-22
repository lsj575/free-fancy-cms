import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface FancyRequestIntercepetors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface FancyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: FancyRequestIntercepetors<T>
  showLoading?: boolean
}

interface FancyDataReponseType<T = any> {
  code: number
  msg: string
  data: T
}

export { FancyRequestIntercepetors, FancyRequestConfig, FancyDataReponseType }
