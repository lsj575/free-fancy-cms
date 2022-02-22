import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { RootState, StoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'

const store = createStore<RootState>({
  state() {
    return {
      username: 'lsj'
    }
  },
  modules: {
    loginModule,
    systemModule
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
