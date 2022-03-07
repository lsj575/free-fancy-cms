import { Module } from 'vuex'
import router from '@/router'
import { ElMessage } from 'element-plus'

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
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'

// 定时任务：每隔一段时间刷新token
// 为了保证后台的安全性
let refreshTokenTimer: number | null = null

const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async getCaptchaAction() {
      const captchaResult = await getCaptcha()
      return captchaResult
    },
    async accountLoginAction({ dispatch, commit }, payload: Account) {
      // 1. 登录
      const loginResult = await accountLoginRequest(payload)
      const code = loginResult.code
      if (code === 1000) {
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
      }
      const { user, Authorization } = loginResult.data
      commit('changeToken', Authorization)
      localCache.setCache('token', Authorization)

      // 2. 初始化数据请求
      dispatch('getInitialDataAction', null, { root: true })

      // 3. 获取用户信息
      const userInfoResult = await requestUserInfoById(user.id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 4. 获取用户菜单
      const userMenusResult = await requestUserMenusByUserId(user.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 5. 设置刷新token的定时器
      if (refreshTokenTimer !== null) {
        clearInterval(refreshTokenTimer)
        refreshTokenTimer = null
      }
      refreshTokenTimer = window.setInterval(() => {
        dispatch('refreshTokenAction')
      }, 1000 * 60 * 25)

      // 5. 跳转到首页
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
      if (refreshTokenTimer !== null) {
        clearInterval(refreshTokenTimer)
        refreshTokenTimer = null
      }

      // 4. 跳转到登录页面
      router.push('/login')
    },
    async refreshTokenAction({ commit }) {
      const refreshTokenResult = await refreshToken()
      const { token } = refreshTokenResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
    },
    loadLocalLoginInfo({ dispatch, commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('refreshTokenAction')

        // 重设定时器
        if (refreshTokenTimer !== null) {
          clearInterval(refreshTokenTimer)
          refreshTokenTimer = null
        }
        refreshTokenTimer = window.setInterval(() => {
          dispatch('refreshTokenAction')
        }, 1000 * 60 * 25)
      }

      // 初始化数据请求
      dispatch('getInitialDataAction', null, { root: true })

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
