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
