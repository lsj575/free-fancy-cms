export interface QueryInfoType {
  isAsc: boolean
  sortColumns: string[]
  current: number
  size: number
  timeColumn?: string
  start?: string
  end?: string
  status?: number
  value?: string
}

export interface SystemState {
  userList: any[]
  userCount: number
  queryInfo: QueryInfoType
}
