import { Module } from 'vuex'
import router from '@/router'

import { LoginState } from './types'
import { RootState } from '../types'

import {
  accountLoginRequest,
  getCaptcha,
  requestUserInfoById,
  requestUserMenusByUserId
} from '@/service/login/login'
import { Account } from '@/service/login/types'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async getCaptchaAction() {
      const captchaResult = await getCaptcha()
      return captchaResult
    },
    async accountLoginAction({ commit }, payload: Account) {
      // 1. 登录
      const loginResult = await accountLoginRequest(payload)
      const { user, Authorization } = loginResult.data
      commit('changeToken', Authorization)
      localCache.setCache('token', Authorization)

      // 2. 获取用户信息
      const userInfoResult = await requestUserInfoById(user.id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 获取用户菜单
      const userMenusResult = await requestUserMenusByUserId(user.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4. 跳转到首页
      router.push('/main')
    },
    loadLocalLoginInfo({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
