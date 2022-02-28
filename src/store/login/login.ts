import { Module } from 'vuex'
import router from '@/router'

import { LoginState } from './types'
import { RootState } from '../types'

import {
  accountLoginRequest,
  getCaptcha,
  requestUserInfoById,
  requestUserMenusByUserId,
  refreshToken
} from '@/service/login/login'
import { Account } from '@/service/login/types'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

// 定时任务：每隔一段时间刷新token
// 为了保证后台的安全性
let refreshTokenTimer: NodeJS.Timer

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

      // 4. 添加更新token的定时器
      refreshTokenTimer = setInterval(async () => {
        const refreshTokenResult = await refreshToken()
        const { token } = refreshTokenResult.data
        commit('changeToken', token)
        localCache.setCache('token', token)
      }, 1000 * 60 * 25)

      // 4. 跳转到首页
      router.push('/main')
    },
    accountLogoutAction({ commit }) {
      // 1. 删除token
      commit('changeToken', '')
      localCache.removeCache('token')

      // 2. 删除用户信息
      commit('changeUserInfo', {})
      localCache.removeCache('userInfo')

      // 3. 删除用户菜单
      commit('changeUserMenus', [])
      localCache.removeCache('userMenus')

      // 4. 删除更新token的timer
      clearInterval(refreshTokenTimer)

      // 4. 跳转到登录页面
      router.push('/login')
    },
    loadLocalLoginInfo({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        // 启动刷新token定时器
        clearInterval(refreshTokenTimer)
        refreshTokenTimer = setInterval(async () => {
          const refreshTokenResult = await refreshToken()
          const { token } = refreshTokenResult.data
          commit('changeToken', token)
          localCache.setCache('token', token)
        }, 1000 * 60 * 25)
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
