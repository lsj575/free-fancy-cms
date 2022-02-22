import fancyRequest from '@/service'
import { FancyDataReponseType } from '@/service/request/type'
import { DataListType } from './types'

export function getDataList(url: string, queryInfo: any) {
  return fancyRequest.post<FancyDataReponseType<DataListType>>({
    url: url,
    data: queryInfo
  })
}
