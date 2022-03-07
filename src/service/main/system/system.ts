import fancyRequest from '@/service'
import { FancyDataReponseType } from '@/service/request/type'
import { DataListType } from './types'
import qs from 'qs'

export function getDataList(url: string, queryInfo: any) {
  return fancyRequest.get<FancyDataReponseType<DataListType>>({
    url: url,
    params: queryInfo,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

// url: users/:id
export function deletePageDataByID(url: string) {
  return fancyRequest.delete<FancyDataReponseType>({
    url: url
  })
}

export function createPageData(url: string, data: any) {
  return fancyRequest.post<FancyDataReponseType>({
    url: url,
    data: data
  })
}

export function editPageDataByID(url: string, data: any) {
  return fancyRequest.put<FancyDataReponseType>({
    url: url,
    data: data
  })
}
