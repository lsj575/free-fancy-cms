import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { RootState, StoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { getDataList } from '@/service/main/system/system'
import { QueryInfoType } from './main/system/types'

enum ApiList {
  GetRoles = '/sys/role/list'
}

const store = createStore<RootState>({
  state() {
    return {
      entireRole: []
    }
  },
  modules: {
    loginModule,
    systemModule
  },
  mutations: {
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const pageUrl = ApiList.GetRoles
      const queryInfo: QueryInfoType = {
        current: 1,
        size: 1000,
        isAsc: true,
        sortColumns: ['role_sort']
      }

      const dataRes = await getDataList(pageUrl, queryInfo)
      const { records } = dataRes.data
      commit('changeEntireRole', records)
    }
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLoginInfo')
}

// 为了ts更好的提示state，做一次封装
export function useStore(): Store<StoreType> {
  return useVuexStore()
}

export default store
