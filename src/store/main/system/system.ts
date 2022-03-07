import { Module } from 'vuex'
import { ElMessage } from 'element-plus'

import { SystemState, QueryInfoType } from './types'
import { RootState } from '../../types'

import {
  createPageData,
  deletePageDataByID,
  editPageDataByID,
  getDataList
} from '@/service/main/system/system'
import { upFirstChar } from '@/utils/tools'

const pageListMap = {
  user: '/sys/user/search'
}

const systemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      queryInfo: {
        isAsc: true,
        sortColumns: ['gmt_create'],
        current: 1,
        size: 10,
        timeColumn: 'gmt_create',
        start: '',
        end: '',
        status: 0,
        value: ''
      }
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeQueryInfo(state, queryInfo: QueryInfoType) {
      state.queryInfo = queryInfo
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getDataList({ commit }, payload: any) {
      const { pageName } = payload
      const pageUrl = pageListMap[pageName]

      const dataRes = await getDataList(pageUrl, payload.queryInfo)
      const { records, total } = dataRes.data
      commit(`change${upFirstChar(pageName)}List`, records)
      commit(`change${upFirstChar(pageName)}Count`, total)
    },
    async deletePageData({ state, dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/sys/${pageName}/${id}`

      // 调用删除的网络请求
      const dataRes = await deletePageDataByID(pageUrl)
      if (dataRes.code === 1000) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      }

      // 请求最新的数据
      dispatch('getDataList', {
        pageName: pageName,
        queryInfo: state.queryInfo
      })
    },
    async createPageDataAction({ dispatch, state }, payload) {
      const { pageName, newData } = payload
      const url = `/sys/${pageName}`
      const dataRes = await createPageData(url, newData)
      if (dataRes.code === 1000) {
        ElMessage({
          message: '新增成功',
          type: 'success'
        })
      }

      // 请求最新的数据
      dispatch('getDataList', {
        pageName: pageName,
        queryInfo: state.queryInfo
      })
    },
    async editPageDataAction({ state, dispatch }, payload) {
      const { pageName, editData } = payload
      const url = `/sys/${pageName}`
      const dataRes = await editPageDataByID(url, editData)
      if (dataRes.code === 1000) {
        ElMessage({
          message: '编辑成功',
          type: 'success'
        })
      }

      // 请求最新的数据
      dispatch('getDataList', {
        pageName: pageName,
        queryInfo: state.queryInfo
      })
    }
  }
}
export default systemModule
