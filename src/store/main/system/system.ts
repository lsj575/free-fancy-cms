import { Module } from 'vuex'

import { SystemState } from './types'
import { RootState } from '../../types'

import { getDataList } from '@/service/main/system/system'
import { upFirstChar } from '@/utils/tools'

const pageMap = {
  user: '/sys/user/list'
}

const systemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
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
      const pageUrl = pageMap[pageName]

      const dataRes = await getDataList(pageUrl, payload.queryInfo)
      const { records, total } = dataRes.data
      commit(`change${upFirstChar(pageName)}List`, records)
      commit(`change${upFirstChar(pageName)}Count`, total)
    }
  }
}
export default systemModule
